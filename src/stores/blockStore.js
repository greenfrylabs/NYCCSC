import { observable, action, when } from "mobx";

// model
import BlockModel from "./blockModel";

// utils
import { isEquivalent } from "../utils";
import { parseURL, correctParam } from "../api";

export default class BlockStore {
  app;
  constructor(app) {
    this.app = app;
    when(
      () => !this.app.history.location.search,
      this.app.history.push("?c=Temp/state/maxt/ANN/NY/")
    );

    when(() => this.blocks.length === 0, () => this.setBlocks());
    this.app.history.listen(location => {
      console.log(location.search);
      this.setBlocks();
    });
  }

  @observable blocks = [];

  @action
  setBlocks = () => {
    this.blocks.clear();
    let arr = [];
    const qString =
      this.app.history.location.search || "?c=Temp/state/maxt/ANN/NY/";

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
      const blockIdx = i;

      let list;
      if (geom === "state") {
        list = this.app.states;
      }
      if (geom === "county") {
        list = this.app.counties;
      }
      if (geom === "basin") {
        list = this.app.basins;
      }
      if (geom === "stn") {
        list = this.app.stations;
      }

      // console.log(`pushing: ${blockIdx}`);
      this.blocks.push(
        new BlockModel(this, {
          chart,
          element,
          geom,
          season,
          sid,
          blockIdx,
          list
        })
      );
    });
  };

  @action
  setQString = () => {
    let results = [];
    this.blocks.forEach((b, i) => {
      const qString = `c=${b.bChart}/${b.bGeom}/${b.bElement}/${b.bSeason}/${
        b.bSid
      }/`;
      if (i === 0) {
        results.push(`?${qString}`);
      } else {
        results.push(`&${qString}`);
      }
    });
    this.app.history.push(results.join(""));
  };

  @action
  addChart = blockIdx => {
    const b = this.blocks[blockIdx];
    this.blocks.push(b);
    this.setQString();
  };
}
