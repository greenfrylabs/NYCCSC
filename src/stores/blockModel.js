import { observable, action, computed } from "mobx";

import { seasons, elems, defaultSids } from "../api";
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
  @observable isObservedGraph = true;
  @observable isModeledGraph = true;

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
      this.sid = defaultSids[val];
      /*if (val === "state") this.sid = "MA";
      if (val === "basin") this.sid = default"Boston Harbor";
      if (val === "county") this.sid = "25025";
      */
      //if (val === "stn") this.sid = "USH00300042";
    } else {
      this[field] = val;
    }
    //if ((field === "sid" && this.geom !== "stn") || field === "yearsCount") {
      //this.app.blockStore.updateBlockWithoutFetching(this.idx);
    //} else {
    this.app.blockStore.updateBlock(this.idx);
    //}
  };

  @action
  toggleGraph = graph => {
    this[graph] = !this[graph];
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
      sid = states.meta.find(s => s.id === this.sid || s.name === this.sid).name;
    }
    if (this.geom === "county") {
      counties.meta.forEach(m => console.log(m));
      sid = counties.meta.find(s => s.id === this.sid || s.name === this.sid).name;
    }

    if (this.geom === "basin") {
      sid = basins.meta.find(s => s.id === this.sid || s.name === this.sid).name;
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
      let results = [];
      let p = {};
      let sid = this.sid;
      let pull_val = function (data, key) {
        try {
          return Number(data[key][sid]);
        } catch (e) {
          return null;
        }
      }
      const min85 = this.gridData.map(d => pull_val(d, 'min85'));
      const min45 = this.gridData.map(d => pull_val(d, 'min45'));
      const max85 = this.gridData.map(d => pull_val(d, 'max85'));
      const max45 = this.gridData.map(d => pull_val(d, 'max45'));
      const obsArr = this.gridData.map(d => pull_val(d, 'observed'));

      const yMin = Math.floor(Math.min(...(min45.concat(min85).filter((v) => v !== null))));
      const yMax = Math.ceil(Math.max(...(max45.concat(max85).concat(obsArr).filter((v) => v !== null))));

      this.gridData.forEach((d, i) => {
        if (this.rpc === 8.5) {
          p["max"] = pull_val(d, "max85");
          p["mean"] = pull_val(d, "med85");
          p["min"] = pull_val(d, "min85");
        } else {
          p["max"] = pull_val(d, "max45");
          p["mean"] = pull_val(d, "med45");
          p["min"] = pull_val(d, "min45");
        }
        const yearsCount = this.yearsCount;
        let observed = pull_val(d, 'observed');

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
      const idx2097 = this.gridData.findIndex(obj => obj.year === 2097);

      let results = [];
      this.dataWithMeans.forEach((d, i) => {
        let p = {};

        p["meanOfMax2039"] = this.dataWithMeans[idx2039].meanOfMax;
        p["meanOfMean2039"] = this.dataWithMeans[idx2039].meanOfMean;
        p["meanOfMin2039"] = this.dataWithMeans[idx2039].meanOfMin;

        p["meanOfMax2069"] = this.dataWithMeans[idx2069].meanOfMax;
        p["meanOfMean2069"] = this.dataWithMeans[idx2069].meanOfMean;
        p["meanOfMin2069"] = this.dataWithMeans[idx2069].meanOfMin;

        p["meanOfMax2097"] = this.dataWithMeans[idx2097].meanOfMax;
        p["meanOfMean2097"] = this.dataWithMeans[idx2097].meanOfMean;
        p["meanOfMin2097"] = this.dataWithMeans[idx2097].meanOfMin;

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

        p["deltaMax2097"] = (
          this.dataWithMeans[idx2097].meanOfMax - d.meanOfMax
        ).toFixed(1);
        p["deltaMean2097"] = (
          this.dataWithMeans[idx2097].meanOfMean - d.meanOfMean
        ).toFixed(1);
        p["deltaMin2097"] = (
          this.dataWithMeans[idx2097].meanOfMin - d.meanOfMin
        ).toFixed(1);

        if (d.mean && d.min) {
          p["mean-min"] = d.mean - d.min;
        } else {
          p["mean-min"] = null;
        }
        if (d.max && d.mean) {
          p["max-mean"] = d.max - d.mean;
        } else {
          p["max-mean"] = null
        }

        results.push({ ...d, ...p });
      });

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
        RCP: this.rpc
      });
    });
  };
}
