import { observable, action, when } from "mobx";

// model
import BlockModel from "./blockModel";

// utils
import { isEquivalent } from "../utils";
import { parseURL, buildQuery, correctParam } from "../api";
import { fetchStationData } from "fetchData";

import stations from "../assets/stn.json";

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
    const meanRange = b.meanRange;

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
        meanRange
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
    const meanRange = b.meanRange;

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
        meanRange
      })
    );
    this.setQString();
    this.loadData();
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
      const station = stations.features.find(s => s.id === params.sid);
      const query = buildQuery(params, station);
      fetchStationData(query).then(
        res => (this.blocks[i]["data"] = this.transformData(res))
      );
      this.isLoading = false;
    });
  };

  transformData(res) {
    let results = [];
    if (res) {
      res.data.data.forEach(el => {
        results.push({
          year: parseInt(el[0], 10),
          e: el[1] !== "M" ? parseFloat(el[1], 10) : null,
          meta: res.data.meta
        });
      });
      return results;
    }
  }
}
