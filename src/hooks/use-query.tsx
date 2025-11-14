import { useEffect, useMemo } from "react";
import http from "../utils/service";
import {useApp} from "store/contexts/app-context";
import useDispatch from "./use-dispatch";
import useSelector from "./use-selector";
import {actions} from "store/reducers/cache-reducer";
import * as network from "../store/reducers/thread-reducer";
import {store} from "store";
import useCache from "./use-cache";
import {useSocket} from "store/contexts/socket-context";
import {Route} from "types";

type Props = {
    data:any|any[]
    loading:boolean
    error:string|undefined
    key:string
    refetch:(variables?:any)=>void
    fetchMore:(variables?:any,concat?:'start'|'end'|'pagination', paginationKey?:string)=>Promise<any>
    update:(data:any)=>void
    updateValue:(arg:string,value:any)=>void
    updateValues:(values:any)=>void
    updateItem:(id:string,value:any)=>void
    deleteItem:(id:string)=>void
    prepend:(data:any)=>void
    append:(data:any)=>void
};

type NetworkPolicy = 'network-and-cache'|'cache-only'|'network-only'|'cache-first'

type Args = {
    variables?:any
    networkPolicy?:NetworkPolicy
    init?:any
    onCompleted?:(data:any)=>void
    onError?:(error:any, status?:number)=>void
}

const useQuery=(route:Route, args?:Args):Props=> {
    const { variables={}, networkPolicy, init, onCompleted } = args||{};
    const {auth} = useApp();
    const app = useApp();
    const cache = useCache()
    const {key, path, method}= cache.getContext(route, variables)
    const policy = networkPolicy||"cache-first"

    const data = useSelector((state)=>state.cache[key]);
    const thread = useSelector((state)=>state.tread[key]);

    const dispatch = useDispatch();
    const { connected } = useSocket();

    useEffect(()=>{
        if (data){
            args?.onCompleted?.(data)
        }
        if (connected && thread?.error && (!data || data?.length<1)) {
            refetch({})
        }
    },[connected]);

    useEffect(() => {
        fetch(variables||{})
    }, []);

    useEffect(()=>{
        if (init){
            const data = store.getState().cache[key];
            if (init?.timestamp > (data?.timestamp||0)){
                dispatch(actions.init({key:key, value:init}))
            }
        }
    },[init?.timestamp]);

    const setThread=(key:string, loading:boolean, error?:any)=>{
        dispatch(network.actions.set({
            key,
            value: {
                loading,
                error
            }
        }))
    }

    const fetch=(variables:any)=>{
        switch (policy){
            case "cache-only":
                return;
            case "network-only":
                fetchHandler(variables).catch(()=>{})
                return;
            case "cache-first":
                if (!data){
                    fetchHandler(variables).catch(()=>{})
                }
                return;
            case "network-and-cache":
                fetchHandler(variables).catch(()=>{})
                setTimeout(()=>{
                    const thread = store.getState().tread[key]
                    if (thread?.loading){
                        console.log("still loading");
                        refetch({})
                    }
                },10 * 1000)
                return;
        }
    }

    const fetchHandler = async (variables:any, refetch?:boolean)=>{
        try {
            const thread = store.getState().tread[key];
            if (!thread || !thread?.loading || thread?.error || refetch){
                setThread(key, true);
                const res:any = await http(path,method||"GET", variables, true, auth.accessToken)
                const error = res.status!==200?res.data?.data?.ResponseDescription || "Oops! an error occurred":undefined;
                setThread(key, false, error);
                console.log(path, res.status);
                if (res.status === 200 && res.data.data){
                    args?.onCompleted?.(res.data.data)
                    cache.setCache(key, res.data.data)
                }
                else if([401,404].includes(res.status)) {
                    app.setTimeout().catch(()=>{})
                }
                else if (error){
                    args?.onError?.(error, res.status)
                }
            }
        }catch (e:any){
            const error = e.message||"Oops! an error occurred"
            setThread(key, false, error);
            args?.onError?.(error, 500)
        }
    }

    const refetch =(args:any)=>{
        fetchHandler({...variables, ...(args||{}) }, true).catch(()=>{})
    }

    const fetchMore = async (args:any,concat?:'start'|'end'|'pagination', paginationKey?:string)=>{
        const res:any = await http(path,method||"GET", { ...variables, ...(args||{}) }, true, auth?.accessToken)
        const error = res.status!==200?res.data?.data?.ResponseDescription||"Oops! an error occurred":undefined
        if (res.status === 200){
            if (concat==='start'){
                dispatch(actions.prepend({key, value:res.data.data}))
            }
            else if (concat==='end'){
                dispatch(actions.prepend({key, value:res.data.data}))
            }
            else if (concat==='pagination'){
                dispatch(actions.paginate({key, data:res.data.data, paginationKey:paginationKey||"data"}))
            }
            return {data:res.data.data}
        }
        else if(res.status === 401) {
            app.setTimeout().catch(()=>{})
            return {error}
        }
        return {error}
    }

    const extendCache = useMemo(() => ({
        update:(data:any)=>{
            cache.update(key, data)
        },
        updateValue:(arg:string,value:any)=>{
            cache.updateValue(key, arg, value)
        },
        updateValues:(values:any)=>{
            cache.updateValues(key, values)
        },
        updateItem:(id:string,value:any)=>{
            cache.updateItem(key, id, value)
        },
        deleteItem:(id:string)=>{
            cache.deleteItem(key, id)
        },
        prepend:(data:any)=>{
            cache.prepend(key, data)
        },
        append:(data:any)=>{
            cache.append(key, data)
        },
    }),[]);

    return {
        data:data || init,
        loading:thread?.loading,
        error:thread?.error,
        refetch,
        key:key,
        fetchMore,
        ...extendCache
    };
};



export default useQuery;
