import React, { Component } from "react";

import { Menu, Dropdown, Icon, Checkbox } from "antd";
import { WLegend, LegendCell } from "../styles";

export default class Legend extends Component {
  render() {
    const { min } = this.props.datum;

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
      <WLegend>
        <LegendCell>
          <Checkbox
            onChange={e => toggleObservedGraph(e.target.checked)}
            checked={isObservedGraph}
          />
          <div style={{ margin: "0 10px" }}>Observed </div>
          <div style={{ margin: "0 10px" }}>
            <div style={{ color: observed ? "#7D7A7A" : "white" }}>
              {year}: {observed} ˚F
            </div>

            <div style={{ color: "black" }}>
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

          <div>
            <div
              style={{
                fontSize: "1rem",
                color: "#255F85",
                textAlign: "right"
              }}
            >
              Min: {this.index ? `${min.toFixed(2)} ˚F` : ""}
            </div>
            <div
              style={{
                fontSize: "1rem",
                color: "#C5283D",
                textAlign: "right"
              }}
            >
              Max: {this.index ? `${max.toFixed(2)} ˚F` : ""}
            </div>
          </div>
          <div>
            <div style={{ margin: "0 40px" }}>
              <div
                style={{
                  fontSize: "1rem",
                  color: "#2F2F2F",
                  textAlign: "right"
                }}
              >
                Mean: {this.index ? `${mean.toFixed(2)} ˚F` : ""}
              </div>
            </div>
            <div style={{ margin: "0 40px" }}>
              <div
                style={{
                  fontSize: "1rem",
                  color: "black",
                  textAlign: "right"
                }}
              >
                {this.index ? `${year - startYear + 1}-yrs` : "5-yrs"} Mean:{" "}
                {this.index
                  ? `${calculatedMean && calculatedMean.toFixed(2)} ˚F`
                  : ""}
              </div>
            </div>
          </div>
        </LegendCell>
      </WLegend>
    );
  }
}
