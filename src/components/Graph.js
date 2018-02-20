import React, { Component } from "react";
import { observable, action } from "mobx";
import { inject, observer } from "mobx-react";

import {
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
  ComposedChart,
  Brush,
  Line,
  ReferenceArea
} from "recharts";

import { Menu, Dropdown } from "antd";

import { WLegend, LegendCell } from "../styles";

@inject("app")
@observer
export default class Graph extends Component {
  @observable datum;
  @action setdatum = idx => (this.datum = this.props.dataWithMeanValues[idx]);

  render() {
    const { dataWithMeanValues, yaxisLabel, setField } = this.props;
    const list = [
      { label: "5 years mean", val: 5 },
      { label: "10 years mean", val: 10 },
      { label: "15 years mean", val: 15 },
      { label: "20 years mean", val: 20 },
      { label: "25 years mean", val: 25 },
      { label: "30 years mean", val: 30 }
    ];

    let startYear;
    let year;
    let e;
    let mean;
    let meanRange = 5;
    let label = "5 years mean";
    if (this.datum) {
      // console.log(this.datum);
      startYear = this.datum.startYear;
      year = this.datum.year;
      e = this.datum.e;
      mean = this.datum.mean;
      meanRange = this.datum.meanRange;
      label = list.find(o => o.val === meanRange);
    }

    const rangeList = (
      <Menu selectable onClick={e => setField("meanRange", e.key)}>
        {list.map(o => <Menu.Item key={o.val}>{o.label}</Menu.Item>)}
      </Menu>
    );

    return (
      <div style={{ width: "100%", height: "95%" }}>
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            data={dataWithMeanValues}
            margin={{ top: 15, right: 40, left: 0, bottom: 15 }}
            onMouseMove={a => a && this.setdatum(a.activeTooltipIndex)}
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
            {this.datum && (
              <span style={{ color: "#99A4F2" }}>
                <b>{year}:</b> {e} ˚F
              </span>
            )}
            {this.datum && (
              <span style={{ marginLeft: 15, color: "#DC9052" }}>
                <Dropdown overlay={rangeList}>
                  <span>{label.label}</span>
                </Dropdown>{" "}
                {mean}˚F
              </span>
            )}
          </LegendCell>
        </WLegend>
      </div>
    );
  }
}
