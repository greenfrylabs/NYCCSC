import { observable, action } from "mobx";

// model
import BlockModel from "./blockModel";

// utils
import { isEquivalent } from "../utils";
import { parseURL, correctParam } from "../api";

export default class BlockStore {
  app;
  constructor(app) {
    this.app = app;
    this.getQString(this.qString);
  }

  @observable blocks = [];

  // initial state query string
  @observable
  qString = this.app.history.location.search || "?c=Temp/state/maxt/ANN/NY/";

  @action
  getQString = qString => {
    if (!qString) {
      console.log("NO string");
      this.app.history.replace(this.qString);
      qString = this.qString;
    }

    if (qString.includes("&")) {
      const qStringArr = qString.split("&");
      qStringArr.forEach((qString, i) => {
        this.setBlock(qString, i);
      });
    } else {
      this.setBlock(qString, 0);
    }
  };

  @action
  setBlock = (qString, i) => {
    let qParam = parseURL(qString);
    const nParam = correctParam(qParam);
    const isValid = isEquivalent(qParam, nParam);

    if (!isValid) {
      this.app.history.replace(this.qString);
      qParam = parseURL(this.qString);
    }

    const bbox = qParam.bbox;
    const chart = qParam.chart;
    const element = qParam.element;
    const geom = qParam.geom;
    const season = qParam.season;
    const sid = qParam.sid;
    const blockIdx = i;

    this.blocks.push(
      new BlockModel(this, {
        bbox,
        chart,
        element,
        geom,
        season,
        sid,
        blockIdx
      })
    );
  };

  @action
  addChart = blockIdx => {
    const currentQString = this.app.history.location.search;
    const b = this.blocks[blockIdx];
    const newQString = `&c=${b.bChart}/${b.bGeom}/${b.bElement}/${b.bSeason}/${
      b.bSid
    }/`;
    const finalQString = `${currentQString}${newQString}`;
    this.app.history.push(finalQString);
  };
}
