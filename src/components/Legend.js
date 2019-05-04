import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Checkbox, Menu, Dropdown, Icon } from "antd";

import {
  WLegend,
  ObservedCell,
  ModeledCell,
  CellRow,
  CellCol,
  HeaderCol,
  Baseline
} from "../styles";

@inject("app")
@observer
export default class Legend extends Component {
  render() {
    const { data, isIndex } = this.props;

    let startYear = "";
    let year = "";
    let observed;

    let meanOfMax;
    let meanOfMean;
    let meanOfMin;

    let meanOfMax2039;
    let meanOfMean2039;
    let meanOfMin2039;

    let meanOfMax2069;
    let meanOfMean2069;
    let meanOfMin2069;

    let meanOfMax2097;
    let meanOfMean2097;
    let meanOfMin2097;

    let observedMean;

    let deltaMax2039;
    let deltaMean2039;
    let deltaMin2039;

    let deltaMax2069;
    let deltaMean2069;
    let deltaMin2069;

    let deltaMax2097;
    let deltaMean2097;
    let deltaMin2097;

    let startYear2039 = "";
    let startYear2069 = "";
    let startYear2097 = "";
    if (data) {
      startYear = data.startYear;
      year = data.year;
      observed = data.observed;

      meanOfMax = data.meanOfMax;
      meanOfMean = data.meanOfMean;
      meanOfMin = data.meanOfMin;

      meanOfMax2039 = data.meanOfMax2039;
      meanOfMean2039 = data.meanOfMean2039;
      meanOfMin2039 = data.meanOfMin2039;

      meanOfMax2069 = data.meanOfMax2069;
      meanOfMean2069 = data.meanOfMean2069;
      meanOfMin2069 = data.meanOfMin2069;

      meanOfMax2097 = data.meanOfMax2097;
      meanOfMean2097 = data.meanOfMean2097;
      meanOfMin2097 = data.meanOfMin2097;

      observedMean = data.observedMean;

      deltaMax2039 = data.deltaMax2039;
      deltaMean2039 = data.deltaMean2039;
      deltaMin2039 = data.deltaMin2039;

      deltaMax2069 = data.deltaMax2069;
      deltaMean2069 = data.deltaMean2069;
      deltaMin2069 = data.deltaMin2069;

      deltaMax2097 = data.deltaMax2097;
      deltaMean2097 = data.deltaMean2097;
      deltaMin2097 = data.deltaMin2097;

      startYear2039 = 2039 - data.yearsCount;
      startYear2069 = 2069 - data.yearsCount;
      startYear2097 = 2097 - data.yearsCount;
    }

    const menu = (
      <Menu onClick={e => this.props.setField("yearsCount", e.key)}>
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
        <ObservedCell>
          <Baseline>
            <h5>Observed</h5>
            {this.props.geom !== "stn" && (
              <Checkbox
                style={{ marginLeft: 10, fonstSize: 8 }}
                onChange={() => this.props.toggleGraph("isObservedGraph")}
                checked={this.props.isObservedGraph}
              />
            )}
          </Baseline>
          <CellRow style={{ marginBottom: "5px" }}>
            <CellCol>
              <HeaderCol>YEAR</HeaderCol>
            </CellCol>
            <CellCol>
              <HeaderCol>VALUE</HeaderCol>
            </CellCol>
            <CellCol>
              <HeaderCol
                style={{ color: this.props.geom === "stn" ? "#8C9DE9" : null }}
              >
                MEAN
              </HeaderCol>
            </CellCol>
          </CellRow>

          <CellRow>
            <CellCol>{isIndex ? year : "-"}</CellCol>
            <CellCol>
              {isIndex ? (observed ? observed.toFixed(1) : null) : "-"}
            </CellCol>
            <CellCol>-</CellCol>
          </CellRow>
          <CellRow>
            <CellCol style={{ color: "red" }}>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      color: "#488B49"
                    }}
                  >
                    {year ? (
                      <div>
                        {startYear}-{year}
                        <Icon type="down" />
                      </div>
                    ) : (
                      "-"
                    )}
                  </div>
                </a>
              </Dropdown>
            </CellCol>
            <CellCol>-</CellCol>
            <CellCol
              style={{ color: this.props.geom === "stn" ? "#8C9DE9" : null }}
            >
              {isIndex ? observedMean : "-"}
            </CellCol>
          </CellRow>
        </ObservedCell>

