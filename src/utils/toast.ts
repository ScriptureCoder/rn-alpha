import SimpleToast from "react-native-simple-toast";

const Toast=(message:string, duration?:"SHORT"|"LONG")=>{
    setTimeout(()=>{
        SimpleToast.show(message,SimpleToast[duration||"LONG"])
    },100)
};

export default Toast;
