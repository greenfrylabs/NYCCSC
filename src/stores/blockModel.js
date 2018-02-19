import { observable, action, computed } from "mobx";

import { seasons, elems } from "../api";
import states from "../assets/state.json";
import basins from "../assets/basin.json";
import counties from "../assets/county.json";
import stations from "../assets/stn.json";

import { foldm, average } from "../utils";

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

  constructor(
    store,
    { data, chart, element, geom, season, sid, idx, rpc = 8.5 }
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
  }

  @action
  setField = (field, val) => {
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

  @observable meanRange = 5;
  @action setMeanRange = d => (this.meanRange = d);

  // @computed
  // get mean() {
  //   if (this.data) {
  //     const splittedData = foldm(this.data, this.meanRange);
  //     const filtered = splittedData.filter(
  //       chunk => chunk.length === this.meanRange
  //     );
  //     const means = filtered.map((chunk, i) => {
  //       const means = chunk.map(y => y.e);
  //       return {
  //         period: `${chunk[0].year}-${chunk[chunk.length - 1].year}`,
  //         mean: average(means).toFixed(2)
  //       };
  //     });
  //   }
  // }

  @computed
  get dataWithMeanValues() {
    if (this.data) {
      let mean = null;
      let arr = [];
      let hasNull = false;
      return this.data.map((d, i) => {
        arr.push(d.e);
        const chunk = takeRight(arr, 5);
        hasNull = chunk.includes(null);
        if (i > 5) {
          if (!hasNull) {
            mean = parseFloat(average(takeRight(arr, 5)).toFixed(2));
            return { ...d, mean, hasNull };
          } else {
            mean = null;
            return { ...d, mean, hasNull };
          }
        }
        return { ...d, mean, hasNull };
      });
    }
  }
}
