import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import cartReducer from "../slices/cart.slice"
import authReducer from "../slices/auth.slice";


const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  auth: authReducer,
  cart:cartReducer
});


const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware:[thunk]
});



export const persistor = persistStore(store)