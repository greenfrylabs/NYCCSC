import { observable, action, computed } from "mobx";

import { geoms, chartDefs, elems, seasons, parseURL } from "../api";

export default class BlockModel {
  app;
  @observable bBbox = "";
  @observable bChart = "Temp";
  @observable bElement = "maxt";
  @observable bGeom = "state";
  @observable bSeason = "ANN";
  @observable bSid = "NY";
  @observable rpc = 8.5;
  @observable blockIdx;

  constructor(store, { list, chart, element, geom, season, sid, blockIdx }) {
    console.log(list, sid);
    this.app = store.app;
    this.bBbox = list.bbox;
    this.bChart = chart;
    this.bElement = element;
    this.bGeom = geom;
    this.bSeason = season;
    this.bSid = sid;
    this.blockIdx = blockIdx;
  }

  @action
  setField = (field, val) => {
    let qString = this.app.history.location.search;
    let arr = [];
    if (qString.includes("&")) {
      arr = qString.split("&");
      qString = arr[this.blockIdx];
    }

    // setting fields for dropdwon
    this[field] = val;

    // parse url
    let newField = "";
    if (field === "bGeom") newField = "geom";
    if (field === "bElement") newField = "element";
    if (field === "bSeason") newField = "season";
    if (field === "bSid") newField = "sid";

    let objQString = parseURL(qString);
    if (newField === "geom") {
      if (val === "state") objQString["sid"] = "NY";
      if (val === "basin") objQString["sid"] = "02020006";
      if (val === "county") objQString["sid"] = "36001";
      if (val === "stn") objQString["sid"] = "USH00300042";
    }

    objQString[newField] = val;
    let values = Object.values(objQString).join("/");
    this.blockIdx === 0 ? (values = `?c=${values}`) : (values = `c=${values}`);
    arr[this.blockIdx] = values;
    const updatedURL = arr.join("&");
    this.app.history.push(updatedURL);
  };

  @action setRpc = d => (this.rpc = d);

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
    return this.bSid;
  }
}
