import { getPlatformAdapter } from "../platform/registry";
import { ToastDuration } from "../platform/types";

const Toast = (message: string, duration?: ToastDuration) => {
    setTimeout(() => {
        getPlatformAdapter().toast(message, duration || "LONG");
    }, 100);
};

export default Toast;
