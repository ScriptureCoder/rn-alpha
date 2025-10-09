import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:any = {};

const cacheSlice = createSlice({
    name: 'cache',
    initialState,
    reducers: {
        init(state, action: PayloadAction<any>) {
            state[action.payload.key] = {
                ...(state[action.payload.key]||{}),
                ...action.payload.value,
            }
        },
        set(state, action: PayloadAction<{ key:string, value:any }>) {
            const timestamp = new Date().getTime()
            const { key, value } = action.payload;
            if (Array.isArray(value)) {
                state[key] = value.map((data:any)=>({...data, timestamp}))
            }
            else if (typeof value === "object" && Object.keys(value).length > 0){
                state[key] = {...value, timestamp}
            }else {
                state[key] = value
            }
        },
        prepend(state, action: PayloadAction<{ key:string, value:any[] }>) {
            const timestamp = new Date().getTime()
            state[action.payload.key] = action.payload.value.map((data:any)=>({...data, timestamp})).concat(state[action.payload.key]||[])
        },
        append(state, action: PayloadAction<{ key:string, value:any[] }>) {
            const timestamp = new Date().getTime()
            state[action.payload.key] = (state[action.payload.key]||[]).concat(action.payload.value.map((data:any)=>({...data, timestamp})))
        },
        paginate(state, action: PayloadAction<{ key:string, data:any, paginationKey:string }>) {
            const timestamp = new Date().getTime()
            const {key, data, paginationKey} = action.payload
            state[key] = {
                ...data,
                [paginationKey]: [...state[key][paginationKey], ...data[paginationKey]],
                timestamp
            }
        },
        remove(state, action: PayloadAction<string>) {
            delete state[action.payload];
            /*const spr:any = {...state}
            delete spr[action.payload];
            state = spr*/
        },
        clear:()=> initialState

    },
});

export const actions = cacheSlice.actions;
export default cacheSlice.reducer;
