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

import { Menu, Dropdown, Icon } from "antd";

import { WLegend, LegendCell } from "../styles";

@inject("app")
@observer
export default class Graph extends Component {
  @observable index;
  @observable datum;

  @action
  setIndex = idx => {
    this.index = idx;
    this.datum = this.props.stationData[this.index];
  };

  @action resetIndex = () => (this.index = null);

  render() {
    const { stationData, yaxisLabel, setField, meanLabel } = this.props;

    let startYear;
    let year;
    let value;
    let mean;
    if (this.datum) {
      startYear = this.datum.startYear;
      year = this.datum.year;
      value = this.datum.value;
      mean = this.datum.mean;
    }

    const rangeList = (
      <Menu selectable onClick={e => setField("meanRange", e.key)}>
        <Menu.Item key={5}>5 years mean</Menu.Item>
        <Menu.Item key={10}>10 years mean</Menu.Item>
        <Menu.Item key={15}>15 years mean</Menu.Item>
        <Menu.Item key={20}>20 years mean</Menu.Item>
        <Menu.Item key={25}>25 years mean</Menu.Item>
        <Menu.Item key={30}>30 years mean</Menu.Item>
      </Menu>
    );

    return (
      <div style={{ width: "100%", height: "95%" }}>
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            data={stationData}
            margin={{ top: 15, right: 40, left: 0, bottom: 15 }}
            onMouseMove={a => a && this.setIndex(a.activeTooltipIndex)}
            onMouseLeave={this.resetIndex}
          >
            <XAxis dataKey="year" />
            <YAxis
              dataKey="value"
              domain={["dataMin", "dataMax"]}
              label={{
                value: `${yaxisLabel}`,
                angle: -90,
                position: "insideLeft"
              }}
            />

            <Scatter
              line={false}
              dataKey="e"
              fill="#99A4F2"
              fillOpacity={0.7}
            />
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
              height={20}
              stroke="#99A4F2"
              travellerWidth={1}
            />

            {this.index && (
              <ReferenceArea
                x1={startYear}
                x2={year}
                label={`${startYear}-${year}`}
                fill="#99A4F2"
                fillOpacity={0.1}
                isFront={true}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
        <WLegend>
          <LegendCell>
            <span style={{ margin: "0 15px" }}>Observed Data </span>
            {this.datum && (
              <span style={{ color: "#99A4F2" }}>
                {year}: {value} ˚F
              </span>
            )}
            {this.datum && (
              <span style={{ margin: "0 15px", color: "#DC9052" }}>
                <Dropdown overlay={rangeList}>
                  <span>{meanLabel}</span>
                </Dropdown>{" "}
                <Icon type="down" style={{ fontSize: 10 }} />{" "}
                {mean ? `${mean} ˚F` : "No data"}
              </span>
            )}
          </LegendCell>
        </WLegend>
      </div>
    );
  }
}
