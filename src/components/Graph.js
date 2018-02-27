import React, { Component } from "react";
import { observable, action, computed } from "mobx";
import { inject, observer } from "mobx-react";

import {
  ResponsiveContainer,
  Scatter,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  ReferenceArea,
  Area,
  Dot
} from "recharts";

import Legend from "../components/Legend";

@inject("app")
@observer
export default class Graph extends Component {
  @observable index;
  @observable datum;
  @computed
  get year() {
    return this.datum.year;
  }

  @computed
  get startYear() {
    return this.datum.startYear;
  }

  @action
  setIndex = idx => {
    this.index = idx;
    if (this.props.geom !== "stn") {
      this.datum = this.props.gridData[this.index];
    } else {
      this.datum = this.props.stationData[this.index];
    }
  };

  @action resetIndex = () => (this.index = null);

  render() {
    const { gridData, stationData, yaxisLabel, geom } = this.props;
    // console.log(gridData, stationData);
    let yMin;
    let yMax;
    if (gridData) {
      const yMinArr = gridData.map(obj => obj.min);
      const yMaxArr = gridData.map(obj => obj.max);
      yMin = Math.round(Math.min(...yMinArr)) - 3;
      yMax = Math.round(Math.max(...yMaxArr)) + 1;
    } else {
      const valuesArr = stationData.map(obj => obj.value);
      yMin = Math.round(Math.min(...valuesArr)) - 3;
      yMax = Math.round(Math.max(...valuesArr)) + 1;
    }

    const { isObservedGraph, isModeledGraph } = this.props.app.blockStore;

    const RenderDots = props => {
      const { cx, cy, fill } = props;
      return <Dot cx={cx} cy={cy} r={2} fill={fill} />;
    };

    return (
      <div style={{ width: "100%", height: "95%" }}>
        <ResponsiveContainer width="100%" height="80%">
          <ComposedChart
            data={geom === "stn" ? stationData : gridData}
            margin={{ top: 15, right: 40, left: 0, bottom: 15 }}
            onMouseMove={a => a && this.setIndex(a.activeTooltipIndex)}
            onMouseLeave={this.resetIndex}
          >
            <XAxis dataKey="year" />
            <YAxis
              dataKey={gridData ? "observed" : "value"}
              allowDecimals={false}
              domain={[yMin, yMax]}
              label={{
                value: `${yaxisLabel}`,
                angle: -90,
                position: "insideLeft"
              }}
            />

            {isModeledGraph &&
              gridData && <Area type="monotone" dataKey="max" fill="#F9EBED" />}
            {isModeledGraph &&
              gridData && (
                <Area type="monotone" dataKey="mean" fill="#EBF0F3" />
              )}
            {isModeledGraph &&
              gridData && <Area type="monotone" dataKey="min" fill="#fff" />}

            {/* HACK........... FIX IT*/}
            {isModeledGraph && (
              <Area type="monotone" dataKey="min" fill="#fff" />
            )}

            {isModeledGraph && (
              <Area type="monotone" dataKey="min" fill="#fff" />
            )}
            {/* HACK........... FIX IT*/}

            {isModeledGraph &&
              gridData && (
                <Line
                  name="Max"
                  dataKey="max"
                  stroke="#C5283D"
                  dot={false}
                  strokeWidth={1}
                />
              )}

            {isModeledGraph &&
              gridData && (
                <Line
                  name="Min"
                  dataKey="min"
                  stroke="#255F85"
                  dot={false}
                  strokeWidth={1}
                />
              )}

            {isModeledGraph &&
              gridData && (
                <Line
                  name="Mean"
                  dataKey="mean"
                  stroke="#2F2F2F"
                  dot={false}
                  strokeWidth={1}
                />
              )}

            {true && (
              <Scatter
                line={false}
                dataKey={gridData ? "mean" : "value"}
                fill="black"
                fillOpacity={0.5}
                shape={<RenderDots />}
                isAnimationActive={true}
              />
            )}

            {stationData && (
              <Line
                name="Mean"
                type="monotone"
                dataKey="mean"
                stroke="#DC9052"
                dot={false}
                strokeWidth={2}
              />
            )}

            {this.index && (
              <ReferenceArea
                x1={this.startYear}
                x2={this.year}
                label={{
                  position: "insideBottom",
                  value: `${this.startYear}-${this.year}`,
                  fill: "red",
                  fontSize: 13
                }}
                fill="#99A4F2"
                fillOpacity={0.1}
                isFront={true}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
        <Legend data={this.datum} />
      </div>
    );
  }
}
