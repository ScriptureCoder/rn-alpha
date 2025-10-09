import AlphaStorage from "../utils/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AppReducer from "./reducers/app-reducer";
import CacheReducer from "./reducers/cache-reducer";
import ThreadReducer from "./reducers/thread-reducer";

const saveToLocalStorage = (state:any) => {
	try {
		AlphaStorage.setItem('_state', state);
	} catch (e) {
		console.log(e);
	}
};

const loadFromLocalStorage = () => {
	try {
		const serializedState = AlphaStorage.getItem('_state');
		if (serializedState === null) return undefined;
		return serializedState;
	} catch (e) {
		return undefined;
	}
};

const preloadedState = loadFromLocalStorage();

const rootReducer = combineReducers({
	app: AppReducer,
	cache: CacheReducer,
	tread: ThreadReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: preloadedState as Partial<ReturnType<typeof rootReducer>>,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		immutableCheck: false,
		serializableCheck: false,
	}),
});

store.subscribe(() => {
	saveToLocalStorage(store.getState());
	// console.log("update", store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
