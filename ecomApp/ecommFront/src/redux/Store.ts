import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Slices/CartSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

let persistConfig = {
  key: "root",
  storage,
}
const rootReducer = combineReducers(
  {
    cart: cartReducer,
  }
)

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer
});

export const persistedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
