var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
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

// src/utils/storage.ts
var storage_exports = {};
__export(storage_exports, {
  default: () => storage_default
});
var import_react_native_mmkv, storage, Storage, storage_default;
var init_storage = __esm({
  "src/utils/storage.ts"() {
    import_react_native_mmkv = require("react-native-mmkv");
    storage = new import_react_native_mmkv.MMKV();
    Storage = class {
      constructor() {
        this.setItem = (key, value) => {
          try {
            return storage.set(key, JSON.stringify(value));
          } catch (e) {
          }
        };
        this.getItem = (key) => {
          try {
            const value = storage.getString(key);
            if (value) {
              return JSON.parse(value);
            }
            return void 0;
          } catch (e) {
          }
        };
        this.removeItem = (key) => {
          try {
            storage.delete(key);
          } catch (e) {
          }
        };
        this.clear = async () => storage.clearAll();
      }
    };
    storage_default = new Storage();
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AlphaProvider: () => AlphaProvider,
  AppProvider: () => app_context_default,
  DEFAULT_CACHE_TTL: () => DEFAULT_CACHE_TTL,
  DEFAULT_CONFIG: () => DEFAULT_CONFIG,
  DEFAULT_STALE_TIME: () => DEFAULT_STALE_TIME,
  ERROR_MESSAGES: () => ERROR_MESSAGES,
  MAX_CACHE_SIZE: () => MAX_CACHE_SIZE,
  NETWORK_TIMEOUT: () => NETWORK_TIMEOUT,
  OfflineQueue: () => OfflineQueue,
  PATHS: () => paths_default,
  QueryDebugger: () => QueryDebugger,
  STATUS_CODES: () => STATUS_CODES,
  Toast: () => toast_default,
  alphaConfig: () => config,
  appActions: () => actions,
  canUseCache: () => canUseCache,
  cancelRequest: () => cancelRequest,
  capitalize: () => capitalize,
  clearAllRequests: () => clearAllRequests,
  combineAbortSignals: () => combineAbortSignals,
  createAbortController: () => createAbortController,
  createAlphaStore: () => createAlphaStore,
  createCacheEntry: () => createCacheEntry,
  createDebugger: () => createDebugger,
  createErrorResponse: () => createErrorResponse,
  createSelector: () => createSelector,
  createSlice: () => import_toolkit5.createSlice,
  createSuccessResponse: () => createSuccessResponse,
  createTimeoutController: () => createTimeoutController,
  createTypedDispatch: () => createTypedDispatch,
  createTypedSelector: () => createTypedSelector,
  dayjs: () => import_dayjs.default,
  decrypt: () => decrypt,
  defaultStore: () => defaultStore,
  disableGlobalDebug: () => disableGlobalDebug,
  enableGlobalDebug: () => enableGlobalDebug,
  encrypt: () => encrypt,
  extractErrorMessage: () => extractErrorMessage,
  extractResponseData: () => extractResponseData,
  formatFormData: () => formatFormData2,
  formatMoney: () => money_default,
  formatUrlEncoded: () => formatUrlEncoded2,
  generateEncryptionConfig: () => generateEncryptionConfig,
  getCacheAge: () => getCacheAge,
  getCacheData: () => getCacheData,
  getCacheMetadata: () => getCacheMetadata,
  getEncryptionConfig: () => getEncryptionConfig,
  getHttpConfig: () => getHttpConfig,
  getInFlightCount: () => getInFlightCount,
  getMime: () => getMime,
  getOfflineQueue: () => getOfflineQueue,
  getOrCreateRequest: () => getOrCreateRequest,
  http: () => service_default,
  isAbortError: () => isAbortError3,
  isAuthError: () => isAuthError,
  isCacheExpired: () => isCacheExpired,
  isCacheFresh: () => isCacheFresh,
  isCacheStale: () => isCacheStale,
  isCancelError: () => isCancelError,
  isGlobalDebugEnabled: () => isGlobalDebugEnabled,
  isHttpAbortError: () => isAbortError,
  isRequestInFlight: () => isRequestInFlight,
  isSuccessStatus: () => isSuccessStatus,
  isValidEncryptionConfig: () => isValidEncryptionConfig,
  naira: () => naira,
  readFile: () => readFile_default,
  retryWithBackoff: () => retryWithBackoff,
  retryWithJitter: () => retryWithJitter,
  safeAbort: () => safeAbort,
  setEncryptionConfig: () => setEncryptionConfig,
  setHttpConfig: () => setHttpConfig,
  setMaxCacheSize: () => setMaxCacheSize,
  shouldRetry: () => shouldRetry2,
  storage: () => storage_default,
  store: () => defaultStore,
  useAlphaConfig: () => useAlphaConfig,
  useApp: () => useApp,
  useAppDispatch: () => useAppDispatch,
  useAppSelector: () => useAppSelector,
  useCache: () => use_cache_default,
  useDispatch: () => use_dispatch_default,
  useMutation: () => use_mutation_default,
  useMutationAsync: () => use_mutation_async_default,
  useQuery: () => use_query_default,
  useQueryAsync: () => use_query_async_default,
  useRefetchInterval: () => useRefetchInterval,
  useRefetchOnFocus: () => useRefetchOnFocus,
  useRefetchOnReconnect: () => useRefetchOnReconnect,
  useSelector: () => use_selector_default
});
module.exports = __toCommonJS(index_exports);
var import_dayjs = __toESM(require("dayjs"));
var import_relativeTime = __toESM(require("dayjs/plugin/relativeTime"));
var import_utc = __toESM(require("dayjs/plugin/utc"));
var import_timezone = __toESM(require("dayjs/plugin/timezone"));

// src/hooks/use-query.tsx
var import_react5 = require("react");

// src/utils/service.ts
var import_axios = __toESM(require("axios"));

// src/config.ts
var DEFAULT_CONFIG = {
  baseUrl: "",
  timeout: 3e4,
  cache: {
    ttl: 5 * 60 * 1e3,
    staleTime: 0,
    maxSize: 100
  },
  defaultNetworkPolicy: "cache-first",
  retry: {
    enabled: true,
    count: 3,
    delay: "exponential"
  },
  encryption: void 0,
  // No default - must be provided for security
  defaultEncryption: false,
  // No encryption by default
  dataPath: "data",
  // Default to res.data.data for backward compatibility
  debug: false
};
var naira = "\u20A6";
var config = {
  naira,
  baseUrl: ""
};
var config_default = config;

// src/utils/service.ts
var currentConfig = DEFAULT_CONFIG;
function setHttpConfig(newConfig) {
  currentConfig = newConfig;
  axiosInstance = createAxiosInstance();
}
function getHttpConfig() {
  return currentConfig;
}
var createAxiosInstance = () => {
  const instance = import_axios.default.create({
    baseURL: currentConfig.baseUrl || config_default.baseUrl,
    timeout: currentConfig.timeout || 3e4,
    headers: {
      Accept: "application/json",
      ...currentConfig.headers || {}
    }
  });
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (import_axios.default.isCancel(error) || error.name === "AbortError") {
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
  for (const key in data) {
    formData.append(key, data[key]);
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
      return "application/text";
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
  var _a, _b;
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
      // 'Content-Type': "application/x-www-form-urlencoded",
    };
    if (auth) {
      headers["Authorization"] = auth;
    }
    console.log(headers, method, path);
    const config2 = {
      method,
      url: path,
      headers,
      signal,
      timeout: timeout || 3e4
    };
    console.log({ data });
    if (method === "GET" && data) {
      config2.params = data;
    } else {
      config2.data = formatRequestData(data, contentType, method);
    }
    console.log(config2);
    const response = await axiosInstance.request(config2);
    console.log(response);
    if (returnStatus) {
      return {
        data: returnText ? response.data : typeof response.data === "string" ? response.data : response.data,
        status: response.status
      };
    }
    return response.data;
  } catch (error) {
    if (import_axios.default.isCancel(error) || error.name === "AbortError") {
      throw error;
    }
    return {
      data: ((_a = error.response) == null ? void 0 : _a.data) || { error: error.message || "An error occurred" },
      status: ((_b = error.response) == null ? void 0 : _b.status) || 500
    };
  }
}
var service_default = http;
var isAbortError = (error) => {
  return import_axios.default.isCancel(error) || error.name === "AbortError" || error.name === "CanceledError";
};

// src/store/contexts/app-context.tsx
var import_react = require("react");
var import_netinfo = __toESM(require("@react-native-community/netinfo"));

// src/hooks/use-selector.tsx
var import_react_redux = require("react-redux");
var useSelector = import_react_redux.useSelector;
var use_selector_default = useSelector;

// src/hooks/use-dispatch.tsx
var import_react_redux2 = require("react-redux");
var use_dispatch_default = () => (0, import_react_redux2.useDispatch)();

// src/store/reducers/app-reducer.tsx
var import_toolkit = require("@reduxjs/toolkit");
var initialState = {
  auth: {
    accessToken: "",
    refreshToken: "",
    customerId: void 0
  },
  user: null
};
var appSlice = (0, import_toolkit.createSlice)({
  name: "app",
  initialState,
  reducers: {
    /**
     * Set auth tokens and customer ID
     * Accepts partial updates to merge with existing auth state
     */
    setAuth(state, action) {
      state.auth = { ...state.auth, ...action.payload };
    },
    /**
     * Set user data
     * Apps define their own user structure
     */
    setUser(state, action) {
      state.user = action.payload;
    },
    /**
     * Clear authentication state
     * Resets both auth and user to initial values
     */
    clearAuth(state) {
      state.auth = initialState.auth;
      state.user = null;
    }
  }
});
var actions = appSlice.actions;
var app_reducer_default = appSlice.reducer;

// src/store/contexts/app-context.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var AppContext = (0, import_react.createContext)(void 0);
var useApp = () => {
  const context = (0, import_react.useContext)(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
var AppProvider = ({ children }) => {
  const state = use_selector_default((appState) => appState.app);
  const dispatch = use_dispatch_default();
  const [connected, setConnected] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const unsubscribe = import_netinfo.default.addEventListener((internetState) => {
      setConnected(!!internetState.isInternetReachable);
    });
    return () => unsubscribe();
  }, []);
  const value = (0, import_react.useMemo)(
    () => ({
      auth: state.auth,
      user: state.user,
      connected,
      setAuth: (payload) => dispatch(actions.setAuth(payload)),
      setUser: (payload) => dispatch(actions.setUser(payload)),
      clearAuth: () => dispatch(actions.clearAuth())
    }),
    [state.auth, state.user, connected, dispatch]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppContext.Provider, { value, children });
};
var app_context_default = AppProvider;

// src/store/reducers/cache-reducer.tsx
var import_toolkit2 = require("@reduxjs/toolkit");
var metadata = {
  accessOrder: [],
  maxSize: 100
  // Default LRU limit
};
var initialState2 = {};
var cacheSlice = (0, import_toolkit2.createSlice)({
  name: "cache",
  initialState: initialState2,
  reducers: {
    init(state, action) {
      state[action.payload.key] = {
        ...state[action.payload.key] || {},
        ...action.payload.value
      };
    },
    set(state, action) {
      const timestamp = Date.now();
      const { key, value, ttl, staleTime } = action.payload;
      updateAccessOrder(state, key);
      const entry = {
        data: value,
        timestamp,
        expiresAt: ttl ? timestamp + ttl : void 0,
        staleAt: staleTime !== void 0 ? timestamp + staleTime : void 0
      };
      state[key] = entry;
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
      const { key, data, paginationKey } = action.payload;
      state[key] = {
        ...data,
        [paginationKey]: [...state[key][paginationKey], ...data[paginationKey]],
        timestamp
      };
    },
    remove(state, action) {
      delete state[action.payload];
    },
    clear: () => initialState2,
    // New action to delete a specific cache entry
    delete(state, action) {
      const { key } = action.payload;
      delete state[key];
      const index = metadata.accessOrder.indexOf(key);
      if (index > -1) {
        metadata.accessOrder.splice(index, 1);
      }
    }
  }
});
function updateAccessOrder(state, key) {
  const index = metadata.accessOrder.indexOf(key);
  if (index > -1) {
    metadata.accessOrder.splice(index, 1);
  }
  metadata.accessOrder.push(key);
  if (metadata.accessOrder.length > metadata.maxSize) {
    const evictKey = metadata.accessOrder.shift();
    if (evictKey) {
      delete state[evictKey];
    }
  }
}
function setMaxCacheSize(size) {
  metadata.maxSize = size;
}
function getCacheMetadata() {
  return { ...metadata };
}
var actions2 = cacheSlice.actions;
var cache_reducer_default = cacheSlice.reducer;

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

// src/hooks/use-cache.tsx
var import_react2 = require("react");

// src/paths.ts
var PATHS = {
  login: "POST:/Authenticate",
  biometricAuth: "POST:/TouchAuthenticate",
  generateOtp: "POST:/GenerateOTP",
  validateOtp: "POST:/ValidateOTP",
  register: "POST:/CreateNewAccount",
  forgot: "POST:/ForgotPassword"
};
var paths_default = PATHS;

// src/hooks/utils/route-parser.ts
function parseRoute(route, variables = {}, customerId) {
  const config2 = getHttpConfig();
  const allPaths = {
    ...paths_default,
    ...config2.paths || {}
  };
  const rawPath = allPaths[route] || route;
  const [method, pathTemplate] = rawPath.split(":/");
  const variablesCopy = { ...variables };
  const path = "/" + pathTemplate.replace(/:\w+/g, (matched) => {
    const params = { customerId, ...variablesCopy };
    const paramName = matched.replace(/\W/g, "");
    delete variablesCopy[paramName];
    return params[paramName] || matched;
  });
  const key = path + JSON.stringify(variablesCopy);
  return {
    path,
    method: method || "GET",
    key,
    rawPath
  };
}

// src/hooks/use-cache.tsx
var getItemId = (item) => {
  return (item == null ? void 0 : item._id) || (item == null ? void 0 : item.id);
};
var useCache = () => {
  const dispatch = use_dispatch_default();
  const { auth: { customerId } } = useApp();
  const cacheState = use_selector_default((state) => state.cache);
  const getContext = (0, import_react2.useCallback)(
    (route, variables) => {
      return parseRoute(route, variables, customerId);
    },
    [customerId]
  );
  const getKey = (0, import_react2.useCallback)(
    (route, variables) => {
      const { key } = getContext(route, variables);
      return key;
    },
    [getContext]
  );
  const getData = (0, import_react2.useCallback)(
    (key) => {
      return cacheState[key];
    },
    [cacheState]
  );
  const setCache = (0, import_react2.useCallback)(
    (key, value) => {
      dispatch(actions2.set({ key, value }));
    },
    [dispatch]
  );
  const update = (0, import_react2.useCallback)(
    (key, value) => {
      setCache(key, value);
    },
    [setCache]
  );
  const updateItem = (0, import_react2.useCallback)(
    (key, id, value) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        const index = cache.findIndex((item) => getItemId(item) === id);
        if (index !== -1) {
          const updated = [...cache];
          updated[index] = { ...updated[index], ...value };
          setCache(key, updated);
        }
      }
    },
    [cacheState, setCache]
  );
  const getItem = (0, import_react2.useCallback)(
    (key, id) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        return cache.find((item) => getItemId(item) === id);
      }
      return void 0;
    },
    [cacheState]
  );
  const updateValue = (0, import_react2.useCallback)(
    (key, arg, value) => {
      const cache = cacheState[key];
      if (!Array.isArray(cache) && typeof cache === "object") {
        setCache(key, { ...cache, [arg]: value });
      }
    },
    [cacheState, setCache]
  );
  const updateValues = (0, import_react2.useCallback)(
    (key, values) => {
      const cache = cacheState[key];
      if (!Array.isArray(cache) && typeof cache === "object") {
        setCache(key, { ...cache, ...values });
      }
    },
    [cacheState, setCache]
  );
  const prepend = (0, import_react2.useCallback)(
    (key, data) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        setCache(key, [data, ...cache]);
      } else {
        setCache(key, [data]);
      }
    },
    [cacheState, setCache]
  );
  const updateOrPrepend = (0, import_react2.useCallback)(
    (key, data) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        const dataId = getItemId(data);
        const index = cache.findIndex((item) => getItemId(item) === dataId);
        if (index !== -1) {
          const updated = [...cache];
          updated[index] = { ...updated[index], ...data };
          setCache(key, updated);
        } else {
          setCache(key, [data, ...cache]);
        }
      } else {
        setCache(key, [data]);
      }
    },
    [cacheState, setCache]
  );
  const append = (0, import_react2.useCallback)(
    (key, data) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        setCache(key, [...cache, data]);
      } else {
        setCache(key, [data]);
      }
    },
    [cacheState, setCache]
  );
  const deleteItem = (0, import_react2.useCallback)(
    (key, id) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        setCache(key, cache.filter((item) => getItemId(item) !== id));
      }
    },
    [cacheState, setCache]
  );
  const invalidate = (0, import_react2.useCallback)(
    (key) => {
      dispatch(actions2.delete({ key }));
    },
    [dispatch]
  );
  const invalidateQueries = (0, import_react2.useCallback)(
    (pattern) => {
      const regex = typeof pattern === "string" ? new RegExp(`^${pattern}`) : pattern;
      const keysToInvalidate = Object.keys(cacheState).filter(
        (k) => regex.test(k)
      );
      keysToInvalidate.forEach((key) => {
        dispatch(actions2.delete({ key }));
      });
    },
    [cacheState, dispatch]
  );
  const invalidateAll = (0, import_react2.useCallback)(() => {
    dispatch(actions2.clear());
  }, [dispatch]);
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
    updateOrPrepend,
    invalidate,
    invalidateQueries,
    invalidateAll
  };
};
var use_cache_default = useCache;

