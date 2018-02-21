import { observable, action, computed } from "mobx";

import { seasons, elems } from "../api";
import states from "../assets/state.json";
import basins from "../assets/basin.json";
import counties from "../assets/county.json";
import stations from "../assets/stn.json";

import { average } from "../utils";

const takeRight = require("lodash.takeright");

export default class BlockModel {
  app;
  @observable data;
  @observable chart;
  @observable element;
  @observable geom;
  @observable season;
  @observable sid;
  @observable rpc;
  @observable idx;
  @observable meanRange;

  constructor(
    store,
    { data, chart, element, geom, season, sid, idx, meanRange = 5, rpc = 8.5 }
  ) {
    this.app = store.app;
    this.data = data;
    this.chart = chart;
    this.element = element;
    this.geom = geom;
    this.season = season;
    this.sid = sid;
    this.idx = idx;
    this.rpc = rpc;
    this.meanRange = meanRange;
  }

  @action
  setField = (field, val) => {
    console.log(field, val);
    if (field === "geom") {
      this[field] = val;
      if (val === "state") this.sid = "NY";
      if (val === "basin") this.sid = "02020006";
      if (val === "county") this.sid = "36001";
      if (val === "stn") this.sid = "USH00300042";
    } else {
      this[field] = val;
    }
    this.app.blockStore.updateBlock(this.idx);
  };

  @action
  setRpc = d => {
    this.rpc = d;
    this.app.blockStore.updateBlock(this.idx);
  };

  @computed
  get graphTitle() {
    const season = seasons.get(this.season).title;
    const element = elems.get(this.element).label;
    let sid;
    if (this.geom === "state") {
      sid = states.meta.find(s => s.id === this.sid).name;
    }
    if (this.geom === "county") {
      sid = counties.meta.find(s => s.id === this.sid).name;
    }

    if (this.geom === "basin") {
      sid = basins.meta.find(s => s.id === this.sid).name;
    }

    if (this.geom === "stn") {
      sid = stations.features.find(s => s.id === this.sid).properties.name;
    }
    return `${season} ${element} - ${sid}`;
  }

  @computed
  get yaxisLabel() {
    return elems.get(this.element).yLabel;
  }

  @computed
  get elementLabel() {
    return elems.get(this.element).label;
  }

  @computed
  get meanLabel() {
    return `${this.meanRange} years mean`;
  }

  @computed
  get dataWithMeanValues() {
    if (this.data) {
      let mean = null;
      const meanRange = this.meanRange;
      let arr = [];
      let hasNull = false;
      return this.data.map((d, i) => {
        arr.push(d.e);
        const startYear = d.year - (this.meanRange - 1);
        const chunk = takeRight(arr, this.meanRange);
        hasNull = chunk.includes(null);
        if (i > this.meanRange) {
          if (!hasNull) {
            mean = parseFloat(
              average(takeRight(arr, this.meanRange)).toFixed(2)
            );
            return { startYear, ...d, mean, meanRange };
          } else {
            mean = null;
            return { startYear, ...d, mean, meanRange };
          }
        }
        return { startYear, ...d, mean, meanRange };
      });
    }
  }

  @observable stationCSV = [];
  @action
  setStationCSV = () => {
    this.dataWithMeanValues.forEach(d =>
      this.stationCSV.push({
        Year: d.year,
        [this.elementLabel]: d.e,
        Range: `${d.startYear}-${d.year}`,
        Mean: d.mean
      })
    );
  };
}
