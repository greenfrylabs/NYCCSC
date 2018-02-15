import { observable, action, computed } from "mobx";

import { geoms, elems, seasons, parseURL } from "../api";

export default class BlockModel {
  app;
  @observable bChart;
  @observable bElement;
  @observable bGeom;
  @observable bSeason;
  @observable bSid;
  @observable rpc = 8.5;
  @observable blockIdx;

  constructor(store, { chart, element, geom, season, sid, blockIdx }) {
    this.app = store.app;
    this.bChart = chart;
    this.bElement = element;
    this.bGeom = geom;
    this.bSeason = season;
    this.bSid = sid;
    this.blockIdx = blockIdx;
  }

  @action
  setField = (field, val) => {
    console.log(field, val);
    let qString = this.app.history.location.search;
    let arr = [];
    if (qString.includes("&")) {
      arr = qString.split("&");
      qString = arr[this.blockIdx];
    }

    // setting fields for dropdwon
    this[field] = val;

    // parse url
    let geomType = "";
    if (field === "bGeom") geomType = "geom";
    if (field === "bElement") geomType = "element";
    if (field === "bSeason") geomType = "season";
    if (field === "bSid") geomType = "sid";

    let objQString = parseURL(qString);
    if (geomType === "geom") {
      if (val === "state") objQString["sid"] = "NY";
      if (val === "basin") objQString["sid"] = "02020006";
      if (val === "county") objQString["sid"] = "36001";
      if (val === "stn") objQString["sid"] = "USH00300042";
    }

    objQString[geomType] = val;
    let values = Object.values(objQString).join("/");
    this.blockIdx === 0 ? (values = `?c=${values}`) : (values = `c=${values}`);
    arr[this.blockIdx] = values;
    const updatedURL = arr.join("&");
    this.app.history.push(updatedURL);
  };

  @action setRpc = d => (this.rpc = d);

  @computed
  get chart() {
    return this.bChart;
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
    return this.bSid;
  }
}
