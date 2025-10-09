var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/assets/images/icon.png
var require_icon = __commonJS({
  "src/assets/images/icon.png"(exports2, module2) {
    module2.exports = "./icon-NNTJ6R74.png";
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AlertModal: () => AlertModal_default,
  AppProvider: () => app_context_default,
  Button: () => Button_default,
  Checkbox: () => Checkbox_default,
  Colors: () => colors_default,
  DateSelect: () => DateSelect_default,
  DateTimeInput: () => DateTimeInput_default,
  ErrorText: () => ErrorText_default,
  FlatList: () => FlatList_default,
  Formik: () => import_formik.Formik,
  IconButton: () => IconBtn_default,
  Image: () => Image_default,
  ImageBackground: () => ImageBackground_default,
  Input: () => Input_default,
  KEY: () => KEY,
  KeyboardView: () => KeyboardView_default,
  Label: () => Label_default,
  Loader: () => Loader_default,
  Menu: () => Menu_default,
  Modal: () => Modal_default,
  OptionModal: () => OptionModal_default,
  PATHS: () => paths_default,
  Page: () => Page_default,
  Password: () => Password_default,
  Preloader: () => Preloader_default,
  ProgressBar: () => ProgressBar_default,
  SafeAreaView: () => SafeAreaView_default,
  ScrollView: () => ScrollView_default,
  SearchInput: () => SearchInput_default,
  Select: () => Select_default,
  Svg: () => Svg_default,
  Switch: () => Switch_default,
  Text: () => Text_default,
  TextInput: () => TextInput_default,
  TouchableHighlight: () => TouchableHighlight_default,
  TouchableNativeFeedback: () => TouchableNativeFeedback_default,
  TouchableOpacity: () => TouchableOpacity_default,
  View: () => View_default,
  Yup: () => Yup,
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
  useColor: () => use_color_default,
  useDispatch: () => use_dispatch_default,
  useMutation: () => use_mutation_default,
  useQuery: () => use_query_default,
  useQueryAsync: () => use_query_async_default,
  useSelector: () => use_selector_default,
  width: () => width
});
module.exports = __toCommonJS(index_exports);

// src/rn-alpha/index.ts
var Yup = __toESM(require("yup"));
var import_dayjs = __toESM(require("dayjs"));
var import_relativeTime = __toESM(require("dayjs/plugin/relativeTime"));
var import_utc = __toESM(require("dayjs/plugin/utc"));
var import_timezone = __toESM(require("dayjs/plugin/timezone"));

// src/rn-alpha/default/View.tsx
var import_react3 = __toESM(require("react"));
var import_react_native2 = require("react-native");

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

// src/rn-alpha/default/View.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var FLEX_DIRECTIONS = {
  "flex-center": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  "col-center": {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  "col-between": {
    flexDirection: "column",
    justifyContent: "space-between"
  },
  "col-evenly": {
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  "col-reverse": {
    flexDirection: "column-reverse"
  },
  "flex-row": {
    flexDirection: "row"
  },
  "flex-justify": {
    flexDirection: "row",
    justifyContent: "center"
  },
  "flex-item": {
    flexDirection: "row",
    alignItems: "center"
  },
  "flex-between": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  "flex-space": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  // New flex directions
  "flex-start": {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  "flex-end": {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  "flex-stretch": {
    flexDirection: "row",
    alignItems: "stretch"
  },
  "col-start": {
    flexDirection: "column",
    alignItems: "flex-start"
  },
  "col-end": {
    flexDirection: "column",
    alignItems: "flex-end"
  },
  "col-stretch": {
    flexDirection: "column",
    alignItems: "stretch"
  },
  "col-around": {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  "row-reverse": {
    flexDirection: "row-reverse"
  },
  "flex-wrap": {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  "col-wrap": {
    flexDirection: "column",
    flexWrap: "wrap"
  }
};
var ASPECT_RATIOS = {
  square: 1,
  video: 16 / 9,
  golden: 1.618,
  portrait: 3 / 4,
  landscape: 4 / 3
};
var View = import_react3.default.forwardRef((props, ref) => {
  const { colors } = use_color_default();
  const {
    style,
    color,
    align,
    fd,
    flex,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    width: width2,
    w,
    height: height2,
    h,
    br,
    bw,
    bbw,
    btw,
    blw,
    brw,
    bc,
    brc,
    blc,
    btc,
    bbc,
    btlr,
    btrr,
    bblr,
    bbrr,
    shadow,
    wrap,
    position,
    inset,
    insetX,
    insetY,
    top,
    right,
    bottom,
    left,
    overflow,
    size,
    opacity,
    zIndex,
    children,
    gap,
    scale,
    ty,
    tx,
    sx,
    sy,
    maxW,
    minW,
    minH,
    maxH,
    bs,
    // New props
    aspectRatio,
    aspect,
    fullWidth,
    fullHeight,
    screenWidth,
    screenHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    fixed,
    rounded,
    roundedSm,
    roundedLg,
    roundedXl,
    roundedFull,
    elevated,
    elevatedSm,
    elevatedLg,
    elevatedXl,
    hidden,
    visible,
    disabled,
    rotate,
    skewX,
    skewY,
    perspective,
    space,
    spaceX,
    spaceY,
    ...otherProps
  } = props;
  const computedStyle = (0, import_react3.useMemo)(() => {
    var _a, _b;
    const resolveColor = (colorValue) => {
      if (!colorValue) return void 0;
      return colors[colorValue] || colorValue;
    };
    let positionProps = { position, top, right, bottom, left };
    if (insetY !== void 0) {
      positionProps = { position: "absolute", top: insetY, bottom: insetY };
    }
    if (insetX !== void 0) {
      positionProps = { position: "absolute", right: insetX, left: insetX };
    }
    if (inset !== void 0) {
      positionProps = {
        position: "absolute",
        right: inset,
        left: inset,
        top: inset,
        bottom: inset
      };
    }
    let finalAspectRatio = aspectRatio;
    if (aspect && ASPECT_RATIOS[aspect]) {
      finalAspectRatio = ASPECT_RATIOS[aspect];
    }
    let finalWidth = (_a = size != null ? size : width2) != null ? _a : w;
    let finalHeight = (_b = size != null ? size : height2) != null ? _b : h;
    if (fullWidth) finalWidth = "100%";
    if (fullHeight) finalHeight = "100%";
    if (screenWidth) finalWidth = "100vw";
    if (screenHeight) finalHeight = "100vh";
    let finalBorderRadius = br;
    if (rounded) finalBorderRadius = 4;
    if (roundedSm) finalBorderRadius = 2;
    if (roundedLg) finalBorderRadius = 8;
    if (roundedXl) finalBorderRadius = 12;
    if (roundedFull) finalBorderRadius = 9999;
    let finalShadow = shadow;
    if (elevated) finalShadow = 2;
    if (elevatedSm) finalShadow = 1;
    if (elevatedLg) finalShadow = 4;
    if (elevatedXl) finalShadow = 8;
    let finalPosition = position;
    if (absolute) finalPosition = "absolute";
    if (relative) finalPosition = "relative";
    if (fixed) finalPosition = "absolute";
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: "center", justifyContent: "center" };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: "center" };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: "center" };
    }
    let finalPadding = padding != null ? padding : p;
    let finalMargin = margin != null ? margin : m;
    if (space !== void 0) {
      finalPadding = space;
      finalMargin = space;
    }
    if (spaceX !== void 0) {
      finalPadding = spaceX;
      finalMargin = spaceX;
    }
    if (spaceY !== void 0) {
      finalPadding = spaceY;
      finalMargin = spaceY;
    }
    const transform = [];
    if (scale) transform.push({ scale });
    if (ty) transform.push({ translateY: ty });
    if (tx) transform.push({ translateX: tx });
    if (sx) transform.push({ scaleX: sx });
    if (sy) transform.push({ scaleY: sy });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    if (skewX) transform.push({ skewX: `${skewX}deg` });
    if (skewY) transform.push({ skewY: `${skewY}deg` });
    let finalOpacity = opacity;
    let pointerEvents = void 0;
    if (hidden) {
      finalOpacity = 0;
      pointerEvents = "none";
    }
    if (visible) {
      finalOpacity = 1;
    }
    if (disabled) {
      finalOpacity = 0.5;
      pointerEvents = "none";
    }
    return {
      flex,
      padding: finalPadding,
      margin: finalMargin,
      width: finalWidth,
      height: finalHeight,
      aspectRatio: finalAspectRatio,
      alignSelf: align,
      backgroundColor: resolveColor(color),
      ...fd ? FLEX_DIRECTIONS[fd] : {},
      ...centerStyles,
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv != null ? pv : py,
      paddingHorizontal: ph != null ? ph : px,
      paddingLeft: pl,
      paddingRight: pr,
      borderRadius: finalBorderRadius,
      borderWidth: bw,
      borderBottomWidth: bbw,
      borderTopWidth: btw,
      borderColor: resolveColor(bc),
      borderRightColor: resolveColor(brc),
      borderLeftColor: resolveColor(blc),
      borderTopColor: resolveColor(btc),
      borderBottomColor: resolveColor(bbc),
      borderTopRightRadius: btrr,
      borderTopLeftRadius: btlr,
      borderBottomLeftRadius: bblr,
      borderBottomRightRadius: bbrr,
      borderLeftWidth: blw,
      borderRightWidth: brw,
      borderStyle: bs,
      flexWrap: wrap ? "wrap" : void 0,
      ...elevation(finalShadow != null ? finalShadow : 0),
      position: finalPosition,
      ...positionProps,
      overflow,
      opacity: finalOpacity,
      zIndex,
      maxWidth: maxW,
      minWidth: minW,
      minHeight: minH,
      maxHeight: maxH,
      gap,
      transform: transform.length > 0 ? transform : void 0,
      pointerEvents,
      perspective
    };
  }, [
    flex,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    width2,
    w,
    height2,
    h,
    size,
    align,
    color,
    fd,
    br,
    bw,
    bbw,
    btw,
    blw,
    brw,
    bc,
    brc,
    blc,
    btc,
    bbc,
    btlr,
    btrr,
    bblr,
    bbrr,
    shadow,
    wrap,
    position,
    inset,
    insetX,
    insetY,
    top,
    right,
    bottom,
    left,
    overflow,
    opacity,
    zIndex,
    gap,
    scale,
    ty,
    tx,
    sx,
    sy,
    maxW,
    minW,
    minH,
    maxH,
    bs,
    aspectRatio,
    aspect,
    fullWidth,
    fullHeight,
    screenWidth,
    screenHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    fixed,
    rounded,
    roundedSm,
    roundedLg,
    roundedXl,
    roundedFull,
    elevated,
    elevatedSm,
    elevatedLg,
    elevatedXl,
    hidden,
    visible,
    disabled,
    rotate,
    skewX,
    skewY,
    perspective,
    space,
    spaceX,
    spaceY,
    colors
  ]);
  const needsAnimation = scale || tx || ty || sx || sy || opacity && isNaN(opacity);
  const Comp = needsAnimation ? import_react_native2.Animated.View : import_react_native2.View;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    Comp,
    {
      ref,
      ...otherProps,
      style: [computedStyle, style],
      children
    }
  );
});
var View_default = View;

// src/rn-alpha/custom/SafeAreaView.tsx
var import_react_native_safe_area_context = require("react-native-safe-area-context");
var import_jsx_runtime4 = require("react/jsx-runtime");
var DEFAULT_EDGES = ["top", "right", "left", "bottom"];
var SafeAreaView = ({
  edges = DEFAULT_EDGES,
  children,
  containerStyle,
  color = "background",
  flex = 1,
  style,
  ...rest
}) => {
  const { colors } = use_color_default();
  const resolvedBackground = typeof color === "string" && colors[color] ? colors[color] : color;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_react_native_safe_area_context.SafeAreaView,
    {
      edges,
      style: [
        { flex, backgroundColor: typeof resolvedBackground === "string" ? resolvedBackground : void 0 },
        containerStyle
      ],
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(View_default, { flex, color, style, ...rest, children })
    }
  );
};
var SafeAreaView_default = SafeAreaView;

