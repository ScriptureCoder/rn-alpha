import config from "config";

type Auth = string

export type Method = 'POST'|'GET'|'PUT'|'DELETE'

async function http(path:string,method:Method, data:any, status?:boolean, auth?:Auth, text?:boolean) {

    let headers:any = {};
    if (auth){
        headers = {
            "Auth_IDToken":auth
        }
    }
    method = method||'GET';
    let query = '';
    if (method==="GET"){
        // @ts-ignore
        for (const [i, key] of Object.keys(data).entries()) {
            query+= `${i===0?'?':'&'}${key}=${data[key]}`
        }
    }

    let formBody:any = undefined;
    if (data){
        formBody = [];
        for (let property in data) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    }

    const url = config.baseUrl+path+query
    const init = {
        method,
        headers:{
            "Accept": 'application/json',
            "Content-Type": 'application/x-www-form-urlencoded',
            ...headers,
        },
        body: method==="GET"?undefined:data && formBody
    }

    return new Promise((resolve, reject) => {
        fetch(url, init)
            .then(async (response) => {
                if (status) return {
                    data:{
                        data: await (text? response.text().catch(()=>{}) : response.json().catch(()=>{}))
                    },
                    status:response.status
                }
                return response.json().catch(()=>{})
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                resolve({data:{error:error?.message},status:500})
            });
    });
}

export default http;
