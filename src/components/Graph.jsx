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
    const { geom, grdData, stnData } = this.props;
    if (geom !== "stn") {
      if (grdData) {
        this.datum = grdData[this.index];
      }
    } else {
      if (stnData) {
        this.datum = stnData[this.index];
      }
    }
  };

  @action resetIndex = () => (this.index = null);

  render() {
    const { grdData, stnData, yaxisLabel, geom, setField } = this.props;

    let yMin;
    let yMax;
    if (grdData) {
      yMin = grdData.map(obj => obj.yMin);
      yMax = grdData.map(obj => obj.yMax);
    } else {
      const valuesArr = stnData.map(obj => obj.observed).filter(d => d);
      yMin = Math.round(Math.min(...valuesArr)) - 2;
      yMax = Math.round(Math.max(...valuesArr)) + 2;
    }

    const RenderDots = props => {
      const { cx, cy, fill } = props;
      return <Dot cx={cx} cy={cy} r={2} fill={fill} />;
    };
    let startYear2039 = "";
    let startYear2069 = "";
    let startYear2099 = "";

    let deltaMean2039 = "";
    let deltaMean2069 = "";
    let deltaMean2099 = "";

    if (grdData && this.index) {
      startYear2039 = 2039 - (grdData[0].yearsCount - 1);
      startYear2069 = 2069 - (grdData[0].yearsCount - 1);
      startYear2099 = 2099 - (grdData[0].yearsCount - 1);
      deltaMean2039 = grdData[this.index].deltaMean2039;
      deltaMean2069 = grdData[this.index].deltaMean2069;
      deltaMean2099 = grdData[this.index].deltaMean2099;
    }

    let yMaxHeightObserved;
    if (yMax[0]) {
      yMaxHeightObserved = yMax[0] + Math.ceil(yMax[0] * 0.1);
    }
    const yMaxHeightModeled = yMaxHeightObserved - yMaxHeightObserved * 0.05;

    return (
      <div style={{ width: "100%", height: "95%" }}>
        <ResponsiveContainer width="100%" height="75%">
          <ComposedChart
            syncId="anyId"
            data={geom === "stn" ? stnData : grdData}
            margin={{ top: 15, right: 40, left: 0, bottom: 15 }}
            onMouseMove={a => a && this.setIndex(a.activeTooltipIndex)}
            onMouseLeave={this.resetIndex}
          >
            {grdData ? (
              <YAxis
                scale="linear"
                dataKey={"observed"}
                allowDecimals={false}
                domain={[yMin[0], yMaxHeightObserved]}
                label={{
                  value: `${yaxisLabel}`,
                  angle: -90,
                  position: "insideLeft"
                }}
              />
            ) : (
              <YAxis
                scale="linear"
                dataKey={"observed"}
                allowDecimals={false}
                domain={[yMin, yMax]}
                label={{
                  value: `${yaxisLabel}`,
                  angle: -90,
                  position: "insideLeft"
                }}
              />
            )}

            {this.props.isModeledGraph &&
              grdData && (
                <Area stackId="1" dataKey="min" stroke="#2176FF" fill="#fff" />
              )}

            {this.props.isModeledGraph &&
              grdData && (
                <Area
                  stackId="1"
                  dataKey={"mean-min"}
                  stroke="#342E37"
                  fill="#8FCBFD"
                />
              )}

            {this.props.isModeledGraph &&
              grdData && (
                <Area
                  stackId="1"
                  dataKey="max-mean"
                  stroke="#C42333"
                  fill="#F17E89 "
                />
              )}

            {this.props.isObservedGraph && (
              <Scatter
                line={false}
                dataKey="observed"
                fill="black"
                fillOpacity={1}
                shape={<RenderDots />}
              />
            )}

            {stnData &&
              geom === "stn" && (
                <Line
                  name="ObservedMean"
                  type="monotone"
                  dataKey="observedMean"
                  stroke="#8C9DE9"
                  dot={false}
                  strokeWidth={2}
                />
              )}

            {this.index && (
              <ReferenceArea
                x1={this.startYear ? this.startYear : null}
                x2={this.year ? this.year : null}
                label={{
                  position: "top",
                  value: `${this.startYear}-${this.year}`,
                  fill: "#488B49",
                  fontSize: 13
                }}
                fill="#99A4F2"
                fillOpacity={0.1}
                isFront={false}
              />
            )}

            {this.index && (
              <ReferenceArea
                x1={startYear2039}
                x2={2039}
                y2={yMaxHeightModeled}
                label={{
                  position: "top",
                  value: `${startYear2039}-${2039}`,
                  fill: "#2F2F2F",
                  fontSize: 13
                }}
                fill="#99A4F2"
                fillOpacity={0.1}
                isFront={true}
              />
            )}
            {this.index && (
              <ReferenceArea
                x1={startYear2039}
                x2={2039}
                y2={yMaxHeightModeled}
                label={{
                  position: "insideTop",
                  value: `∆mean = ${deltaMean2039}`,
                  fill: "#2F2F2F",
                  fontSize: 13
                }}
                fill="#99A4F2"
                fillOpacity={0.1}
                isFront={true}
              />
            )}
            {this.index && (
              <ReferenceArea
                x1={startYear2069}
                x2={2069}
                y2={yMaxHeightModeled}
                label={{
                  position: "top",
                  value: `${startYear2069}-${2069}`,
                  fill: "#2F2F2F",
                  fontSize: 13
                }}
                fill="#99A4F2"
                fillOpacity={0.1}
                isFront={true}
              />
            )}
            {this.index && (
              <ReferenceArea
                x1={startYear2069}
                x2={2069}
                y2={yMaxHeightModeled}
                label={{
                  position: "insideTop",
                  value: `∆mean = ${deltaMean2069}`,
                  fill: "#2F2F2F",
                  fontSize: 13
                }}
                fill="#99A4F2"
                fillOpacity={0.1}
                isFront={true}
              />
            )}
            {this.index && (
              <ReferenceArea
                x1={startYear2099}
                x2={2099}
                y2={yMaxHeightModeled}
                label={{
                  position: "top",
                  value: `${startYear2099}-${2099}`,
                  fill: "#2F2F2F",
                  fontSize: 13
                }}
                fill="#99A4F2"
                fillOpacity={0.1}
                isFront={true}
              />
            )}
            {this.index && (
              <ReferenceArea
                x1={startYear2099}
                x2={2099}
                y2={yMaxHeightModeled}
                label={{
                  position: "insideTop",
                  value: `∆mean = ${deltaMean2099}`,
                  fill: "#2F2F2F",
                  fontSize: 13
                }}
                fill="#99A4F2"
                fillOpacity={0.1}
                isFront={true}
              />
            )}
            <XAxis dataKey="year" />
          </ComposedChart>
        </ResponsiveContainer>
        <Legend
          data={this.datum}
          geom={geom}
          setField={setField}
          isIndex={this.index}
          isModeledGraph={this.props.isModeledGraph}
          isObservedGraph={this.props.isObservedGraph}
          toggleGraph={this.props.toggleGraph}
        />
      </div>
    );
  }
}
