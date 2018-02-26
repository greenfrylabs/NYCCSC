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
  ReferenceArea,
  Area
} from "recharts";

import { Menu, Dropdown, Icon, Checkbox } from "antd";

import { WLegend, LegendCell } from "../styles";

@inject("app")
@observer
export default class Graph extends Component {
  @observable index;
  @observable datum;

  @action
  setIndex = idx => {
    this.index = idx;
    this.datum = this.props.gridData[this.index];
  };

  @action resetIndex = () => (this.index = null);

  render() {
    const { gridData, yaxisLabel, setField, meanLabel, rpc } = this.props;
    const {
      isObservedGraph,
      isModeledGraph,
      toggleObservedGraph,
      toggleModeledGraph
    } = this.props.app.blockStore;

    let max;
    let mean;
    let min;
    let observed;
    let observedMean;
    let startYear;
    let year;
    if (this.datum) {
      if (rpc === 8.5) {
        max = this.datum.max85;
        mean = this.datum.mean85;
        min = this.datum.min85;
      }
      max = this.datum.max45;
      mean = this.datum.mean45;
      min = this.datum.min45;
      observed = this.datum.observed;
      observedMean = this.datum.observedMean;
      startYear = this.datum.startYear;
      year = this.datum.year;
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
            data={gridData}
            margin={{ top: 15, right: 40, left: 0, bottom: 15 }}
            onMouseMove={a => a && this.setIndex(a.activeTooltipIndex)}
            onMouseLeave={this.resetIndex}
          >
            <XAxis dataKey="year" />
            <YAxis
              dataKey="observed"
              allowDecimals={false}
              domain={["dataMin", "dataMax + 20"]}
              label={{
                value: `${yaxisLabel}`,
                angle: -90,
                position: "insideLeft"
              }}
            />
            {isModeledGraph && (
              <Area
                type="monotone"
                dataKey={rpc === 8.5 ? "max85" : "max45"}
                fill="#F9C2BD"
              />
            )}
            {isModeledGraph && (
              <Area
                type="monotone"
                dataKey={rpc === 8.5 ? "mean85" : "mean45"}
                fill="#8884d8"
              />
            )}
            {isModeledGraph && (
              <Area
                type="monotone"
                dataKey={rpc === 8.5 ? "min85" : "min45"}
                fill="#fff"
              />
            )}

            {isModeledGraph && (
              <Line
                name="5-yr Mean"
                dataKey={rpc === 8.5 ? "max85" : "max45"}
                stroke="#ED483B"
                dot={false}
                strokeWidth={2}
              />
            )}

            {isModeledGraph && (
              <Line
                name="5-yr Mean"
                dataKey={rpc === 8.5 ? "min85" : "min45"}
                stroke="#2A43F6"
                dot={false}
                strokeWidth={2}
              />
            )}

            {isModeledGraph && (
              <Line
                name="5-yr Mean"
                dataKey={rpc === 8.5 ? "mean85" : "mean45"}
                stroke="#808080"
                dot={false}
                strokeWidth={2}
              />
            )}
            {isObservedGraph && (
              <Line
                name="5-yr Mean"
                dataKey="observedMean"
                stroke="#DC9052"
                dot={false}
                strokeWidth={2}
              />
            )}

            {isObservedGraph && (
              <Scatter
                line={false}
                dataKey="observed"
                fill="green"
                fillOpacity={0.7}
              />
            )}

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
            <Checkbox
              onChange={e => toggleObservedGraph(e.target.checked)}
              checked={isObservedGraph}
            />
            <div style={{ margin: "0 10px" }}>Observed </div>
            <div style={{ margin: "0 10px" }}>
              <div style={{ color: observed ? "green" : "white" }}>
                {year}: {observed} ˚F
              </div>

              <div style={{ color: "#DC9052" }}>
                <Dropdown overlay={rangeList}>
                  <span>{meanLabel}</span>
                </Dropdown>{" "}
                <Icon type="down" style={{ fontSize: 10 }} />{" "}
                {observed ? `${observedMean} ˚F` : "No data"}
              </div>
            </div>
          </LegendCell>

          <LegendCell>
            <Checkbox
              onChange={e => toggleModeledGraph(e.target.checked)}
              checked={isModeledGraph}
            />
            <div style={{ margin: "0 10px" }}>Modeled </div>
            <div style={{ margin: "0 10px" }}>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#ED483B",
                  textAlign: "right"
                }}
              >
                Max: {this.index ? `${max.toFixed(2)} ˚F` : ""}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#808080",
                  textAlign: "right"
                }}
              >
                Mean: {this.index ? `${mean.toFixed(2)} ˚F` : ""}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "#2A43F6",
                  textAlign: "right"
                }}
              >
                Min: {this.index ? `${min.toFixed(2)} ˚F` : ""}
              </div>
            </div>
          </LegendCell>
        </WLegend>
      </div>
    );
  }
}
