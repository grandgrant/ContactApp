import { combineReducers } from "redux";
import contactReducer from "./contact/contactSlices";
import { configureStore } from "@reduxjs/toolkit";


const reducer = combineReducers({
    contact: contactReducer
})

export const store = configureStore({
    reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch