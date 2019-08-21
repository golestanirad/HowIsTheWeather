import React, { Component } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
/////  Materil UI
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
///// project Fiels
import SearchBox from "../containers/SearchBox";
import WeatherTable from "../containers/WeatherTable";
import ForecastTable from "../containers/ForecastTable";

const styles = theme => ({
  swipeContainer: {
    backgroundColor: "red",
    width: "90%",
    margin: "auto",
    paddingTop: 20,
    paddingBottom: 20
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    /// here we could also use arow function instead of binding them in the constructor,
    //but I preferred to do it this way as I read in some articles that it will be  a bit more
    //optimized behind the scenes if we bind the callbacks in here
    this.handleTabChange = this.handleTabChange.bind(this);
    this.state = { value: 0, masked: false };
  }

  handleTabChange(event, value) {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        style={
          this.props.toggleMask
            ? {
                backgroundColor: "#ffffff",
                opacity: "0.4",
                pointerEvents: "none"
              }
            : null
        }
      >
        <SearchBox masked />
        <div className={classes.swipeContainer}>
          <AppBar position="static">
            <Tabs value={this.state.value} onChange={this.handleTabChange}>
              <Tab label="Weather" />
              <Tab label="Forecast" />
            </Tabs>
          </AppBar>
          <SwipeableViews
            className={classes.swipeableViews}
            index={this.state.value}
          >
            <WeatherTable weatherData={this.props.weatherData} />
            <ForecastTable forecastData={this.props.forecastData} />
          </SwipeableViews>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleMask: PropTypes.bool.isRequired,
  weatherData: PropTypes.array.isRequired,
  forecastData: PropTypes.array.isRequired
};

App = withStyles(styles)(App);
export default App;
