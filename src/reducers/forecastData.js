import _ from "lodash";
import { FETCH_FORECAST_DATA, DELETE_ROWS } from "../actions/types";
///////////////

const forecastData = (state = [], { payload, type }) => {
  switch (type) {
    case FETCH_FORECAST_DATA:
      if (
        _.some(state, {
          cityName: payload.cityName,
          countryName: payload.countryName
        })
      ) {
        return state;
      }
      return [...state, payload];
    case DELETE_ROWS:
      _.remove(state, n => {
        return _.includes(payload, n.id);
      });
      return [...state];
    default:
      return state;
  }
};

export default forecastData;
