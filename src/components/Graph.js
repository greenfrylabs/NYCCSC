import React, { Component } from "react";
import {
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
  ComposedChart
} from "recharts";

export default class Graph extends Component {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data.slice()}
          margin={{ top: 15, right: 15, left: -20, bottom: 0 }}
        >
          <XAxis dataKey="year" />
          <YAxis dataKey="e" domain={["dataMin", "dataMax"]} />
          <Scatter line={true} dataKey="e" stroke="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
