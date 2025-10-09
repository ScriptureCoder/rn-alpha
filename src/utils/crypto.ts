import CryptoJS from "react-native-crypto-js";
const key = CryptoJS.enc.Utf8.parse("2vn!H3KXgX-TxvkD");
const iv  = CryptoJS.enc.Utf8.parse("%x%97Uw@*A2xWaUJ");

export const encrypt=(payload:string)=>{
    return CryptoJS.AES.encrypt(payload, key, {iv: iv, mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7}).toString();
}

export const decrypt=(response:string)=>{
    const decrypted_response = CryptoJS.AES.decrypt({ciphertext:CryptoJS.enc.Base64.parse(response)},key,{iv: iv});
    return decrypted_response.toString(CryptoJS.enc.Utf8);
}