// src/store/contexts/socket-context.tsx
var import_react3 = require("react");
var import_netinfo2 = __toESM(require("@react-native-community/netinfo"));
var import_jsx_runtime2 = require("react/jsx-runtime");
var defaultValue = {};
var SocketContext = (0, import_react3.createContext)(defaultValue);
var useSocket = () => (0, import_react3.useContext)(SocketContext);

// src/hooks/constants.ts
var NETWORK_TIMEOUT = 1e4;
var ERROR_MESSAGES = {
  GENERIC: "Oops! an error occurred",
  NETWORK: "Network error occurred",
  TIMEOUT: "Request timed out",
  SESSION_EXPIRED: "Session expired! kindly login",
  UNAUTHORIZED: "Unauthorized access"
};
var STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};
var DEFAULT_CACHE_TTL = 5 * 60 * 1e3;
var DEFAULT_STALE_TIME = 0;
var MAX_CACHE_SIZE = 100;

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
function shouldRetry(error) {
  var _a, _b, _c;
  if (isAbortError2(error)) {
    return false;
  }
  if (((_a = error.response) == null ? void 0 : _a.status) >= 400 && ((_b = error.response) == null ? void 0 : _b.status) < 500) {
    return false;
  }
  if (isAuthError((_c = error.response) == null ? void 0 : _c.status)) {
    return false;
  }
  return true;
}

