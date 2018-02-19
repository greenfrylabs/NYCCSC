import React, { Component } from "react";
import {
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
  ComposedChart,
  Tooltip,
  Brush,
  Line
} from "recharts";

export default class Graph extends Component {
  render() {
    const { data, yaxisLabel } = this.props;
    console.log(data);
    return (
      <ResponsiveContainer width="100%" height="95%">
        <ComposedChart
          data={data}
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

          <Line type="monotone" dataKey="mean" stroke="#DC9052" dot={false} />

          <Brush
            dataKey="year"
            height={15}
            stroke="#7483EE"
            travellerWidth={1}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
