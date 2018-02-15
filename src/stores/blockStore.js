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
    when(() => this.blocks.length === 0, () => this.setBlocks());
    this.app.history.listen(location => this.updateBlocks());
  }

  @observable blocks = [];

  @action
  setBlocks = () => {
    console.log("setBlocks");
    // this.blocks.clear();
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
      const blockIdx = i;

      this.blocks.push(
        new BlockModel(this, {
          chart,
          element,
          geom,
          season,
          sid,
          blockIdx
        })
      );
    });
  };

  @action
  updateBlocks = () => {
    console.log("update");
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
  addChart = idx => {
    const b = this.blocks[idx];
    const chart = b.bChart;
    const element = b.bElement;
    const geom = b.bGeom;
    const season = b.bSeason;
    const sid = b.bSid;
    const blockIdx = b.blockIdx + 1;
    this.blocks.push(
      new BlockModel(this, { chart, element, geom, season, sid, blockIdx })
    );
    this.setQString();
  };

  @action
  deleteChart = blockIdx => {
    this.blocks.splice(blockIdx, 1);
    this.setQString();
  };
}
