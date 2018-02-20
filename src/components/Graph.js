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
  ReferenceLine,
  ReferenceArea
} from "recharts";

import { WLegend, LegendCell } from "../styles";

@observer
export default class Graph extends Component {
  @observable displayedData;
  @action setDisplayedData = idx => (this.displayedData = this.props.data[idx]);

  render() {
    const { data, yaxisLabel } = this.props;
    let startYear;
    let year;
    let e;
    let mean;
    if (this.displayedData) {
      startYear = this.displayedData.startYear;
      year = this.displayedData.year;
      e = this.displayedData.e;
      mean = this.displayedData.mean;
    }

    return (
      <div style={{ width: "100%", height: "95%" }}>
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            data={data}
            margin={{ top: 15, right: 40, left: 0, bottom: 15 }}
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
            <ReferenceArea
              x1={startYear}
              x2={year}
              label={`${startYear}-${year}`}
              fill="#99A4F2"
              fillOpacity={0.1}
              isFront={true}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <WLegend>
          <LegendCell>
            <span style={{ margin: "0 15px" }}>Observed Data </span>
            {this.displayedData && (
              <span style={{ color: "#99A4F2" }}>
                <b>{year}:</b> {e} ˚F
              </span>
            )}
            {this.displayedData && (
              <span style={{ marginLeft: 15, color: "#DC9052" }}>
                <b>5-yrs mean:</b> {mean}˚F
              </span>
            )}
          </LegendCell>
        </WLegend>
      </div>
    );
  }
}
