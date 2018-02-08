import { observable, action } from "mobx";

// model
import BlockModel from "./blockModel";

// utils
import { isEquivalent } from "../utils";
import { parseURL, correctParam } from "../api";

// history
import createHistory from "history/createBrowserHistory";
const history = createHistory({ basename: "/dataproduct/" });

export default class BlockStore {
  app;
  constructor(app) {
    this.app = app;
    this.getQString(this.qString);
  }

  @observable blocks = [];

  // initial state query string
  @observable qString = history.location.search;
  @observable qStringDefault = "?c=Temp/state/maxt/ANN/NY/";

  @action
  getQString = qString => {
    console.log(qString);
    if (!qString) {
      history.push(this.qStringDefault);
      return;
    }

    if (qString.includes("&")) {
      const qStringArr = qString.split("&");
      qStringArr.forEach(qString => {
        this.setBlock(qString);
      });
    } else {
      console.log("single qString");
      this.setBlock(qString);
    }
  };

  @action
  setBlock = qString => {
    const qParam = parseURL(qString);
    // console.log(qParam);
    const nParam = correctParam(qParam);
    console.log(nParam);
    const isValid = isEquivalent(qParam, nParam);

    if (!isValid) {
      history.replace(this.qStringDefault);
      return;
    }

    const bbox = qParam.bbox;
    const chart = qParam.chart;
    const element = qParam.element;
    const geom = qParam.geom;
    const season = qParam.season;
    const sid = qParam.sid;

    this.blocks.push(
      new BlockModel({
        bbox,
        chart,
        element,
        geom,
        season,
        sid
      })
    );
  };
}
