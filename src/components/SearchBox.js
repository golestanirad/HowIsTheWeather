import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
//// Materil UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";
////
import countries from "../data/coutries";
///

const styles = theme => ({
  textField: {
    margin: theme.spacing.unit,
    width: "70%"
  },
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  container: {
    margin: "auto",
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    width: "100%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      foundCity: true,
      loading: false,
      country: ""
    };
    /// here we could also use arow function instead of binding them in the constructor, 
    //but I preferred to do it this way as I read in some articles that it will be  a bit more 
    //optimized behind the scenes if we bind the callbacks in here
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleCountryChange(event) {
    this.setState({ country: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ searchValue: "", loading: true });
    this.props.toggleMask(true);
    this.props.fetchCityForecast(
      this.state.searchValue,
      this.state.country === "" ? "US" : this.state.country,
      this
    );
    this.props.fetchCityWeather(
      this.state.searchValue,
      this.state.country === "" ? "US" : this.state.country,
      this
    );
  }

  renderOptions(data) {
    return _.map(data, (fullName, shortName) => (
      <option key={shortName} value={shortName}>
        {fullName}
      </option>
    ));
  }

  render() {
    const { classes } = this.props;
    //here, we could also use Formik or React-Final-Form to handle the search box, 
    //but as I had already used react-final-form in the project that put in my resume (lets-smoke-less)
    // here I wanted to show that if for any reasons we don't want to use form libraries, how we can handle a simple form instead.
    return (
      <Paper className={classes.container}>
        <form onSubmit={this.handleSubmit} className={classes.form}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-country-native-simple">
              Country
            </InputLabel>
            <Select
              native
              value={this.state.country}
              onChange={this.handleCountryChange}
              input={
                <FilledInput name="country" id="filled-country-native-simple" />
              }
            >
              <option value="" />
              {this.renderOptions(countries)}
            </Select>
          </FormControl>
          <TextField
            error={!this.state.foundCity}
            id="filled-search"
            label={
              this.state.foundCity
                ? "Enter your search here"
                : "Couldn't find the city"
            }
            type="search"
            className={classes.textField}
            margin="normal"
            variant="filled"
            value={this.state.searchValue}
            onChange={this.handleSearchChange}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
            disabled={this.state.searchValue === ""}
          >
            Send
            <Fade in={this.state.loading} unmountOnExit>
              <CircularProgress />
            </Fade>
            <SearchIcon className={classes.rightIcon} />
          </Button>
        </form>
      </Paper>
    );
  }
}
SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleMask: PropTypes.func.isRequired,
  fetchCityForecast: PropTypes.func.isRequired,
  fetchCityWeather: PropTypes.func.isRequired
}; 

SearchBox = withStyles(styles)(SearchBox);
export default SearchBox
