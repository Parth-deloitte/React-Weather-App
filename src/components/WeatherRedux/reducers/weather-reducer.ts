import { WeatherData } from "../../weatherTypes";
import { ADD_WEATHER, DELETE_WEATHER } from "../actions/action-types";
export type WeatherReducerState = WeatherData[];
const initialState: WeatherReducerState = [];
const weatherReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_WEATHER:
      state = [...state, action.payload];
      //console.log(state);
      // Add the new weather data to the state
      return state;
    case DELETE_WEATHER:
      return state.filter((weather) => weather.name !== action.payload); // Remove the weather data with matching id
    default:
      return state; // Return the current state for unknown actions
  }
};
export default weatherReducer;