// src/rn-alpha/default/Text.tsx
var import_react4 = __toESM(require("react"));
var import_react_native3 = require("react-native");
var import_jsx_runtime5 = require("react/jsx-runtime");
var FONT_WEIGHTS = {
  "Regular": "NunitoSans-Regular",
  "Bold": "NunitoSans-Bold",
  "SemiBold": "NunitoSans-SemiBold",
  "Light": "NunitoSans-Light",
  "Medium": "NunitoSans-Medium",
  "ExtraLight": "NunitoSans-ExtraLight",
  "Italic": "NunitoSans-Italic",
  "ExtraBold": "NunitoSans-ExtraBold"
};
var Text = import_react4.default.forwardRef((props, ref) => {
  const { colors } = use_color_default();
  const {
    style,
    color = "text",
    align,
    size,
    weight,
    lineHeight,
    letterSpacing,
    tt,
    td,
    fontFamily,
    fontStyle,
    textShadow,
    numberOfLines,
    ellipsizeMode,
    selectable,
    adjustsFontSizeToFit,
    minimumFontScale,
    maxFontSizeMultiplier,
    allowFontScaling,
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Layout props
    flex,
    width: width2,
    w,
    height: height2,
    h,
    minW,
    maxW,
    minH,
    maxH,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    ...otherProps
  } = props;
  const computedStyle = (0, import_react4.useMemo)(() => {
    var _a, _b;
    const resolveColor = (colorValue) => {
      if (!colorValue) return void 0;
      return colors[colorValue] || colorValue;
    };
    let finalWidth = (_a = size != null ? size : width2) != null ? _a : w;
    let finalHeight = (_b = size != null ? size : height2) != null ? _b : h;
    if (fullWidth) finalWidth = "100%";
    if (fullHeight) finalHeight = "100%";
    let centerStyles = {};
    if (center) {
      centerStyles = { textAlign: "center" };
    } else {
      if (centerX) centerStyles = { ...centerStyles, textAlign: "center" };
      if (centerY) centerStyles = { ...centerStyles, textAlignVertical: "center" };
    }
    let finalPadding = padding != null ? padding : p;
    let finalMargin = margin != null ? margin : m;
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;
    let finalPosition = void 0;
    if (absolute) finalPosition = "absolute";
    if (relative) finalPosition = "relative";
    const textStyle = {
      fontFamily: fontFamily || (weight ? FONT_WEIGHTS[weight] : FONT_WEIGHTS.Regular),
      color: resolveColor(color),
      textAlign: align,
      fontSize: size,
      lineHeight,
      letterSpacing,
      textTransform: tt,
      textDecorationLine: td,
      fontStyle,
      textShadowColor: textShadow == null ? void 0 : textShadow.color,
      textShadowOffset: textShadow == null ? void 0 : textShadow.offset,
      textShadowRadius: textShadow == null ? void 0 : textShadow.radius,
      ...centerStyles
    };
    const layoutStyle = {
      // Spacing
      padding: finalPadding,
      margin: finalMargin,
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv != null ? pv : py,
      paddingHorizontal: ph != null ? ph : px,
      paddingLeft: pl,
      paddingRight: pr,
      // Layout
      flex,
      width: finalWidth,
      // Cast to any to handle string values like '100%'
      height: finalHeight,
      // Cast to any to handle string values like '100%'
      minWidth: minW,
      maxWidth: maxW,
      minHeight: minH,
      maxHeight: maxH,
      position: finalPosition,
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : void 0
    };
    return [textStyle, layoutStyle];
  }, [
    color,
    align,
    size,
    weight,
    lineHeight,
    letterSpacing,
    tt,
    td,
    fontFamily,
    fontStyle,
    textShadow,
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    flex,
    width2,
    w,
    height2,
    h,
    minW,
    maxW,
    minH,
    maxH,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    colors
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    import_react_native3.Text,
    {
      ref,
      ...otherProps,
      style: [...computedStyle, style]
    }
  );
});
var Text_default = Text;

// src/rn-alpha/default/ScrollView.tsx
var import_react5 = __toESM(require("react"));
var import_react_native4 = require("react-native");
var import_jsx_runtime6 = require("react/jsx-runtime");
var ScrollView = import_react5.default.forwardRef((props, ref) => {
  const { colors } = use_color_default();
  const {
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Layout props
    flex,
    width: width2,
    w,
    height: height2,
    h,
    minW,
    maxW,
    minH,
    maxH,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // Scroll props
    refreshing,
    onRefresh,
    refreshColor,
    refreshTintColor,
    refreshTitle,
    refreshTitleColor,
    svs,
    shs,
    cs,
    contentPadding,
    contentPaddingHorizontal,
    contentPaddingVertical,
    contentPaddingTop,
    contentPaddingBottom,
    contentPaddingLeft,
    contentPaddingRight,
    scrollX,
    scrollY,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    scrollEventThrottle = 16,
    removeClippedSubviews,
    maxToRenderPerBatch,
    updateCellsBatchingPeriod,
    initialNumToRender,
    windowSize,
    keyboardShouldPersistTaps = "handled",
    keyboardDismissMode,
    bounces,
    alwaysBounceHorizontal,
    alwaysBounceVertical,
    bouncesZoom,
    canCancelContentTouches,
    centerContent,
    automaticallyAdjustContentInsets,
    contentInsetAdjustmentBehavior,
    pagingEnabled,
    decelerationRate,
    horizontal,
    directionalLockEnabled,
    maximumZoomScale,
    minimumZoomScale,
    zoomScale,
    contentOffset,
    contentSize,
    contentInset,
    automaticallyAdjustsScrollIndicatorInsets,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    // Other props
    style,
    children,
    ...otherProps
  } = props;
  const computedStyle = (0, import_react5.useMemo)(() => {
    const resolveColor = (colorValue) => {
      if (!colorValue) return void 0;
      return colors[colorValue] || colorValue;
    };
    let finalWidth = width2 != null ? width2 : w;
    let finalHeight = height2 != null ? height2 : h;
    if (fullWidth) finalWidth = "100%";
    if (fullHeight) finalHeight = "100%";
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: "center", justifyContent: "center" };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: "center" };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: "center" };
    }
    let finalPadding = padding != null ? padding : p;
    let finalMargin = margin != null ? margin : m;
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;
    let finalPosition = void 0;
    if (absolute) finalPosition = "absolute";
    if (relative) finalPosition = "relative";
    return {
      flex,
      width: finalWidth,
      height: finalHeight,
      minWidth: minW,
      maxWidth: maxW,
      minHeight: minH,
      maxHeight: maxH,
      ...centerStyles,
      // Spacing
      padding: finalPadding,
      margin: finalMargin,
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv != null ? pv : py,
      paddingHorizontal: ph != null ? ph : px,
      paddingLeft: pl,
      paddingRight: pr,
      // Layout
      position: finalPosition,
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : void 0
    };
  }, [
    flex,
    width2,
    w,
    height2,
    h,
    minW,
    maxW,
    minH,
    maxH,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    colors
  ]);
  const contentContainerStyle = (0, import_react5.useMemo)(() => {
    var _a, _b;
    const baseStyle = {
      paddingBottom: (_a = contentPaddingBottom != null ? contentPaddingBottom : pb) != null ? _a : 40,
      paddingTop: (_b = contentPaddingTop != null ? contentPaddingTop : pt) != null ? _b : 0,
      paddingHorizontal: contentPaddingHorizontal != null ? contentPaddingHorizontal : ph,
      paddingVertical: contentPaddingVertical != null ? contentPaddingVertical : pv,
      paddingLeft: contentPaddingLeft != null ? contentPaddingLeft : pl,
      paddingRight: contentPaddingRight != null ? contentPaddingRight : pr,
      padding: contentPadding
    };
    return { ...baseStyle, ...cs };
  }, [
    contentPaddingBottom,
    pb,
    contentPaddingTop,
    pt,
    contentPaddingHorizontal,
    ph,
    contentPaddingVertical,
    pv,
    contentPaddingLeft,
    pl,
    contentPaddingRight,
    pr,
    contentPadding,
    cs
  ]);
  const refreshControl = (0, import_react5.useMemo)(() => {
    if (!onRefresh) return void 0;
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      import_react_native4.RefreshControl,
      {
        refreshing: refreshing || false,
        onRefresh,
        tintColor: refreshTintColor ? colors[refreshTintColor] || refreshTintColor : void 0,
        colors: refreshColor ? [colors[refreshColor] || refreshColor] : void 0,
        title: refreshTitle,
        titleColor: refreshTitleColor ? colors[refreshTitleColor] || refreshTitleColor : void 0
      }
    );
  }, [refreshing, onRefresh, refreshTintColor, refreshColor, refreshTitle, refreshTitleColor, colors]);
  const animated = scrollX || scrollY;
  const Comp = animated ? import_react_native4.Animated.ScrollView : import_react_native4.ScrollView;
  const handleScroll = animated ? import_react_native4.Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
            y: scrollY
          }
        }
      }
    ],
    { useNativeDriver: true, listener: onScroll }
  ) : onScroll;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    Comp,
    {
      ref,
      ...otherProps,
      style: [computedStyle, style],
      contentContainerStyle,
      refreshControl,
      onScroll: handleScroll,
      showsVerticalScrollIndicator: svs,
      showsHorizontalScrollIndicator: shs,
      children
    }
  );
});
var ScrollView_default = ScrollView;

// src/rn-alpha/default/FlatList.tsx
var import_react6 = __toESM(require("react"));
var import_react_native5 = require("react-native");
var import_jsx_runtime7 = require("react/jsx-runtime");
var FlatList = import_react6.default.forwardRef((props, ref) => {
  const { colors } = use_color_default();
  const {
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Layout props
    flex,
    width: width2,
    w,
    height: height2,
    h,
    minW,
    maxW,
    minH,
    maxH,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // FlatList props
    svs,
    shs,
    cs,
    contentPadding,
    contentPaddingHorizontal,
    contentPaddingVertical,
    contentPaddingTop,
    contentPaddingBottom,
    contentPaddingLeft,
    contentPaddingRight,
    scrollX,
    scrollY,
    onScroll,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
    scrollEventThrottle = 16,
    removeClippedSubviews,
    maxToRenderPerBatch,
    updateCellsBatchingPeriod,
    initialNumToRender,
    windowSize,
    getItemLayout,
    keyboardShouldPersistTaps = "handled",
    keyboardDismissMode,
    bounces,
    alwaysBounceHorizontal,
    alwaysBounceVertical,
    canCancelContentTouches,
    centerContent,
    automaticallyAdjustContentInsets,
    contentInsetAdjustmentBehavior,
    pagingEnabled,
    decelerationRate,
    horizontal,
    directionalLockEnabled,
    contentOffset,
    contentSize,
    contentInset,
    automaticallyAdjustsScrollIndicatorInsets,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    // List specific props
    numColumns,
    columnWrapperStyle,
    keyExtractor,
    renderItem,
    ItemSeparatorComponent,
    ListEmptyComponent,
    ListHeaderComponent,
    ListFooterComponent,
    ListHeaderComponentStyle,
    ListFooterComponentStyle,
    ItemSeparatorComponentStyle,
    // Data and loading
    data,
    extraData,
    refreshing,
    onRefresh,
    refreshColor,
    refreshTintColor,
    refreshTitle,
    refreshTitleColor,
    // End reached
    onEndReached,
    onEndReachedThreshold,
    // Viewability
    onViewableItemsChanged,
    viewabilityConfig,
    viewabilityConfigCallbackPairs,
    // Legacy
    legacyImplementation,
    // Other props
    style,
    ...otherProps
  } = props;
  const computedStyle = (0, import_react6.useMemo)(() => {
    let finalWidth = width2 != null ? width2 : w;
    let finalHeight = height2 != null ? height2 : h;
    if (fullWidth) finalWidth = "100%";
    if (fullHeight) finalHeight = "100%";
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: "center", justifyContent: "center" };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: "center" };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: "center" };
    }
    let finalPadding = padding != null ? padding : p;
    let finalMargin = margin != null ? margin : m;
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;
    let finalPosition = void 0;
    if (absolute) finalPosition = "absolute";
    if (relative) finalPosition = "relative";
    const viewStyle = {
      flex,
      width: finalWidth,
      // Cast to any to handle string values like '100%'
      height: finalHeight,
      // Cast to any to handle string values like '100%'
      minWidth: minW,
      // Cast to any to handle string values
      maxWidth: maxW,
      // Cast to any to handle string values
      minHeight: minH,
      // Cast to any to handle string values
      maxHeight: maxH,
      // Cast to any to handle string values
      ...centerStyles,
      // Spacing
      padding: finalPadding,
      // Cast to any to handle string values
      margin: finalMargin,
      // Cast to any to handle string values
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv != null ? pv : py,
      paddingHorizontal: ph != null ? ph : px,
      paddingLeft: pl,
      paddingRight: pr,
      // Layout
      position: finalPosition,
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : void 0
    };
    return viewStyle;
  }, [
    flex,
    width2,
    w,
    height2,
    h,
    minW,
    maxW,
    minH,
    maxH,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    opacity,
    scale,
    rotate,
    translateX,
    translateY
  ]);
  const contentContainerStyle = (0, import_react6.useMemo)(() => {
    var _a, _b;
    const baseStyle = {
      paddingBottom: (_a = contentPaddingBottom != null ? contentPaddingBottom : pb) != null ? _a : 40,
      paddingTop: (_b = contentPaddingTop != null ? contentPaddingTop : pt) != null ? _b : 0,
      paddingHorizontal: contentPaddingHorizontal != null ? contentPaddingHorizontal : ph,
      paddingVertical: contentPaddingVertical != null ? contentPaddingVertical : pv,
      paddingLeft: contentPaddingLeft != null ? contentPaddingLeft : pl,
      paddingRight: contentPaddingRight != null ? contentPaddingRight : pr,
      padding: contentPadding
    };
    return { ...baseStyle, ...cs };
  }, [
    contentPaddingBottom,
    pb,
    contentPaddingTop,
    pt,
    contentPaddingHorizontal,
    ph,
    contentPaddingVertical,
    pv,
    contentPaddingLeft,
    pl,
    contentPaddingRight,
    pr,
    contentPadding,
    cs
  ]);
  const refreshControl = (0, import_react6.useMemo)(() => {
    if (!onRefresh) return void 0;
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      import_react_native5.RefreshControl,
      {
        refreshing: refreshing || false,
        onRefresh,
        tintColor: refreshTintColor ? colors[refreshTintColor] || refreshTintColor : void 0,
        colors: refreshColor ? [colors[refreshColor] || refreshColor] : void 0,
        title: refreshTitle,
        titleColor: refreshTitleColor ? colors[refreshTitleColor] || refreshTitleColor : void 0
      }
    );
  }, [refreshing, onRefresh, refreshTintColor, refreshColor, refreshTitle, refreshTitleColor, colors]);
  const animated = scrollX || scrollY;
  const Comp = animated ? import_react_native5.Animated.FlatList : import_react_native5.FlatList;
  const handleScroll = animated ? import_react_native5.Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: scrollX,
            y: scrollY
          }
        }
      }
    ],
    { useNativeDriver: true, listener: onScroll }
  ) : onScroll;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    Comp,
    {
      ref,
      ...otherProps,
      style: [computedStyle, style],
      contentContainerStyle,
      showsVerticalScrollIndicator: svs,
      showsHorizontalScrollIndicator: shs,
      refreshControl,
      onScroll: handleScroll
    }
  );
});
var FlatList_default = FlatList;

