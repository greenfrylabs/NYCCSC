import React, { Component } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";

import {
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
  ComposedChart,
  Brush,
  Line,
  ReferenceLine
} from "recharts";

import { WLegend, LegendCell } from "../styles";

@observer
export default class Graph extends Component {
  @observable displayedData;
  @action setDisplayedData = idx => (this.displayedData = this.props.data[idx]);

  render() {
    const { data, yaxisLabel } = this.props;

    return (
      <div style={{ width: "100%", height: "95%" }}>
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            data={data}
            margin={{ top: 15, right: 15, left: 0, bottom: 15 }}
            onMouseMove={a => a && this.setDisplayedData(a.activeTooltipIndex)}
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
            <ReferenceLine
              x={this.displayedData ? this.displayedData.year : null}
              stroke="#B2B2B2"
              label={this.displayedData ? this.displayedData.year : null}
              strokeDasharray="3 3"
            />
            <Scatter line={false} dataKey="e" fill="#99A4F2" />
            <Line
              name="5-yr Mean"
              type="monotone"
              dataKey="mean"
              stroke="#DC9052"
              dot={false}
              strokeWidth={2}
            />
            <Brush
              dataKey="year"
              height={15}
              stroke="#99A4F2"
              travellerWidth={1}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <WLegend>
          <LegendCell>
            <span style={{ margin: "0 15px" }}>Observed Data </span>
            {this.displayedData && (
              <span style={{ color: "#99A4F2" }}>
                <b>{this.displayedData.year}:</b> {this.displayedData.e} ˚F
              </span>
            )}
            {this.displayedData && (
              <span style={{ marginLeft: 15, color: "#DC9052" }}>
                <b>5-yrs mean:</b> {this.displayedData.mean}˚F
              </span>
            )}
          </LegendCell>
        </WLegend>
      </div>
    );
  }
}
