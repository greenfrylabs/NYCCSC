import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// import { Table } from "antd";
import {
  WLegend,
  ObservedCell,
  ModeledCell,
  CellRow,
  CellCol
} from "../styles";

@inject("app")
@observer
export default class Legend extends Component {
  render() {
    const { data } = this.props;
    console.log(data);

    let startYear = "";
    let year = "";
    let observed;
    let deltaMaxObserved;
    let deltaMeanObserved;
    let deltaMinObserved;
    let min2039;
    let mean2039;
    let max2039;
    let min2069;
    let mean2069;
    let max2069;
    let min2099;
    let mean2099;
    let max2099;
    let startYear2039 = "";
    let startYear2069 = "";
    let startYear2099 = "";
    if (data) {
      startYear = data.startYear;
      year = data.year;
      observed = data.observed;
      deltaMaxObserved = data.deltaMaxObserved;
      deltaMeanObserved = data.deltaMeanObserved;
      deltaMinObserved = data.deltaMinObserved;

      startYear2039 = 2039 - data.meanRange;
      startYear2069 = 2069 - data.meanRange;
      startYear2099 = 2099 - data.meanRange;
    }

    return (
      <WLegend>
        <ObservedCell>
          <h5>Observed</h5>
          <CellRow>
            <CellCol>
              <small>
                {" "}
                <b>YEAR</b>
              </small>
            </CellCol>
            <CellCol>
              <small>
                {" "}
                <b>VALUE</b>
              </small>
            </CellCol>
            <CellCol>
              <small>
                {" "}
                <b>MEAN</b>
              </small>
            </CellCol>
          </CellRow>

          <CellRow>
            <CellCol>{year}</CellCol>
            <CellCol>{observed}</CellCol>
            <CellCol>-</CellCol>
          </CellRow>
          <CellRow>
            <CellCol style={{ color: "red" }}>
              {startYear ? `${startYear}-${year}` : ""}
            </CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
          </CellRow>
        </ObservedCell>

        <ModeledCell>
          <h5>Modeled</h5>
          <CellRow>
            <CellCol>
              <small>
                {" "}
                <b>YEAR</b>
              </small>
            </CellCol>
            <CellCol>
              <small>
                {" "}
                <b>MIN</b>
              </small>
            </CellCol>
            <CellCol>
              <small>
                {" "}
                <b>MEAN</b>
              </small>
            </CellCol>
            <CellCol>
              <small>
                {" "}
                <b>MAX</b>
              </small>
            </CellCol>
            <CellCol>
              <small>
                {" "}
                <b>&Delta; min</b>
              </small>
            </CellCol>
            <CellCol>
              <small>
                {" "}
                <b>&Delta; mean</b>
              </small>
            </CellCol>
            <CellCol>
              <small>
                {" "}
                <b>&Delta; max</b>
              </small>
            </CellCol>
          </CellRow>

          <CellRow>
            <CellCol style={{ color: "red" }}>
              {year ? `${startYear}-${year}` : ""}
            </CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
            <CellCol>{deltaMinObserved}</CellCol>
            <CellCol>{deltaMeanObserved}</CellCol>
            <CellCol>{deltaMaxObserved}</CellCol>
          </CellRow>

          <CellRow>
            <CellCol>{startYear2039 ? `${startYear2039}-2039` : ""}</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
          </CellRow>

          <CellRow>
            <CellCol>{startYear2069 ? `${startYear2069}-2069` : ""}</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
          </CellRow>

          <CellRow>
            <CellCol>{startYear2099 ? `${startYear2099}-2099` : ""}</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
            <CellCol>-</CellCol>
          </CellRow>
        </ModeledCell>
      </WLegend>
    );
  }
}