// src/rn-alpha/default/TouchableHighlight.tsx
var import_react7 = require("react");
var import_react_native6 = require("react-native");
var import_jsx_runtime8 = require("react/jsx-runtime");
var TouchableHighlight = (props) => {
  const { colors } = use_color_default();
  const {
    // Layout props
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // Border props
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    // Color props
    color,
    backgroundColor,
    underlayColor,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    // Touchable props
    activeOpacity = 0.2,
    hitSlop,
    pressRetentionOffset,
    delayPressIn,
    delayPressOut,
    delayLongPress,
    // Accessibility
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    accessibilityState,
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Other props
    style,
    children,
    ...otherProps
  } = props;
  const computedStyle = (0, import_react7.useMemo)(() => {
    const resolveColor = (colorValue) => {
      if (!colorValue) return void 0;
      return colors[colorValue] || colorValue;
    };
    let finalWidth = size != null ? size : w;
    let finalHeight = size != null ? size : h;
    if (fullWidth) finalWidth = "100%";
    if (fullHeight) finalHeight = "100%";
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: "center", justifyContent: "center" };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: "center" };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: "center" };
    }
    let finalPadding = padding != null ? padding : p;
    let finalMargin = margin != null ? margin : m;
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    if (skewX) transform.push({ skewX: `${skewX}deg` });
    if (skewY) transform.push({ skewY: `${skewY}deg` });
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;
    let finalPosition = void 0;
    if (absolute) finalPosition = "absolute";
    if (relative) finalPosition = "relative";
    const viewStyle = {
      flex,
      width: finalWidth,
      // Cast to any to handle string values like '100%'
      height: finalHeight,
      // Cast to any to handle string values like '100%'
      borderRadius: br,
      backgroundColor: resolveColor(backgroundColor),
      ...centerStyles,
      // Spacing
      padding: finalPadding,
      // Cast to any to handle string values
      margin: finalMargin,
      // Cast to any to handle string values
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv != null ? pv : py,
      paddingHorizontal: ph != null ? ph : px,
      paddingLeft: pl,
      paddingRight: pr,
      // Position
      position: finalPosition,
      // Border
      borderWidth: bw,
      borderBottomWidth: bbw,
      borderTopWidth: btw,
      borderLeftWidth: blw,
      borderRightWidth: brw,
      borderColor: resolveColor(bc),
      borderRightColor: resolveColor(brc),
      borderLeftColor: resolveColor(blc),
      borderTopColor: resolveColor(btc),
      borderBottomColor: resolveColor(bbc),
      borderTopRightRadius: btrr,
      borderTopLeftRadius: btlr,
      borderBottomLeftRadius: bblr,
      borderBottomRightRadius: bbrr,
      borderStyle: bs,
      // Animation
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : void 0
    };
    return viewStyle;
  }, [
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    color,
    backgroundColor,
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    colors
  ]);
  const finalUnderlayColor = (0, import_react7.useMemo)(() => {
    if (underlayColor) {
      return colors[underlayColor] || underlayColor;
    }
    return colors.shade;
  }, [underlayColor, colors]);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    import_react_native6.TouchableHighlight,
    {
      ...otherProps,
      style: [computedStyle, style],
      underlayColor: finalUnderlayColor,
      activeOpacity,
      children
    }
  );
};
var TouchableHighlight_default = TouchableHighlight;

// src/rn-alpha/default/TouchableNativeFeedback.tsx
var import_react8 = require("react");
var import_react_native7 = require("react-native");
var import_jsx_runtime9 = require("react/jsx-runtime");
var TouchableNativeFeedback = (props) => {
  const { colors } = use_color_default();
  const {
    // Layout props
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // Border props
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    // Color props
    color,
    backgroundColor,
    rippleColor,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    // Touchable props
    borderless = false,
    onPress,
    onLongPress,
    onPressIn,
    onPressOut,
    hitSlop,
    pressRetentionOffset,
    delayPressIn,
    delayPressOut,
    delayLongPress,
    // Accessibility
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    accessibilityState,
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Other props
    style,
    children,
    ...otherProps
  } = props;
  const computedStyle = (0, import_react8.useMemo)(() => {
    const resolveColor = (colorValue) => {
      if (!colorValue) return void 0;
      return colors[colorValue] || colorValue;
    };
    let finalWidth = size != null ? size : w;
    let finalHeight = size != null ? size : h;
    if (fullWidth) finalWidth = "100%";
    if (fullHeight) finalHeight = "100%";
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: "center", justifyContent: "center" };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: "center" };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: "center" };
    }
    let finalPadding = padding != null ? padding : p;
    let finalMargin = margin != null ? margin : m;
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    if (skewX) transform.push({ skewX: `${skewX}deg` });
    if (skewY) transform.push({ skewY: `${skewY}deg` });
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;
    let finalPosition = void 0;
    if (absolute) finalPosition = "absolute";
    if (relative) finalPosition = "relative";
    const viewStyle = {
      flex,
      width: finalWidth,
      // Cast to any to handle string values like '100%'
      height: finalHeight,
      // Cast to any to handle string values like '100%'
      borderRadius: br,
      backgroundColor: resolveColor(backgroundColor),
      ...centerStyles,
      // Spacing
      padding: finalPadding,
      // Cast to any to handle string values
      margin: finalMargin,
      // Cast to any to handle string values
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv != null ? pv : py,
      paddingHorizontal: ph != null ? ph : px,
      paddingLeft: pl,
      paddingRight: pr,
      // Position
      position: finalPosition,
      // Border
      borderWidth: bw,
      borderBottomWidth: bbw,
      borderTopWidth: btw,
      borderLeftWidth: blw,
      borderRightWidth: brw,
      borderColor: resolveColor(bc),
      borderRightColor: resolveColor(brc),
      borderLeftColor: resolveColor(blc),
      borderTopColor: resolveColor(btc),
      borderBottomColor: resolveColor(bbc),
      borderTopRightRadius: btrr,
      borderTopLeftRadius: btlr,
      borderBottomLeftRadius: bblr,
      borderBottomRightRadius: bbrr,
      borderStyle: bs,
      // Animation
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : void 0
    };
    return viewStyle;
  }, [
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    color,
    backgroundColor,
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    colors
  ]);
  const rippleBackground = (0, import_react8.useMemo)(() => {
    const rippleColorValue = rippleColor ? colors[rippleColor] || rippleColor : colors.shade;
    return import_react_native7.TouchableNativeFeedback.Ripple(rippleColorValue, borderless);
  }, [rippleColor, borderless, colors]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    import_react_native7.TouchableNativeFeedback,
    {
      ...otherProps,
      background: rippleBackground,
      onPress,
      onLongPress,
      onPressIn,
      onPressOut,
      disabled,
      hitSlop,
      pressRetentionOffset,
      delayPressIn,
      delayPressOut,
      delayLongPress,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole,
      accessibilityState,
      style: [computedStyle, style],
      children
    }
  );
};
var TouchableNativeFeedback_default = TouchableNativeFeedback;

// src/rn-alpha/default/TouchableOpacity.tsx
var import_react9 = require("react");
var import_react_native8 = require("react-native");
var import_jsx_runtime10 = require("react/jsx-runtime");
var TouchableOpacity = (props) => {
  const { colors } = use_color_default();
  const {
    // Layout props
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // Border props
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    // Color props
    color,
    backgroundColor,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    // Touchable props
    activeOpacity = 0.2,
    hitSlop,
    pressRetentionOffset,
    delayPressIn,
    delayPressOut,
    delayLongPress,
    // Accessibility
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    accessibilityState,
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Other props
    style,
    children,
    ...otherProps
  } = props;
  const computedStyle = (0, import_react9.useMemo)(() => {
    const resolveColor = (colorValue) => {
      if (!colorValue) return void 0;
      return colors[colorValue] || colorValue;
    };
    let finalWidth = size != null ? size : w;
    let finalHeight = size != null ? size : h;
    if (fullWidth) finalWidth = "100%";
    if (fullHeight) finalHeight = "100%";
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: "center", justifyContent: "center" };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: "center" };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: "center" };
    }
    let finalPadding = padding != null ? padding : p;
    let finalMargin = margin != null ? margin : m;
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    if (skewX) transform.push({ skewX: `${skewX}deg` });
    if (skewY) transform.push({ skewY: `${skewY}deg` });
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;
    let finalPosition = void 0;
    if (absolute) finalPosition = "absolute";
    if (relative) finalPosition = "relative";
    const viewStyle = {
      flex,
      width: finalWidth,
      // Cast to any to handle string values like '100%'
      height: finalHeight,
      // Cast to any to handle string values like '100%'
      borderRadius: br,
      backgroundColor: resolveColor(backgroundColor),
      ...centerStyles,
      // Spacing
      padding: finalPadding,
      // Cast to any to handle string values
      margin: finalMargin,
      // Cast to any to handle string values
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv != null ? pv : py,
      paddingHorizontal: ph != null ? ph : px,
      paddingLeft: pl,
      paddingRight: pr,
      // Position
      position: finalPosition,
      // Border
      borderWidth: bw,
      borderBottomWidth: bbw,
      borderTopWidth: btw,
      borderLeftWidth: blw,
      borderRightWidth: brw,
      borderColor: resolveColor(bc),
      borderRightColor: resolveColor(brc),
      borderLeftColor: resolveColor(blc),
      borderTopColor: resolveColor(btc),
      borderBottomColor: resolveColor(bbc),
      borderTopRightRadius: btrr,
      borderTopLeftRadius: btlr,
      borderBottomLeftRadius: bblr,
      borderBottomRightRadius: bbrr,
      borderStyle: bs,
      // Animation
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : void 0
    };
    return viewStyle;
  }, [
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    color,
    backgroundColor,
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    colors
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    import_react_native8.TouchableOpacity,
    {
      ...otherProps,
      style: [computedStyle, style],
      activeOpacity,
      children
    }
  );
};
var TouchableOpacity_default = TouchableOpacity;

