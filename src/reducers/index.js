import { combineReducers } from "redux";
////
import weatherData from "./weatherData";
import toggleMask from "./toggleMask";
import forecastData from "./forecastData";
////
export default combineReducers({
  weatherData,
  forecastData,
  toggleMask
});