// src/hooks/utils/request-queue.ts
var inFlightRequests = /* @__PURE__ */ new Map();
function getOrCreateRequest(key, requestFn) {
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key);
  }
  const promise = requestFn().finally(() => {
    inFlightRequests.delete(key);
  });
  inFlightRequests.set(key, promise);
  return promise;
}
function cancelRequest(key) {
  inFlightRequests.delete(key);
}
function isRequestInFlight(key) {
  return inFlightRequests.has(key);
}
function getInFlightCount() {
  return inFlightRequests.size;
}
function clearAllRequests() {
  inFlightRequests.clear();
}

// src/hooks/utils/cache-helpers.ts
function isCacheExpired(entry) {
  if (!entry || typeof entry !== "object") {
    return false;
  }
  if ("expiresAt" in entry && entry.expiresAt) {
    return Date.now() > entry.expiresAt;
  }
  return false;
}
function isCacheStale(entry) {
  if (!entry || typeof entry !== "object") {
    return true;
  }
  if ("staleAt" in entry) {
    if (entry.staleAt === void 0) {
      return false;
    }
    return Date.now() > entry.staleAt;
  }
  return true;
}
function isCacheFresh(entry) {
  return !isCacheExpired(entry) && !isCacheStale(entry);
}
function getCacheData(entry) {
  if (!entry) {
    return void 0;
  }
  if ("data" in entry && "timestamp" in entry) {
    return entry.data;
  }
  return entry;
}
function createCacheEntry(data, ttl, staleTime) {
  const timestamp = Date.now();
  return {
    data,
    timestamp,
    expiresAt: ttl ? timestamp + ttl : void 0,
    staleAt: staleTime !== void 0 ? timestamp + staleTime : void 0
  };
}
function getCacheAge(entry) {
  if (!entry || !entry.timestamp) {
    return Infinity;
  }
  return Date.now() - entry.timestamp;
}
function canUseCache(entry) {
  return entry && !isCacheExpired(entry);
}

// src/hooks/utils/response-helpers.ts
var extractResponseData = (response, dataPath) => {
  if (!dataPath) {
    return response;
  }
  const path = dataPath.trim();
  if (!path) {
    return response;
  }
  return path.split(".").reduce((obj, key) => obj == null ? void 0 : obj[key], response);
};

// src/store/contexts/config-context.tsx
var import_react4 = require("react");

