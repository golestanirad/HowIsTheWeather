import { connect } from "react-redux";
//// project files
import { fetchCityWeather, fetchCityForecast, toggleMask } from "../actions";
import SearchBox from "../components/SearchBox";

export default connect(
  null,
  { fetchCityWeather, fetchCityForecast, toggleMask }
)(SearchBox);
