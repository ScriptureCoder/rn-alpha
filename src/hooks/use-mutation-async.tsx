import React, {useState, useEffect, useCallback} from 'react';
import http, { Method } from "../utils/service";
import { useApp } from "store/contexts/app-context";
import { Keyboard } from "react-native";
import PATH from "../paths";
import useCache from './use-cache';
import {Route} from "types";

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
	query:(route:Route,variables?:any,authToken?:string,method?:Method)=>Promise<Response>
}

type Option = {
	keyboard?:boolean
}

const useMutation = (route:string,option?:Option):UseMutationProps => {
	const [loading,setLoading] = useState(false);
	const [error,setError] = useState(undefined);
	const {auth,setTimeout} = useApp();
	const [data,setData] = useState<any>();
	const {setCache, getKey} = useCache()

	const mutate = useCallback(async (variables:any):Promise<Response>=>{
		try {
			if (option?.keyboard === undefined || option?.keyboard){
				Keyboard.dismiss()
			}
			const split = route.split(":/")
			const method:any = split[0];
			const path = "/"+split[1].replace(/:\w+/g,(matched:any)=>{
				const spr = {...(variables||{})}
				const key = matched.replace(/\W/g,"");
				delete variables[key]
				return spr[key]
			})
			setLoading(true)
			const res:any = await http(path,method||"POST", variables,true,auth.accessToken)
			if ([200,201].includes(res.status)){
				setData(res.data)
				setLoading(false)
				return {data:res.data.data,status:res.status}
			}
			if (!route.includes(PATH.login)&&[401,404].includes(res.status)){
				await setTimeout()
			}
			const error = res.data?.data?.ResponseDescription || "Oops! an error occurred";
			setError(error)
			setLoading(false)
			return {error,status:res.status}
		}catch (e:any){
			setLoading(false)
			return {error:e.message||"Oops! and error occurred",status:500}
		}
	},[])

	const query =async (route:Route,variables?:any,authToken?:string)=>{
		try {
			setLoading(true)
			const split = route.split(":/")
			const method:any = split[0];
			const path = "/"+split[1].replace(/:\w+/g,(matched:any)=>{
				const spr = {...(variables||{})}
				const key = matched.replace(/\W/g,"");
				delete variables[key]
				return spr[key]
			})
			const res:any = await http(path,method||"GET", variables||{}, true,authToken||auth.accessToken)
			const error = res.status!==200?res.data?.error||"Oops! an error occurred":undefined
			setLoading(false)
			if (res.status === 200){
				const key = getKey(route,variables)
				setCache(key,res.data.data)
				return {status:res.status, data:res.data.data}
			}
			if (!route.includes(PATH.login)&&[401,404].includes(res.status)){
				await setTimeout()
				return {error, status:res.status}
			}
			return {error}
		}catch (e:any){
			setLoading(false)
			return {error:e.message||"Oops! and error occurred",status:500}
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

export default useMutation;
