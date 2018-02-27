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
  @observable yearsCount;

  constructor(
    store,
    { data, chart, element, geom, season, sid, idx, yearsCount = 5, rpc = 8.5 }
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
    this.yearsCount = yearsCount;
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
    return `${this.yearsCount} years mean`;
  }

  @computed
  get stationData() {
    if (this.data && this.geom === "stn") {
      let results = [...this.data];

      let arr = [];
      let hasNull = false;
      results.forEach((d, i) => {
        results[i]["mean"] = null;
        results[i]["yearsCount"] = this.yearsCount;
        results[i]["startYear"] = d.year - (this.yearsCount - 1);

        arr.push(d.value);
        if (i > this.yearsCount) {
          let tempArr = arr.slice(-this.yearsCount);
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
  get dataWithSelectedRpc() {
    let results = [];
    let p = {};
    this.data.forEach((d, i) => {
      let sid = this.sid;
      if (this.rpc === 8.5) {
        p["max"] = d["max85"][sid];
        p["mean"] = d["mean85"][sid];
        p["min"] = d["min85"][sid];
      } else {
        p["max"] = d["max45"][sid];
        p["mean"] = d["mean45"][sid];
        p["min"] = d["min45"][sid];
      }
      const observed = Number(d["observed"][sid].toFixed(2));
      const year = d.year;
      results.push({ ...p, year, observed });
    });
    console.log(results);
    return results;
  }

  @computed
  get gridData() {
    if (this.data && this.geom !== "stn") {
      console.log(this.dataWithSelectedRpc);
      let deltaMaxObservedArr = [];
      let deltaMeanObservedArr = [];
      let deltaMinObservedArr = [];

      const obj2039 = this.data.find(obj => obj.year === 2039);
      const obj2069 = this.data.find(obj => obj.year === 2069);
      const obj2099 = this.data.find(obj => obj.year === 2099);

      let results = [];
      this.data.forEach((d, i) => {
        // console.log(d);
        let p = {};
        let sid = this.sid;
        if (this.rpc === 8.5) {
          p["max"] = d["max85"][sid];
          p["mean"] = d["mean85"][sid];
          p["min"] = d["min85"][sid];
        } else {
          p["max"] = d["max45"][sid];
          p["mean"] = d["mean45"][sid];
          p["min"] = d["min45"][sid];
        }

        p["yearsCount"] = this.yearsCount;
        p["startYear"] = d.year - (this.yearsCount - 1);
        p.year = d.year;
        d.year >= 2012
          ? (p["observed"] = null)
          : (p["observed"] = Number(d["observed"][sid].toFixed(2)));

        // observed data
        p["deltaMaxObserved"] = null;
        p["deltaMeanObserved"] = null;
        p["deltaMinObserved"] = null;

        // p["deltaMax2039"] = null;
        // p["deltaMean2039"] = null;
        // p["deltaMin2039"] = null;

        // p["deltaMax2069"] = null;
        // p["deltaMean2069"] = null;
        // p["deltaMin2069"] = null;

        // p["deltaMax2099"] = null;
        // p["deltaMean2099"] = null;
        // p["deltaMin2099"] = null;

        deltaMaxObservedArr.push(d.max);
        deltaMeanObservedArr.push(d.mean);
        deltaMinObservedArr.push(d.min);
        // console.log(deltaMaxObservedArr);

        if (i > this.yearsCount) {
          let deltaMaxObservedTemp = deltaMaxObservedArr.slice(
            -this.yearsCount
          );
          // console.log(deltaMaxObservedTemp);
          if (!deltaMaxObservedTemp.includes(null)) {
            p["deltaMaxObserved"] = parseFloat(
              average(deltaMaxObservedArr).toFixed(2)
            );
            console.log(p.deltaMaxObserved);
          }

          let deltaMeanObservedTemp = deltaMeanObservedArr.slice(
            -this.yearsCount
          );
          if (!deltaMeanObservedTemp.includes(null)) {
            p["deltaMeanObserved"] = parseFloat(
              average(deltaMeanObservedArr).toFixed(2)
            );
          }

          let deltaMinObservedTemp = deltaMinObservedArr.slice(
            -this.yearsCount
          );
          if (!deltaMinObservedTemp.includes(null)) {
            p["deltaMinObserved"] = parseFloat(
              average(deltaMinObservedArr).toFixed(2)
            );
          }
        }
        results.push(p);
      });

      console.log(results);
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
