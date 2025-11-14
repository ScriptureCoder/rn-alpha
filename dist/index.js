var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AppProvider: () => app_context_default,
  Colors: () => colors_default,
  PATHS: () => paths_default,
  alphaConfig: () => config,
  android: () => android,
  colorScheme: () => scheme,
  dayjs: () => import_dayjs.default,
  decrypt: () => decrypt,
  elevation: () => elevation,
  encrypt: () => encrypt,
  formatMoney: () => money_default,
  height: () => height,
  ios: () => ios,
  isSmallDevice: () => isSmallDevice,
  statusHeight: () => statusHeight,
  storage: () => storage_default,
  store: () => store,
  useApp: () => useApp,
  useCache: () => use_cache_default,
  useColor: () => use_color_default,
  useDispatch: () => use_dispatch_default,
  useMutation: () => use_mutation_default,
  useMutationAsync: () => use_mutation_async_default,
  useQuery: () => use_query_default,
  useQueryAsync: () => use_query_async_default,
  useSelector: () => use_selector_default,
  width: () => width
});
module.exports = __toCommonJS(index_exports);
var import_dayjs = __toESM(require("dayjs"));
var import_relativeTime = __toESM(require("dayjs/plugin/relativeTime"));
var import_utc = __toESM(require("dayjs/plugin/utc"));
var import_timezone = __toESM(require("dayjs/plugin/timezone"));

// src/hooks/use-query.tsx
var import_react3 = require("react");

// src/config.ts
var naira = "\u20A6";
var config = {
  naira,
  baseUrl: ""
};
var config_default = config;

// src/utils/service.ts
async function http(path, method, data, status, auth, text) {
  let headers = {};
  if (auth) {
    headers = {
      "Auth_IDToken": auth
    };
  }
  method = method || "GET";
  let query = "";
  if (method === "GET") {
    for (const [i, key2] of Object.keys(data).entries()) {
      query += `${i === 0 ? "?" : "&"}${key2}=${data[key2]}`;
    }
  }
  let formBody = void 0;
  if (data) {
    formBody = [];
    for (let property in data) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  }
  const url = config_default.baseUrl + path + query;
  const init = {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      ...headers
    },
    body: method === "GET" ? void 0 : data && formBody
  };
  return new Promise((resolve, reject) => {
    fetch(url, init).then(async (response) => {
      if (status) return {
        data: {
          data: await (text ? response.text().catch(() => {
          }) : response.json().catch(() => {
          }))
        },
        status: response.status
      };
      return response.json().catch(() => {
      });
    }).then((res) => {
      resolve(res);
    }).catch((error) => {
      resolve({ data: { error: error == null ? void 0 : error.message }, status: 500 });
    });
  });
}
var service_default = http;

// src/store/reducers/cache-reducer.tsx
var import_toolkit = require("@reduxjs/toolkit");
var initialState = {};
var cacheSlice = (0, import_toolkit.createSlice)({
  name: "cache",
  initialState,
  reducers: {
    init(state, action) {
      state[action.payload.key] = {
        ...state[action.payload.key] || {},
        ...action.payload.value
      };
    },
    set(state, action) {
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      const { key: key2, value } = action.payload;
      if (Array.isArray(value)) {
        state[key2] = value.map((data) => ({ ...data, timestamp }));
      } else if (typeof value === "object" && Object.keys(value).length > 0) {
        state[key2] = { ...value, timestamp };
      } else {
        state[key2] = value;
      }
    },
    prepend(state, action) {
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      state[action.payload.key] = action.payload.value.map((data) => ({ ...data, timestamp })).concat(state[action.payload.key] || []);
    },
    append(state, action) {
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      state[action.payload.key] = (state[action.payload.key] || []).concat(action.payload.value.map((data) => ({ ...data, timestamp })));
    },
    paginate(state, action) {
      const timestamp = (/* @__PURE__ */ new Date()).getTime();
      const { key: key2, data, paginationKey } = action.payload;
      state[key2] = {
        ...data,
        [paginationKey]: [...state[key2][paginationKey], ...data[paginationKey]],
        timestamp
      };
    },
    remove(state, action) {
      delete state[action.payload];
    },
    clear: () => initialState
  }
});
var actions = cacheSlice.actions;
var cache_reducer_default = cacheSlice.reducer;

