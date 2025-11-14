var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/utils/storage.ts
var storage_exports = {};
__export(storage_exports, {
  default: () => storage_default
});
import { MMKV } from "react-native-mmkv";
var storage, Storage, storage_default;
var init_storage = __esm({
  "src/utils/storage.ts"() {
    storage = new MMKV();
    Storage = class {
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
    storage_default = new Storage();
  }
});

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
  const instance = axios.create({
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
var metadata = {
  accessOrder: [],
  maxSize: 100
  // Default LRU limit
};
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
      const timestamp = Date.now();
      const { key: key2, value, ttl, staleTime } = action.payload;
      updateAccessOrder(state, key2);
      const entry = {
        data: value,
        timestamp,
        expiresAt: ttl ? timestamp + ttl : void 0,
        staleAt: staleTime !== void 0 ? timestamp + staleTime : void 0
      };
      state[key2] = entry;
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
    clear: () => initialState,
    // New action to delete a specific cache entry
    delete(state, action) {
      const { key: key2 } = action.payload;
      delete state[key2];
      const index = metadata.accessOrder.indexOf(key2);
      if (index > -1) {
        metadata.accessOrder.splice(index, 1);
      }
    }
  }
});
function updateAccessOrder(state, key2) {
  const index = metadata.accessOrder.indexOf(key2);
  if (index > -1) {
    metadata.accessOrder.splice(index, 1);
  }
  metadata.accessOrder.push(key2);
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
  const key2 = path + JSON.stringify(variablesCopy);
  return {
    path,
    method: method || "GET",
    key: key2,
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
        const index = cache.findIndex((item) => getItemId(item) === id);
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
        return cache.find((item) => getItemId(item) === id);
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
        const dataId = getItemId(data);
        const index = cache.findIndex((item) => getItemId(item) === dataId);
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
        setCache(key2, cache.filter((item) => getItemId(item) !== id));
      }
    },
    [cacheState, setCache]
  );
  const invalidate = useCallback(
    (key2) => {
      dispatch(actions.delete({ key: key2 }));
    },
    [dispatch]
  );
  const invalidateQueries = useCallback(
    (pattern) => {
      const regex = typeof pattern === "string" ? new RegExp(`^${pattern}`) : pattern;
      const keysToInvalidate = Object.keys(cacheState).filter(
        (k) => regex.test(k)
      );
      keysToInvalidate.forEach((key2) => {
        dispatch(actions.delete({ key: key2 }));
      });
    },
    [cacheState, dispatch]
  );
  const invalidateAll = useCallback(() => {
    dispatch(actions.clear());
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
function getOrCreateRequest(key2, requestFn) {
  if (inFlightRequests.has(key2)) {
    return inFlightRequests.get(key2);
  }
  const promise = requestFn().finally(() => {
    inFlightRequests.delete(key2);
  });
  inFlightRequests.set(key2, promise);
  return promise;
}
function cancelRequest(key2) {
  inFlightRequests.delete(key2);
}
function isRequestInFlight(key2) {
  return inFlightRequests.has(key2);
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
  const fetchHandler = useCallback2(
    async (fetchVariables, isRefetch = false) => {
      try {
        if (!(thread == null ? void 0 : thread.loading) || (thread == null ? void 0 : thread.error) || isRefetch) {
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }
          abortControllerRef.current = new AbortController();
          setThread(true);
          const res = await getOrCreateRequest(
            key2,
            () => service_default(
              path,
              method || "GET",
              fetchVariables,
              {
                returnStatus: true,
                auth: auth.accessToken,
                signal: abortControllerRef.current.signal
              }
            )
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
    cancelRequest(key2);
  }, [key2]);
  const optimisticUpdate = useCallback2(
    (updater, rollback) => {
      const currentData = data;
      const newData = updater(currentData);
      cache.update(key2, newData);
      return () => {
        if (rollback) {
          rollback();
        } else {
          cache.update(key2, currentData);
        }
      };
    },
    [data, key2, cache]
  );
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

// src/hooks/utils/debug-logger.ts
var QueryDebugger = class {
  constructor(enabled, prefix = "[Query]") {
    this.enabled = enabled;
    this.prefix = prefix;
  }
  /**
   * Log a cache hit
   */
  logCacheHit(key2, data) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u{1F3AF} Cache HIT`, {
      key: key2,
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
  logCacheMiss(key2) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u274C Cache MISS`, {
      key: key2,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log the start of a fetch request
   */
  logFetchStart(key2, variables) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u{1F680} Fetching`, {
      key: key2,
      variables,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log a successful fetch
   */
  logFetchSuccess(key2, duration, data) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u2705 Success`, {
      key: key2,
      duration: duration ? `${duration.toFixed(2)}ms` : "N/A",
      dataSize: this.getDataSize(data),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log a fetch error
   */
  logFetchError(key2, error, duration) {
    if (!this.enabled) return;
    console.error(`${this.prefix} \u274C Error`, {
      key: key2,
      error: (error == null ? void 0 : error.message) || error,
      duration: duration ? `${duration.toFixed(2)}ms` : "N/A",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log cache invalidation
   */
  logInvalidate(key2) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u{1F504} Invalidating`, {
      pattern: key2.toString(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log network policy decision
   */
  logPolicy(key2, policy, decision) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u{1F4CB} Policy`, {
      key: key2,
      policy,
      decision,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log cache expiry check
   */
  logCacheExpiry(key2, isExpired, isStale) {
    if (!this.enabled) return;
    console.log(`${this.prefix} \u23F0 Cache Status`, {
      key: key2,
      expired: isExpired,
      stale: isStale,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  /**
   * Log request deduplication
   */
  logDeduplication(key2, isDuplicate) {
    if (!this.enabled) return;
    if (isDuplicate) {
      console.log(`${this.prefix} \u{1F517} Request Deduplicated`, {
        key: key2,
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
import uuid2 from "react-native-uuid";
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
      id: uuid2.v4(),
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
import { useEffect as useEffect6, useRef as useRef5 } from "react";
import { AppState as AppState2 } from "react-native";
function useRefetchOnFocus(enabled, refetch) {
  const appState = useRef5(AppState2.currentState);
  useEffect6(() => {
    if (!enabled) return;
    const subscription = AppState2.addEventListener("change", (nextAppState) => {
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
  const prevConnected = useRef5(connected);
  useEffect6(() => {
    if (enabled && connected && !prevConnected.current) {
      refetch();
    }
    prevConnected.current = connected;
  }, [connected, enabled, refetch]);
}
function useRefetchInterval(enabled, refetch, interval) {
  useEffect6(() => {
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
import { Provider } from "react-redux";

// src/store/index.ts
init_storage();
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

// src/store/contexts/config-context.tsx
import { createContext as createContext3, useContext as useContext3, useMemo as useMemo3, useEffect as useEffect7 } from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var ConfigContext = createContext3(void 0);
var ConfigProvider = ({ config: config2, children }) => {
  var _a;
  const mergedConfig = useMemo3(
    () => ({
      ...DEFAULT_CONFIG,
      ...config2,
      cache: {
        ...DEFAULT_CONFIG.cache,
        ...config2.cache
      },
      retry: {
        ...DEFAULT_CONFIG.retry,
        ...config2.retry
      }
    }),
    [config2]
  );
  useEffect7(() => {
    var _a2;
    if ((_a2 = mergedConfig.cache) == null ? void 0 : _a2.maxSize) {
      setMaxCacheSize(mergedConfig.cache.maxSize);
    }
  }, [(_a = mergedConfig.cache) == null ? void 0 : _a.maxSize]);
  useEffect7(() => {
    if (mergedConfig.debug) {
      enableGlobalDebug();
    } else {
      disableGlobalDebug();
    }
  }, [mergedConfig.debug]);
  useEffect7(() => {
    setHttpConfig(mergedConfig);
  }, [mergedConfig]);
  const value = useMemo3(() => ({ config: mergedConfig }), [mergedConfig]);
  return /* @__PURE__ */ jsx3(ConfigContext.Provider, { value, children });
};
function useAlphaConfig() {
  const context = useContext3(ConfigContext);
  if (!context) {
    return DEFAULT_CONFIG;
  }
  return context.config;
}
var config_context_default = ConfigProvider;

// src/store/contexts/alpha-provider.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var AlphaProvider = ({ children, config: config2 }) => {
  return /* @__PURE__ */ jsx4(Provider, { store, children: /* @__PURE__ */ jsx4(config_context_default, { config: config2, children: /* @__PURE__ */ jsx4(app_context_default, { children }) }) });
};

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
init_storage();
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
export {
  AlphaProvider,
  app_context_default as AppProvider,
  DEFAULT_CACHE_TTL,
  DEFAULT_CONFIG,
  DEFAULT_STALE_TIME,
  ERROR_MESSAGES,
  MAX_CACHE_SIZE,
  NETWORK_TIMEOUT,
  OfflineQueue,
  paths_default as PATHS,
  QueryDebugger,
  STATUS_CODES,
  config as alphaConfig,
  canUseCache,
  cancelRequest,
  clearAllRequests,
  combineAbortSignals,
  createAbortController,
  createCacheEntry,
  createDebugger,
  createErrorResponse,
  createSuccessResponse,
  createTimeoutController,
  dayjs,
  decrypt,
  disableGlobalDebug,
  enableGlobalDebug,
  encrypt,
  extractErrorMessage,
  formatFormData2 as formatFormData,
  money_default as formatMoney,
  formatUrlEncoded2 as formatUrlEncoded,
  getCacheAge,
  getCacheData,
  getCacheMetadata,
  getHttpConfig,
  getInFlightCount,
  getOfflineQueue,
  getOrCreateRequest,
  isAbortError3 as isAbortError,
  isAuthError,
  isCacheExpired,
  isCacheFresh,
  isCacheStale,
  isCancelError,
  isGlobalDebugEnabled,
  isAbortError as isHttpAbortError,
  isRequestInFlight,
  isSuccessStatus,
  naira,
  retryWithBackoff,
  retryWithJitter,
  safeAbort,
  setHttpConfig,
  setMaxCacheSize,
  shouldRetry2 as shouldRetry,
  storage_default as storage,
  store,
  useAlphaConfig,
  useApp,
  use_cache_default as useCache,
  use_dispatch_default as useDispatch,
  use_mutation_default as useMutation,
  use_mutation_async_default as useMutationAsync,
  use_query_default as useQuery,
  use_query_async_default as useQueryAsync,
  useRefetchInterval,
  useRefetchOnFocus,
  useRefetchOnReconnect,
  use_selector_default as useSelector
};
//# sourceMappingURL=index.mjs.map