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
  Area
} from "recharts";

// import Legend from "../components/Legend";

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
    this.datum = this.props.gridData[this.index];
  };

  @action resetIndex = () => (this.index = null);

  render() {
    const { gridData, yaxisLabel } = this.props;

    const yMinArr = gridData.map(obj => obj.min);
    const yMaxArr = gridData.map(obj => obj.max);
    const yMin = Math.round(Math.min(...yMinArr)) - 3;
    const yMax = Math.round(Math.max(...yMaxArr)) + 1;

    const { isObservedGraph, isModeledGraph } = this.props.app.blockStore;

    return (
      <div style={{ width: "100%", height: "95%" }}>
        <ResponsiveContainer width="100%" height="90%">
          <ComposedChart
            data={gridData}
            margin={{ top: 15, right: 40, left: 0, bottom: 15 }}
            onMouseMove={a => a && this.setIndex(a.activeTooltipIndex)}
            onMouseLeave={this.resetIndex}
          >
            <XAxis dataKey="year" />
            <YAxis
              dataKey="observed"
              allowDecimals={false}
              domain={[yMin, yMax]}
              label={{
                value: `${yaxisLabel}`,
                angle: -90,
                position: "insideLeft"
              }}
            />
            {isModeledGraph && (
              <Area type="monotone" dataKey="max" fill="#F9EBED" />
            )}
            {isModeledGraph && (
              <Area type="monotone" dataKey="mean" fill="#EBF0F3" />
            )}
            {isModeledGraph && (
              <Area type="monotone" dataKey="min" fill="#fff" />
            )}

            {/* HACK........... FIX IT*/}
            {isModeledGraph && (
              <Area type="monotone" dataKey="min" fill="#fff" />
            )}

            {isModeledGraph && (
              <Area type="monotone" dataKey="min" fill="#fff" />
            )}
            {/* HACK........... FIX IT*/}

            {isModeledGraph && (
              <Line
                name="Max"
                dataKey="max"
                stroke="#C5283D"
                dot={false}
                strokeWidth={1}
              />
            )}

            {isModeledGraph && (
              <Line
                name="Min"
                dataKey="min"
                stroke="#255F85"
                dot={false}
                strokeWidth={1}
              />
            )}

            {isModeledGraph && (
              <Line
                name="Mean"
                dataKey="mean"
                stroke="#2F2F2F"
                dot={false}
                strokeWidth={1}
              />
            )}

            {isObservedGraph && (
              <Scatter
                line={false}
                dataKey="observed"
                fill="black"
                fillOpacity={0.5}
              >
                {gridData.map(d => console.log(d))}
              </Scatter>
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
        {/*<Legend datum={this.datum}> </Legend>*/}
      </div>
    );
  }
}
