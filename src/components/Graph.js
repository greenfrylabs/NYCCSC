import React, { Component } from "react";
import {
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
  ComposedChart,
  Tooltip
} from "recharts";

export default class Graph extends Component {
  render() {
    const { data, yaxisLabel } = this.props;
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data.slice()}
          margin={{ top: 15, right: 15, left: 0, bottom: 15 }}
        >
          <XAxis dataKey="year" />
          <YAxis
            dataKey="e"
            domain={["dataMin", "dataMax"]}
            label={{
              value: `${yaxisLabel}`,
              angle: -90,
              position: "insideLeft"
            }}
          />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter line={false} dataKey="e" fill="#7483EE" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