// src/rn-alpha/default/Image.tsx
var import_react10 = require("react");
var import_react_native_fast_image = __toESM(require("@d11/react-native-fast-image"));
var import_jsx_runtime11 = require("react/jsx-runtime");
var Image = (props) => {
  const { colors } = use_color_default();
  const {
    // Layout props
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // Border props
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    // Color props
    color,
    tintColor,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    // Image props
    source,
    resizeMode = "cover",
    priority,
    cache,
    // Loading and error handling
    onLoad,
    onError,
    onLoadStart,
    onLoadEnd,
    onProgress,
    // Accessibility
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    // Performance
    fadeDuration,
    shouldRasterizeIOS,
    renderToHardwareTextureAndroid,
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Position props
    position,
    inset,
    insetX,
    insetY,
    top,
    right,
    bottom,
    left,
    // Other props
    style,
    ...otherProps
  } = props;
  const computedStyle = (0, import_react10.useMemo)(() => {
    const resolveColor = (colorValue) => {
      if (!colorValue) return void 0;
      return colors[colorValue] || colorValue;
    };
    let finalWidth = size != null ? size : w;
    let finalHeight = size != null ? size : h;
    if (fullWidth) finalWidth = "100%";
    if (fullHeight) finalHeight = "100%";
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: "center", justifyContent: "center" };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: "center" };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: "center" };
    }
    let finalPadding = padding != null ? padding : p;
    let finalMargin = margin != null ? margin : m;
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    if (skewX) transform.push({ skewX: `${skewX}deg` });
    if (skewY) transform.push({ skewY: `${skewY}deg` });
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;
    let finalPosition = position;
    if (absolute) finalPosition = "absolute";
    if (relative) finalPosition = "relative";
    let positionProps = { position: finalPosition, top, right, bottom, left };
    if (insetY !== void 0) {
      positionProps = { position: "absolute", top: insetY, bottom: insetY };
    }
    if (insetX !== void 0) {
      positionProps = { position: "absolute", right: insetX, left: insetX };
    }
    if (inset !== void 0) {
      positionProps = {
        position: "absolute",
        right: inset,
        left: inset,
        top: inset,
        bottom: inset
      };
    }
    const imageStyle = {
      flex,
      width: typeof finalWidth === "string" ? void 0 : finalWidth,
      height: typeof finalHeight === "string" ? void 0 : finalHeight,
      borderRadius: typeof br === "string" ? void 0 : br,
      backgroundColor: resolveColor(color),
      tintColor: resolveColor(tintColor),
      ...centerStyles,
      // Spacing
      padding: typeof finalPadding === "string" ? void 0 : finalPadding,
      margin: typeof finalMargin === "string" ? void 0 : finalMargin,
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv != null ? pv : py,
      paddingHorizontal: ph != null ? ph : px,
      paddingLeft: pl,
      paddingRight: pr,
      // Position
      ...positionProps,
      // Border
      borderWidth: bw,
      borderBottomWidth: bbw,
      borderTopWidth: btw,
      borderLeftWidth: blw,
      borderRightWidth: brw,
      borderColor: resolveColor(bc),
      borderRightColor: resolveColor(brc),
      borderLeftColor: resolveColor(blc),
      borderTopColor: resolveColor(btc),
      borderBottomColor: resolveColor(bbc),
      borderTopRightRadius: typeof btrr === "string" ? void 0 : btrr,
      borderTopLeftRadius: typeof btlr === "string" ? void 0 : btlr,
      borderBottomLeftRadius: typeof bblr === "string" ? void 0 : bblr,
      borderBottomRightRadius: typeof bbrr === "string" ? void 0 : bbrr,
      borderStyle: bs,
      // Animation
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : void 0
    };
    return imageStyle;
  }, [
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    color,
    tintColor,
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    position,
    inset,
    insetX,
    insetY,
    top,
    right,
    bottom,
    left,
    colors
  ]);
  const isValidSource = source && source.uri && !source.uri.includes("undefined");
  const fastImageProps = (0, import_react10.useMemo)(() => ({
    ...otherProps,
    source: isValidSource ? { uri: source.uri } : source,
    style: computedStyle,
    resizeMode: import_react_native_fast_image.default.resizeMode[resizeMode],
    priority: priority ? import_react_native_fast_image.default.priority[priority] : void 0,
    cache: cache ? import_react_native_fast_image.default.cacheControl[cache] : void 0,
    onLoad,
    onError,
    onLoadStart,
    onLoadEnd,
    onProgress,
    fadeDuration,
    shouldRasterizeIOS,
    renderToHardwareTextureAndroid,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole
  }), [
    otherProps,
    source,
    computedStyle,
    resizeMode,
    priority,
    cache,
    onLoad,
    onError,
    onLoadStart,
    onLoadEnd,
    onProgress,
    fadeDuration,
    shouldRasterizeIOS,
    renderToHardwareTextureAndroid,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    isValidSource
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_jsx_runtime11.Fragment, { children: isValidSource ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_react_native_fast_image.default, { ...fastImageProps }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(View_default, { style: computedStyle, fd: "flex-center" }) });
};
var Image_default = Image;

// src/rn-alpha/default/KeyboardView.tsx
var import_react11 = require("react");

// src/constants/layout.ts
var import_react_native9 = require("react-native");
var width = import_react_native9.Dimensions.get("window").width;
var height = import_react_native9.Dimensions.get("window").height;
var ios = import_react_native9.Platform.OS === "ios";
var android = import_react_native9.Platform.OS === "android";
var isSmallDevice = width < 375;
var statusHeight = ios ? import_react_native9.StatusBar.currentHeight || 42 : 0;

// src/rn-alpha/default/KeyboardView.tsx
var import_react_native10 = require("react-native");
var import_jsx_runtime12 = require("react/jsx-runtime");
var KeyboardView = (props) => {
  const { colors } = use_color_default();
  const {
    // Layout props
    w,
    h,
    size,
    flex = 1,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // Border props
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    // Color props
    color,
    backgroundColor,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    // Keyboard props
    behavior,
    keyboardVerticalOffset,
    iosOffset,
    androidOffset,
    enabled = true,
    contentContainerStyle,
    // Accessibility
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Other props
    style,
    children,
    ...otherProps
  } = props;
  const computedStyle = (0, import_react11.useMemo)(() => {
    const resolveColor = (colorValue) => {
      if (!colorValue) return void 0;
      return colors[colorValue] || colorValue;
    };
    let finalWidth = size != null ? size : w;
    let finalHeight = size != null ? size : h;
    if (fullWidth) finalWidth = "100%";
    if (fullHeight) finalHeight = "100%";
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: "center", justifyContent: "center" };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: "center" };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: "center" };
    }
    let finalPadding = padding != null ? padding : p;
    let finalMargin = margin != null ? margin : m;
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    if (skewX) transform.push({ skewX: `${skewX}deg` });
    if (skewY) transform.push({ skewY: `${skewY}deg` });
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;
    let finalPosition = void 0;
    if (absolute) finalPosition = "absolute";
    if (relative) finalPosition = "relative";
    const viewStyle = {
      flex,
      width: finalWidth,
      // Cast to any to handle string values like '100%'
      height: finalHeight,
      // Cast to any to handle string values like '100%'
      borderRadius: br,
      backgroundColor: resolveColor(backgroundColor),
      ...centerStyles,
      // Spacing
      padding: finalPadding,
      // Cast to any to handle string values
      margin: finalMargin,
      // Cast to any to handle string values
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv != null ? pv : py,
      paddingHorizontal: ph != null ? ph : px,
      paddingLeft: pl,
      paddingRight: pr,
      // Position
      position: finalPosition,
      // Border
      borderWidth: bw,
      borderBottomWidth: bbw,
      borderTopWidth: btw,
      borderLeftWidth: blw,
      borderRightWidth: brw,
      borderColor: resolveColor(bc),
      borderRightColor: resolveColor(brc),
      borderLeftColor: resolveColor(blc),
      borderTopColor: resolveColor(btc),
      borderBottomColor: resolveColor(bbc),
      borderTopRightRadius: btrr,
      borderTopLeftRadius: btlr,
      borderBottomLeftRadius: bblr,
      borderBottomRightRadius: bbrr,
      borderStyle: bs,
      // Animation
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : void 0
    };
    return viewStyle;
  }, [
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    color,
    backgroundColor,
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    colors
  ]);
  const keyboardBehavior = (0, import_react11.useMemo)(() => {
    if (behavior) return behavior;
    return ios ? "padding" : "height";
  }, [behavior, ios]);
  const keyboardOffset = (0, import_react11.useMemo)(() => {
    if (keyboardVerticalOffset !== void 0) return keyboardVerticalOffset;
    if (ios && iosOffset !== void 0) return iosOffset;
    if (import_react_native10.Platform.OS === "android" && androidOffset !== void 0) return androidOffset;
    return ios ? iosOffset || 0 : 30;
  }, [keyboardVerticalOffset, iosOffset, androidOffset, ios]);
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    import_react_native10.KeyboardAvoidingView,
    {
      ...otherProps,
      behavior: keyboardBehavior,
      style: [computedStyle, style],
      enabled,
      keyboardVerticalOffset: keyboardOffset,
      contentContainerStyle,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole,
      children
    }
  );
};
var KeyboardView_default = KeyboardView;

