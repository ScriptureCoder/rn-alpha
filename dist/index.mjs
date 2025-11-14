// src/index.ts
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// src/hooks/use-query.tsx
import { useEffect as useEffect3, useMemo as useMemo2, useRef as useRef2, useCallback as useCallback2 } from "react";

// src/utils/service.ts
import axios from "axios";

// src/config.ts
var naira = "\u20A6";
var config = {
  naira,
  baseUrl: ""
};
var config_default = config;

// src/utils/service.ts
var createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: config_default.baseUrl,
    timeout: 3e4,
    // 30 seconds default
    headers: {
      Accept: "application/json"
    }
  });
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isCancel(error) || error.name === "AbortError") {
        return Promise.reject(error);
      }
      if (!error.response) {
        return Promise.resolve({
          data: {
            error: error.message || "Network error occurred"
          },
          status: 500
        });
      }
      return Promise.resolve(error.response);
    }
  );
  return instance;
};
var axiosInstance = createAxiosInstance();
var formatUrlEncoded = (data) => {
  const formBody = [];
  for (const property in data) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(data[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  return formBody.join("&");
};
var formatFormData = (data) => {
  const formData = new FormData();
  for (const key2 in data) {
    formData.append(key2, data[key2]);
  }
  return formData;
};
var getContentTypeHeader = (contentType) => {
  switch (contentType) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/form-data";
    case "json":
    default:
      return "application/json";
  }
};
var formatRequestData = (data, contentType, method) => {
  if (method === "GET") {
    return void 0;
  }
  if (!data) {
    return void 0;
  }
  switch (contentType) {
    case "urlencoded":
      return formatUrlEncoded(data);
    case "multipart":
      return formatFormData(data);
    case "json":
    default:
      return data;
  }
};
async function http(path, method = "GET", data, optionsOrStatus, legacyAuth, legacyReturnText) {
  var _a;
  let options;
  if (typeof optionsOrStatus === "boolean") {
    options = {
      returnStatus: optionsOrStatus,
      auth: legacyAuth,
      returnText: legacyReturnText,
      contentType: "urlencoded"
      // Legacy default
    };
  } else {
    options = optionsOrStatus || {};
  }
  const {
    auth,
    contentType = "json",
    signal,
    timeout,
    returnStatus = true,
    returnText = false
  } = options;
  try {
    const headers = {
      "Content-Type": getContentTypeHeader(contentType)
    };
    if (auth) {
      headers["Auth_IDToken"] = auth;
    }
    const config2 = {
      method,
      url: path,
      headers,
      signal,
      timeout: timeout || 3e4
    };
    if (method === "GET" && data) {
      config2.params = data;
    } else {
      config2.data = formatRequestData(data, contentType, method);
    }
    const response = await axiosInstance.request(config2);
    if (returnStatus) {
      return {
        data: {
          data: returnText ? response.data : typeof response.data === "string" ? response.data : response.data
        },
        status: response.status
      };
    }
    return response.data;
  } catch (error) {
    if (axios.isCancel(error) || error.name === "AbortError") {
      throw error;
    }
    return {
      data: {
        error: error.message || "An error occurred"
      },
      status: ((_a = error.response) == null ? void 0 : _a.status) || 500
    };
  }
}
var service_default = http;
var isAbortError = (error) => {
  return axios.isCancel(error) || error.name === "AbortError" || error.name === "CanceledError";
};

// src/store/reducers/cache-reducer.tsx
import { createSlice } from "@reduxjs/toolkit";
var initialState = {};
var cacheSlice = createSlice({
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
import { createSlice as createSlice2 } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
var initialState2 = {
  auth: {
    accessToken: "",
    customerId: "",
    user: {}
  },
  registered: false,
  deviceId: uuid.v4(),
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
var appSlice = createSlice2({
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
    setRegistered(state, action) {
      state.registered = action.payload;
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
import {
  createContext as createContext2,
  useContext as useContext2,
  useEffect as useEffect2,
  useMemo,
  useState as useState2
} from "react";
import NetInfo2 from "@react-native-community/netinfo";

// src/store/contexts/socket-context.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import NetInfo from "@react-native-community/netinfo";
import { jsx } from "react/jsx-runtime";
var defaultValue = {};
var SocketContext = createContext(defaultValue);
var useSocket = () => useContext(SocketContext);
var SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
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
  return /* @__PURE__ */ jsx(
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
import SimpleToast from "react-native-simple-toast";
var Toast = (message, duration) => {
  setTimeout(() => {
    SimpleToast.show(message, SimpleToast[duration || "LONG"]);
  }, 100);
};
var toast_default = Toast;

// src/store/contexts/app-context.tsx
import { useNavigation } from "@react-navigation/native";

// src/hooks/use-selector.tsx
import { useSelector as Selector } from "react-redux";
var useSelector = Selector;
var use_selector_default = useSelector;

// src/hooks/use-dispatch.tsx
import { useDispatch } from "react-redux";
var use_dispatch_default = () => useDispatch();

// src/store/contexts/app-context.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var defaultValue2 = {};
var AppContext = createContext2(defaultValue2);
var useApp = () => useContext2(AppContext);
var AppProvider = ({ children }) => {
  const { reset } = useNavigation();
  const state = use_selector_default((appstate) => appstate.app);
  const dispatch = use_dispatch_default();
  const [connected, setConnected] = useState2(false);
  useEffect2(() => {
    const unsubscribe = NetInfo2.addEventListener((internetState) => {
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
  const func = useMemo(
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
    [dispatch, reset]
  );
  const value = useMemo(
    () => ({ ...state, connected, ...func }),
    [state, connected, func]
  );
  return /* @__PURE__ */ jsx2(AppContext.Provider, { value, children: /* @__PURE__ */ jsx2(socket_context_default, { children }) });
};
var app_context_default = AppProvider;

// src/store/reducers/thread-reducer.tsx
import { createSlice as createSlice3 } from "@reduxjs/toolkit";
var initialState3 = {};
var threadSlice = createSlice3({
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

// src/hooks/use-cache.tsx
import { useCallback } from "react";

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

// src/hooks/utils/route-parser.ts
function parseRoute(route, variables = {}, customerId) {
  const rawPath = paths_default[route] || route;
  const [method, pathTemplate] = rawPath.split(":/");
  const variablesCopy = { ...variables };
  const path = "/" + pathTemplate.replace(/:\w+/g, (matched) => {
    const params = { customerId, ...variablesCopy };
    const paramName = matched.replace(/\W/g, "");
    delete variablesCopy[paramName];
    return params[paramName] || matched;
  });
  const key2 = path + JSON.stringify(variablesCopy);
  return {
    path,
    method: method || "GET",
    key: key2,
    rawPath
  };
}

// src/hooks/use-cache.tsx
var useCache = () => {
  const dispatch = use_dispatch_default();
  const { auth: { customerId } } = useApp();
  const cacheState = use_selector_default((state) => state.cache);
  const getContext = useCallback(
    (route, variables) => {
      return parseRoute(route, variables, customerId);
    },
    [customerId]
  );
  const getKey = useCallback(
    (route, variables) => {
      const { key: key2 } = getContext(route, variables);
      return key2;
    },
    [getContext]
  );
  const getData = useCallback(
    (key2) => {
      return cacheState[key2];
    },
    [cacheState]
  );
  const setCache = useCallback(
    (key2, value) => {
      dispatch(actions.set({ key: key2, value }));
    },
    [dispatch]
  );
  const update = useCallback(
    (key2, value) => {
      setCache(key2, value);
    },
    [setCache]
  );
  const updateItem = useCallback(
    (key2, id, value) => {
      const cache = cacheState[key2];
      if (Array.isArray(cache)) {
        const index = cache.findIndex((item) => item._id === id);
        if (index !== -1) {
          const updated = [...cache];
          updated[index] = { ...updated[index], ...value };
          setCache(key2, updated);
        }
      }
    },
    [cacheState, setCache]
  );
  const getItem = useCallback(
    (key2, id) => {
      const cache = cacheState[key2];
      if (Array.isArray(cache)) {
        return cache.find((item) => item._id === id);
      }
      return void 0;
    },
    [cacheState]
  );
  const updateValue = useCallback(
    (key2, arg, value) => {
      const cache = cacheState[key2];
      if (!Array.isArray(cache) && typeof cache === "object") {
        setCache(key2, { ...cache, [arg]: value });
      }
    },
    [cacheState, setCache]
  );
  const updateValues = useCallback(
    (key2, values) => {
      const cache = cacheState[key2];
      if (!Array.isArray(cache) && typeof cache === "object") {
        setCache(key2, { ...cache, ...values });
      }
    },
    [cacheState, setCache]
  );
  const prepend = useCallback(
    (key2, data) => {
      const cache = cacheState[key2];
      if (Array.isArray(cache)) {
        setCache(key2, [data, ...cache]);
      } else {
        setCache(key2, [data]);
      }
    },
    [cacheState, setCache]
  );
  const updateOrPrepend = useCallback(
    (key2, data) => {
      const cache = cacheState[key2];
      if (Array.isArray(cache)) {
        const index = cache.findIndex((item) => item._id === data._id);
        if (index !== -1) {
          const updated = [...cache];
          updated[index] = { ...updated[index], ...data };
          setCache(key2, updated);
        } else {
          setCache(key2, [data, ...cache]);
        }
      } else {
        setCache(key2, [data]);
      }
    },
    [cacheState, setCache]
  );
  const append = useCallback(
    (key2, data) => {
      const cache = cacheState[key2];
      if (Array.isArray(cache)) {
        setCache(key2, [...cache, data]);
      } else {
        setCache(key2, [data]);
      }
    },
    [cacheState, setCache]
  );
  const deleteItem = useCallback(
    (key2, id) => {
      const cache = cacheState[key2];
      if (Array.isArray(cache)) {
        setCache(key2, cache.filter((item) => item._id !== id));
      }
    },
    [cacheState, setCache]
  );
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

// src/hooks/constants.ts
var NETWORK_TIMEOUT = 1e4;
var ERROR_MESSAGES = {
  GENERIC: "Oops! an error occurred",
  NETWORK: "Network error occurred",
  TIMEOUT: "Request timed out",
  SESSION_EXPIRED: "Session expired! kindly login",
  UNAUTHORIZED: "Unauthorized access"
};

// src/hooks/utils/error-handler.ts
function extractErrorMessage(response, defaultMessage = "Oops! an error occurred") {
  var _a, _b, _c, _d;
  if (typeof response === "string") {
    return response;
  }
  return ((_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data) == null ? void 0 : _b.ResponseDescription) || ((_c = response == null ? void 0 : response.data) == null ? void 0 : _c.ResponseDescription) || ((_d = response == null ? void 0 : response.data) == null ? void 0 : _d.error) || (response == null ? void 0 : response.error) || (response == null ? void 0 : response.message) || defaultMessage;
}
function isSuccessStatus(status) {
  return [200, 201].includes(status);
}
function isAuthError(status) {
  return [401, 404].includes(status);
}
function createErrorResponse(error, status = 500) {
  const message = typeof error === "string" ? error : error.message;
  return {
    error: message || "Oops! an error occurred",
    status
  };
}
function createSuccessResponse(data, status = 200) {
  return {
    data,
    status
  };
}
function isAbortError2(error) {
  var _a, _b;
  if (!error) return false;
  return error.name === "AbortError" || error.name === "CanceledError" || error.code === "ERR_CANCELED" || ((_a = error.message) == null ? void 0 : _a.includes("abort")) || ((_b = error.message) == null ? void 0 : _b.includes("cancel"));
}

// src/hooks/use-query.tsx
var useQuery = (route, args) => {
  const { variables = {}, networkPolicy, init, onCompleted, onError } = args || {};
  const app = useApp();
  const { auth } = app;
  const cache = use_cache_default();
  const { key: key2, path, method } = cache.getContext(route, variables);
  const policy = networkPolicy || "cache-first";
  const data = use_selector_default((state) => state.cache[key2]);
  const thread = use_selector_default((state) => state.tread[key2]);
  const dispatch = use_dispatch_default();
  const { connected } = useSocket();
  const timeoutRef = useRef2(null);
  const abortControllerRef = useRef2(null);
  useEffect3(() => {
    if (data && onCompleted) {
      onCompleted(data);
    }
    if (connected && (thread == null ? void 0 : thread.error) && (!data || Array.isArray(data) && data.length < 1)) {
      refetch({});
    }
  }, [data, connected, thread == null ? void 0 : thread.error]);
  useEffect3(() => {
    fetchData(variables);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  useEffect3(() => {
    if (init && init.timestamp > ((data == null ? void 0 : data.timestamp) || 0)) {
      dispatch(actions.init({ key: key2, value: init }));
    }
  }, [init == null ? void 0 : init.timestamp, key2, dispatch, data == null ? void 0 : data.timestamp]);
  const setThread = useCallback2(
    (loading, error) => {
      dispatch(
        actions3.set({
          key: key2,
          value: {
            loading,
            error
          }
        })
      );
    },
    [dispatch, key2]
  );
  const fetchData = useCallback2(
    (fetchVariables) => {
      switch (policy) {
        case "cache-only":
          return;
        case "network-only":
          fetchHandler(fetchVariables).catch(() => {
          });
          return;
        case "cache-first":
          if (!data) {
            fetchHandler(fetchVariables).catch(() => {
            });
          }
          return;
        case "network-and-cache":
          fetchHandler(fetchVariables).catch(() => {
          });
          timeoutRef.current = setTimeout(() => {
            const currentThread = thread;
            if (currentThread == null ? void 0 : currentThread.loading) {
              refetch({});
            }
          }, NETWORK_TIMEOUT);
          return;
      }
    },
    [policy, data, thread]
  );
  const fetchHandler = useCallback2(
    async (fetchVariables, isRefetch = false) => {
      try {
        if (!(thread == null ? void 0 : thread.loading) || (thread == null ? void 0 : thread.error) || isRefetch) {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
          abortControllerRef.current = new AbortController();
          setThread(true);
          const res = await service_default(
            path,
            method || "GET",
            fetchVariables,
            {
              returnStatus: true,
              auth: auth.accessToken,
              signal: abortControllerRef.current.signal
            }
          );
          const error = !isSuccessStatus(res.status) ? extractErrorMessage(res) : void 0;
          setThread(false, error);
          if (isSuccessStatus(res.status) && res.data.data) {
            if (onCompleted) {
              onCompleted(res.data.data);
            }
            cache.setCache(key2, res.data.data);
          } else if (isAuthError(res.status)) {
            app.setTimeout().catch(() => {
            });
          } else if (error && onError) {
            onError(error, res.status);
          }
        }
      } catch (e) {
        if (isAbortError2(e)) {
          return;
        }
        const error = e.message || "Oops! an error occurred";
        setThread(false, error);
        if (onError) {
          onError(error, 500);
        }
      }
    },
    [thread, setThread, path, method, auth.accessToken, onCompleted, onError, cache, key2, app]
  );
  const refetch = useCallback2(
    (refetchVariables) => {
      fetchHandler({ ...variables, ...refetchVariables || {} }, true).catch(() => {
      });
    },
    [fetchHandler, variables]
  );
  const fetchMore = useCallback2(
    async (fetchMoreVariables, concat, paginationKey) => {
      try {
        const fetchMoreController = new AbortController();
        const res = await service_default(
          path,
          method || "GET",
          { ...variables, ...fetchMoreVariables || {} },
          {
            returnStatus: true,
            auth: auth == null ? void 0 : auth.accessToken,
            signal: fetchMoreController.signal
          }
        );
        const error = !isSuccessStatus(res.status) ? extractErrorMessage(res) : void 0;
        if (isSuccessStatus(res.status)) {
          if (concat === "start") {
            dispatch(actions.prepend({ key: key2, value: res.data.data }));
          } else if (concat === "end") {
            dispatch(actions.append({ key: key2, value: res.data.data }));
          } else if (concat === "pagination") {
            dispatch(
              actions.paginate({
                key: key2,
                data: res.data.data,
                paginationKey: paginationKey || "data"
              })
            );
          }
          return { data: res.data.data };
        } else if (isAuthError(res.status)) {
          app.setTimeout().catch(() => {
          });
          return { error };
        }
        return { error };
      } catch (e) {
        if (isAbortError2(e)) {
          return { error: "Request cancelled" };
        }
        const error = e.message || "Oops! an error occurred";
        return { error };
      }
    },
    [path, method, variables, auth == null ? void 0 : auth.accessToken, dispatch, key2, app]
  );
  const abort = useCallback2(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);
  const extendCache = useMemo2(
    () => ({
      update: (newData) => {
        cache.update(key2, newData);
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
      prepend: (newData) => {
        cache.prepend(key2, newData);
      },
      append: (newData) => {
        cache.append(key2, newData);
      }
    }),
    [key2, cache]
  );
  return {
    data: data || init,
    loading: (thread == null ? void 0 : thread.loading) || false,
    error: thread == null ? void 0 : thread.error,
    refetch,
    key: key2,
    fetchMore,
    abort,
    ...extendCache
  };
};
var use_query_default = useQuery;

// src/hooks/use-query-async.tsx
var useQueryAsync = () => {
  const app = useApp();
  const { auth } = app;
  const { getContext } = use_cache_default();
  const dispatch = use_dispatch_default();
  return async (route, variables = {}, options) => {
    const { key: key2, method, path } = getContext(route, variables);
    const opts = typeof options === "string" ? { authToken: options } : options || {};
    try {
      dispatch(
        actions3.set({
          key: key2,
          value: {
            loading: true,
            error: void 0
          }
        })
      );
      const res = await service_default(
        path,
        method || "GET",
        variables,
        {
          returnStatus: true,
          auth: opts.authToken || auth.accessToken,
          signal: opts.signal
        }
      );
      const error = !isSuccessStatus(res.status) ? extractErrorMessage(res) : void 0;
      dispatch(
        actions3.set({
          key: key2,
          value: {
            loading: false,
            error
          }
        })
      );
      if (isSuccessStatus(res.status)) {
        dispatch(actions.set({ key: key2, value: res.data.data }));
        return createSuccessResponse(res.data.data, res.status);
      } else if (isAuthError(res.status)) {
        app.setTimeout().catch(() => {
        });
        return createErrorResponse(error || "Unauthorized", res.status);
      }
      return createErrorResponse(error || "Request failed", res.status);
    } catch (e) {
      if (isAbortError2(e)) {
        dispatch(
          actions3.set({
            key: key2,
            value: {
              loading: false,
              error: void 0
            }
          })
        );
        return createErrorResponse("Request cancelled", 0);
      }
      const error = e.message || "Oops! an error occurred";
      dispatch(
        actions3.set({
          key: key2,
          value: {
            loading: false,
            error
          }
        })
      );
      return createErrorResponse(error, 500);
    }
  };
};
var use_query_async_default = useQueryAsync;

// src/hooks/use-mutation.tsx
import { useState as useState3, useCallback as useCallback3, useRef as useRef3, useEffect as useEffect4 } from "react";
import { Keyboard } from "react-native";
var useMutation = (route, option) => {
  const [loading, setLoading] = useState3(false);
  const [error, setError] = useState3(void 0);
  const [data, setData] = useState3(void 0);
  const app = useApp();
  const { auth } = app;
  const { getContext } = use_cache_default();
  const abortControllerRef = useRef3(null);
  useEffect4(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  const mutate = useCallback3(
    async (variables) => {
      try {
        if ((option == null ? void 0 : option.keyboard) === void 0 || (option == null ? void 0 : option.keyboard)) {
          Keyboard.dismiss();
        }
        const { path, method, rawPath } = getContext(route, variables);
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        setLoading(true);
        setError(void 0);
        const res = await service_default(
          path,
          method || "POST",
          variables,
          {
            returnStatus: true,
            auth: auth == null ? void 0 : auth.accessToken,
            returnText: option == null ? void 0 : option.text,
            signal: abortControllerRef.current.signal
          }
        );
        if (isSuccessStatus(res.status)) {
          const responseData = res.data.data;
          setData(responseData);
          setLoading(false);
          return createSuccessResponse(responseData, res.status);
        }
        let errorMessage = extractErrorMessage(res);
        if (rawPath.includes(":customerId") && isAuthError(res.status)) {
          errorMessage = ERROR_MESSAGES.SESSION_EXPIRED;
          await app.setTimeout();
        }
        setError(errorMessage);
        setLoading(false);
        return createErrorResponse(errorMessage, res.status);
      } catch (e) {
        if (isAbortError2(e)) {
          setLoading(false);
          return createErrorResponse("Request cancelled", 0);
        }
        setLoading(false);
        const errorMessage = e.message || ERROR_MESSAGES.GENERIC;
        setError(errorMessage);
        return createErrorResponse(errorMessage, 500);
      }
    },
    [route, option, auth, app, getContext]
  );
  const cancel = useCallback3(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);
  return [
    mutate,
    {
      loading,
      error,
      data,
      cancel
    }
  ];
};
var use_mutation_default = useMutation;

// src/hooks/use-mutation-async.tsx
import { useState as useState4, useCallback as useCallback4, useRef as useRef4, useEffect as useEffect5 } from "react";
import { Keyboard as Keyboard2 } from "react-native";
var useMutationAsync = (route, option) => {
  const [loading, setLoading] = useState4(false);
  const [error, setError] = useState4(void 0);
  const [data, setData] = useState4(void 0);
  const app = useApp();
  const { auth } = app;
  const abortControllerRef = useRef4(null);
  useEffect5(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  const mutate = useCallback4(
    async (variables) => {
      try {
        if ((option == null ? void 0 : option.keyboard) === void 0 || (option == null ? void 0 : option.keyboard)) {
          Keyboard2.dismiss();
        }
        const [method, pathTemplate] = route.split(":/");
        const variablesCopy = { ...variables };
        const path = "/" + pathTemplate.replace(/:\w+/g, (matched) => {
          const paramName = matched.replace(/\W/g, "");
          const value = variablesCopy[paramName];
          delete variablesCopy[paramName];
          return value || matched;
        });
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        setLoading(true);
        setError(void 0);
        const res = await service_default(
          path,
          method || "POST",
          variablesCopy,
          {
            returnStatus: true,
            auth: auth.accessToken,
            signal: abortControllerRef.current.signal
          }
        );
        if (isSuccessStatus(res.status)) {
          const responseData = res.data.data;
          setData(responseData);
          setLoading(false);
          return createSuccessResponse(responseData, res.status);
        }
        if (isAuthError(res.status)) {
          await app.setTimeout();
        }
        const errorMessage = extractErrorMessage(res);
        setError(errorMessage);
        setLoading(false);
        return createErrorResponse(errorMessage, res.status);
      } catch (e) {
        if (isAbortError2(e)) {
          setLoading(false);
          return createErrorResponse("Request cancelled", 0);
        }
        setLoading(false);
        const errorMessage = e.message || ERROR_MESSAGES.GENERIC;
        setError(errorMessage);
        return createErrorResponse(errorMessage, 500);
      }
    },
    [route, option, auth, app]
  );
  const cancel = useCallback4(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);
  return [
    mutate,
    {
      loading,
      error,
      data,
      cancel
    }
  ];
};
var use_mutation_async_default = useMutationAsync;

// src/utils/http-helpers.ts
var createAbortController = () => {
  return new AbortController();
};
var isAbortError3 = (error) => {
  var _a, _b;
  if (!error) return false;
  return error.name === "AbortError" || error.name === "CanceledError" || error.code === "ERR_CANCELED" || ((_a = error.message) == null ? void 0 : _a.includes("abort")) || ((_b = error.message) == null ? void 0 : _b.includes("cancel"));
};
var isCancelError = (error) => {
  return isAbortError3(error);
};
var shouldRetry = (error) => {
  var _a, _b;
  if (isAbortError3(error)) {
    return false;
  }
  if (((_a = error.response) == null ? void 0 : _a.status) >= 400 && ((_b = error.response) == null ? void 0 : _b.status) < 500) {
    return false;
  }
  return true;
};
var formatFormData2 = (data) => {
  const formData = new FormData();
  for (const key2 in data) {
    if (data.hasOwnProperty(key2)) {
      const value = data[key2];
      if (value !== null && value !== void 0) {
        formData.append(key2, value);
      }
    }
  }
  return formData;
};
var formatUrlEncoded2 = (data) => {
  const formBody = [];
  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      const value = data[property];
      if (value !== null && value !== void 0) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(value);
        formBody.push(`${encodedKey}=${encodedValue}`);
      }
    }
  }
  return formBody.join("&");
};
var safeAbort = (controller) => {
  if (controller && !controller.signal.aborted) {
    controller.abort();
  }
};
var createTimeoutController = (timeoutMs) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  const cleanup = () => {
    clearTimeout(timeoutId);
  };
  return { controller, cleanup };
};
var combineAbortSignals = (signals) => {
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort();
      break;
    }
    signal.addEventListener("abort", () => {
      controller.abort();
    }, { once: true });
  }
  return controller;
};

// src/utils/storage.ts
import { MMKV } from "react-native-mmkv";
var storage = new MMKV();
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
import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
var rootReducer = combineReducers({
  app: app_reducer_default,
  cache: cache_reducer_default,
  tread: thread_reducer_default
});
var store = configureStore({
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

// src/utils/money.ts
function money(num, decimal) {
  if (num || num === 0) {
    return num.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return "-.--";
}
var money_default = money;

// src/utils/crypto.ts
import CryptoJS from "react-native-crypto-js";
var key = CryptoJS.enc.Utf8.parse("2vn!H3KXgX-TxvkD");
var iv = CryptoJS.enc.Utf8.parse("%x%97Uw@*A2xWaUJ");
var encrypt = (payload) => {
  return CryptoJS.AES.encrypt(payload, key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
};
var decrypt = (response) => {
  const decrypted_response = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(response) }, key, { iv });
  return decrypted_response.toString(CryptoJS.enc.Utf8);
};

// src/index.ts
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
export {
  app_context_default as AppProvider,
  paths_default as PATHS,
  config as alphaConfig,
  combineAbortSignals,
  createAbortController,
  createErrorResponse,
  createSuccessResponse,
  createTimeoutController,
  dayjs,
  decrypt,
  encrypt,
  extractErrorMessage,
  formatFormData2 as formatFormData,
  money_default as formatMoney,
  formatUrlEncoded2 as formatUrlEncoded,
  isAbortError3 as isAbortError,
  isAuthError,
  isCancelError,
  isAbortError as isHttpAbortError,
  isSuccessStatus,
  safeAbort,
  shouldRetry,
  storage_default as storage,
  store,
  useApp,
  use_cache_default as useCache,
  use_dispatch_default as useDispatch,
  use_mutation_default as useMutation,
  use_mutation_async_default as useMutationAsync,
  use_query_default as useQuery,
  use_query_async_default as useQueryAsync,
  use_selector_default as useSelector
};
//# sourceMappingURL=index.mjs.map