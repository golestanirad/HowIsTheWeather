import { connect } from "react-redux";
/////////////// project files
import { deleteRows } from "../actions";
import ForcastTable from '../components/table/ForecastTable';


export default connect(
  null,
  { deleteRows }
)(ForcastTable);