// src/rn-alpha/default/ImageBackground.tsx
var import_react12 = require("react");
var import_react_native11 = require("react-native");
var import_jsx_runtime13 = require("react/jsx-runtime");
var ImageBackground = (props) => {
  const { colors } = use_color_default();
  const {
    // Layout props
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // Border props
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    // Color props
    color,
    backgroundColor,
    tintColor,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    // Image props
    source,
    resizeMode = "cover",
    imageStyle,
    // Loading and error handling
    onLoad,
    onError,
    onLoadStart,
    onLoadEnd,
    onProgress,
    // Accessibility
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Position props
    position,
    inset,
    insetX,
    insetY,
    top,
    right,
    bottom,
    left,
    // Other props
    style,
    children,
    ...otherProps
  } = props;
  const computedStyle = (0, import_react12.useMemo)(() => {
    const resolveColor = (colorValue) => {
      if (!colorValue) return void 0;
      return colors[colorValue] || colorValue;
    };
    let finalWidth = size != null ? size : w;
    let finalHeight = size != null ? size : h;
    if (fullWidth) finalWidth = "100%";
    if (fullHeight) finalHeight = "100%";
    let centerStyles = {};
    if (center) {
      centerStyles = { alignItems: "center", justifyContent: "center" };
    } else {
      if (centerX) centerStyles = { ...centerStyles, alignItems: "center" };
      if (centerY) centerStyles = { ...centerStyles, justifyContent: "center" };
    }
    let finalPadding = padding != null ? padding : p;
    let finalMargin = margin != null ? margin : m;
    const transform = [];
    if (scale) transform.push({ scale });
    if (translateX) transform.push({ translateX });
    if (translateY) transform.push({ translateY });
    if (rotate) transform.push({ rotate: `${rotate}deg` });
    if (skewX) transform.push({ skewX: `${skewX}deg` });
    if (skewY) transform.push({ skewY: `${skewY}deg` });
    let finalOpacity = opacity;
    if (hidden) finalOpacity = 0;
    if (visible) finalOpacity = 1;
    if (disabled) finalOpacity = 0.5;
    let finalPosition = position;
    if (absolute) finalPosition = "absolute";
    if (relative) finalPosition = "relative";
    let positionProps = { position: finalPosition, top, right, bottom, left };
    if (insetY !== void 0) {
      positionProps = { position: "absolute", top: insetY, bottom: insetY };
    }
    if (insetX !== void 0) {
      positionProps = { position: "absolute", right: insetX, left: insetX };
    }
    if (inset !== void 0) {
      positionProps = {
        position: "absolute",
        right: inset,
        left: inset,
        top: inset,
        bottom: inset
      };
    }
    const viewStyle = {
      flex,
      width: finalWidth,
      // Cast to any to handle string values like '100%'
      height: finalHeight,
      // Cast to any to handle string values like '100%'
      borderRadius: br,
      backgroundColor: resolveColor(backgroundColor),
      tintColor: resolveColor(tintColor),
      ...centerStyles,
      // Spacing
      padding: finalPadding,
      // Cast to any to handle string values
      margin: finalMargin,
      // Cast to any to handle string values
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      marginHorizontal: mh,
      marginVertical: mv,
      paddingTop: pt,
      paddingBottom: pb,
      paddingVertical: pv != null ? pv : py,
      paddingHorizontal: ph != null ? ph : px,
      paddingLeft: pl,
      paddingRight: pr,
      // Position
      ...positionProps,
      // Border
      borderWidth: bw,
      borderBottomWidth: bbw,
      borderTopWidth: btw,
      borderLeftWidth: blw,
      borderRightWidth: brw,
      borderColor: resolveColor(bc),
      borderRightColor: resolveColor(brc),
      borderLeftColor: resolveColor(blc),
      borderTopColor: resolveColor(btc),
      borderBottomColor: resolveColor(bbc),
      borderTopRightRadius: btrr,
      borderTopLeftRadius: btlr,
      borderBottomLeftRadius: bblr,
      borderBottomRightRadius: bbrr,
      borderStyle: bs,
      // Animation
      opacity: finalOpacity,
      transform: transform.length > 0 ? transform : void 0
    };
    return viewStyle;
  }, [
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    color,
    backgroundColor,
    tintColor,
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    position,
    inset,
    insetX,
    insetY,
    top,
    right,
    bottom,
    left,
    colors
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
    import_react_native11.ImageBackground,
    {
      ...otherProps,
      source,
      style: [computedStyle, style],
      imageStyle,
      resizeMode,
      children
    }
  );
};
var ImageBackground_default = ImageBackground;

// src/rn-alpha/custom/AlertModal.tsx
var import_react13 = require("react");
var import_react_native12 = require("react-native");
var import_jsx_runtime14 = require("react/jsx-runtime");
var AlertModal = (props) => {
  const { colors } = use_color_default();
  const {
    // Content props
    title,
    text,
    icon,
    color = "primary",
    // Button props
    confirm = "Done",
    cancel: cancel2 = "Cancel",
    onConfirm,
    onCancel,
    confirmDisabled = false,
    cancelDisabled = false,
    // Modal props
    modal,
    setModal,
    animationType = "none",
    transparent = true,
    presentationStyle,
    statusBarTranslucent,
    // Styling props
    modalStyle,
    contentStyle,
    titleStyle,
    textStyle,
    buttonContainerStyle,
    // Accessibility
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    // Custom content
    customContent,
    customButtons,
    // Keyboard handling
    keyboardAvoidingView = true,
    keyboardVerticalOffset,
    // Backdrop
    backdropColor,
    backdropOpacity = 0.5,
    closeOnBackdropPress = true,
    // Layout props
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // Border props
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Other props
    style,
    ...otherProps
  } = props;
  const closeFunc = (0, import_react13.useMemo)(() => {
    return () => {
      setModal(false);
    };
  }, [setModal]);
  const backdropStyle = (0, import_react13.useMemo)(() => {
    const backdropColorValue = backdropColor ? colors[backdropColor] || backdropColor : colors.modal;
    return {
      backgroundColor: backdropColorValue,
      opacity: backdropOpacity
    };
  }, [backdropColor, backdropOpacity, colors]);
  const computedContentStyle = (0, import_react13.useMemo)(() => {
    return {
      maxWidth: 400,
      flex: 1,
      ...contentStyle
    };
  }, [contentStyle]);
  const computedTitleStyle = (0, import_react13.useMemo)(() => {
    return {
      fontSize: 16,
      fontWeight: "600",
      textAlign: "center",
      ...titleStyle
    };
  }, [titleStyle]);
  const computedTextStyle = (0, import_react13.useMemo)(() => {
    return {
      fontSize: 13,
      textAlign: "center",
      ...textStyle
    };
  }, [textStyle]);
  const computedButtonContainerStyle = (0, import_react13.useMemo)(() => {
    return {
      gap: 12,
      ...buttonContainerStyle
    };
  }, [buttonContainerStyle]);
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      closeFunc();
    }
  };
  const handleConfirmPress = () => {
    closeFunc();
    onConfirm == null ? void 0 : onConfirm();
  };
  const handleCancelPress = () => {
    closeFunc();
    onCancel == null ? void 0 : onCancel();
  };
  const modalContent = (0, import_react13.useMemo)(() => {
    if (customContent) {
      return customContent;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(View_default, { color: "background", ph: 24, pt: 24, pb: 5, br: 24, style: computedContentStyle, gap: 24, children: [
      icon && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(View_default, { size: 40, br: 40, color: `${color}Light`, align: "center", fd: "flex-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Svg_default, { icon, size: 22, color }) }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(View_default, { gap: 16, children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Text_default, { style: computedTitleStyle, color: "text", children: title }),
        text && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Text_default, { style: computedTextStyle, color: "text2", children: text })
      ] }),
      customButtons ? customButtons : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(View_default, { style: computedButtonContainerStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          Button_default,
          {
            title: confirm,
            onPress: handleConfirmPress,
            color,
            disabled: confirmDisabled
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          Button_default,
          {
            title: cancel2,
            onPress: handleCancelPress,
            color: "background",
            textColor: "text",
            disabled: cancelDisabled
          }
        )
      ] })
    ] });
  }, [
    customContent,
    customButtons,
    icon,
    color,
    title,
    text,
    computedContentStyle,
    computedTitleStyle,
    computedTextStyle,
    computedButtonContainerStyle,
    confirm,
    cancel2,
    confirmDisabled,
    cancelDisabled,
    handleConfirmPress,
    handleCancelPress
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    import_react_native12.Modal,
    {
      animationType,
      transparent,
      visible: modal,
      onRequestClose: closeFunc,
      presentationStyle,
      statusBarTranslucent,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole,
      style: modalStyle,
      children: keyboardAvoidingView ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(KeyboardView_default, { keyboardVerticalOffset, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(View_default, { flex: 1, style: backdropStyle, fd: "flex-center", p: 25, children: [
        modalContent,
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(View_default, { inset: 0, onTouchEnd: handleBackdropPress })
      ] }) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(View_default, { flex: 1, style: backdropStyle, fd: "flex-center", p: 25, children: [
        modalContent,
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(View_default, { inset: 0, onTouchEnd: handleBackdropPress })
      ] })
    }
  );
};
var AlertModal_default = AlertModal;

// src/rn-alpha/custom/OptionModal.tsx
var import_react14 = require("react");
var import_react_native13 = require("react-native");
var import_jsx_runtime15 = require("react/jsx-runtime");
var OptionModal = (props) => {
  const { colors } = use_color_default();
  const {
    // Options
    options,
    // Modal props
    modal,
    setModal,
    animationType = "slide",
    transparent = true,
    presentationStyle,
    statusBarTranslucent,
    // Styling props
    modalStyle,
    contentStyle,
    optionStyle,
    optionTextStyle,
    optionIconStyle,
    // Layout props
    maxHeight,
    minHeight,
    maxWidth,
    minWidth,
    // Accessibility
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    // Custom content
    customContent,
    header,
    footer,
    // Behavior
    closeOnOptionPress = true,
    closeOnBackdropPress = true,
    // Keyboard handling
    keyboardAvoidingView = true,
    keyboardVerticalOffset,
    // Backdrop
    backdropColor,
    backdropOpacity = 0.5,
    // Layout props
    w,
    h,
    size,
    flex,
    fullWidth,
    fullHeight,
    center,
    centerX,
    centerY,
    absolute,
    relative,
    hidden,
    visible,
    disabled,
    // Border props
    br,
    bc,
    bw,
    bbw,
    btw,
    blw,
    brw,
    brc,
    blc,
    btc,
    bbc,
    btrr,
    btlr,
    bbrr,
    bblr,
    bs,
    // Animation props
    opacity,
    scale,
    rotate,
    translateX,
    translateY,
    skewX,
    skewY,
    perspective,
    // Spacing props
    padding,
    p,
    margin,
    m,
    mt,
    mb,
    mh,
    ml,
    mr,
    mv,
    pb,
    ph,
    pl,
    pv,
    pt,
    pr,
    px,
    py,
    // Other props
    style,
    ...otherProps
  } = props;
  const closeFunc = (0, import_react14.useMemo)(() => {
    return () => {
      setModal(false);
    };
  }, [setModal]);
  const backdropStyle = (0, import_react14.useMemo)(() => {
    const backdropColorValue = backdropColor ? colors[backdropColor] || backdropColor : colors.modal;
    return {
      backgroundColor: backdropColorValue,
      opacity: backdropOpacity
    };
  }, [backdropColor, backdropOpacity, colors]);
  const computedContentStyle = (0, import_react14.useMemo)(() => {
    return {
      maxWidth: maxWidth || 400,
      minWidth: minWidth || 280,
      maxHeight: maxHeight || "80%",
      minHeight: minHeight || 200,
      ...contentStyle
    };
  }, [maxWidth, minWidth, maxHeight, minHeight, contentStyle]);
  const computedOptionStyle = (0, import_react14.useMemo)(() => {
    return {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      ...optionStyle
    };
  }, [optionStyle]);
  const computedOptionTextStyle = (0, import_react14.useMemo)(() => {
    return {
      fontSize: 13,
      ...optionTextStyle
    };
  }, [optionTextStyle]);
  const computedOptionIconStyle = (0, import_react14.useMemo)(() => {
    return {
      width: 40,
      height: 40,
      borderRadius: 40,
      alignItems: "center",
      justifyContent: "center",
      ...optionIconStyle
    };
  }, [optionIconStyle]);
  const handleOptionPress = (item) => {
    var _a;
    if (item.disabled || item.loading) return;
    if (closeOnOptionPress) {
      closeFunc();
    }
    (_a = item.onPress) == null ? void 0 : _a.call(item);
  };
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      closeFunc();
    }
  };
  const optionsList = (0, import_react14.useMemo)(() => {
    if (customContent) {
      return customContent;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(View_default, { color: "background", br: 24, style: computedContentStyle, children: [
      header && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(View_default, { p: 16, pb: 8, children: header }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(View_default, { children: options.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
        TouchableOpacity_default,
        {
          onPress: () => handleOptionPress(item),
          disabled: item.disabled || item.loading,
          style: computedOptionStyle,
          children: [
            item.icon && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
              View_default,
              {
                size: 40,
                br: 40,
                color: item.color ? `${item.color}Light` : "shade",
                style: computedOptionIconStyle,
                children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                  Svg_default,
                  {
                    icon: item.icon,
                    color: item.color || "text",
                    size: 24
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(View_default, { flex: 1, children: [
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                Text_default,
                {
                  size: 13,
                  color: item.destructive ? "danger" : "text",
                  style: computedOptionTextStyle,
                  children: item.label
                }
              ),
              item.text && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Text_default, { size: 12, color: "text2", children: item.text })
            ] }),
            item.rightIcon && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Svg_default, { icon: item.rightIcon, color: "text2", size: 16 }),
            item.rightText && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Text_default, { size: 12, color: "text2", children: item.rightText }),
            item.badge && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
              View_default,
              {
                size: 20,
                br: 10,
                color: "primary",
                fd: "flex-center",
                children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Text_default, { size: 10, color: "white", weight: "SemiBold", children: item.badge })
              }
            )
          ]
        },
        KEY + i
      )) }),
      footer && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(View_default, { p: 16, pt: 8, children: footer })
    ] });
  }, [
    customContent,
    header,
    footer,
    options,
    computedContentStyle,
    computedOptionStyle,
    computedOptionTextStyle,
    computedOptionIconStyle,
    handleOptionPress
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    import_react_native13.Modal,
    {
      animationType,
      transparent,
      visible: modal,
      onRequestClose: closeFunc,
      presentationStyle,
      statusBarTranslucent,
      accessibilityLabel,
      accessibilityHint,
      accessibilityRole,
      style: modalStyle,
      children: keyboardAvoidingView ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(KeyboardView_default, { keyboardVerticalOffset, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(View_default, { flex: 1, style: backdropStyle, fd: "flex-center", p: 25, children: [
        optionsList,
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(View_default, { inset: 0, onTouchEnd: handleBackdropPress })
      ] }) }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(View_default, { flex: 1, style: backdropStyle, fd: "flex-center", p: 25, children: [
        optionsList,
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(View_default, { inset: 0, onTouchEnd: handleBackdropPress })
      ] })
    }
  );
};
var OptionModal_default = OptionModal;

// src/rn-alpha/custom/Page.tsx
var import_react_native14 = require("react-native");
var import_jsx_runtime16 = require("react/jsx-runtime");
var Page = ({
  children,
  statusBarStyle,
  statusBarColor,
  statusTextColor,
  edges,
  containerStyle,
  color = "background",
  flex = 1,
  ...rest
}) => {
  const { colors, colorMode } = use_color_default();
  const resolvedStatusColor = statusBarColor ? typeof statusBarColor === "string" && colors[statusBarColor] ? colors[statusBarColor] : statusBarColor : typeof color === "string" && colors[color] ? colors[color] : void 0;
  const inferredStatusStyle = statusTextColor === "light" ? "light-content" : statusTextColor === "dark" ? "dark-content" : statusTextColor != null ? statusTextColor : colorMode === "dark" ? "light-content" : "dark-content";
  const barStyle = statusBarStyle != null ? statusBarStyle : inferredStatusStyle;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
    SafeAreaView_default,
    {
      edges,
      containerStyle,
      color,
      flex,
      ...rest,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          import_react_native14.StatusBar,
          {
            translucent: false,
            barStyle,
            backgroundColor: typeof resolvedStatusColor === "string" ? resolvedStatusColor : void 0
          }
        ),
        children
      ]
    }
  );
};
var Page_default = Page;

// src/rn-alpha/custom/Modal.tsx
var import_react_native15 = require("react-native");
var import_jsx_runtime17 = require("react/jsx-runtime");
var Modal3 = ({ modal, setModal, close, full, children }) => {
  const closeFunc = () => {
    close == null ? void 0 : close();
    setModal(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_jsx_runtime17.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
    import_react_native15.Modal,
    {
      animationType: "slide",
      transparent: true,
      visible: modal,
      onRequestClose: closeFunc,
      children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(KeyboardView_default, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(View_default, { flex: 1, color: "modal", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react_native15.TouchableWithoutFeedback, { onPress: closeFunc, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(View_default, { flex: full ? 0.1 : 1 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
          View_default,
          {
            color: "background",
            btrr: 22,
            btlr: 22,
            style: full ? {
              flex: 1
            } : {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              maxHeight: height * 0.9
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(View_default, { pv: 10, pb: 25, onTouchStart: closeFunc, children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(View_default, { width: 50, height: 4, color: "medium", br: 3, align: "center" }) }),
              children,
              /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(View_default, { height: ios ? 40 : 0 })
            ]
          }
        )
      ] }) })
    }
  ) });
};
var Modal_default = Modal3;

