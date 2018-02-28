import { observable, action, when } from "mobx";

// model
import BlockModel from "./blockModel";

// utils
import { isEquivalent } from "../utils";
import { parseURL, buildQuery, correctParam } from "../api";
import { fetchStationData, fetchGridData } from "fetchData";

import stations from "../assets/stn.json";
import states from "../assets/state.json";
import counties from "../assets/county.json";
import basins from "../assets/basin.json";

export default class BlockStore {
  app;
  constructor(app) {
    this.app = app;
    when(() => this.blocks.length === 0, () => this.setBlocks());
    this.app.history.listen((location, action) => {
      if (action === "POP") {
        this.blocks = [];
        this.setBlocks();
      }
    });
  }

  @observable isObservedGraph = true;
  @action toggleObservedGraph = d => (this.isObservedGraph = d);
  @observable isModeledGraph = true;
  @action toggleModeledGraph = d => (this.isModeledGraph = d);
  @observable blocks = [];

  @action
  setBlocks = () => {
    console.log("setBlocks");
    let arr = [];
    let qString = this.app.history.location.search;
    const defaultQString = "?c=Temp/state/maxt/ANN/NY/";

    if (!qString) {
      this.app.history.push("?c=Temp/state/maxt/ANN/NY/");
      qString = defaultQString;
    }

    if (qString.includes("&")) {
      arr = qString.split("&");
    } else {
      arr = [qString];
    }

    arr.forEach((qString, i) => {
      let qParam = parseURL(qString);
      const nParam = correctParam(qParam);
      const isValid = isEquivalent(qParam, nParam);

      if (!isValid) {
        console.log("not valid");
        this.app.history.replace("?c=Temp/state/maxt/ANN/NY/");
        qParam = parseURL("?c=Temp/state/maxt/ANN/NY/");
      }

      const chart = qParam.chart;
      const element = qParam.element;
      const geom = qParam.geom;
      const season = qParam.season;
      const sid = qParam.sid;

      this.blocks.push(
        new BlockModel(this, {
          chart,
          element,
          geom,
          season,
          sid,
          idx: i
        })
      );
    });
    this.loadData();
  };

  @action
  addBlock = index => {
    // console.log("addChart");
    const b = this.blocks[index];
    const data = b.data;
    const chart = b.chart;
    const element = b.element;
    const geom = b.geom;
    const season = b.season;
    const sid = b.sid;
    const idx = b.idx + 1;
    const rpc = b.rpc;
    const yearsCount = b.yearsCount;

    this.blocks.push(
      new BlockModel(this, {
        data,
        chart,
        element,
        geom,
        season,
        sid,
        idx,
        rpc,
        yearsCount
      })
    );
    this.setQString();
  };

  @action
  updateBlock = index => {
    // console.log("updateBlock");
    const b = this.blocks[index];
    const data = b.data;
    const chart = b.chart;
    const element = b.element;
    const geom = b.geom;
    const season = b.season;
    const sid = b.sid;
    const idx = b.idx;
    const rpc = b.rpc;
    const yearsCount = b.yearsCount;

    this.blocks.splice(
      index,
      1,
      new BlockModel(this, {
        data,
        chart,
        element,
        geom,
        season,
        sid,
        idx,
        rpc,
        yearsCount
      })
    );
    this.setQString();
    this.loadData();
  };

  @action
  updateBlockWithoutFetching = index => {
    // console.log("updateBlock");
    const b = this.blocks[index];
    const data = b.data;
    const chart = b.chart;
    const element = b.element;
    const geom = b.geom;
    const season = b.season;
    const sid = b.sid;
    const idx = b.idx;
    const rpc = b.rpc;
    const yearsCount = b.yearsCount;

    this.blocks.splice(
      index,
      1,
      new BlockModel(this, {
        data,
        chart,
        element,
        geom,
        season,
        sid,
        idx,
        rpc,
        yearsCount
      })
    );
    this.setQString();
  };

  @action
  deleteBlock = idx => {
    // console.log("deleteBlock");
    this.blocks.splice(idx, 1);
    this.setQString();
  };

  @action
  setQString = () => {
    let results = [];
    this.blocks.forEach((b, i) => {
      const qString = `c=${b.chart}/${b.geom}/${b.element}/${b.season}/${
        b.sid
      }/`;
      if (i === 0) {
        results.push(`?${qString}`);
      } else {
        results.push(`&${qString}`);
      }
    });
    this.app.history.push(results.join(""));
  };

  // fetching data
  @observable isLoading = false;

  @action
  loadData = () => {
    console.log("loadData");
    this.isLoading = true;
    let params = {};
    this.blocks.forEach((b, i) => {
      params = {
        chart: b.chart,
        geom: b.geom,
        element: b.element,
        season: b.season,
        sid: b.sid
      };

      let meta;
      if (b.geom === "stn") {
        meta = stations.features.find(d => d.id === params.sid);
        const query = buildQuery(params, meta);
        fetchStationData(query).then(
          res => (this.blocks[i]["data"] = this.transformStationData(res))
        );
      } else {
        if (b.geom === "state") {
          meta = states.meta.find(d => d.id === params.sid);
        }
        if (b.geom === "county") {
          meta = counties.meta.find(d => d.id === params.sid);
        }
        if (b.geom === "basin") {
          meta = basins.meta.find(d => d.id === params.sid);
        }

        // observed
        let observed = buildQuery(params, meta);

        // rcp45
        let mean45 = { ...observed };
        mean45.grid = "loca:wMean:rcp45";
        let min45 = { ...observed };
        min45.grid = "loca:allMin:rcp45";
        let max45 = { ...observed };
        max45.grid = "loca:allMax:rcp45";

        // rcp85
        let mean85 = { ...observed };
        mean85.grid = "loca:wMean:rcp85";
        let min85 = { ...observed };
        min85.grid = "loca:allMin:rcp85";
        let max85 = { ...observed };
        max85.grid = "loca:allMax:rcp85";

        const queryArr = [observed, min45, mean45, max45, min85, mean85, max85];

        fetchGridData(queryArr).then(
          res => (this.blocks[i]["data"] = this.transformGridData(res, b.sid))
        );
      }
    });
    this.isLoading = false;
  };

  transformStationData(res) {
    if (res) {
      let results = [];
      res.data.data.forEach(el => {
        results.push({
          year: parseInt(el[0], 10),
          observed: el[1] !== "M" ? parseFloat(el[1]) : null,
          meta: res.data.meta
        });
      });
      // console.log(results);
      return results;
    }
  }

  transformGridData(res, sid) {
    if (res) {
      // console.log(res);
      let results = [];
      const keys = Object.keys(res);

      keys.forEach((k, i) => {
        // console.log(res[k].data.data);
        res[k].data.data.forEach((el, j) => {
          if (i === 0) {
            results.push({ year: parseInt(el[0], 10), [k]: el[1] });
          } else {
            results[j][[k]] = el[1];
          }
        });
      });
      // console.log(results);
      return results;
    }
  }
}