// src/store/reducers/app-reducer.tsx
var import_toolkit2 = require("@reduxjs/toolkit");
var import_react_native_uuid = __toESM(require("react-native-uuid"));
var initialState2 = {
  auth: {
    accessToken: "",
    customerId: "",
    user: {}
  },
  colorMode: "light",
  systemColor: false,
  registered: false,
  deviceId: import_react_native_uuid.default.v4(),
  email: "",
  image: "",
  defaultPassword: false,
  biometric: false,
  visibility: {
    wallet: true,
    savings: true,
    total: true,
    investment: true
  }
};
var appSlice = (0, import_toolkit2.createSlice)({
  name: "app",
  initialState: initialState2,
  reducers: {
    setDeviceId(state, action) {
      state.deviceId = action.payload;
    },
    setAuth(state, action) {
      state.auth = {
        accessToken: action.payload.auth_idtoken,
        customerId: action.payload.session_token_id,
        user: {}
      };
    },
    setUser(state, action) {
      state.auth.user = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setImage(state, action) {
      state.image = action.payload;
    },
    setColorMode(state, action) {
      state.colorMode = action.payload;
    },
    setRegistered(state, action) {
      state.registered = action.payload;
    },
    setSystemColor(state, action) {
      state.systemColor = action.payload;
    },
    setDefaultPassword(state, action) {
      state.defaultPassword = action.payload;
    },
    setBiometric(state, action) {
      state.biometric = action.payload;
    },
    toggleVisibility(state, action) {
      state.visibility[action.payload] = !state.visibility[action.payload];
    },
    setLogout(state) {
      state.auth = initialState2.auth;
    }
  }
});
var actions2 = appSlice.actions;
var app_reducer_default = appSlice.reducer;

// src/store/contexts/app-context.tsx
var import_react2 = require("react");
var import_netinfo2 = __toESM(require("@react-native-community/netinfo"));

// src/store/contexts/socket-context.tsx
var import_react = require("react");
var import_netinfo = __toESM(require("@react-native-community/netinfo"));
var import_jsx_runtime = require("react/jsx-runtime");
var defaultValue = {};
var SocketContext = (0, import_react.createContext)(defaultValue);
var useSocket = () => (0, import_react.useContext)(SocketContext);
var SocketProvider = ({ children }) => {
  const [connected, setConnected] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const unsubscribe = import_netinfo.default.addEventListener((state) => {
      if (state.isInternetReachable) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SocketContext.Provider,
    {
      value: {
        connected
      },
      children
    }
  );
};
var socket_context_default = SocketProvider;

// src/utils/toast.ts
var import_react_native_simple_toast = __toESM(require("react-native-simple-toast"));
var Toast = (message, duration) => {
  setTimeout(() => {
    import_react_native_simple_toast.default.show(message, import_react_native_simple_toast.default[duration || "LONG"]);
  }, 100);
};
var toast_default = Toast;

// src/store/contexts/app-context.tsx
var import_react_native = require("react-native");
var import_native = require("@react-navigation/native");

// src/hooks/use-selector.tsx
var import_react_redux = require("react-redux");
var useSelector = import_react_redux.useSelector;
var use_selector_default = useSelector;

// src/hooks/use-dispatch.tsx
var import_react_redux2 = require("react-redux");
var use_dispatch_default = () => (0, import_react_redux2.useDispatch)();

// src/store/contexts/app-context.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var defaultValue2 = {};
var AppContext = (0, import_react2.createContext)(defaultValue2);
var useApp = () => (0, import_react2.useContext)(AppContext);
var AppProvider = ({ children }) => {
  const { reset } = (0, import_native.useNavigation)();
  const state = use_selector_default((appstate) => appstate.app);
  const dispatch = use_dispatch_default();
  const [connected, setConnected] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    const unsubscribe = import_netinfo2.default.addEventListener((internetState) => {
      if (internetState.isInternetReachable) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const isDarkMode = (0, import_react_native.useColorScheme)() === "dark";
  const func = (0, import_react2.useMemo)(
    () => ({
      setAuth: (payload) => {
        dispatch(actions2.setAuth(payload));
      },
      setUser: (payload) => {
        dispatch(actions2.setUser(payload));
      },
      setEmail: (payload) => {
        dispatch(actions2.setEmail(payload));
      },
      setImage: (payload) => {
        dispatch(actions2.setImage(payload));
      },
      setRegistered: (payload) => {
        dispatch(actions2.setRegistered(payload));
      },
      setColorMode: (payload) => {
        dispatch(actions2.setSystemColor(false));
        dispatch(actions2.setColorMode(payload));
      },
      setSystemColor: (payload) => {
        dispatch(actions2.setColorMode(isDarkMode ? "dark" : "light"));
        dispatch(actions2.setSystemColor(payload));
      },
      setDefaultPassword: (payload) => {
        dispatch(actions2.setDefaultPassword(payload));
      },
      setBiometric: (payload) => {
        dispatch(actions2.setBiometric(payload));
      },
      toggleVisibility: (payload) => {
        dispatch(actions2.toggleVisibility(payload));
      },
      setTimeout: async () => {
        toast_default("Session expired! kindly login", "SHORT");
        func.setLogout().catch(() => {
        });
      },
      setLogout: async () => {
        dispatch(actions2.setLogout());
        dispatch(actions.clear());
        reset({
          index: 0,
          routes: [
            // { name: 'welcome' },
            { name: "login" }
          ]
        });
      }
    }),
    [dispatch, isDarkMode, reset]
  );
  const value = (0, import_react2.useMemo)(
    () => ({ ...state, connected, ...func }),
    [state, connected, func]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(AppContext.Provider, { value, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(socket_context_default, { children }) });
};
var app_context_default = AppProvider;

// src/store/reducers/thread-reducer.tsx
var import_toolkit3 = require("@reduxjs/toolkit");
var initialState3 = {};
var threadSlice = (0, import_toolkit3.createSlice)({
  name: "thread",
  initialState: initialState3,
  reducers: {
    set(state, action) {
      state[action.payload.key] = action.payload.value;
    },
    remove(state, action) {
      delete state[action.payload];
    },
    clear: () => initialState3
  }
});
var actions3 = threadSlice.actions;
var thread_reducer_default = threadSlice.reducer;

// src/utils/storage.ts
var import_react_native_mmkv = require("react-native-mmkv");
var storage = new import_react_native_mmkv.MMKV();
var Storage = class {
  constructor() {
    this.setItem = (key2, value) => {
      try {
        return storage.set(key2, JSON.stringify(value));
      } catch (e) {
      }
    };
    this.getItem = (key2) => {
      try {
        const value = storage.getString(key2);
        if (value) {
          return JSON.parse(value);
        }
        return void 0;
      } catch (e) {
      }
    };
    this.removeItem = (key2) => {
      try {
        storage.delete(key2);
      } catch (e) {
      }
    };
    this.clear = async () => storage.clearAll();
  }
};
var storage_default = new Storage();

// src/store/index.ts
var import_toolkit4 = require("@reduxjs/toolkit");
var saveToLocalStorage = (state) => {
  try {
    storage_default.setItem("_state", state);
  } catch (e) {
    console.log(e);
  }
};
var loadFromLocalStorage = () => {
  try {
    const serializedState = storage_default.getItem("_state");
    if (serializedState === null) return void 0;
    return serializedState;
  } catch (e) {
    return void 0;
  }
};
var preloadedState = loadFromLocalStorage();
var rootReducer = (0, import_toolkit4.combineReducers)({
  app: app_reducer_default,
  cache: cache_reducer_default,
  tread: thread_reducer_default
});
var store = (0, import_toolkit4.configureStore)({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false
  })
});
store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

// src/paths.ts
var PATHS = {
  login: "POST:/Authenticate",
  biometricAuth: "POST:/TouchAuthenticate",
  generateOtp: "POST:/GenerateOTP",
  validateOtp: "POST:/ValidateOTP",
  register: "POST:/CreateNewAccount",
  forgot: "POST:/ForgotPassword",
  getAccounts: "GET:/GetAccounts/:customerId",
  getTransferAccounts: "GET:/GetTransferAccounts/:customerId",
  getCustomer: "GET:/GetCustomer/:customerId",
  getBvnDetails: "POST:/GetBVNDetails",
  validateOTPBVN: "POST:/ValidateOTPBVN",
  registerDevice: "POST:/RegisterDeviceUUID/:customerId",
  accountStatement: "POST:/GetAccountStatement/:customerId/:accountNumber",
  loanHistory: "POST:/GetLoanHistory/:customerId",
  customerSummary: "GET:/GetCustomerSummary/:customerId",
  accountHistory: "POST:/GetAccountHistory/:customerId/:accountNumber",
  downloadStatement: "POST:/DownloadAccountStatement/:customerId/:accountNumber",
  changePassword: "POST:/ChangePassword/:customerId",
  changePin: "POST:/SaveSecurityPin/:customerId",
  deleteBeneficiary: "POST:/DeleteBeneficiary/:customerId",
  addBeneficiary: "POST:/AddBeneficiary/:customerId",
  getBeneficiaries: "GET:/GetBeneficiary/:customerId",
  confirmBeneficiary: "POST:/ConfirmBeneficiary/:customerId",
  getBanks: "POST:/GetBanks",
  transferHistory: "POST:/GetRecentTransfer/:customerId",
  transferBeneficiary: "POST:/TransferFunds/:customerId",
  transfer: "POST:/TransferFundsMixed/:customerId",
  airtime: "POST:/PayAirtimeBills/:customerId",
  bill: "POST:/PayBills/:customerId",
  billHistory: "POST:/GetBillHistory/:customerId",
  billerCategories: "GET:/GetBillerCategory/:customerId",
  billers: "POST:/GetBillers/:customerId",
  billerProduct: "POST:/GetProducts/:customerId",
  validateBillCustomer: "POST:/ValidateBillCustomer/:customerId",
  getDeposit: "GET:/GetDeposits/:customerId",
  getSavings: "GET:/GetSavings/:customerId",
  createSavings: "POST:/AddNewTargetSavings/:customerId",
  getLoans: "GET:/GetLoans/:customerId",
  liqudateDeposit: "POST:/LiqudateDeposit/:customerId",
  getInvestmentRate: "POST:/GetInvestmentRate/:customerId",
  createDeposit: "POST:/BookDeposits/:customerId",
  getCards: "POST:/GetCards/:customerId",
  fundWallet: "POST:/FundSavings/:customerId",
  requestLoan: "POST:/LoanRequest/:customerId",
  calculateLTV: "GET:/CalculateLTV/:customerId",
  updateSavings: "POST:/UpdateSavings/:customerId",
  closeSavings: "POST:/CloseSavings/:customerId",
  savings: "GET:/savings/:itemId",
  savingsWithdrawal: "POST:/WithdrawSavings/:customerId",
  registerToken: "POST:/AddFirebaseDetails/:customerId",
  feedback: "POST:/SendFeedback/:customerId",
  blockCard: "POST:/BlockCard/:customerId",
  requestCard: "POST:/RequestCard/:customerId",
  verifyNin: "POST:/VerifyNIN/:customerId",
  updateLocationId: "POST:/updateLocationId/:customerId"
};
var paths_default = PATHS;

// src/hooks/use-cache.tsx
var useCache = () => {
  const dispatch = use_dispatch_default();
  const { auth: { customerId } } = useApp();
  const getContext = (route, variables) => {
    const param = paths_default[route] || route;
    const split = param.split(":/");
    const method = split[0];
    const path = "/" + (split == null ? void 0 : split[1].replace(/:\w+/g, (matched) => {
      const spr = { customerId, ...variables };
      const key3 = matched.replace(/\W/g, "");
      delete variables[key3];
      return spr[key3];
    }));
    const key2 = path + JSON.stringify(variables || {});
    return { path, method, key: key2, rawPath: param };
  };
  const getKey = (route, variables) => {
    const { key: key2 } = getContext(route, variables);
    return key2;
  };
  const getData = (key2) => {
    return store.getState().cache[key2];
  };
  const update = (key2, value) => {
    setCache(key2, value);
  };
  const setCache = (key2, value) => {
    dispatch(actions.set({ key: key2, value }));
  };
  const updateItem = (key2, id, value) => {
    const cache = store.getState().cache[key2];
    if (Array.isArray(cache)) {
      const spr = [...cache];
      const i = cache.findIndex((r) => r._id === id);
      spr[i] = { ...spr[i], ...value };
      setCache(key2, spr);
    }
  };
  const getItem = (key2, id) => {
    var _a;
    const cache = store.getState().cache[key2];
    return (_a = cache.filter((r) => r._id === id)) == null ? void 0 : _a[0];
  };
  const updateValue = (key2, arg, value) => {
    const cache = store.getState().cache[key2];
    if (!Array.isArray(cache)) {
      setCache(key2, { ...cache, [arg]: value });
    }
  };
  const updateValues = (key2, values) => {
    const cache = store.getState().cache[key2];
    if (!Array.isArray(cache)) {
      setCache(key2, { ...cache, ...values });
    }
  };
  const prepend = (key2, data) => {
    const cache = store.getState().cache[key2];
    if (Array.isArray(cache)) {
      setCache(key2, [data].concat(cache));
    }
  };
  const updateOrPrepend = (key2, data) => {
    const cache = store.getState().cache[key2];
    if (Array.isArray(cache)) {
      const spr = [...cache];
      const i = cache.findIndex((r) => r._id === data._id);
      if (i > -1) {
        spr[i] = { ...spr[i], ...data };
        setCache(key2, spr);
      } else {
        setCache(key2, [data].concat(cache));
      }
    }
  };
  const append = (key2, data) => {
    const cache = store.getState().cache[key2];
    if (Array.isArray(cache)) {
      setCache(key2, cache.concat([data]));
    }
  };
  const deleteItem = (key2, id) => {
    const cache = store.getState().cache[key2];
    if (Array.isArray(cache)) {
      setCache(key2, cache.filter((r) => r._id !== id));
    }
  };
  return {
    getItem,
    setCache,
    getKey,
    getContext,
    getData,
    update,
    updateValue,
    updateValues,
    updateItem,
    deleteItem,
    prepend,
    append,
    updateOrPrepend
  };
};
var use_cache_default = useCache;

// src/hooks/use-query.tsx
var useQuery = (route, args) => {
  const { variables = {}, networkPolicy, init, onCompleted } = args || {};
  const { auth } = useApp();
  const app = useApp();
  const cache = use_cache_default();
  const { key: key2, path, method } = cache.getContext(route, variables);
  const policy = networkPolicy || "cache-first";
  const data = use_selector_default((state) => state.cache[key2]);
  const thread = use_selector_default((state) => state.tread[key2]);
  const dispatch = use_dispatch_default();
  const { connected } = useSocket();
  (0, import_react3.useEffect)(() => {
    var _a;
    if (data) {
      (_a = args == null ? void 0 : args.onCompleted) == null ? void 0 : _a.call(args, data);
    }
    if (connected && (thread == null ? void 0 : thread.error) && (!data || (data == null ? void 0 : data.length) < 1)) {
      refetch({});
    }
  }, [connected]);
  (0, import_react3.useEffect)(() => {
    fetch2(variables || {});
  }, []);
  (0, import_react3.useEffect)(() => {
    if (init) {
      const data2 = store.getState().cache[key2];
      if ((init == null ? void 0 : init.timestamp) > ((data2 == null ? void 0 : data2.timestamp) || 0)) {
        dispatch(actions.init({ key: key2, value: init }));
      }
    }
  }, [init == null ? void 0 : init.timestamp]);
  const setThread = (key3, loading, error) => {
    dispatch(actions3.set({
      key: key3,
      value: {
        loading,
        error
      }
    }));
  };
  const fetch2 = (variables2) => {
    switch (policy) {
      case "cache-only":
        return;
      case "network-only":
        fetchHandler(variables2).catch(() => {
        });
        return;
      case "cache-first":
        if (!data) {
          fetchHandler(variables2).catch(() => {
          });
        }
        return;
      case "network-and-cache":
        fetchHandler(variables2).catch(() => {
        });
        setTimeout(() => {
          const thread2 = store.getState().tread[key2];
          if (thread2 == null ? void 0 : thread2.loading) {
            console.log("still loading");
            refetch({});
          }
        }, 10 * 1e3);
        return;
    }
  };
  const fetchHandler = async (variables2, refetch2) => {
    var _a, _b, _c, _d, _e;
    try {
      const thread2 = store.getState().tread[key2];
      if (!thread2 || !(thread2 == null ? void 0 : thread2.loading) || (thread2 == null ? void 0 : thread2.error) || refetch2) {
        setThread(key2, true);
        const res = await service_default(path, method || "GET", variables2, true, auth.accessToken);
        const error = res.status !== 200 ? ((_b = (_a = res.data) == null ? void 0 : _a.data) == null ? void 0 : _b.ResponseDescription) || "Oops! an error occurred" : void 0;
        setThread(key2, false, error);
        console.log(path, res.status);
        if (res.status === 200 && res.data.data) {
          (_c = args == null ? void 0 : args.onCompleted) == null ? void 0 : _c.call(args, res.data.data);
          cache.setCache(key2, res.data.data);
        } else if ([401, 404].includes(res.status)) {
          app.setTimeout().catch(() => {
          });
        } else if (error) {
          (_d = args == null ? void 0 : args.onError) == null ? void 0 : _d.call(args, error, res.status);
        }
      }
    } catch (e) {
      const error = e.message || "Oops! an error occurred";
      setThread(key2, false, error);
      (_e = args == null ? void 0 : args.onError) == null ? void 0 : _e.call(args, error, 500);
    }
  };
  const refetch = (args2) => {
    fetchHandler({ ...variables, ...args2 || {} }, true).catch(() => {
    });
  };
  const fetchMore = async (args2, concat, paginationKey) => {
    var _a, _b;
    const res = await service_default(path, method || "GET", { ...variables, ...args2 || {} }, true, auth == null ? void 0 : auth.accessToken);
    const error = res.status !== 200 ? ((_b = (_a = res.data) == null ? void 0 : _a.data) == null ? void 0 : _b.ResponseDescription) || "Oops! an error occurred" : void 0;
    if (res.status === 200) {
      if (concat === "start") {
        dispatch(actions.prepend({ key: key2, value: res.data.data }));
      } else if (concat === "end") {
        dispatch(actions.prepend({ key: key2, value: res.data.data }));
      } else if (concat === "pagination") {
        dispatch(actions.paginate({ key: key2, data: res.data.data, paginationKey: paginationKey || "data" }));
      }
      return { data: res.data.data };
    } else if (res.status === 401) {
      app.setTimeout().catch(() => {
      });
      return { error };
    }
    return { error };
  };
  const extendCache = (0, import_react3.useMemo)(() => ({
    update: (data2) => {
      cache.update(key2, data2);
    },
    updateValue: (arg, value) => {
      cache.updateValue(key2, arg, value);
    },
    updateValues: (values) => {
      cache.updateValues(key2, values);
    },
    updateItem: (id, value) => {
      cache.updateItem(key2, id, value);
    },
    deleteItem: (id) => {
      cache.deleteItem(key2, id);
    },
    prepend: (data2) => {
      cache.prepend(key2, data2);
    },
    append: (data2) => {
      cache.append(key2, data2);
    }
  }), []);
  return {
    data: data || init,
    loading: thread == null ? void 0 : thread.loading,
    error: thread == null ? void 0 : thread.error,
    refetch,
    key: key2,
    fetchMore,
    ...extendCache
  };
};
var use_query_default = useQuery;

// src/hooks/use-query-async.tsx
var useQueryAsync = () => {
  const { auth } = useApp();
  const app = useApp();
  const { getContext } = use_cache_default();
  const dispatch = use_dispatch_default();
  return async (route, variables, authToken) => {
    var _a, _b;
    const { key: key2, method, path } = getContext(route, variables);
    try {
      dispatch(actions3.set({
        key: key2,
        value: {
          loading: true,
          error: void 0
        }
      }));
      const res = await service_default(path, method || "GET", variables || {}, true, authToken || auth.accessToken);
      const error = res.status !== 200 ? ((_b = (_a = res.data) == null ? void 0 : _a.data) == null ? void 0 : _b.ResponseDescription) || "Oops! an error occurred" : void 0;
      dispatch(actions3.set({
        key: key2,
        value: {
          loading: false,
          error
        }
      }));
      if (res.status === 200) {
        dispatch(actions.set({ key: key2, value: res.data.data }));
      } else if (res.status === 401) {
        app.setTimeout().catch(() => {
        });
      }
    } catch (e) {
      const error = e.message || "Oops! an error occurred";
      dispatch(actions3.set({
        key: key2,
        value: {
          loading: false,
          error
        }
      }));
    }
  };
};
var use_query_async_default = useQueryAsync;

// src/constants/colors.ts
var keys = {
  primary: "#0095E0",
  primaryLight: "#57A4FF1A",
  primaryShade: "#b2ddf8",
  secondary: "#102441",
  tertiary: "#BEBEBE",
  danger: "#FE0000",
  dangerLight: "#FF00331E",
  success: "green",
  warning: "#FAA417",
  warningLight: "rgba(250, 164, 23, 0.08)",
  medium: "#92949c",
  mediumShade: "#e6ecf0",
  mediumTint: "#9d9fa6",
  dark: "#242526",
  darkShade: "#3a3b3c",
  darkTint: "#191a1b",
  light: "#ffffff",
  lightShade: "#f9f9fd",
  lightTint: "#f5f6f9",
  modal: "rgba(0,0,0,0.5)",
  overlay: "rgba(0,0,0,0.21)",
  transparent: "rgba(245,246,249,0)",
  placeholder: "#92949c",
  dim: "#15202b",
  orange: "#f7d5ad",
  wood: "#f6efd6",
  black: "#000000",
  cover: "#434C6D"
};
var scheme = {
  light: {
    ...keys,
    text: keys.black,
    text2: "#636A64",
    background: keys.light,
    border: "rgba(153, 153, 153, 0.24)",
    shade: "rgba(113, 159, 228, 0.12)",
    touchable: keys.mediumShade,
    gap: "#f9f9fd",
    tint: keys.lightTint,
    check: keys.primary,
    navigation: "#f9f9fd",
    progress: "#e6ecf0",
    chat: keys.primary,
    spotlight: "#F1F6FA"
  },
  dark: {
    ...keys,
    primaryLight: keys.darkShade,
    text: "#f4f5f8",
    text2: "#91949B",
    background: keys.dark,
    border: "#38444d",
    shade: keys.darkShade,
    touchable: keys.darkTint,
    gap: keys.darkTint,
    mediumShade: "#3a3b3c",
    tint: keys.darkTint,
    check: keys.light,
    navigation: keys.darkTint,
    progress: keys.darkShade,
    chat: "#ffffff",
    spotlight: "rgb(24,24,25)"
  }
};
var Colors = (value) => {
  return scheme[value];
};
var colors_default = Colors;

// src/hooks/use-color.tsx
var useColor = () => {
  const { colorMode, setColorMode, systemColor, setSystemColor } = useApp();
  return {
    colors: colors_default(colorMode),
    setColorMode,
    colorMode,
    systemColor,
    setSystemColor
  };
};
var use_color_default = useColor;

// src/hooks/use-mutation.tsx
var import_react4 = require("react");
var import_react_native2 = require("react-native");
var useMutation = (route, option) => {
  const [loading, setLoading] = (0, import_react4.useState)(false);
  const [error, setError] = (0, import_react4.useState)(void 0);
  const { auth, setTimeout: setTimeout2 } = useApp();
  const [data, setData] = (0, import_react4.useState)();
  const { getContext } = use_cache_default();
  const mutate = (0, import_react4.useCallback)(async (variables) => {
    var _a, _b;
    try {
      if ((option == null ? void 0 : option.keyboard) === void 0 || (option == null ? void 0 : option.keyboard)) {
        import_react_native2.Keyboard.dismiss();
      }
      const { path, method, rawPath } = getContext(route, variables);
      setLoading(true);
      console.log(variables);
      const res = await service_default(path, method || "POST", variables, true, auth == null ? void 0 : auth.accessToken, option == null ? void 0 : option.text);
      console.log(res);
      if ([200, 201].includes(res.status)) {
        setData(res.data.data);
        setLoading(false);
        return { data: res.data.data, status: res.status };
      }
      let error2 = ((_b = (_a = res.data) == null ? void 0 : _a.data) == null ? void 0 : _b.ResponseDescription) || "Oops! an error occurred";
      if (rawPath.includes(":customerId") && [401, 404].includes(res.status)) {
        error2 = "Session expired! kindly login";
        await setTimeout2();
      }
      setError(error2);
      setLoading(false);
      return { error: error2, status: res.status };
    } catch (e) {
      setLoading(false);
      return { error: e.message || "Oops! an error occurred", status: 500 };
    }
  }, []);
  return {
    mutate,
    loading,
    error,
    data
  };
};
var use_mutation_default = useMutation;

// src/hooks/use-mutation-async.tsx
var import_react5 = require("react");
var import_react_native3 = require("react-native");
var useMutation2 = (route, option) => {
  const [loading, setLoading] = (0, import_react5.useState)(false);
  const [error, setError] = (0, import_react5.useState)(void 0);
  const { auth, setTimeout: setTimeout2 } = useApp();
  const [data, setData] = (0, import_react5.useState)();
  const { setCache, getKey } = use_cache_default();
  const mutate = (0, import_react5.useCallback)(async (variables) => {
    var _a, _b;
    try {
      if ((option == null ? void 0 : option.keyboard) === void 0 || (option == null ? void 0 : option.keyboard)) {
        import_react_native3.Keyboard.dismiss();
      }
      const split = route.split(":/");
      const method = split[0];
      const path = "/" + split[1].replace(/:\w+/g, (matched) => {
        const spr = { ...variables || {} };
        const key2 = matched.replace(/\W/g, "");
        delete variables[key2];
        return spr[key2];
      });
      setLoading(true);
      const res = await service_default(path, method || "POST", variables, true, auth.accessToken);
      if ([200, 201].includes(res.status)) {
        setData(res.data);
        setLoading(false);
        return { data: res.data.data, status: res.status };
      }
      if (!route.includes(paths_default.login) && [401, 404].includes(res.status)) {
        await setTimeout2();
      }
      const error2 = ((_b = (_a = res.data) == null ? void 0 : _a.data) == null ? void 0 : _b.ResponseDescription) || "Oops! an error occurred";
      setError(error2);
      setLoading(false);
      return { error: error2, status: res.status };
    } catch (e) {
      setLoading(false);
      return { error: e.message || "Oops! and error occurred", status: 500 };
    }
  }, []);
  const query = async (route2, variables, authToken) => {
    var _a;
    try {
      setLoading(true);
      const split = route2.split(":/");
      const method = split[0];
      const path = "/" + split[1].replace(/:\w+/g, (matched) => {
        const spr = { ...variables || {} };
        const key2 = matched.replace(/\W/g, "");
        delete variables[key2];
        return spr[key2];
      });
      const res = await service_default(path, method || "GET", variables || {}, true, authToken || auth.accessToken);
      const error2 = res.status !== 200 ? ((_a = res.data) == null ? void 0 : _a.error) || "Oops! an error occurred" : void 0;
      setLoading(false);
      if (res.status === 200) {
        const key2 = getKey(route2, variables);
        setCache(key2, res.data.data);
        return { status: res.status, data: res.data.data };
      }
      if (!route2.includes(paths_default.login) && [401, 404].includes(res.status)) {
        await setTimeout2();
        return { error: error2, status: res.status };
      }
      return { error: error2 };
    } catch (e) {
      setLoading(false);
      return { error: e.message || "Oops! and error occurred", status: 500 };
    }
  };
  return {
    mutate,
    loading,
    error,
    data,
    query
  };
};
var use_mutation_async_default = useMutation2;

// src/constants/elevation.ts
var elevation = (key2) => {
  let value;
  switch (key2) {
    case 1:
      value = {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
          //"/2 floor/d 1"
        },
        shadowOpacity: 0.18,
        //"2/4"
        shadowRadius: 1,
        elevation: 1
      };
      break;
    case 2:
      value = {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        // 0.41
        elevation: 2
      };
      break;
    case 3:
      value = {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        // 0.81
        elevation: 3
      };
      break;
    case 4:
      value = {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        // 0.40
        elevation: 4
      };
      break;
    case 5:
      value = {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // 1.22
        elevation: 5
      };
      break;
    case 6:
      value = {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        // 0.81
        elevation: 6
      };
      break;
    case 7:
      value = {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        // 0
        elevation: 7
      };
      break;
    case 8:
      value = {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        // 0
        elevation: 8
      };
      break;
    case 9:
      value = {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        //0.81
        elevation: 9
      };
      break;
    case 10:
      value = {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        // 0.81 0.41 0.81
        elevation: 10
      };
      break;
    default:
      value = {};
  }
  return value;
};

// src/constants/layout.ts
var import_react_native4 = require("react-native");
var width = import_react_native4.Dimensions.get("window").width;
var height = import_react_native4.Dimensions.get("window").height;
var ios = import_react_native4.Platform.OS === "ios";
var android = import_react_native4.Platform.OS === "android";
var isSmallDevice = width < 375;
var statusHeight = ios ? import_react_native4.StatusBar.currentHeight || 42 : 0;

// src/utils/money.ts
function money(num, decimal) {
  if (num || num === 0) {
    return num.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return "-.--";
}
var money_default = money;

// src/utils/crypto.ts
var import_react_native_crypto_js = __toESM(require("react-native-crypto-js"));
var key = import_react_native_crypto_js.default.enc.Utf8.parse("2vn!H3KXgX-TxvkD");
var iv = import_react_native_crypto_js.default.enc.Utf8.parse("%x%97Uw@*A2xWaUJ");
var encrypt = (payload) => {
  return import_react_native_crypto_js.default.AES.encrypt(payload, key, { iv, mode: import_react_native_crypto_js.default.mode.CBC, padding: import_react_native_crypto_js.default.pad.Pkcs7 }).toString();
};
var decrypt = (response) => {
  const decrypted_response = import_react_native_crypto_js.default.AES.decrypt({ ciphertext: import_react_native_crypto_js.default.enc.Base64.parse(response) }, key, { iv });
  return decrypted_response.toString(import_react_native_crypto_js.default.enc.Utf8);
};

// src/index.ts
import_dayjs.default.extend(import_relativeTime.default);
import_dayjs.default.extend(import_utc.default);
import_dayjs.default.extend(import_timezone.default);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppProvider,
  Colors,
  PATHS,
  alphaConfig,
  android,
  colorScheme,
  dayjs,
  decrypt,
  elevation,
  encrypt,
  formatMoney,
  height,
  ios,
  isSmallDevice,
  statusHeight,
  storage,
  store,
  useApp,
  useCache,
  useColor,
  useDispatch,
  useMutation,
  useMutationAsync,
  useQuery,
  useQueryAsync,
  useSelector,
  width
});
//# sourceMappingURL=index.js.map