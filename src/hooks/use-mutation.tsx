import {useState, useCallback} from 'react';
import http, { Method } from "../utils/service";
import { useApp } from "store/contexts/app-context";
import { Keyboard } from "react-native";
import PATH from "../paths";
import useCache from './use-cache';
import {Route} from "types";
import Toast from "utils/toast";

type Response = {
	error?:string
	data?:any
	status?:number
}

export type UseMutationProps = {
	loading:boolean,
	error?:string|string[]
	mutate:(variables:any)=>Promise<Response>
	data?:any
}

type Option = {
	keyboard?:boolean
	text?:boolean
}

const useMutation = (route:Route,option?:Option):UseMutationProps => {
	const [loading,setLoading] = useState(false);
	const [error,setError] = useState(undefined);
	const {auth,setTimeout} = useApp();
	const [data,setData] = useState<any>();
	const {getContext} = useCache()

	const mutate = useCallback(async (variables:any):Promise<Response>=>{
		try {
			if (option?.keyboard === undefined || option?.keyboard){
				Keyboard.dismiss()
			}
			const {path, method, rawPath}= getContext(route, variables)
			setLoading(true)
			console.log(variables);
			const res:any = await http(path,method||"POST", variables,true,auth?.accessToken, option?.text)
			console.log(res);
			if ([200,201].includes(res.status)){
				setData(res.data.data)
				setLoading(false)
				return {data:res.data.data,status:res.status}
			}
			let error = res.data?.data?.ResponseDescription || "Oops! an error occurred";


			if (rawPath.includes(":customerId") && [401,404].includes(res.status)){
				error = "Session expired! kindly login"
				await setTimeout()
			}

			setError(error)
			setLoading(false)
			return {error,status:res.status}
		}catch (e:any){
			setLoading(false)
			return {error:e.message||"Oops! an error occurred",status:500}
		}
	},[])

    return {
		mutate,
	    loading,
	    error,
	    data,
	};
};

export default useMutation;
