
import { connect } from "react-redux";
//// project files
import App from '../components/App';


const mapStateToProps = ({ weatherData, forecastData, toggleMask }) => {
  return { weatherData, forecastData, toggleMask };
};
export default connect(mapStateToProps)(App);


