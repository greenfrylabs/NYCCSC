import { observable, action, computed } from "mobx";

import { seasons, elems } from "../api";
import states from "../assets/state.json";
import basins from "../assets/basin.json";
import counties from "../assets/county.json";
import stations from "../assets/stn.json";

import { average } from "../utils";

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
    // console.log(field, val);
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
  get stationData() {
    if (this.data && this.geom === "stn") {
      let results = [...this.data];

      let arr = [];
      let hasNull = false;
      results.forEach((d, i) => {
        results[i]["mean"] = null;
        results[i]["meanRange"] = this.meanRange;
        results[i]["startYear"] = d.year - (this.meanRange - 1);

        arr.push(d.value);
        if (i > this.meanRange) {
          let tempArr = arr.slice(-this.meanRange);
          hasNull = tempArr.includes(null);
          if (!hasNull) {
            results[i]["mean"] = parseFloat(average(tempArr).toFixed(2));
          }
        }
      });
      // console.log(results);
      return results;
    }
  }

  @computed
  get gridData() {
    if (this.data && this.geom !== "stn") {
      let results = [...this.data];

      let arrObserved = [];
      let arrModeled = [];
      let arrObservedHasNull = false;
      let arrModeledHasNull = false;

      results.forEach((d, i) => {
        results[i]["observedMean"] = null;
        results[i]["meanRange"] = this.meanRange;
        results[i]["startYear"] = d.year - (this.meanRange - 1);

        if (this.rpc === 8.5) {
          results[i]["max"] = d["max85"][this.sid];
          results[i]["mean"] = d["mean85"][this.sid];
          results[i]["min"] = d["min85"][this.sid];
        } else {
          results[i]["max"] = d["max45"][this.sid];
          results[i]["mean"] = d["mean45"][this.sid];
          results[i]["min"] = d["min45"][this.sid];
        }

        results[i]["observed"] = Number(d["observed"][this.sid].toFixed(2));
        results[i]["calculatedMean"] = null;

        if (d.year >= 2012) {
          results[i]["observed"] = null;
        }

        arrObserved.push(d.observed);
        if (this.rpc === 8.5) {
          arrModeled.push(d.mean85);
        } else {
          arrModeled.push(d.mean45);
        }

        if (i > this.meanRange) {
          let tempArr = arrObserved.slice(-this.meanRange);
          let tempArr2 = arrModeled.slice(-this.meanRange);
          arrObservedHasNull = tempArr.includes(null);
          arrModeledHasNull = tempArr2.includes(null);
          if (!arrObservedHasNull) {
            results[i]["observedMean"] = parseFloat(
              average(tempArr).toFixed(2)
            );
          }
          if (!arrModeledHasNull) {
            results[i]["calculatedMean"] = parseFloat(
              average(tempArr2).toFixed(2)
            );
          }
        }
      });
      // console.log(results);
      return results;
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
