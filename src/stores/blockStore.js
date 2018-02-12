import { observable, action, computed } from "mobx";

// model
import BlockModel from "./blockModel";

// utils
import { isEquivalent } from "../utils";
import { parseURL, correctParam } from "../api";

export default class BlockStore {
  app;
  constructor(app) {
    this.app = app;
    this.setBlock();
  }

  @observable blocks = [];

  // initial state query string
  @observable
  qString = this.app.history.location.search || "?c=Temp/state/maxt/ANN/NY/";

  @computed
  get qStrings() {
    if (this.qString.includes("&")) {
      return this.qString.split("&");
    } else {
      return [this.qString];
    }
  }

  @action
  setBlock = () => {
    this.qStrings.forEach((qString, i) => {
      let qParam = parseURL(qString);
      const nParam = correctParam(qParam);
      const isValid = isEquivalent(qParam, nParam);

      if (!isValid) {
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

      this.blocks.push(
        new BlockModel(this, {
          list,
          chart,
          element,
          geom,
          season,
          sid,
          blockIdx
        })
      );
    });
    this.setQString();
  };

  @action
  setQString = () => {
    let results = [];
    this.blocks.forEach((b, i) => {
      if (i === 0) {
        results.push(
          `?c=${b.bChart}/${b.bGeom}/${b.bElement}/${b.bSeason}/${b.bSid}/`
        );
      } else {
        results.push(
          `&c=${b.bChart}/${b.bGeom}/${b.bElement}/${b.bSeason}/${b.bSid}/`
        );
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
