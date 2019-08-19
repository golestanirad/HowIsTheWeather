import { connect } from "react-redux";
//// project files
import { deleteRows } from "../actions";
import WeatherTable from "../components/table/WeatherTable";

export default connect(
  null,
  { deleteRows }
)(WeatherTable);
