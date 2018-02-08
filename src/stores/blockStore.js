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
    when(() => this.blocks.length === 0, () => this.getQString(this.qString));
  }

  @observable blocks = [];

  // initial state query string
  @observable qString = this.app.history.location.search;
  @observable qStringDefault = "?c=Temp/state/maxt/ANN/NY/";

  @action
  getQString = qString => {
    console.log(qString);
    if (!qString) {
      console.log("NO string");
      this.app.history.replace(this.qStringDefault);
      qString = this.qStringDefault;
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
    // console.log(qParam);
    const nParam = correctParam(qParam);
    // console.log(nParam);
    const isValid = isEquivalent(qParam, nParam);

    if (!isValid) {
      this.app.history.replace(this.qStringDefault);
      qParam = parseURL(this.qStringDefault);
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
}
