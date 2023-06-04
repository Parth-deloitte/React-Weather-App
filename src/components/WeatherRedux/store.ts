import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./reducers/weather-reducer";
const { createStore } = require("redux");
const rootReducer = combineReducers({ weatherReducer });
const store = createStore(rootReducer);

export default store;
