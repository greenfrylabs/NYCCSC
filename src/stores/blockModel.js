import { observable, action, computed } from "mobx";

import { geoms, chartDefs, elems, seasons } from "../api";

export default class BlockModel {
  @observable bBbox = "";
  @observable bChart = "Temp";
  @observable bElement = "maxt";
  @observable bGeom = "state";
  @observable bSeason = "ANN";
  @observable bSid = "NY";
  @observable bRpc = 8.5;

  constructor({ bbox, chart, element, geom, season, sid }) {
    this.bBbox = bbox;
    this.bChart = chart;
    this.bElement = element;
    this.bGeom = geom;
    this.bSeason = season;
    this.bSid = sid;
  }

  @action setGeom = d => (this.bGeom = d);
  @action setElement = d => (this.bElement = d);
  @action setSeason = d => (this.bSeason = d);
  @action setSid = d => (this.bSid = d);

  @computed
  get chart() {
    return chartDefs.get(this.bChart).title;
  }
  @computed
  get geom() {
    return geoms.get(this.bGeom);
  }
  @computed
  get element() {
    return elems.get(this.bElement).label;
  }
  @computed
  get season() {
    return seasons.get(this.bSeason).title;
  }
  @computed
  get sid() {
    console.log(this.bSid);
    // return this.bSid
  }
}
