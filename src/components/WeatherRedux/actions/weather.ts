import { WeatherData } from "../../weatherTypes";
import { ADD_WEATHER, DELETE_WEATHER } from "./action-types";

// it is return action object that's why we are wrapping it with ()
export const addWeather = (weather: WeatherData) => ({
  type: ADD_WEATHER,
  payload: weather,
});

export const deleteWeather = (name: string) => ({
  type: DELETE_WEATHER,
  payload: name,
});
