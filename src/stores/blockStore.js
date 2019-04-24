import { observable, action, when } from "mobx";

// model
import BlockModel from "./blockModel";

// utils
import { isEquivalent } from "../utils";
import { parseURL, buildQuery, correctParam, elems } from "../api";
import { fetchStationData, fetchGridData } from "../fetchData";

import stations from "../assets/stn.json";
import states from "../assets/state.json";
import counties from "../assets/county.json";
import basins from "../assets/basin.json";

export default class BlockStore {
  app;
  constructor(app) {
    this.app = app;
    when(
      () => this.blocks.length === 0,
      () => {
        // console.log("blocks are empty");
        this.setBlocks();
      }
    );
    this.app.history.listen((location, action) => {
      // console.log("history.listen fired");
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
    // console.log("setBlocks");
    let arr = [];
    let qString = this.app.history.location.search;
    const defaultQString = "?c=Temp/state/TG/ANN/MA/";

    if (!qString) {
      this.app.history.push(defaultQString);
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
        // console.log("not valid");
        this.app.history.push(defaultQString);
        qParam = parseURL(defaultQString);
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
    const stationData = b.stationData;
    const gridData = b.gridData;
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
        stationData,
        gridData,
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
    const stationData = b.stationData;
    const gridData = b.gridData;
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
        stationData,
        gridData,
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
    this.loadData(index);
  };

  @action
  updateBlockWithoutFetching = index => {
    // console.log("updateBlock");
    const b = this.blocks[index];
    const stationData = b.stationData;
    const gridData = b.gridData;
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
        stationData,
        gridData,
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
  loadData = index => {
    // console.log("loadData");
    this.isLoading = true;
    let params = {};
    this.blocks.forEach((b, i) => {
      if (index === undefined || i === index) {
        params = {
          chart: b.chart,
          geom: b.geom,
          element: b.element,
          season: b.season,
          sid: b.sid
        };
        this.blocks[i]["stationData"] = null;
        this.blocks[i]["gridData"] = null;
        let meta;
        if (b.geom === "stn") {
          meta = stations.features.find(d => d.id === params.sid);
          let query = buildQuery(params, meta);
          let maxmissing;

          if (b.season === "ANN") maxmissing = "maxmissingAnnual";
          if (
            b.season === "MAM" ||
            b.season === "JJA" ||
            b.season === "SON" ||
            b.season === "DJF"
          )
            maxmissing = "maxmissingSeasonal";

          if (
            b.season === "Jan" ||
            b.season === "Feb" ||
            b.season === "Mar" ||
            b.season === "Apr" ||
            b.season === "May" ||
            b.season === "Jun" ||
            b.season === "Jul" ||
            b.season === "Aug" ||
            b.season === "Sep" ||
            b.season === "Oct" ||
            b.season === "Nov" ||
            b.season === "Dec"
          )
            maxmissing = "maxmissingMonthly";

          const maxmissingValue = elems.get(b.element)[maxmissing];
          query.elems = [{ ...query.elems[0], maxmissing: maxmissingValue }];

          fetchStationData(query)
            .then(
              res =>
                (this.blocks[i]["stationData"] = this.transformStationData(res))
            )
            .catch(err =>
              console.log(`There was an error fetching station data: ${err}`)
            );
        } else {
          if (b.geom === "state") {
            meta = states.meta.find(d => d.id === params.sid);
          } else if (b.geom === "county") {
            meta = counties.meta.find(d => d.id === params.sid);
          } else if (b.geom === "basin") {
            meta = basins.meta.find(d => d.id === params.sid);
          }

          fetchGridData(buildQuery(params, meta))
            .then(
              res =>
                (this.blocks[i]["gridData"] = this.transformGridData(
                  res,
                  b.sid
                ))
            )
            .catch(err => {
              console.log(`There was an error fetching grid data: ${err}`);
              alert(
                "There was a problem fetching the data. Please, reload the page."
              );
            });
        }
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
      let results = [];

      res.data.forEach((record) => {
        let rec = record[1];

        rec.max45 = record[1].maxrcp45 || 0;
        rec.med45 = record[1].medrcp45 || 0;
        rec.min45 = record[1].minrcp45 || 0;
        rec.max85 = record[1].maxrcp85 || 0;
        rec.med85 = record[1].medrcp85 || 0;
        rec.min85 = record[1].minrcp85 || 0;

        rec.observed = record[1].observed || record[1].medrcp45;
        console.error("HACKING THE OBSERVED DATA!!!");

        results.push(rec);
      });

      // SORT THESE THINGS!
      let comp = function (a, b) {
          if (a.year > b.year) {
              return 1;
          } else if (a.year < b.year) {
              return -1;
          } else {
            return 0;
          }
      }
      results.sort(comp);

      return results;
    }
  }
}
