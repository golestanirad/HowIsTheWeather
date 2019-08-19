import React from "react";
import PropTypes from "prop-types";
////////// recharts
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  Brush,
  Line
} from "recharts";

const CustomToolTip = ({ active, payload }) => {
  if (active) {
    return (
      <div>
        <p>{payload[0].value}</p>
        <p>{payload[0].payload.time}</p>
      </div>
    );
  }
  return null;
};

const Chart = ({ data }) => (
  <LineChart width={400} height={200} data={data}>
    <Line type="monotone" dataKey="value" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
    <XAxis dataKey="name" />
    <YAxis />
    <ChartTooltip content={<CustomToolTip />} />
    <Brush dataKey="name" height={30} stroke="#8884d8" />
  </LineChart>
);

Chart.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Chart;
