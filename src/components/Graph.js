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

    let yMin;
    let yMax;
    if (grdData) {
      yMin = grdData.map(obj => obj.yMin);
      yMax = grdData.map(obj => obj.yMax);
    } else {
      const valuesArr = stnData.map(obj => obj.observed);
      yMin = Math.round(Math.min(...valuesArr));
      yMax = Math.round(Math.max(...valuesArr));
    }

    const { isObservedGraph, isModeledGraph } = this.props.app.blockStore;

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
      startYear2039 = 2039 - grdData[0].yearsCount;
      startYear2069 = 2069 - grdData[0].yearsCount;
      startYear2099 = 2099 - grdData[0].yearsCount;
      deltaMean2039 = grdData[this.index].deltaMean2039;
      deltaMean2069 = grdData[this.index].deltaMean2069;
      deltaMean2099 = grdData[this.index].deltaMean2099;
    }

    const yMaxHeightObserved = yMax[0] + 10;
    const yMaxHeightModeled = yMaxHeightObserved - yMaxHeightObserved * 0.03;

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
            <XAxis dataKey="year" />
            <YAxis
              dataKey={"observed"}
              allowDecimals={false}
              domain={[yMin[0], yMaxHeightObserved]}
              label={{
                value: `${yaxisLabel}`,
                angle: -90,
                position: "insideLeft"
              }}
            />

            {isModeledGraph && grdData && <Area dataKey="max" fill="#EC9CA4" />}
            {isModeledGraph &&
              grdData && <Area dataKey="mean" fill="#B4D6EE" />}
            {isModeledGraph && grdData && <Area dataKey="min" fill="#fff" />}
            {isModeledGraph && grdData && <Area dataKey="min" fill="#fff" />}
            {isModeledGraph && grdData && <Area dataKey="min" fill="#fff" />}
            {isModeledGraph && grdData && <Area dataKey="min" fill="#fff" />}
            {isModeledGraph && grdData && <Area dataKey="min" fill="#fff" />}

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
                fillOpacity={0.7}
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
