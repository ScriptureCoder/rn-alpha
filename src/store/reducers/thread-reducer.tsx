import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:any = {};

const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {
        set(state, action: PayloadAction<{ key:string, value:{ loading:boolean, error?:string } }>) {
            state[action.payload.key] = action.payload.value
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

export const actions = threadSlice.actions;
export default threadSlice.reducer;