// src/rn-alpha/custom/Button.tsx
var import_react15 = require("react");
var import_react_native16 = require("react-native");
var import_jsx_runtime18 = require("react/jsx-runtime");
var DOT_COUNT = 3;
var LoadingDots = ({ color, size = 6, duration = 600 }) => {
  const progress = (0, import_react15.useRef)(
    Array.from({ length: DOT_COUNT }, () => new import_react_native16.Animated.Value(0))
  ).current;
  (0, import_react15.useEffect)(() => {
    const animations = progress.map(
      (value, index) => import_react_native16.Animated.loop(
        import_react_native16.Animated.sequence([
          import_react_native16.Animated.delay(index * (duration / DOT_COUNT)),
          import_react_native16.Animated.timing(value, {
            toValue: 1,
            duration: duration / 2,
            easing: import_react_native16.Easing.inOut(import_react_native16.Easing.ease),
            useNativeDriver: true
          }),
          import_react_native16.Animated.timing(value, {
            toValue: 0,
            duration: duration / 2,
            easing: import_react_native16.Easing.inOut(import_react_native16.Easing.ease),
            useNativeDriver: true
          })
        ])
      )
    );
    animations.forEach((animation) => animation.start());
    return () => {
      animations.forEach((animation) => animation.stop());
    };
  }, [progress, duration]);
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(View_default, { fd: "flex-row", children: progress.map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    import_react_native16.Animated.View,
    {
      style: {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        marginLeft: index === 0 ? 0 : size * 0.6,
        opacity: value.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1]
        }),
        transform: [
          {
            scale: value.interpolate({
              inputRange: [0, 1],
              outputRange: [0.6, 1]
            })
          }
        ]
      }
    },
    index
  )) });
};
var Button = (props) => {
  var _a;
  const { colors } = use_color_default();
  const {
    title,
    mt,
    mv,
    size,
    onPress,
    color = "primary",
    textColor = "light",
    disabled = false,
    pv = 15,
    ph,
    br = 8,
    weight = "Bold",
    bw,
    bc,
    icon,
    iconSize,
    loading
  } = props;
  const disable = disabled || loading;
  const loaderColor = (_a = colors[textColor]) != null ? _a : textColor;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(import_jsx_runtime18.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(TouchableOpacity_default, { onPress, disabled: disable, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    View_default,
    {
      mv,
      opacity: disable ? 0.6 : 1,
      pv,
      ph,
      br,
      mt,
      color,
      bw,
      bc,
      fd: "flex-center",
      children: [
        icon && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(View_default, { mr: 10, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(Svg_default, { icon, size: iconSize || 22, color: textColor }) }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
          Text_default,
          {
            size: size || 16,
            weight,
            color: textColor,
            align: "center",
            children: title
          }
        ),
        loading && /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(View_default, { ml: 10, children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(LoadingDots, { color: typeof loaderColor === "string" ? loaderColor : String(loaderColor), size: 6 }) })
      ]
    }
  ) }) });
};
var Button_default = Button;

// src/rn-alpha/custom/Svg.tsx
var import_react_native_svg = require("react-native-svg");
var import_jsx_runtime19 = require("react/jsx-runtime");
var Svg = ({ icon, color, size, w }) => {
  const { colors } = use_color_default();
  const SvgImage = () => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(View_default, { w: w || size || 24, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_react_native_svg.SvgXml, { color: color ? colors[color] ? colors[color] : color : void 0, height: size || 24, xml: icon, width: "100%" }) });
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(SvgImage, {});
};
var Svg_default = Svg;

// src/rn-alpha/custom/Inputs/Input.tsx
var import_react16 = require("react");
var import_react_native17 = require("react-native");

// src/utils/money.ts
function money(num, decimal) {
  if (num || num === 0) {
    return num.toFixed(decimal).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return "-.--";
}
var money_default = money;

// src/config.ts
var naira = "\u20A6";
var config = {
  naira,
  baseUrl: ""
};
var config_default = config;

// src/rn-alpha/custom/Inputs/InputConfig.ts
var basePaddingHorizontal = 16;
var basePaddingVertical = ios ? 16 : 14;
var inputConfig = {
  control: {
    radius: 10,
    borderWidth: 1,
    backgroundColorToken: "background",
    disabledOpacity: 0.55,
    gap: 10
  },
  label: {
    size: 14,
    weight: "SemiBold",
    spacingBottom: 6
  },
  helper: {
    size: 11,
    spacingTop: 6,
    spacingLeft: 0
  },
  textField: {
    paddingHorizontal: basePaddingHorizontal,
    paddingVertical: ios ? 18 : 14,
    height: void 0,
    iconSpacing: 14,
    showMoneyIcon: true
  },
  password: {
    toggleSize: 20,
    toggleColor: "#949494"
  },
  select: {
    paddingHorizontal: basePaddingHorizontal,
    paddingVertical: basePaddingVertical,
    height: 56,
    iconWrapperSize: 32,
    iconWrapperRadius: 50,
    loaderSize: 18,
    dropdownIconSize: 10,
    modalPadding: 24,
    optionGap: 15,
    optionPaddingVertical: 15
  },
  datePicker: {
    paddingHorizontal: basePaddingHorizontal,
    paddingVertical: basePaddingVertical,
    iconSize: 20,
    dateFormat: "MMM D, YYYY",
    timeFormat: "h:mm A"
  },
  searchField: {
    radius: 10,
    borderWidth: 0.5,
    paddingHorizontal: basePaddingHorizontal,
    paddingVertical: ios ? 15 : 10,
    textGap: 10,
    iconSize: 20,
    clearSize: 22
  },
  filterSearch: {
    radius: 50,
    fieldPaddingLeft: 10,
    buttonPaddingHorizontal: 15,
    buttonPaddingVertical: 13,
    iconSize: 25
  },
  phoneNumber: {
    height: 60,
    selectHeight: 58,
    inputHeight: 58,
    dialCodeFontSize: 32,
    dialCodePaddingHorizontal: 15,
    gap: 6,
    maxLength: 11
  },
  checkbox: {
    size: 22,
    borderWidth: 2,
    circularRadius: 50,
    squareRadius: 4,
    innerSize: 12
  },
  otp: {
    width: 63,
    height: 69,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 32,
    gap: 12
  }
};
var InputConfig_default = inputConfig;

// src/rn-alpha/custom/Inputs/Label.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
var Label = (props) => {
  const { label, error, focus, value } = props;
  const color = error ? "danger" : focus ? "primary" : "text";
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_jsx_runtime20.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(View_default, { mb: InputConfig_default.label.spacingBottom, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    Text_default,
    {
      size: InputConfig_default.label.size,
      color,
      weight: InputConfig_default.label.weight,
      children: label
    }
  ) }) });
};
var Label_default = Label;

// src/rn-alpha/custom/Inputs/ErrorText.tsx
var import_jsx_runtime21 = require("react/jsx-runtime");
var ErrorText = ({ error }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
    Text_default,
    {
      size: InputConfig_default.helper.size,
      color: "danger",
      mt: InputConfig_default.helper.spacingTop,
      ml: InputConfig_default.helper.spacingLeft,
      children: error
    }
  );
};
var ErrorText_default = ErrorText;

// src/rn-alpha/custom/Inputs/Input.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
var Input = (props) => {
  const [focus, setFocus] = (0, import_react16.useState)(false);
  const { colors } = use_color_default();
  const {
    placeholder,
    onBlur,
    onFocus,
    mt,
    bw,
    multiline,
    height: height2,
    h,
    editable,
    maxLength,
    money: money2,
    keyboardType,
    autoCapitalize,
    error,
    onChangeText,
    value,
    style,
    label,
    ph,
    autoFocus,
    onSubmitEditing
  } = props;
  const bc = error ? colors.danger : focus ? colors.primary : colors.border;
  const { control, textField } = InputConfig_default;
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(View_default, { mt, style, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Label_default, { label, focus, value, error: !!error }),
    /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
      View_default,
      {
        br: control.radius,
        fd: "flex-row",
        color: colors[control.backgroundColorToken] || colors.background,
        bw: bw || control.borderWidth,
        bc,
        children: [
          money2 && textField.showMoneyIcon && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(View_default, { fd: "flex-center", pl: textField.iconSpacing, children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(Text_default, { size: 16, color: "text2", mb: ios ? 0 : -2.5, children: naira }) }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
            import_react_native17.TextInput,
            {
              returnKeyType: keyboardType === "number-pad" || money2 ? "done" : void 0,
              style: {
                flex: 1,
                paddingHorizontal: money2 ? 5 : ph || textField.paddingHorizontal,
                paddingVertical: textField.paddingVertical,
                height: height2 || h || textField.height,
                color: colors.text
              },
              maxLength,
              multiline,
              placeholder: focus ? "" : placeholder,
              keyboardType: money2 ? "number-pad" : keyboardType,
              placeholderTextColor: colors.placeholder,
              autoCapitalize,
              value: money2 ? value ? money_default(Number(value), 2) : null : value,
              onChangeText: (text) => {
                if (money2) {
                  onChangeText(Number(text.replace(/[,.]/g, "")) / 100);
                } else {
                  onChangeText(text);
                }
              },
              editable,
              onBlur: () => {
                onBlur == null ? void 0 : onBlur();
                setFocus(false);
              },
              onFocus: () => {
                onFocus == null ? void 0 : onFocus();
                setFocus(true);
              },
              autoFocus,
              onSubmitEditing
            }
          )
        ]
      }
    ),
    error && /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(ErrorText_default, { error })
  ] });
};
var Input_default = Input;

// src/rn-alpha/custom/Inputs/Switch.tsx
var import_react_native18 = require("react-native");
var import_jsx_runtime23 = require("react/jsx-runtime");
var Switch = (props) => {
  const { colors } = use_color_default();
  const { disabled, active, onToggle } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    import_react_native18.Switch,
    {
      trackColor: { false: colors.medium, true: colors.primary },
      thumbColor: colors.light,
      ios_backgroundColor: colors.shade,
      onValueChange: () => onToggle(!active),
      value: active,
      disabled
    }
  );
};
var Switch_default = Switch;

// src/rn-alpha/custom/Inputs/Select.tsx
var import_react17 = require("react");
var import_react_native19 = require("react-native");

// src/assets/icons/index.ts
var check = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"/></svg>
`;
var selectToggle = `
    <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.833496 0.333008L5.00016 4.49967L9.16683 0.333008H0.833496Z" fill="currentColor"/>
