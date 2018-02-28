import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Checkbox } from "antd";
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
    const { data } = this.props;
    const {
      toggleModeledGraph,
      isObservedGraph,
      isModeledGraph,
      toggleObservedGraph
    } = this.props.app.blockStore;
    // console.log(data);

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

    let meanOfMax2099;
    let meanOfMean2099;
    let meanOfMin2099;

    let observedMean;

    let deltaMax2039;
    let deltaMean2039;
    let deltaMin2039;

    let deltaMax2069;
    let deltaMean2069;
    let deltaMin2069;

    let deltaMax2099;
    let deltaMean2099;
    let deltaMin2099;

    let startYear2039 = "";
    let startYear2069 = "";
    let startYear2099 = "";
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

      meanOfMax2099 = data.meanOfMax2099;
      meanOfMean2099 = data.meanOfMean2099;
      meanOfMin2099 = data.meanOfMin2099;

      observedMean = data.observedMean;

      deltaMax2039 = data.deltaMax2039;
      deltaMean2039 = data.deltaMean2039;
      deltaMin2039 = data.deltaMin2039;

      deltaMax2069 = data.deltaMax2069;
      deltaMean2069 = data.deltaMean2069;
      deltaMin2069 = data.deltaMin2069;

      deltaMax2099 = data.deltaMax2099;
      deltaMean2099 = data.deltaMean2099;
      deltaMin2099 = data.deltaMin2099;

      startYear2039 = 2039 - data.yearsCount;
      startYear2069 = 2069 - data.yearsCount;
      startYear2099 = 2099 - data.yearsCount;
    }

    return (
      <WLegend>
        <ObservedCell>
          <Baseline>
            <h5>Observed</h5>
            {this.props.geom !== "stn" && (
              <Checkbox
                style={{ marginLeft: 10, fonstSize: 8 }}
                onChange={e => toggleObservedGraph(e.target.checked)}
                checked={isObservedGraph}
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
              <HeaderCol>MEAN</HeaderCol>
            </CellCol>
          </CellRow>

          <CellRow>
            <CellCol>{data ? year : "-"}</CellCol>
            <CellCol>{data ? observed : "-"}</CellCol>
            <CellCol>-</CellCol>
          </CellRow>
          <CellRow>
            <CellCol style={{ color: "red" }}>
              {startYear ? `${startYear}-${year}` : "-"}
            </CellCol>
            <CellCol>-</CellCol>
            <CellCol>{data ? observedMean : "-"}</CellCol>
          </CellRow>
        </ObservedCell>

        {this.props.geom !== "stn" && (
          <ModeledCell>
            <Baseline>
              <h5>Modeled</h5>
              <Checkbox
                style={{ marginLeft: 10, fonstSize: 8 }}
                onChange={e => toggleModeledGraph(e.target.checked)}
                checked={isModeledGraph}
              />
            </Baseline>
            <CellRow style={{ marginBottom: "5px" }}>
              <CellCol>
                <HeaderCol>YEAR</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol>MIN</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol>MEAN</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol>MAX</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol>&Delta; min</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol>&Delta; mean</HeaderCol>
              </CellCol>
              <CellCol>
                <HeaderCol>&Delta; max</HeaderCol>
              </CellCol>
            </CellRow>

            <CellRow>
              <CellCol style={{ color: "red" }}>
                {year ? `${startYear}-${year}` : "-"}
              </CellCol>
              <CellCol>{data ? meanOfMin : "-"}</CellCol>
              <CellCol>{data ? meanOfMean : "-"}</CellCol>
              <CellCol>{data ? meanOfMax : "-"}</CellCol>
              <CellCol>{year ? "0.00" : "-"}</CellCol>
              <CellCol>{year ? "0.00" : "-"}</CellCol>
              <CellCol>{year ? "0.00" : "-"}</CellCol>
            </CellRow>

            <CellRow>
              <CellCol>{startYear2039 ? `${startYear2039}-2039` : "-"}</CellCol>
              <CellCol>{data ? meanOfMin2039 : "-"}</CellCol>
              <CellCol>{data ? meanOfMean2039 : "-"}</CellCol>
              <CellCol>{data ? meanOfMax2039 : "-"}</CellCol>
              <CellCol>{data ? deltaMin2039 : "-"}</CellCol>
              <CellCol>{data ? deltaMean2039 : "-"}</CellCol>
              <CellCol>{data ? deltaMax2039 : "-"}</CellCol>
            </CellRow>

            <CellRow>
              <CellCol>{startYear2069 ? `${startYear2069}-2069` : "-"}</CellCol>
              <CellCol>{data ? meanOfMin2069 : "-"}</CellCol>
              <CellCol>{data ? meanOfMean2069 : "-"}</CellCol>
              <CellCol>{data ? meanOfMax2069 : "-"}</CellCol>
              <CellCol>{data ? deltaMin2069 : "-"}</CellCol>
              <CellCol>{data ? deltaMean2069 : "-"}</CellCol>
              <CellCol>{data ? deltaMax2069 : "-"}</CellCol>
            </CellRow>

            <CellRow>
              <CellCol>{startYear2099 ? `${startYear2099}-2099` : "-"}</CellCol>
              <CellCol>{data ? meanOfMin2099 : "-"}</CellCol>
              <CellCol>{data ? meanOfMean2099 : "-"}</CellCol>
              <CellCol>{data ? meanOfMax2099 : "-"}</CellCol>
              <CellCol>{data ? deltaMin2099 : "-"}</CellCol>
              <CellCol>{data ? deltaMean2099 : "-"}</CellCol>
              <CellCol>{data ? deltaMax2099 : "-"}</CellCol>
            </CellRow>
          </ModeledCell>
        )}
      </WLegend>
    );
  }
}
