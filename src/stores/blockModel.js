import { observable, action, computed } from "mobx";

import { seasons, elems } from "../api";
import states from "../assets/state.json";
import basins from "../assets/basin.json";
import counties from "../assets/county.json";
import stations from "../assets/stn.json";

import { average } from "../utils";

export default class BlockModel {
  app;
  @observable stationData;
  @observable gridData;
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
    {
      stationData,
      gridData,
      chart,
      element,
      geom,
      season,
      sid,
      idx,
      yearsCount = 5,
      rpc = 8.5
    }
  ) {
    this.app = store.app;
    this.stationData = stationData;
    this.gridData = gridData;
    this.chart = chart;
    this.element = element;
    this.geom = geom;
    this.season = season;
    this.sid = sid;
    this.idx = idx;
    this.rpc = rpc;
    this.yearsCount = Number(yearsCount);
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
    if (field === "sid" && this.geom !== "stn") {
      this.app.blockStore.updateBlockWithoutFetching(this.idx);
    } else {
      this.app.blockStore.updateBlock(this.idx);
    }
  };

  @action
  setRpc = d => {
    this.rpc = d;
    this.app.blockStore.updateBlockWithoutFetching(this.idx);
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
  get stnData() {
    if (this.stationData) {
      let results = [];
      let meanArr = [];
      let hasNull = false;
      this.stationData.forEach((d, i) => {
        let p = {};
        p["observedMean"] = null;
        p["yearsCount"] = this.yearsCount;
        p["startYear"] = d.year - (this.yearsCount - 1);

        meanArr.push(d.observed);
        if (i > this.yearsCount) {
          let tempArr = meanArr.slice(-this.yearsCount);
          hasNull = tempArr.includes(null);
          if (!hasNull) {
            p["observedMean"] = parseFloat(average(tempArr).toFixed(2));
          }
        }
        results.push({ ...d, ...p });
      });
      // console.log(results);
      return results;
    }
  }

  @computed
  get dataWithSelectedRpc() {
    if (this.gridData) {
      // console.log(this.gridData.slice());
      let results = [];
      let p = {};
      let sid = this.sid;

      const min85 = this.gridData.map(d => d.min85[sid]);
      const min45 = this.gridData.map(d => d.min45[sid]);
      const max85 = this.gridData.map(d => d.max85[sid]);
      const max45 = this.gridData.map(d => d.max45[sid]);
      const obsArr = this.gridData.map(d => d.observed[sid]);

      const yMin = Math.floor(Math.min(...min45, ...min85));
      const yMax = Math.ceil(Math.max(...max45, ...max85, ...obsArr));

      this.gridData.forEach((d, i) => {
        if (this.rpc === 8.5) {
          p["max"] = d["max85"][sid];
          p["mean"] = d["mean85"][sid];
          p["min"] = d["min85"][sid];
        } else {
          p["max"] = d["max45"][sid];
          p["mean"] = d["mean45"][sid];
          p["min"] = d["min45"][sid];
        }
        const yearsCount = this.yearsCount;
        let observed;
        d.year >= 2013
          ? (observed = null)
          : (observed = Number(d["observed"][sid]));
        const year = d.year;
        const startYear = year - (this.yearsCount - 1);
        results.push({
          ...p,
          year,
          observed,
          yearsCount,
          startYear,
          yMin,
          yMax
        });
      });
      return results;
    }
  }

  @computed
  get dataWithMeans() {
    if (this.dataWithSelectedRpc) {
      let meanOfMaxArr = [];
      let meanOfMeanArr = [];
      let meanOfMinArr = [];

      let observedMeanArr = [];

      let results = [];
      this.dataWithSelectedRpc.forEach((d, i) => {
        let p = {};

        p["meanOfMax"] = null;
        p["meanOfMean"] = null;
        p["meanOfMin"] = null;

        p["observedMean"] = null;

        meanOfMaxArr.push(d.max);
        meanOfMeanArr.push(d.mean);
        meanOfMinArr.push(d.min);

        observedMeanArr.push(d.observed);
        if (i > this.yearsCount) {
          let meanOfMaxTemp = meanOfMaxArr.slice(-this.yearsCount);
          if (!meanOfMaxTemp.includes(null)) {
            p["meanOfMax"] = parseFloat(average(meanOfMaxTemp).toFixed(1));
          }

          let meanOfMeanTemp = meanOfMeanArr.slice(-this.yearsCount);
          if (!meanOfMeanTemp.includes(null)) {
            p["meanOfMean"] = parseFloat(average(meanOfMeanTemp).toFixed(1));
          }

          let meanOfMinTemp = meanOfMinArr.slice(-this.yearsCount);
          if (!meanOfMinTemp.includes(null)) {
            p["meanOfMin"] = parseFloat(average(meanOfMinTemp).toFixed(1));
          }

          // Observed
          let observedMeanTemp = observedMeanArr.slice(-this.yearsCount);
          if (!observedMeanTemp.includes(null)) {
            p["observedMean"] = parseFloat(average(observedMeanArr).toFixed(1));
          }
        }

        results.push({ ...p, ...d });
      });

      // console.log(results);
      return results;
    }
  }

  @computed
  get grdData() {
    if (this.dataWithMeans) {
      const idx2039 = this.gridData.findIndex(obj => obj.year === 2039);
      const idx2069 = this.gridData.findIndex(obj => obj.year === 2069);
      const idx2099 = this.gridData.findIndex(obj => obj.year === 2099);

      let results = [];
      this.dataWithMeans.forEach((d, i) => {
        let p = {};

        p["meanOfMax2039"] = this.dataWithMeans[idx2039].meanOfMax;
        p["meanOfMean2039"] = this.dataWithMeans[idx2039].meanOfMean;
        p["meanOfMin2039"] = this.dataWithMeans[idx2039].meanOfMin;

        p["meanOfMax2069"] = this.dataWithMeans[idx2069].meanOfMax;
        p["meanOfMean2069"] = this.dataWithMeans[idx2069].meanOfMean;
        p["meanOfMin2069"] = this.dataWithMeans[idx2069].meanOfMin;

        p["meanOfMax2099"] = this.dataWithMeans[idx2099].meanOfMax;
        p["meanOfMean2099"] = this.dataWithMeans[idx2099].meanOfMean;
        p["meanOfMin2099"] = this.dataWithMeans[idx2099].meanOfMin;

        p["deltaMax2039"] = (
          this.dataWithMeans[idx2039].meanOfMax - d.meanOfMax
        ).toFixed(1);
        p["deltaMean2039"] = (
          this.dataWithMeans[idx2039].meanOfMean - d.meanOfMean
        ).toFixed(1);
        p["deltaMin2039"] = (
          this.dataWithMeans[idx2039].meanOfMin - d.meanOfMin
        ).toFixed(1);

        p["deltaMax2069"] = (
          this.dataWithMeans[idx2069].meanOfMax - d.meanOfMax
        ).toFixed(1);
        p["deltaMean2069"] = (
          this.dataWithMeans[idx2069].meanOfMean - d.meanOfMean
        ).toFixed(1);
        p["deltaMin2069"] = (
          this.dataWithMeans[idx2069].meanOfMin - d.meanOfMin
        ).toFixed(1);

        p["deltaMax2099"] = (
          this.dataWithMeans[idx2099].meanOfMax - d.meanOfMax
        ).toFixed(1);
        p["deltaMean2099"] = (
          this.dataWithMeans[idx2099].meanOfMean - d.meanOfMean
        ).toFixed(1);
        p["deltaMin2099"] = (
          this.dataWithMeans[idx2099].meanOfMin - d.meanOfMin
        ).toFixed(1);

        results.push({ ...d, ...p });
      });
      // console.log(results);
      return results;
    }
  }

  @observable stationCSV = [];
  @action
  setStationCSV = () => {
    let dataSource = [];
    this.geom === "stn"
      ? (dataSource = this.stnData)
      : (dataSource = this.grdData);

    dataSource.forEach(d => {
      // console.log(d);
      this.stationCSV.push({
        Year: d.year,
        [this.elementLabel]: d.observed,
        Range: `${d.startYear}-${d.year}`,
        [`${d.yearsCount}-years Mean`]: d.observedMean,
        RPC: this.rpc
      });
    });
  };
}