        {this.props.geom !== "stn" && (
          <ModeledCell>
            <Baseline>
              <h5>Modeled</h5>
              <Checkbox
                style={{ marginLeft: 10, fonstSize: 8 }}
                onChange={() => this.props.toggleGraph("isModeledGraph")}
                checked={this.props.isModeledGraph}
              />
            </Baseline>
            <CellRow style={{ marginBottom: "5px" }}>
              <CellCol>
                <HeaderCol>YEAR</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol style={{ color: "#2176FF" }}>MIN</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol style={{ color: "#2F2F2F" }}>MEDIAN</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol style={{ color: "#C42333" }}>MAX</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol style={{ color: "#2176FF" }}>&Delta; min</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol style={{ color: "#2F2F2F" }}>&Delta; median</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol style={{ color: "#C42333" }}>&Delta; max</HeaderCol>
              </CellCol>
            </CellRow>

            <CellRow>
              <CellCol>
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        color: "#488B49"
                      }}
                    >
                      {year ? (
                        <div>
                          {startYear}-{year}
                        </div>
                      ) : (
                        "-"
                      )}
                    </div>
                  </a>
                </Dropdown>
              </CellCol>
              <CellCol style={{ color: "#2176FF" }}>
                {isIndex ? meanOfMin : "-"}
              </CellCol>
              <CellCol style={{ color: "#2F2F2F" }}>
                {isIndex ? meanOfMean : "-"}
              </CellCol>
              <CellCol style={{ color: "#C42333" }}>
                {isIndex ? meanOfMax : "-"}
              </CellCol>
              <CellCol style={{ color: "#2176FF" }}>
                {isIndex ? "0.0" : "-"}
              </CellCol>
              <CellCol style={{ color: "#2F2F2F" }}>
                {isIndex ? "0.0" : "-"}
              </CellCol>
              <CellCol style={{ color: "#C42333" }}>
                {isIndex ? "0.0" : "-"}
              </CellCol>
            </CellRow>

            <CellRow>
              <CellCol
                style={{ justifyContent: isIndex ? "center" : "center" }}
              >
                {isIndex ? `${startYear2039}-2039` : "-"}
              </CellCol>
              <CellCol style={{ color: "#2176FF" }}>
                {isIndex ? meanOfMin2039 : "-"}
              </CellCol>
              <CellCol style={{ color: "#2F2F2F" }}>
                {isIndex ? meanOfMean2039 : "-"}
              </CellCol>
              <CellCol style={{ color: "#C42333" }}>
                {isIndex ? meanOfMax2039 : "-"}
              </CellCol>
              <CellCol style={{ color: "#2176FF" }}>
                {isIndex ? deltaMin2039 : "-"}
              </CellCol>
              <CellCol style={{ color: "#2F2F2F" }}>
                {isIndex ? deltaMean2039 : "-"}
              </CellCol>
              <CellCol style={{ color: "#C42333" }}>
                {isIndex ? deltaMax2039 : "-"}
              </CellCol>
            </CellRow>

            <CellRow>
              <CellCol
                style={{ justifyContent: isIndex ? "center" : "center" }}
              >
                {isIndex ? `${startYear2069}-2069` : "-"}
              </CellCol>
              <CellCol style={{ color: "#2176FF" }}>
                {isIndex ? meanOfMin2069 : "-"}
              </CellCol>
              <CellCol style={{ color: "#2F2F2F" }}>
                {isIndex ? meanOfMean2069 : "-"}
              </CellCol>
              <CellCol style={{ color: "#C42333" }}>
                {isIndex ? meanOfMax2069 : "-"}
              </CellCol>
              <CellCol style={{ color: "#2176FF" }}>
                {isIndex ? deltaMin2069 : "-"}
              </CellCol>
              <CellCol style={{ color: "#2F2F2F" }}>
                {isIndex ? deltaMean2069 : "-"}
              </CellCol>
              <CellCol style={{ color: "#C42333" }}>
                {isIndex ? deltaMax2069 : "-"}
              </CellCol>
            </CellRow>

            <CellRow>
              <CellCol
                style={{ justifyContent: isIndex ? "center" : "center" }}
              >
                {isIndex ? `${startYear2097}-2097` : "-"}
              </CellCol>
              <CellCol style={{ color: "#2176FF" }}>
                {isIndex ? meanOfMin2097 : "-"}
              </CellCol>
              <CellCol style={{ color: "#2F2F2F" }}>
                {isIndex ? meanOfMean2097 : "-"}
              </CellCol>
              <CellCol style={{ color: "#C42333" }}>
                {isIndex ? meanOfMax2097 : "-"}
              </CellCol>
              <CellCol style={{ color: "#2176FF" }}>
                {isIndex ? deltaMin2097 : "-"}
              </CellCol>
              <CellCol style={{ color: "#2F2F2F" }}>
                {isIndex ? deltaMean2097 : "-"}
              </CellCol>
              <CellCol style={{ color: "#C42333" }}>
                {isIndex ? deltaMax2097 : "-"}
              </CellCol>
            </CellRow>
          </ModeledCell>
        )}
      </WLegend>
    );
  }
}
