import axios from "../API/axiosApi";
///// project files
import {
  FETCH_WEATHER_DATA,
  FETCH_FORECAST_DATA,
  DELETE_ROWS,
  TOGGLE_MASK
} from "./types";

const APP_ID = "b3e4ac819a75b7e1ffe53d3d5701cc90";
////////*************************** actions
let counter = 1;
export const fetchCityWeather = (cityName, countryName, searchBoxObject) => {
  return async dispatch => {     
    try {
      const response = await axios({
        method: "get",
        url: `weather?q=${cityName},${countryName}&units=metric&appid=${APP_ID}`
      });
      const {
        coord,
        main: { humidity, pressure, temp }
      } = response.data;

      searchBoxObject.setState({ foundCity: true, loading: false });
      dispatch({
        type: FETCH_WEATHER_DATA,
        payload: {
          id: counter++,
          cityName,
          countryName,
          googleMap: coord,
          humidity,
          pressure,
          temperature: temp
        }
      });
    } catch (err) {
      /// here we can imporove it and accoring to what `err` is do differenet actions
      searchBoxObject.setState({ foundCity: false, loading: false });
    }
    dispatch(toggleMask(false));
  };
};
/////////////////****************
let counter2 = 1;
export const fetchCityForecast = (cityName, countryName, searchBoxObject) => {
  return async dispatch => {
    try {     
      const response = await axios({
        method: "get",
        url: `forecast?q=${cityName},${countryName}&units=metric&appid=${APP_ID}`
      });
      const {
        city: { coord },
        list
      } = response.data;

      searchBoxObject.setState({ foundCity: true, loading: false });
      dispatch({
        type: FETCH_FORECAST_DATA,
        payload: {
          id: counter2++,
          cityName,
          countryName,
          googleMap: coord,
          humidity: list.map(({ main, dt_txt }) => ({
            value: main.humidity,
            time: dt_txt
          })),
          pressure: list.map(({ main, dt_txt }) => ({
            value: main.pressure,
            time: dt_txt
          })),
          temperature: list.map(({ main, dt_txt }) => ({
            value: main.temp,
            time: dt_txt
          }))
        }
      });
    } catch (err) {
      /// here we can imporove it and accoring to what `err` is do differenet actions
      searchBoxObject.setState({ foundCity: false, loading: false });
    }

    dispatch(toggleMask(false));
  };
};
////////////////***************
export const deleteRows = selectedRows => ({
  type: DELETE_ROWS,
  payload: selectedRows
});
///////////////****************
export const toggleMask = masked => ({
  type: TOGGLE_MASK,
  payload: masked
});
