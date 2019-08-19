import _ from "lodash";
import { FETCH_WEATHER_DATA, DELETE_ROWS } from "../actions/types";
///////////

const weatherData = (state = [], action) => {
  switch (action.type) {
    case FETCH_WEATHER_DATA:
      if (
        _.some(state, {
          cityName: action.payload.cityName,
          countryName: action.payload.countryName
        })
      ) {
        return state;
      }
      return [...state, action.payload];
    case DELETE_ROWS:
      _.remove(state, n => {
        return _.includes(action.payload, n.id);
      });
      return [...state];
    default:
      return state;
  }
};

export default weatherData;
