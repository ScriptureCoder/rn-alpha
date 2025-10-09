import http from "../utils/service";
import {useApp} from "store/contexts/app-context";
import {useDispatch} from "rn-alpha";
import {actions} from "store/reducers/cache-reducer";
import * as network from "../store/reducers/thread-reducer";
import useCache from "./use-cache";
import {Route} from "types";

type Props = (route:Route, variables?:any, authToken?:string)=>void

const useQueryAsync=():Props=> {
    const {auth} = useApp();
    const app = useApp();
    const {getContext} = useCache();

    const dispatch = useDispatch();
    return async (route: Route, variables: any, authToken?:string) => {
        const {key, method, path} = getContext(route, variables)
        try {
            dispatch(network.actions.set({
                key,
                value: {
                    loading: true,
                    error: undefined
                }
            }))

            const res: any = await http(path, method || "GET", variables||{}, true, authToken||auth.accessToken)
            const error = res.status!==200?res.data?.data?.ResponseDescription || "Oops! an error occurred":undefined;

            dispatch(network.actions.set({
                key: key,
                value: {
                    loading: false,
                    error: error
                }
            }))

            if (res.status === 200) {
                dispatch(actions.set({key, value: res.data.data}))
            } else if (res.status === 401) {
                app.setTimeout().catch(() => {
                })
            }
        } catch (e: any) {
            const error = e.message || "Oops! an error occurred"
            dispatch(network.actions.set({
                key: key,
                value: {
                    loading: false,
                    error: error
                }
            }))
        }
    };
};



export default useQueryAsync;