// src/hooks/utils/debug-logger.ts
var QueryDebugger = class {
  constructor(enabled, prefix = "[Query]") {
    this.enabled = enabled;
    this.prefix = prefix;
  }
  /**
   * Log a cache hit
   */
  logCacheHit(key, data) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u{1F3AF} Cache HIT`, {
      key,
      dataSize: this.getDataSize(data),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    if (data) {
      console.log(`${this.prefix} Data:`, data);
    }
  }
  /**
   * Log a cache miss
   */
  logCacheMiss(key) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u274C Cache MISS`, {
      key,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log the start of a fetch request
   */
  logFetchStart(key, variables) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u{1F680} Fetching`, {
      key,
      variables,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log a successful fetch
   */
  logFetchSuccess(key, duration, data) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u2705 Success`, {
      key,
      duration: duration ? `${duration.toFixed(2)}ms` : "N/A",
      dataSize: this.getDataSize(data),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log a fetch error
   */
  logFetchError(key, error, duration) {
    if (!this.enabled) return;
    console.error(`${this.prefix} \u274C Error`, {
      key,
      error: (error == null ? void 0 : error.message) || error,
      duration: duration ? `${duration.toFixed(2)}ms` : "N/A",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log cache invalidation
   */
  logInvalidate(key) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u{1F504} Invalidating`, {
      pattern: key.toString(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log network policy decision
   */
  logPolicy(key, policy, decision) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u{1F4CB} Policy`, {
      key,
      policy,
      decision,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log cache expiry check
   */
  logCacheExpiry(key, isExpired, isStale) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u23F0 Cache Status`, {
      key,
      expired: isExpired,
      stale: isStale,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log request deduplication
   */
  logDeduplication(key, isDuplicate) {
    if (!this.enabled) return;
    if (isDuplicate) {
      console.log(`${this.prefix} \u{1F517} Request Deduplicated`, {
        key,
        message: "Using existing in-flight request",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  }
  /**
   * Get the size of data (array length or object keys)
   */
  getDataSize(data) {
    if (!data) return "0";
    if (Array.isArray(data)) return `${data.length} items`;
    if (typeof data === "object") return `${Object.keys(data).length} keys`;
    return "scalar";
  }
};
var globalDebugEnabled = false;
function enableGlobalDebug() {
  globalDebugEnabled = true;
}
function disableGlobalDebug() {
  globalDebugEnabled = false;
}
function isGlobalDebugEnabled() {
  return globalDebugEnabled;
}
function createDebugger(enabled, prefix) {
  return new QueryDebugger(enabled != null ? enabled : globalDebugEnabled, prefix);
}

// src/utils/crypto.ts
var import_react_native_crypto_js = __toESM(require("react-native-crypto-js"));
var DEFAULT_CONFIG2 = {
  key: "2vn!H3KXgX-TxvkD",
  // Default for development
  iv: "%x%97Uw@*A2xWaUJ"
  // Default for development
};
var currentConfig2 = { ...DEFAULT_CONFIG2 };
var hasWarnedAboutDefaultKeys = false;
function setEncryptionConfig(config2) {
  if (config2.key !== void 0 || config2.iv !== void 0) {
    currentConfig2 = { ...currentConfig2, ...config2 };
    hasWarnedAboutDefaultKeys = false;
  }
}
function getEncryptionConfig() {
  return { ...currentConfig2 };
}
function isValidEncryptionConfig(config2) {
  if (!config2.key || !config2.iv) {
    console.error("[rn-alpha-hooks] Encryption config must have both key and iv");
    return false;
  }
  if (config2.key.length !== 16) {
    console.error("[rn-alpha-hooks] Encryption key must be exactly 16 characters for AES-128");
    return false;
  }
  if (config2.iv.length !== 16) {
    console.error("[rn-alpha-hooks] IV (Initialization Vector) must be exactly 16 characters");
    return false;
  }
  return true;
}
function generateEncryptionConfig() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  const generateRandomString = (length) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  return {
    key: generateRandomString(16),
    iv: generateRandomString(16)
  };
}
function encrypt(payload, customKey, customIv) {
  const keyStr = customKey || currentConfig2.key;
  const ivStr = customIv || currentConfig2.iv;
  if (typeof __DEV__ !== "undefined" && __DEV__ && keyStr === DEFAULT_CONFIG2.key && !hasWarnedAboutDefaultKeys) {
    console.warn(
      "[rn-alpha-hooks] \u26A0\uFE0F Using default encryption keys! Set custom keys via AlphaProvider config.encryption or setEncryptionConfig() for production."
    );
    hasWarnedAboutDefaultKeys = true;
  }
  const key = import_react_native_crypto_js.default.enc.Utf8.parse(keyStr);
  const iv = import_react_native_crypto_js.default.enc.Utf8.parse(ivStr);
  return import_react_native_crypto_js.default.AES.encrypt(payload, key, {
    iv,
    mode: import_react_native_crypto_js.default.mode.CBC,
    padding: import_react_native_crypto_js.default.pad.Pkcs7
  }).toString();
}
function decrypt(response, customKey, customIv) {
  const keyStr = customKey || currentConfig2.key;
  const ivStr = customIv || currentConfig2.iv;
  const key = import_react_native_crypto_js.default.enc.Utf8.parse(keyStr);
  const iv = import_react_native_crypto_js.default.enc.Utf8.parse(ivStr);
  const decrypted_response = import_react_native_crypto_js.default.AES.decrypt(
    { ciphertext: import_react_native_crypto_js.default.enc.Base64.parse(response) },
    key,
    { iv }
  );
  return decrypted_response.toString(import_react_native_crypto_js.default.enc.Utf8);
}

// src/store/contexts/config-context.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var ConfigContext = (0, import_react4.createContext)(void 0);
var ConfigProvider = ({ config: initialConfig, children }) => {
  var _a;
  const [internalConfig, setInternalConfig] = (0, import_react4.useState)(() => ({
    ...DEFAULT_CONFIG,
    ...initialConfig,
    cache: {
      ...DEFAULT_CONFIG.cache,
      ...initialConfig.cache
    },
    retry: {
      ...DEFAULT_CONFIG.retry,
      ...initialConfig.retry
    }
  }));
  (0, import_react4.useEffect)(() => {
    setInternalConfig((prev) => ({
      ...prev,
      ...initialConfig,
      cache: {
        ...prev.cache,
        ...initialConfig.cache
      },
      retry: {
        ...prev.retry,
        ...initialConfig.retry
      }
    }));
  }, [initialConfig]);
  const updateConfig = (0, import_react4.useCallback)((newConfig) => {
    setInternalConfig((prev) => {
      const updated = {
        ...prev,
        ...newConfig
      };
      if (newConfig.cache !== void 0) {
        updated.cache = {
          ...prev.cache,
          ...newConfig.cache
        };
      }
      if (newConfig.retry !== void 0) {
        updated.retry = {
          ...prev.retry,
          ...newConfig.retry
        };
      }
      if (newConfig.encryption !== void 0) {
        updated.encryption = newConfig.encryption;
      }
      if (newConfig.defaultEncryption !== void 0) {
        updated.defaultEncryption = newConfig.defaultEncryption;
      }
      return updated;
    });
  }, []);
  (0, import_react4.useEffect)(() => {
    var _a2;
    if ((_a2 = internalConfig.cache) == null ? void 0 : _a2.maxSize) {
      setMaxCacheSize(internalConfig.cache.maxSize);
    }
  }, [(_a = internalConfig.cache) == null ? void 0 : _a.maxSize]);
  (0, import_react4.useEffect)(() => {
    if (internalConfig.debug) {
      enableGlobalDebug();
    } else {
      disableGlobalDebug();
    }
  }, [internalConfig.debug]);
  (0, import_react4.useEffect)(() => {
    setHttpConfig(internalConfig);
  }, [internalConfig]);
  (0, import_react4.useEffect)(() => {
    if (internalConfig.encryption) {
      setEncryptionConfig(internalConfig.encryption);
    }
  }, [internalConfig.encryption]);
  const value = (0, import_react4.useMemo)(
    () => ({ config: internalConfig, updateConfig }),
    [internalConfig, updateConfig]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ConfigContext.Provider, { value, children });
};
function useAlphaConfig() {
  const context = (0, import_react4.useContext)(ConfigContext);
  if (!context) {
    const noopSetter = () => {
      console.warn("[rn-alpha-hooks] useAlphaConfig: Cannot update config outside AlphaProvider");
    };
    return [DEFAULT_CONFIG, noopSetter];
  }
  return [context.config, context.updateConfig];
}
var config_context_default = ConfigProvider;

// src/hooks/utils/encryption-helpers.ts
function resolveEncryptionOptions(hookOption, globalDefault) {
  if (hookOption !== void 0) {
    if (hookOption === false) return null;
    if (hookOption === true) return { enabled: true, request: "full", response: "full" };
    return { enabled: true, ...hookOption };
  }
  if (globalDefault !== void 0) {
    if (globalDefault === false) return null;
    if (globalDefault === true) return { enabled: true, request: "full", response: "full" };
    return { enabled: true, ...globalDefault };
  }
  return null;
}
function applyRequestEncryption(data, options) {
  if (!options.enabled || !options.request) {
    return data;
  }
  const config2 = getEncryptionConfig();
  if (!isValidEncryptionConfig(config2)) {
    throw new Error(
      "Encryption is enabled but encryption keys are not configured. Please set encryption keys via AlphaConfig or setEncryptionConfig()."
    );
  }
  try {
    if (options.request === "full") {
      const jsonString = JSON.stringify(data);
      const encrypted = encrypt(jsonString, config2.key, config2.iv);
      return Object.keys(data).length > 0 ? encrypted : null;
    }
    if (Array.isArray(options.request)) {
      const result = { ...data };
      for (const key of options.request) {
        if (key in data) {
          const value = data[key];
          const valueString = typeof value === "string" ? value : JSON.stringify(value);
          result[key] = encrypt(valueString, config2.key, config2.iv);
        }
      }
      return result;
    }
    return data;
  } catch (error) {
    throw new Error(`Request encryption failed: ${error.message}`);
  }
}
function applyResponseDecryption(data, options) {
  if (!options.enabled || !options.response) {
    return data;
  }
  const config2 = getEncryptionConfig();
  if (!isValidEncryptionConfig(config2)) {
    throw new Error(
      "Decryption is enabled but encryption keys are not configured. Please set encryption keys via AlphaConfig or setEncryptionConfig()."
    );
  }
  try {
    if (options.response === "full") {
      if (typeof data === "string") {
        const decrypted = decrypt(data, config2.key, config2.iv);
        try {
          return JSON.parse(decrypted);
        } catch {
          return decrypted;
        }
      }
      if (data && typeof data === "object" && "encrypted" in data) {
        const decrypted = decrypt(data.encrypted, config2.key, config2.iv);
        try {
          return JSON.parse(decrypted);
        } catch {
          return decrypted;
        }
      }
      return data;
    }
    if (Array.isArray(options.response) && data && typeof data === "object") {
      const result = { ...data };
      for (const key of options.response) {
        if (key in data && typeof data[key] === "string") {
          try {
            const decrypted = decrypt(data[key], config2.key, config2.iv);
            try {
              result[key] = JSON.parse(decrypted);
            } catch {
              result[key] = decrypted;
            }
          } catch (error) {
            console.warn(`Failed to decrypt key '${key}':`, error.message);
          }
        }
      }
      return result;
    }
    return data;
  } catch (error) {
    throw new Error(`Response decryption failed: ${error.message}`);
  }
}

// src/hooks/use-query.tsx
var useQuery = (route, args) => {
  const { variables = {}, networkPolicy, init, onCompleted, onError, encrypted, dataPath } = args || {};
  const app = useApp();
  const { auth } = app;
  const cache = use_cache_default();
  const { key, path, method } = cache.getContext(route, variables);
  const policy = networkPolicy || "cache-first";
  const [config2] = useAlphaConfig();
  const encryptionOptions = resolveEncryptionOptions(encrypted, config2.defaultEncryption);
  const resolvedDataPath = dataPath !== void 0 ? dataPath : config2.dataPath;
  const data = use_selector_default((state) => state.cache[key]);
  const thread = use_selector_default((state) => state.thread[key]);
  const dispatch = use_dispatch_default();
  const { connected } = useSocket();
  const timeoutRef = (0, import_react5.useRef)(null);
  const abortControllerRef = (0, import_react5.useRef)(null);
  (0, import_react5.useEffect)(() => {
    if ((data == null ? void 0 : data.data) && onCompleted) {
      onCompleted(data == null ? void 0 : data.data);
    }
    if (connected && (thread == null ? void 0 : thread.error) && (!data || Array.isArray(data) && data.length < 1)) {
      refetch({});
    }
  }, [data, connected, thread == null ? void 0 : thread.error]);
  (0, import_react5.useEffect)(() => {
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
  (0, import_react5.useEffect)(() => {
    if (init && init.timestamp > ((data == null ? void 0 : data.timestamp) || 0)) {
      dispatch(actions2.init({ key, value: init }));
    }
  }, [init == null ? void 0 : init.timestamp, key, dispatch, data == null ? void 0 : data.timestamp]);
  const setThread = (0, import_react5.useCallback)(
    (loading, error, status) => {
      dispatch(
        actions3.set({
          key,
          value: {
            loading,
            error,
            status
          }
        })
      );
    },
    [dispatch, key]
  );
  const fetchData = (0, import_react5.useCallback)(
    (fetchVariables) => {
      switch (policy) {
        case "cache-only":
          return;
        case "network-only":
          fetchHandler(fetchVariables, true).catch(() => {
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
        case "stale-while-revalidate":
          if (data && !isCacheExpired(data)) {
            if (isCacheStale(data)) {
              fetchHandler(fetchVariables).catch(() => {
              });
            }
          } else {
            fetchHandler(fetchVariables).catch(() => {
            });
          }
          return;
      }
    },
    [policy, data, thread]
  );
  const fetchHandler = (0, import_react5.useCallback)(
    async (fetchVariables, isRefetch = false) => {
      try {
        if (!(thread == null ? void 0 : thread.loading) || (thread == null ? void 0 : thread.error) || isRefetch) {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
          abortControllerRef.current = new AbortController();
          setThread(true);
          const requestData = encryptionOptions ? applyRequestEncryption(fetchVariables, encryptionOptions) : fetchVariables;
          const res = await getOrCreateRequest(
            key,
            () => service_default(
              path,
              method || "GET",
              requestData,
              {
                returnStatus: true,
                auth: auth.accessToken,
                signal: abortControllerRef.current.signal
              }
            )
          );
          const error = !isSuccessStatus(res.status) ? extractErrorMessage(res) : void 0;
          setThread(false, error, res.status);
          if (isSuccessStatus(res.status)) {
            let responseData = res.data;
            if (encryptionOptions && responseData) {
              responseData = applyResponseDecryption(responseData, encryptionOptions);
            }
            responseData = extractResponseData(responseData, resolvedDataPath);
            if (responseData) {
              if (onCompleted) {
                onCompleted(responseData);
              }
              cache.setCache(key, responseData);
            }
          } else if (isAuthError(res.status)) {
            app.clearAuth();
          } else if (error && onError) {
            onError(error, res.status);
          }
        }
      } catch (e) {
        if (isAbortError2(e)) {
          return;
        }
        const error = e.message || "Oops! an error occurred";
        setThread(false, error, 500);
        if (onError) {
          onError(error, 500);
        }
      }
    },
    [thread, setThread, path, method, auth.accessToken, onCompleted, onError, cache, key, app, encryptionOptions, resolvedDataPath]
  );
  const refetch = (0, import_react5.useCallback)(
    (refetchVariables) => {
      fetchHandler({ ...variables, ...refetchVariables || {} }, true).catch(() => {
      });
    },
    [fetchHandler, variables]
  );
  const fetchMore = (0, import_react5.useCallback)(
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
            dispatch(actions2.prepend({ key, value: res.data.data }));
          } else if (concat === "end") {
            dispatch(actions2.append({ key, value: res.data.data }));
          } else if (concat === "pagination") {
            dispatch(
              actions2.paginate({
                key,
                data: res.data.data,
                paginationKey: paginationKey || "data"
              })
            );
          }
          return { data: res.data.data };
        } else if (isAuthError(res.status)) {
          app.clearAuth();
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
    [path, method, variables, auth == null ? void 0 : auth.accessToken, dispatch, key, app]
  );
  const abort = (0, import_react5.useCallback)(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    cancelRequest(key);
  }, [key]);
  const optimisticUpdate = (0, import_react5.useCallback)(
    (updater, rollback) => {
      const currentData = data;
      const newData = updater(currentData);
      cache.update(key, newData);
      return () => {
        if (rollback) {
          rollback();
        } else {
          cache.update(key, currentData);
        }
      };
    },
    [data, key, cache]
  );
  const extendCache = (0, import_react5.useMemo)(
    () => ({
      update: (newData) => {
        cache.update(key, newData);
      },
      updateValue: (arg, value) => {
        cache.updateValue(key, arg, value);
      },
      updateValues: (values) => {
        cache.updateValues(key, values);
      },
      updateItem: (id, value) => {
        cache.updateItem(key, id, value);
      },
      deleteItem: (id) => {
        cache.deleteItem(key, id);
      },
      prepend: (newData) => {
        cache.prepend(key, newData);
      },
      append: (newData) => {
        cache.append(key, newData);
      }
    }),
    [key, cache]
  );
  return {
    data: (data == null ? void 0 : data.data) || init,
    loading: (thread == null ? void 0 : thread.loading) || false,
    error: thread == null ? void 0 : thread.error,
    status: thread == null ? void 0 : thread.status,
    refetch,
    key,
    fetchMore,
    abort,
    optimisticUpdate,
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
  const [config2] = useAlphaConfig();
  return async (route, variables = {}, options) => {
    const { key, method, path } = getContext(route, variables);
    const opts = typeof options === "string" ? { authToken: options } : options || {};
    const encryptionOptions = resolveEncryptionOptions(opts.encrypted, config2.defaultEncryption);
    const resolvedDataPath = opts.dataPath !== void 0 ? opts.dataPath : config2.dataPath;
    try {
      dispatch(
        actions3.set({
          key,
          value: {
            loading: true,
            error: void 0
          }
        })
      );
      const requestData = encryptionOptions ? applyRequestEncryption(variables, encryptionOptions) : variables;
      const res = await service_default(
        path,
        method || "GET",
        requestData,
        {
          returnStatus: true,
          auth: opts.authToken || auth.accessToken,
          signal: opts.signal
        }
      );
      const error = !isSuccessStatus(res.status) ? extractErrorMessage(res) : void 0;
      dispatch(
        actions3.set({
          key,
          value: {
            loading: false,
            error
          }
        })
      );
      if (isSuccessStatus(res.status)) {
        let responseData = res.data;
        if (encryptionOptions && responseData) {
          responseData = applyResponseDecryption(responseData, encryptionOptions);
        }
        responseData = extractResponseData(responseData, resolvedDataPath);
        dispatch(actions2.set({ key, value: responseData }));
        return createSuccessResponse(responseData, res.status);
      } else if (isAuthError(res.status)) {
        app.clearAuth();
        return createErrorResponse(error || "Unauthorized", res.status);
      }
      return createErrorResponse(error || "Request failed", res.status);
    } catch (e) {
      if (isAbortError2(e)) {
        dispatch(
          actions3.set({
            key,
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
          key,
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
var import_react6 = require("react");
var import_react_native = require("react-native");
var useMutation = (route, option) => {
  const [loading, setLoading] = (0, import_react6.useState)(false);
  const [error, setError] = (0, import_react6.useState)(void 0);
  const [data, setData] = (0, import_react6.useState)(void 0);
  const [status, setStatus] = (0, import_react6.useState)(void 0);
  const app = useApp();
  const { auth } = app;
  const { getContext } = use_cache_default();
  const [config2] = useAlphaConfig();
  const encryptionOptions = resolveEncryptionOptions(option == null ? void 0 : option.encrypted, config2.defaultEncryption);
  const resolvedDataPath = (option == null ? void 0 : option.dataPath) !== void 0 ? option.dataPath : config2.dataPath;
  const abortControllerRef = (0, import_react6.useRef)(null);
  (0, import_react6.useEffect)(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  const mutate = (0, import_react6.useCallback)(
    async (variables) => {
      try {
        if ((option == null ? void 0 : option.keyboard) === void 0 || (option == null ? void 0 : option.keyboard)) {
          import_react_native.Keyboard.dismiss();
        }
        const { path, method, rawPath } = getContext(route, variables);
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        setLoading(true);
        setError(void 0);
        setStatus(void 0);
        const requestData = encryptionOptions ? applyRequestEncryption(variables, encryptionOptions) : variables;
        const res = await service_default(
          path,
          method || "POST",
          requestData,
          {
            returnStatus: true,
            auth: auth == null ? void 0 : auth.accessToken,
            returnText: option == null ? void 0 : option.text,
            signal: abortControllerRef.current.signal
          }
        );
        if (isSuccessStatus(res.status)) {
          let responseData = res.data;
          if (encryptionOptions && responseData) {
            responseData = applyResponseDecryption(responseData, encryptionOptions);
          }
          responseData = extractResponseData(responseData, resolvedDataPath);
          setData(responseData);
          setStatus(res.status);
          setLoading(false);
          return createSuccessResponse(responseData, res.status);
        }
        let errorMessage = extractErrorMessage(res);
        if (rawPath.includes(":customerId") && isAuthError(res.status)) {
          errorMessage = ERROR_MESSAGES.SESSION_EXPIRED;
          app.clearAuth();
        }
        setError(errorMessage);
        setStatus(res.status);
        setLoading(false);
        return createErrorResponse(errorMessage, res.status);
      } catch (e) {
        if (isAbortError2(e)) {
          setLoading(false);
          setStatus(0);
          return createErrorResponse("Request cancelled", 0);
        }
        setLoading(false);
        const errorMessage = e.message || ERROR_MESSAGES.GENERIC;
        setError(errorMessage);
        setStatus(500);
        return createErrorResponse(errorMessage, 500);
      }
    },
    [route, option, auth, app, getContext, encryptionOptions, resolvedDataPath]
  );
  const cancel = (0, import_react6.useCallback)(() => {
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
      status,
      cancel
    }
  ];
};
var use_mutation_default = useMutation;

// src/hooks/use-mutation-async.tsx
var import_react7 = require("react");
var import_react_native2 = require("react-native");
var useMutationAsync = (route, option) => {
  const [loading, setLoading] = (0, import_react7.useState)(false);
  const [error, setError] = (0, import_react7.useState)(void 0);
  const [data, setData] = (0, import_react7.useState)(void 0);
  const [status, setStatus] = (0, import_react7.useState)(void 0);
  const app = useApp();
  const { auth } = app;
  const [config2] = useAlphaConfig();
  const encryptionOptions = resolveEncryptionOptions(option == null ? void 0 : option.encrypted, config2.defaultEncryption);
  const resolvedDataPath = (option == null ? void 0 : option.dataPath) !== void 0 ? option.dataPath : config2.dataPath;
  const abortControllerRef = (0, import_react7.useRef)(null);
  (0, import_react7.useEffect)(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);
  const mutate = (0, import_react7.useCallback)(
    async (variables) => {
      try {
        if ((option == null ? void 0 : option.keyboard) === void 0 || (option == null ? void 0 : option.keyboard)) {
          import_react_native2.Keyboard.dismiss();
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
        setStatus(void 0);
        const requestData = encryptionOptions ? applyRequestEncryption(variablesCopy, encryptionOptions) : variablesCopy;
        const res = await service_default(
          path,
          method || "POST",
          requestData,
          {
            returnStatus: true,
            auth: auth.accessToken,
            signal: abortControllerRef.current.signal
          }
        );
        if (isSuccessStatus(res.status)) {
          let responseData = extractResponseData(res.data, resolvedDataPath);
          if (encryptionOptions && responseData) {
            responseData = applyResponseDecryption(responseData, encryptionOptions);
          }
          setData(responseData);
          setStatus(res.status);
          setLoading(false);
          return createSuccessResponse(responseData, res.status);
        }
        if (isAuthError(res.status)) {
          app.clearAuth();
        }
        const errorMessage = extractErrorMessage(res);
        setError(errorMessage);
        setStatus(res.status);
        setLoading(false);
        return createErrorResponse(errorMessage, res.status);
      } catch (e) {
        if (isAbortError2(e)) {
          setLoading(false);
          setStatus(0);
          return createErrorResponse("Request cancelled", 0);
        }
        setLoading(false);
        const errorMessage = e.message || ERROR_MESSAGES.GENERIC;
        setError(errorMessage);
        setStatus(500);
        return createErrorResponse(errorMessage, 500);
      }
    },
    [route, option, auth, app, encryptionOptions, resolvedDataPath]
  );
  const cancel = (0, import_react7.useCallback)(() => {
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
      status,
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
var shouldRetry2 = (error) => {
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
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (value !== null && value !== void 0) {
        formData.append(key, value);
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

// src/hooks/utils/retry-manager.ts
async function retryWithBackoff(fn, options) {
  const { retries, delay, condition, maxDelay = 3e4 } = options;
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (condition && !condition(error)) {
        throw error;
      }
      if (!shouldRetry(error)) {
        throw error;
      }
      if (attempt === retries) {
        throw error;
      }
      const waitTime = calculateDelay(delay, attempt, maxDelay);
      await sleep(waitTime);
    }
  }
  throw lastError;
}
function calculateDelay(delay, attempt, maxDelay) {
  if (delay === "exponential") {
    return Math.min(1e3 * Math.pow(2, attempt), maxDelay);
  }
  return delay;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function retryWithJitter(fn, options) {
  const { jitter = 0.1, ...retryOptions } = options;
  return retryWithBackoff(fn, {
    ...retryOptions,
    delay: typeof retryOptions.delay === "number" ? addJitter(retryOptions.delay, jitter) : retryOptions.delay
  });
}
function addJitter(delay, jitterFactor) {
  const jitter = delay * jitterFactor * Math.random();
  return delay + jitter;
}

// src/hooks/utils/offline-queue.ts
var import_react_native_uuid = __toESM(require("react-native-uuid"));
var storage2;
try {
  storage2 = (init_storage(), __toCommonJS(storage_exports)).default;
} catch (e) {
  storage2 = {
    set: () => {
    },
    getString: () => void 0
  };
}
var STORAGE_KEY = "offline_mutation_queue";
var DEFAULT_MAX_RETRIES = 3;
var OfflineQueue = class {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.loadFromStorage();
  }
  /**
   * Adds a mutation to the queue
   */
  async enqueue(mutation) {
    const item = {
      ...mutation,
      id: import_react_native_uuid.default.v4(),
      timestamp: Date.now(),
      retries: 0,
      maxRetries: DEFAULT_MAX_RETRIES
    };
    this.queue.push(item);
    await this.persist();
    return item.id;
  }
  /**
   * Processes the queue
   */
  async processQueue(onProcess) {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }
    this.isProcessing = true;
    while (this.queue.length > 0) {
      const item = this.queue[0];
      try {
        await onProcess(item);
        this.queue.shift();
        await this.persist();
      } catch (error) {
        item.retries++;
        if (item.retries >= item.maxRetries) {
          console.warn(`[OfflineQueue] Giving up on mutation ${item.id} after ${item.retries} retries`);
          this.queue.shift();
          await this.persist();
        } else {
          break;
        }
      }
    }
    this.isProcessing = false;
  }
  /**
   * Gets the current queue
   */
  getQueue() {
    return [...this.queue];
  }
  /**
   * Gets the queue size
   */
  size() {
    return this.queue.length;
  }
  /**
   * Clears the entire queue
   */
  async clear() {
    this.queue = [];
    await this.persist();
  }
  /**
   * Removes a specific mutation from the queue
   */
  async remove(id) {
    const index = this.queue.findIndex((item) => item.id === id);
    if (index > -1) {
      this.queue.splice(index, 1);
      await this.persist();
      return true;
    }
    return false;
  }
  /**
   * Persists queue to storage
   */
  async persist() {
    try {
      storage2.set(STORAGE_KEY, JSON.stringify(this.queue));
    } catch (error) {
      console.error("[OfflineQueue] Failed to persist queue:", error);
    }
  }
  /**
   * Loads queue from storage
   */
  loadFromStorage() {
    try {
      const stored = storage2.getString(STORAGE_KEY);
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch (error) {
      console.error("[OfflineQueue] Failed to load queue:", error);
      this.queue = [];
    }
  }
};
var queueInstance = null;
function getOfflineQueue() {
  if (!queueInstance) {
    queueInstance = new OfflineQueue();
  }
  return queueInstance;
}

// src/hooks/utils/refetch-manager.ts
var import_react8 = require("react");
var import_react_native3 = require("react-native");
function useRefetchOnFocus(enabled, refetch) {
  const appState = (0, import_react8.useRef)(import_react_native3.AppState.currentState);
  (0, import_react8.useEffect)(() => {
    if (!enabled) return;
    const subscription = import_react_native3.AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        refetch();
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, [enabled, refetch]);
}
function useRefetchOnReconnect(enabled, refetch) {
  const { connected } = useSocket();
  const prevConnected = (0, import_react8.useRef)(connected);
  (0, import_react8.useEffect)(() => {
    if (enabled && connected && !prevConnected.current) {
      refetch();
    }
    prevConnected.current = connected;
  }, [connected, enabled, refetch]);
}
function useRefetchInterval(enabled, refetch, interval) {
  (0, import_react8.useEffect)(() => {
    if (!enabled || interval <= 0) return;
    const timer = setInterval(() => {
      refetch();
    }, interval);
    return () => {
      clearInterval(timer);
    };
  }, [enabled, refetch, interval]);
}

// src/store/contexts/alpha-provider.tsx
var import_react9 = require("react");
var import_react_redux3 = require("react-redux");

// src/store/create-store.ts
var import_toolkit4 = require("@reduxjs/toolkit");
init_storage();
var saveToLocalStorage = (state, key) => {
  try {
    storage_default.setItem(key, state);
  } catch (e) {
    console.error("[AlphaStore] Failed to save state:", e);
  }
};
var loadFromLocalStorage = (key) => {
  try {
    const serializedState = storage_default.getItem(key);
    if (serializedState === null) return void 0;
    return serializedState;
  } catch (e) {
    console.warn("[AlphaStore] Failed to load state:", e);
    return void 0;
  }
};
function createAlphaStore(customReducers, options = {}) {
  const {
    persist = true,
    storageKey = "_alpha_state"
  } = options;
  const rootReducer = (0, import_toolkit4.combineReducers)({
    // Core reducers (always included)
    cache: cache_reducer_default,
    thread: thread_reducer_default,
    app: app_reducer_default,
    // Custom app reducers
    ...customReducers
  });
  const preloadedState = persist ? loadFromLocalStorage(storageKey) : void 0;
  const store = (0, import_toolkit4.configureStore)({
    reducer: rootReducer,
    // Type assertion needed for dynamic reducer combination
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
      // Allow non-serializable values
    })
  });
  if (persist) {
    store.subscribe(() => {
      saveToLocalStorage(store.getState(), storageKey);
    });
  }
  return store;
}
var defaultStore = createAlphaStore();

// src/store/contexts/alpha-provider.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var AlphaProvider = ({
  children,
  config: config2,
  customReducers,
  store: customStore,
  storeOptions
}) => {
  const store = (0, import_react9.useMemo)(() => {
    if (customStore) return customStore;
    if (customReducers) return createAlphaStore(customReducers, storeOptions);
    return defaultStore;
  }, [customStore, customReducers, storeOptions]);
  (0, import_react9.useEffect)(() => {
    var _a;
    setHttpConfig(config2);
    if ((_a = config2.cache) == null ? void 0 : _a.maxSize) {
      setMaxCacheSize(config2.cache.maxSize);
    }
    if (config2.encryption) {
      setEncryptionConfig(config2.encryption);
    }
  }, [config2]);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_react_redux3.Provider, { store, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(config_context_default, { config: config2, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(app_context_default, { children }) }) });
};

// src/store/type-helpers.ts
var import_react_redux4 = require("react-redux");
var import_toolkit5 = require("@reduxjs/toolkit");
function createTypedSelector() {
  return import_react_redux4.useSelector;
}
function createTypedDispatch() {
  return import_react_redux4.useDispatch;
}
function createSelector(selector) {
  return selector;
}
var useAppSelector = import_react_redux4.useSelector;
var useAppDispatch = () => (0, import_react_redux4.useDispatch)();

// src/utils/money.ts
function formatMoney(num, decimal) {
  if (num || num === 0) {
    return num.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return "-.--";
}
var money_default = formatMoney;

// src/index.ts
init_storage();

// src/utils/getMime.ts
function getMime(ext) {
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    bmp: "image/bmp",
    tiff: "image/tiff",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    txt: "text/plain",
    csv: "text/csv",
    xml: "application/xml",
    html: "text/html",
    json: "application/json",
    mp4: "video/mp4",
    avi: "video/x-msvideo",
    mov: "video/quicktime",
    mkv: "video/x-matroska",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
    flac: "audio/flac",
    aac: "audio/aac",
    m4a: "audio/mp4",
    zip: "application/zip",
    rar: "application/vnd.rar"
  };
  return mimeTypes[ext.toLowerCase()] || "application/octet-stream";
}

// src/utils/capitalize.ts
function capitalize(string) {
  return string.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
}

// src/utils/toast.ts
var import_react_native_simple_toast = __toESM(require("react-native-simple-toast"));
var Toast = (message, duration) => {
  setTimeout(() => {
    import_react_native_simple_toast.default.show(message, import_react_native_simple_toast.default[duration || "LONG"]);
  }, 100);
};
var toast_default = Toast;

// src/utils/readFile.ts
var import_react_native_blob_util = __toESM(require("react-native-blob-util"));
var readFile = async (path) => {
  try {
    return await import_react_native_blob_util.default.fs.readFile(path.replace("file://", ""), "base64");
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};
var readFile_default = readFile;

// src/index.ts
import_dayjs.default.extend(import_relativeTime.default);
import_dayjs.default.extend(import_utc.default);
import_dayjs.default.extend(import_timezone.default);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlphaProvider,
  AppProvider,
  DEFAULT_CACHE_TTL,
  DEFAULT_CONFIG,
  DEFAULT_STALE_TIME,
  ERROR_MESSAGES,
  MAX_CACHE_SIZE,
  NETWORK_TIMEOUT,
  OfflineQueue,
  PATHS,
  QueryDebugger,
  STATUS_CODES,
  Toast,
  alphaConfig,
  appActions,
  canUseCache,
  cancelRequest,
  capitalize,
  clearAllRequests,
  combineAbortSignals,
  createAbortController,
  createAlphaStore,
  createCacheEntry,
  createDebugger,
  createErrorResponse,
  createSelector,
  createSlice,
  createSuccessResponse,
  createTimeoutController,
  createTypedDispatch,
  createTypedSelector,
  dayjs,
  decrypt,
  defaultStore,
  disableGlobalDebug,
  enableGlobalDebug,
  encrypt,
  extractErrorMessage,
  extractResponseData,
  formatFormData,
  formatMoney,
  formatUrlEncoded,
  generateEncryptionConfig,
  getCacheAge,
  getCacheData,
  getCacheMetadata,
  getEncryptionConfig,
  getHttpConfig,
  getInFlightCount,
  getMime,
  getOfflineQueue,
  getOrCreateRequest,
  http,
  isAbortError,
  isAuthError,
  isCacheExpired,
  isCacheFresh,
  isCacheStale,
  isCancelError,
  isGlobalDebugEnabled,
  isHttpAbortError,
  isRequestInFlight,
  isSuccessStatus,
  isValidEncryptionConfig,
  naira,
  readFile,
  retryWithBackoff,
  retryWithJitter,
  safeAbort,
  setEncryptionConfig,
  setHttpConfig,
  setMaxCacheSize,
  shouldRetry,
  storage,
  store,
  useAlphaConfig,
  useApp,
  useAppDispatch,
  useAppSelector,
  useCache,
  useDispatch,
  useMutation,
  useMutationAsync,
  useQuery,
  useQueryAsync,
  useRefetchInterval,
  useRefetchOnFocus,
  useRefetchOnReconnect,
  useSelector
});
//# sourceMappingURL=index.js.map