</svg>
`;
var calender = `
<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66667 1.66699V4.16699M13.3333 1.66699V4.16699M2.91667 7.57533H17.0833M17.5 7.08366V14.167C17.5 16.667 16.25 18.3337 13.3333 18.3337H6.66667C3.75 18.3337 2.5 16.667 2.5 14.167V7.08366C2.5 4.58366 3.75 2.91699 6.66667 2.91699H13.3333C16.25 2.91699 17.5 4.58366 17.5 7.08366Z" stroke="currentColor" stroke-opacity="0.56" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.99628 11.417H10.0046M6.91211 11.417H6.92044M6.91211 13.917H6.92044" stroke="currentColor" stroke-opacity="0.56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
var cancel = `
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.757812 11.2431L6.00081 6.00008M11.2438 0.75708L5.99981 6.00008M5.99981 6.00008L0.757812 0.75708M6.00081 6.00008L11.2438 11.2431" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
var search = `
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.6781 12.9272C15.8884 11.2756 16.4305 9.22795 16.1959 7.19385C15.9613 5.15975 14.9673 3.28923 13.4128 1.95652C11.8583 0.623812 9.85794 -0.0728086 7.81187 0.00602988C5.76581 0.0848684 3.82496 0.933352 2.37762 2.38173C0.930277 3.83011 0.0831823 5.77156 0.00580795 7.81768C-0.0715664 9.8638 0.626485 11.8637 1.96031 13.4172C3.29413 14.9708 5.16536 15.9634 7.19963 16.1966C9.23389 16.4297 11.2812 15.8861 12.9319 14.6746H12.9306C12.9681 14.7246 13.0081 14.7721 13.0531 14.8184L17.8654 19.6307C18.0998 19.8652 18.4178 19.9971 18.7493 19.9972C19.0809 19.9973 19.399 19.8657 19.6335 19.6313C19.8681 19.3969 19.9999 19.079 20 18.7474C20.0001 18.4158 19.8685 18.0978 19.6341 17.8633L14.8218 13.0509C14.7771 13.0057 14.7291 12.9639 14.6781 12.9259V12.9272ZM15.0006 8.12238C15.0006 9.02518 14.8227 9.91915 14.4773 10.7532C14.1318 11.5873 13.6254 12.3452 12.987 12.9836C12.3486 13.6219 11.5907 14.1283 10.7567 14.4738C9.92258 14.8193 9.02862 14.9971 8.12582 14.9971C7.22301 14.9971 6.32905 14.8193 5.49497 14.4738C4.66089 14.1283 3.90302 13.6219 3.26464 12.9836C2.62626 12.3452 2.11987 11.5873 1.77438 10.7532C1.4289 9.91915 1.25108 9.02518 1.25108 8.12238C1.25108 6.29908 1.97538 4.55047 3.26464 3.2612C4.55391 1.97194 6.30252 1.24764 8.12582 1.24764C9.94911 1.24764 11.6977 1.97194 12.987 3.2612C14.2763 4.55047 15.0006 6.29908 15.0006 8.12238Z" fill="currentColor"/>
</svg>
`;
var eye = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
`;
var eyeOff = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
`;
var clock = `
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>   
`;

// src/rn-alpha/custom/Inputs/Select.tsx
var import_react_native_indicators2 = require("react-native-indicators");

// src/rn-alpha/custom/Loader.tsx
var import_react_native_indicators = require("react-native-indicators");
var import_jsx_runtime24 = require("react/jsx-runtime");
var Loader = ({ text, loading, color }) => {
  const { colors } = use_color_default();
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_jsx_runtime24.Fragment, { children: loading && /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(View_default, { flex: 1, fd: "col-center", pv: 25, children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_react_native_indicators.SkypeIndicator, { size: 35, count: 6, color: color || colors.primary }),
    text && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Text_default, { size: 15, mt: 15, color: "text", children: text })
  ] }) });
};
var Loader_default = Loader;

// src/rn-alpha/custom/Inputs/Select.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
var Select = (props) => {
  var _a, _b;
  const {
    defaultValue: defaultValue3,
    loading,
    onChange,
    placeholder,
    bw,
    mt,
    disabled,
    error,
    icon,
    options,
    search: search2,
    label,
    style,
    h,
    pv,
    renderSelect,
    color
  } = props;
  const [modal, setModal] = (0, import_react17.useState)(false);
  const [current, setCurrent] = (0, import_react17.useState)({ value: "", label: "", text: "", icon: null, output: null });
  const [filter, setFilter] = (0, import_react17.useState)("");
  const { colors } = use_color_default();
  const { control, select: selectConfig } = InputConfig_default;
  const fieldColor = color ? (_a = colors[color]) != null ? _a : color : (_b = colors[control.backgroundColorToken]) != null ? _b : colors.background;
  (0, import_react17.useEffect)(() => {
    var _a2;
    const selected = (_a2 = options == null ? void 0 : options.filter((r) => r.value === defaultValue3)) == null ? void 0 : _a2[0];
    if (selected) {
      setCurrent(selected);
    }
  }, []);
  const handleSelect = (data) => {
    import_react_native19.Keyboard.dismiss();
    if (current.value === data.value) {
      const value = { value: "", label: "", text: "" };
      setCurrent(value);
      onChange(value);
    } else {
      setCurrent(data);
      onChange(data);
      setModal(false);
    }
  };
  const goBack = () => {
    setCurrent({ value: "", label: "", text: "" });
    onChange({ value: "", label: "" });
    setModal(false);
  };
  const submit = () => {
    setModal(false);
    onChange(current);
    setFilter("");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(import_jsx_runtime25.Fragment, { children: [
    renderSelect ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native19.TouchableWithoutFeedback, { disabled, onPress: () => {
      import_react_native19.Keyboard.dismiss();
      setModal(true);
    }, children: renderSelect(current) }) : /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(View_default, { style: { marginTop: mt, ...style }, children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Label_default, { label }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native19.TouchableWithoutFeedback, { disabled, onPress: () => {
        import_react_native19.Keyboard.dismiss();
        setModal(true);
      }, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
        View_default,
        {
          opacity: disabled ? control.disabledOpacity : 1,
          br: control.radius,
          color: fieldColor,
          ph: selectConfig.paddingHorizontal,
          pv: pv || selectConfig.paddingVertical,
          fd: "flex-item",
          bw: bw || control.borderWidth,
          bc: error ? "danger" : "border",
          h: h || selectConfig.height,
          gap: control.gap,
          children: [
            icon && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              View_default,
              {
                width: selectConfig.iconWrapperSize,
                height: selectConfig.iconWrapperSize,
                fd: "flex-center",
                br: selectConfig.iconWrapperRadius,
                mr: 10,
                color: "shade3",
                children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Svg_default, { icon, color: "primary" })
              }
            ),
            current.icon,
            /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(View_default, { style: { flex: 1 }, ml: current.icon ? 10 : 0, children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
                Text_default,
                {
                  weight: current.text ? "Medium" : "Regular",
                  color: current.value ? colors.text : colors.placeholder,
                  numberOfLines: 1,
                  children: current.value ? current.output ? current.output : current.label : placeholder || "Select"
                }
              ),
              !!current.text && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Text_default, { color: "medium", children: current.value ? current.text : "" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(View_default, { ml: 5, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native_indicators2.UIActivityIndicator, { size: selectConfig.loaderSize, color: colors.text2 }) : /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Svg_default, { icon: selectToggle, color: "text", size: selectConfig.dropdownIconSize }) })
          ]
        }
      ) }),
      error && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(ErrorText_default, { error })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Modal_default, { setModal: submit, modal, full: search2, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(View_default, { flex: 1, children: [
      /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(View_default, { ph: selectConfig.modalPadding, pv: 5, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Text_default, { size: 17, align: "center", weight: "Bold", color: "text", children: label || placeholder || "Select" }) }),
      search2 && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(View_default, { ph: selectConfig.modalPadding, children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(SearchInput_default, { filter, setFilter }) }),
      /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(View_default, { flex: 1, mt: 10, children: [
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Loader_default, { loading: loading || false }),
        /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
          FlatList_default,
          {
            style: { paddingHorizontal: selectConfig.modalPadding },
            data: !loading && (options == null ? void 0 : options.filter((r) => {
              return r.label.toLowerCase().indexOf(filter.toLowerCase()) > -1;
            })) || [],
            showsVerticalScrollIndicator: true,
            keyExtractor: (item) => item.value,
            renderItem: ({ item, index }) => /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_react_native19.TouchableOpacity, { onPress: () => handleSelect(item), children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(View_default, { fd: "flex-between", pv: selectConfig.optionPaddingVertical, btw: index ? 1 : 0, bc: "border", children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(View_default, { flex: 1, mr: 10, fd: "flex-item", gap: selectConfig.optionGap, children: [
                item.icon,
                /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(View_default, { flex: 1, ml: item.icon ? 5 : 0, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Text_default, { size: 13, color: "text", children: item.label }),
                  !!item.text && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Text_default, { size: 13, color: "text2", children: item.text })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(Checkbox_default, { selected: current.value === item.value, setSelected: () => handleSelect(item), color: "primary" })
            ] }) }, item.value)
          }
        )
      ] })
    ] }) })
  ] });
};
var Select_default = Select;

// src/rn-alpha/custom/Inputs/SearchInput.tsx
var import_react_native21 = require("react-native");

// src/rn-alpha/custom/IconBtn.tsx
var import_react_native20 = require("react-native");
var import_jsx_runtime26 = require("react/jsx-runtime");
var IconBtn = ({
  icon,
  onPress,
  size = 18,
  color = "text",
  background,
  width: width2 = 32,
  height: height2 = 32,
  disabled,
  accessibilityLabel,
  style
}) => {
  const { colors } = use_color_default();
  const resolvedColor = typeof color === "string" && colors[color] ? colors[color] : color;
  const resolvedBackground = background && typeof background === "string" && colors[background] ? colors[background] : background;
  const radius = Math.min(width2, height2) / 2;
  return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
    import_react_native20.TouchableOpacity,
    {
      onPress,
      disabled,
      accessibilityRole: "button",
      accessibilityLabel,
      style,
      children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
        View_default,
        {
          fd: "flex-center",
          w: width2,
          h: height2,
          br: radius,
          color: resolvedBackground,
          opacity: disabled ? 0.5 : 1,
          children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(Svg_default, { icon, size, color: resolvedColor })
        }
      )
    }
  );
};
var IconBtn_default = IconBtn;

// src/rn-alpha/custom/Inputs/SearchInput.tsx
var import_jsx_runtime27 = require("react/jsx-runtime");
var SearchInput = (props) => {
  const { filter, setFilter, placeholder = "Search", style, onSubmit, focus } = props;
  const { colors } = use_color_default();
  const searchField = InputConfig_default.searchField;
  return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_jsx_runtime27.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
    View_default,
    {
      br: searchField.radius,
      bc: "border",
      bw: searchField.borderWidth,
      pl: searchField.paddingHorizontal,
      pr: searchField.paddingHorizontal / 2,
      color: "background",
      fd: "flex-item",
      gap: searchField.textGap,
      style,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(Svg_default, { icon: search, size: searchField.iconSize, color: "medium" }),
        /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          import_react_native21.TextInput,
          {
            autoFocus: focus,
            style: {
              flex: 1,
              paddingVertical: searchField.paddingVertical,
              paddingLeft: searchField.textGap,
              color: colors.text
            },
            placeholder,
            placeholderTextColor: colors.placeholder,
            value: filter,
            onChangeText: (text) => {
              setFilter(text);
            },
            returnKeyType: "search",
            onSubmitEditing: ({ nativeEvent }) => onSubmit == null ? void 0 : onSubmit(nativeEvent.text)
          }
        ),
        !!filter && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
          IconBtn_default,
          {
            icon: cancel,
            size: Math.max(searchField.iconSize - 8, 10),
            height: searchField.clearSize,
            width: searchField.clearSize,
            background: "background",
            color: "text",
            onPress: () => setFilter("")
          }
        )
      ]
    }
  ) });
};
var SearchInput_default = SearchInput;

// src/rn-alpha/custom/Inputs/DateSelect.tsx
var import_react18 = require("react");
var import_react_native22 = require("react-native");
var import_react_native_date_picker = __toESM(require("react-native-date-picker"));
var import_jsx_runtime28 = require("react/jsx-runtime");
var DateSelect = ({ placeholder, bw, mt, label, error, onChangeText, value = /* @__PURE__ */ new Date(), style, minimumDate }) => {
  const [open, setOpen] = (0, import_react18.useState)(false);
  const [date, setDate] = (0, import_react18.useState)(value);
  const [edited, setEdited] = (0, import_react18.useState)(false);
  const isDarkMode = (0, import_react_native22.useColorScheme)() === "dark";
  const { colors } = use_color_default();
  const textColor = isDarkMode ? colors.background : colors.text;
  const { control, datePicker } = InputConfig_default;
  const backgroundColor = colors[control.backgroundColorToken] || colors.background;
  const onConfirm = (date2) => {
    setOpen(false);
    setDate(date2);
    setEdited(true);
    onChangeText(date2);
  };
  const onOpen = () => {
    setOpen(true);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(View_default, { mt, style, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Label_default, { label }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(import_react_native22.TouchableWithoutFeedback, { onPress: onOpen, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
      View_default,
      {
        br: control.radius,
        fd: "flex-center",
        color: backgroundColor,
        bw: bw || control.borderWidth,
        bc: colors.border,
        ph: datePicker.paddingHorizontal,
        pv: datePicker.paddingVertical,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(View_default, { flex: 1, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Text_default, { style: { color: edited ? colors.text : colors.placeholder }, children: edited ? (0, import_dayjs.default)(date).format(datePicker.dateFormat) : placeholder }) }),
          /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(View_default, { width: 24, children: /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Svg_default, { icon: calender, color: "medium" }) })
        ]
      }
    ) }),
    error && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(ErrorText_default, { error }),
    /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(
      import_react_native_date_picker.default,
      {
        modal: true,
        textColor: ios ? textColor : void 0,
        title: placeholder,
        open,
        date,
        mode: "date",
        minimumDate,
        onConfirm,
        onCancel: () => {
          setOpen(false);
        }
      }
    )
  ] });
};
var DateSelect_default = DateSelect;

// src/rn-alpha/custom/Inputs/DateTimeInput.tsx
var import_react19 = require("react");
var import_react_native23 = require("react-native");
var import_react_native_date_picker2 = __toESM(require("react-native-date-picker"));
var import_jsx_runtime29 = require("react/jsx-runtime");
var DateTimeInput = (props) => {
  const { disabled, placeholder, mode = "date", bw, mt, label, error, onChangeText, value, style, minimumDate } = props;
  const [open, setOpen] = (0, import_react19.useState)(false);
  const [date, setDate] = (0, import_react19.useState)();
  const [edited, setEdited] = (0, import_react19.useState)(false);
  const isDarkMode = (0, import_react_native23.useColorScheme)() === "dark";
  const { colors } = use_color_default();
  const textColor = isDarkMode ? colors.light : colors.dark;
  const { control, datePicker } = InputConfig_default;
  const backgroundColor = colors[control.backgroundColorToken] || colors.background;
  (0, import_react19.useEffect)(() => {
    if (value) {
      setDate(value);
      setEdited(true);
    }
  }, [value]);
  const onConfirm = (date2) => {
    setOpen(false);
    setDate(date2);
    setEdited(true);
    onChangeText(date2);
  };
  const onOpen = () => {
    import_react_native23.Keyboard.dismiss();
    setTimeout(() => {
      setOpen(true);
    }, 40);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(View_default, { mt, style, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Label_default, { label, focus: open, value: edited, error: !!error }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      import_react_native23.TouchableWithoutFeedback,
      {
        onPress: onOpen,
        disabled,
        children: /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
          View_default,
          {
            br: control.radius,
            fd: "flex-center",
            color: backgroundColor,
            bw: bw || control.borderWidth,
            bc: colors.border,
            ph: datePicker.paddingHorizontal,
            pv: datePicker.paddingVertical,
            gap: control.gap,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(View_default, { flex: 1, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Text_default, { style: { color: edited ? colors.text : colors.placeholder }, children: edited ? (0, import_dayjs.default)(date).format(mode === "time" ? datePicker.timeFormat : datePicker.dateFormat) : placeholder }) }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(View_default, { width: 24, children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(Svg_default, { icon: mode === "time" ? clock : calender, color: "medium" }) })
            ]
          }
        )
      }
    ),
    error && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(ErrorText_default, { error }),
    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
      import_react_native_date_picker2.default,
      {
        modal: true,
        textColor: ios ? textColor : void 0,
        title: placeholder,
        open,
        date: date || /* @__PURE__ */ new Date(),
        mode,
        minimumDate,
        onConfirm,
        onCancel: () => {
          setOpen(false);
        }
      }
    )
  ] });
};
var DateTimeInput_default = DateTimeInput;

// src/rn-alpha/custom/Inputs/Checkbox.tsx
var import_react_native24 = require("react-native");
var import_jsx_runtime30 = require("react/jsx-runtime");
var Checkbox = (props) => {
  const { selected, setSelected, color = "primary", box } = props;
  const {
    size,
    borderWidth,
    circularRadius,
    squareRadius,
    innerSize
  } = InputConfig_default.checkbox;
  const br = box ? squareRadius : circularRadius;
  return /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_react_native24.TouchableWithoutFeedback, { onPress: () => setSelected(!selected), children: /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(View_default, { children: selected ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    View_default,
    {
      color: box ? "primary" : "background",
      bc: color,
      size,
      bw: borderWidth,
      br,
      padding: 2,
      fd: "flex-center",
      children: box ? /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Svg_default, { icon: check, color: "light", size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(View_default, { color, size: innerSize, br })
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
    View_default,
    {
      color: "background",
      bc: "medium",
      size,
      bw: borderWidth,
      br,
      padding: 1,
      fd: "flex-center"
    }
  ) }) });
};
var Checkbox_default = Checkbox;

// src/rn-alpha/custom/Inputs/Password.tsx
var import_react20 = require("react");
var import_react_native25 = require("react-native");
var import_jsx_runtime31 = require("react/jsx-runtime");
var Password = (0, import_react20.forwardRef)((props, ref) => {
  const {
    placeholder,
    mt,
    bw,
    keyboardType,
    error,
    onChangeText,
    value,
    style,
    label,
    onSubmitEditing
  } = props;
  const [focus, setFocus] = (0, import_react20.useState)(false);
  const [show, setShow] = (0, import_react20.useState)(false);
  const { colors } = use_color_default();
  const bc = error ? colors.danger : focus ? colors.primary : colors.border;
  const { control, textField, password } = InputConfig_default;
  const backgroundColor = colors[control.backgroundColorToken] || colors.background;
  return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(View_default, { mt, style, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(Label_default, { label, focus, value, error: !!error }),
    /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
      View_default,
      {
        br: control.radius,
        fd: "flex-center",
        color: backgroundColor,
        bw: bw || control.borderWidth,
        bc,
        pl: textField.paddingHorizontal,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            import_react_native25.TextInput,
            {
              ref,
              returnKeyType: keyboardType === "number-pad" ? "done" : void 0,
              style: {
                flex: 1,
                paddingVertical: textField.paddingVertical,
                color: colors.text
              },
              placeholder: focus ? "" : placeholder,
              secureTextEntry: !show,
              placeholderTextColor: colors.placeholder,
              onChangeText,
              value,
              keyboardType,
              onBlur: () => {
                setFocus(false);
              },
              onFocus: () => {
                setFocus(true);
              },
              onSubmitEditing
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            IconBtn_default,
            {
              icon: show ? eye : eyeOff,
              color: password.toggleColor,
              onPress: () => setShow(!show),
              size: password.toggleSize
            }
          )
        ]
      }
    ),
    error && /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(ErrorText_default, { error })
  ] });
});
var Password_default = Password;

// src/rn-alpha/custom/Preloader.tsx
var import_react_native26 = require("react-native");
var import_moti = require("moti");
var import_jsx_runtime32 = require("react/jsx-runtime");
var Preloader = (props) => {
  const { text, title, loading, close, opacity } = props;
  const { colors } = use_color_default();
  return /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(import_jsx_runtime32.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
    import_react_native26.Modal,
    {
      transparent: true,
      visible: loading,
      onRequestClose: () => {
        if (close) {
          close(false);
        }
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(View_default, { flex: 1, color: "#1F2021A3", fd: "flex-center", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)(View_default, { height: 120, position: "absolute", fd: "col-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Text_default, { size: 16, color: "text", weight: "Bold", children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
          import_moti.MotiView,
          {
            from: {
              scale: 1
            },
            animate: {
              scale: 1.5
            },
            transition: {
              type: "timing",
              duration: 700,
              loop: true
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(View_default, { size: 35, br: 6, color: "background", fd: "flex-center", children: /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Image_default, { source: require_icon(), size: 35 }) })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(Text_default, { size: 14, color: "text", children: text })
      ] }) })
    }
  ) });
};
var Preloader_default = Preloader;

// src/rn-alpha/custom/ProgressBar.tsx
var import_jsx_runtime33 = require("react/jsx-runtime");
var clamp = (value) => Math.min(Math.max(value, 0), 1);
var ProgressBar = ({
  progress = 0,
  color = "primary",
  background = "shade",
  height: height2 = 6,
  radius,
  style,
  ...spacing
}) => {
  const { colors } = use_color_default();
  const resolvedProgress = clamp(progress);
  const barRadius = radius != null ? radius : height2 / 2;
  const resolvedBackground = typeof background === "string" && colors[background] ? colors[background] : background;
  const resolvedColor = typeof color === "string" && colors[color] ? colors[color] : color;
  return /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
    View_default,
    {
      color: resolvedBackground,
      h: height2,
      br: barRadius,
      style,
      ...spacing,
      children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
        View_default,
        {
          color: resolvedColor,
          h: height2,
          br: barRadius,
          style: { width: `${resolvedProgress * 100}%` }
        }
      )
    }
  );
};
var ProgressBar_default = ProgressBar;

// src/rn-alpha/custom/Inputs/TextInput.tsx
var import_react21 = __toESM(require("react"));
var import_react_native27 = require("react-native");
var import_jsx_runtime34 = require("react/jsx-runtime");
var TextInput4 = import_react21.default.forwardRef((props, ref) => {
  const { colors } = use_color_default();
  const {
    onChangeText,
    label,
    bbw,
    btw,
    bw,
    bc,
    pv,
    ph,
    p,
    pt,
    placeholder,
    mt,
    maxH,
    minH,
    size,
    weight,
    color,
    br,
    flex,
    error,
    ...others
  } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(View_default, { mt, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(Text_default, { size: 13, color: "text", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(
      import_react_native27.TextInput,
      {
        ref,
        onChangeText,
        style: {
          flex,
          borderWidth: bw,
          borderTopWidth: btw,
          borderBottomWidth: bbw,
          backgroundColor: color ? colors[color] ? colors[color] : color : void 0,
          borderColor: bc ? colors[bc] ? colors[bc] : bc : void 0,
          padding: p,
          paddingVertical: pv,
          paddingHorizontal: ph,
          paddingTop: pt,
          color: colors.text,
          maxHeight: maxH,
          minHeight: minH,
          fontSize: size,
          fontFamily: `Poppins-${weight || "Regular"}`,
          borderRadius: br
        },
        placeholder,
        placeholderTextColor: colors.placeholder,
        ...others
      }
    ),
    error && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(ErrorText_default, { error: error || "" })
  ] });
});
var TextInput_default = TextInput4;

// src/rn-alpha/custom/Menu.tsx
var import_react22 = require("react");
var import_react_native_material_menu = require("react-native-material-menu");
var import_jsx_runtime35 = require("react/jsx-runtime");
var Menu = (props) => {
  const { anchor, options, color, pressColor } = props;
  const [modal, setModal] = (0, import_react22.useState)(false);
  const { colors } = use_color_default();
  return /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(import_jsx_runtime35.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
    import_react_native_material_menu.Menu,
    {
      visible: modal,
      anchor: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(TouchableOpacity_default, { onPress: () => setModal(true), children: anchor }),
      onRequestClose: () => {
        setModal(false);
      },
      style: {
        backgroundColor: color ? colors[color] ? colors[color] : color : colors.background,
        ...elevation(3)
      },
      children: options.map((data, i) => (data.visible === void 0 || data.visible) && /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
        import_react_native_material_menu.MenuItem,
        {
          onPress: () => {
            setModal(false);
            data.onPress();
          },
          textStyle: { color: colors.text },
          pressColor: pressColor ? colors[pressColor] ? colors[pressColor] : pressColor : colors.shade,
          children: data.label
        },
        KEY + i
      ))
    }
  ) });
};
var Menu_default = Menu;

// src/hooks/use-query.tsx
var import_react23 = require("react");

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
  (0, import_react23.useEffect)(() => {
    var _a;
    if (data) {
      (_a = args == null ? void 0 : args.onCompleted) == null ? void 0 : _a.call(args, data);
    }
    if (connected && (thread == null ? void 0 : thread.error) && (!data || (data == null ? void 0 : data.length) < 1)) {
      refetch({});
    }
  }, [connected]);
  (0, import_react23.useEffect)(() => {
    fetch2(variables || {});
  }, []);
  (0, import_react23.useEffect)(() => {
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
  const extendCache = (0, import_react23.useMemo)(() => ({
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

// src/hooks/use-mutation.tsx
var import_react24 = require("react");
var import_react_native28 = require("react-native");
var useMutation = (route, option) => {
  const [loading, setLoading] = (0, import_react24.useState)(false);
  const [error, setError] = (0, import_react24.useState)(void 0);
  const { auth, setTimeout: setTimeout2 } = useApp();
  const [data, setData] = (0, import_react24.useState)();
  const { getContext } = use_cache_default();
  const mutate = (0, import_react24.useCallback)(async (variables) => {
    var _a, _b;
    try {
      if ((option == null ? void 0 : option.keyboard) === void 0 || (option == null ? void 0 : option.keyboard)) {
        import_react_native28.Keyboard.dismiss();
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

// src/hooks/use-dispatch.tsx
var import_react_redux = require("react-redux");
var use_dispatch_default = () => (0, import_react_redux.useDispatch)();

// src/hooks/use-selector.tsx
var import_react_redux2 = require("react-redux");
var useSelector = import_react_redux2.useSelector;
var use_selector_default = useSelector;

// src/rn-alpha/index.ts
var import_formik = require("formik");
import_dayjs.default.extend(import_relativeTime.default);
import_dayjs.default.extend(import_utc.default);
import_dayjs.default.extend(import_timezone.default);
var KEY = Math.random().toString(36).substring(2, 20);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AlertModal,
  AppProvider,
  Button,
  Checkbox,
  Colors,
  DateSelect,
  DateTimeInput,
  ErrorText,
  FlatList,
  Formik,
  IconButton,
  Image,
  ImageBackground,
  Input,
  KEY,
  KeyboardView,
  Label,
  Loader,
  Menu,
  Modal,
  OptionModal,
  PATHS,
  Page,
  Password,
  Preloader,
  ProgressBar,
  SafeAreaView,
  ScrollView,
  SearchInput,
  Select,
  Svg,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Yup,
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
  useColor,
  useDispatch,
  useMutation,
  useQuery,
  useQueryAsync,
  useSelector,
  width
});
//# sourceMappingURL=index.js.map