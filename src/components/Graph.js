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
      this.datum = this.props.grdData[this.index];
    } else {
      this.datum = this.props.stnData[this.index];
    }
  };

  @action resetIndex = () => (this.index = null);

  render() {
    const { grdData, stnData, yaxisLabel, geom, setField } = this.props;
    // console.log(grdData, stnData);
    // let yMin;
    // let yMax;
    // if (grdData) {
    //   const yMinArr = grdData.map(obj => obj.min);
    //   const yMaxArr = grdData.map(obj => obj.max);
    //   yMin = Math.round(Math.min(...yMinArr));
    //   yMax = Math.round(Math.max(...yMaxArr));
    // } else {
    //   const valuesArr = stnData.map(obj => obj.observed);
    //   yMin = Math.round(Math.min(...valuesArr));
    //   yMax = Math.round(Math.max(...valuesArr));
    // }

    const { isObservedGraph, isModeledGraph } = this.props.app.blockStore;

    const RenderDots = props => {
      const { cx, cy, fill } = props;
      return <Dot cx={cx} cy={cy} r={2} fill={fill} />;
    };

    // console.log(isObservedGraph, grdData, stnData);

    return (
      <div style={{ width: "100%", height: "95%" }}>
        <ResponsiveContainer width="100%" height="75%">
          <ComposedChart
            data={geom === "stn" ? stnData : grdData}
            margin={{ top: 15, right: 40, left: 0, bottom: 15 }}
            onMouseMove={a => a && this.setIndex(a.activeTooltipIndex)}
            onMouseLeave={this.resetIndex}
          >
            <XAxis dataKey="year" />
            <YAxis
              dataKey={"observed"}
              allowDecimals={false}
              domain={["0", "58 + 8"]}
              label={{
                value: `${yaxisLabel}`,
                angle: -90,
                position: "insideLeft"
              }}
            />

            {isModeledGraph &&
              grdData && <Area type="monotone" dataKey="max" fill="#EC9CA4" />}
            {isModeledGraph &&
              grdData && <Area type="monotone" dataKey="mean" fill="#B4D6EE" />}
            {isModeledGraph &&
              grdData && <Area type="monotone" dataKey="min" fill="#fff" />}

            {/* HACK........... FIX IT*/}
            {isModeledGraph && (
              <Area type="monotone" dataKey="min" fill="#fff" />
            )}

            {isModeledGraph && (
              <Area type="monotone" dataKey="min" fill="#fff" />
            )}

            {isModeledGraph && (
              <Area type="monotone" dataKey="min" fill="#fff" />
            )}
            {/* HACK........... FIX IT*/}

            {isModeledGraph &&
              grdData && (
                <Line
                  name="Max"
                  dataKey="max"
                  stroke="#C42333"
                  dot={false}
                  strokeWidth={1}
                />
              )}

            {isModeledGraph &&
              grdData && (
                <Line
                  name="Mean"
                  dataKey="mean"
                  stroke="#2F2F2F"
                  dot={false}
                  strokeWidth={1}
                />
              )}

            {isModeledGraph &&
              grdData && (
                <Line
                  name="Min"
                  dataKey="min"
                  stroke="#5CA5DA"
                  dot={false}
                  strokeWidth={1}
                />
              )}

            {isObservedGraph && (
              <Scatter
                line={false}
                dataKey={grdData ? "observed" : "observed"}
                fill="black"
                fillOpacity={0.5}
                shape={<RenderDots />}
              />
            )}

            {stnData && (
              <Line
                name="ObservedMean"
                type="monotone"
                dataKey="observedMean"
                stroke="#EABA6B"
                dot={false}
                strokeWidth={2}
              />
            )}

            {this.index && (
              <ReferenceArea
                x1={this.startYear}
                x2={this.year}
                label={{
                  position: "top",
                  value: `${this.startYear}-${this.year}`,
                  fill: "#488B49",
                  fontSize: 13
                }}
                fill="#99A4F2"
                fillOpacity={0.1}
                isFront={true}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
        <Legend
          data={this.datum}
          geom={geom}
          setField={setField}
          isIndex={this.index}
        />
      </div>
    );
  }
}
