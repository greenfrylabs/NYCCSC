import { observable, action } from "mobx";

// utils
import { isEquivalent } from "../utils";
import {
  geoms,
  seasons,
  elems,
  parseURL,
  correctParam,
  chartDefs
} from "../api";

// history
import createHistory from "history/createBrowserHistory";
const history = createHistory({ basename: "/dataproduct/" });

export default class BlockStore {
  app;
  constructor(app) {
    this.app = app;
    this.setLocation(this.c);
  }

  // initial state query string
  @observable c = history.location.search;
  @observable qString = "?c=Temp/state/maxt/ANN/NY/";

  @action
  setLocation = query => {
    const qParam = parseURL(query);
    const nParam = correctParam(qParam);
    const isValid = isEquivalent(qParam, nParam);

    if (!query || !isValid) {
      history.replace(this.qString);
      return;
    }

    // const bbox = qParam.bbox;
    const chart = qParam.chart;
    const element = qParam.element;
    const geom = qParam.geom;
    const season = qParam.season;

    this.chart = chartDefs.get(chart).title;
    this.geom = geoms.get(geom);
    this.elem = elems.get(element).label;
    this.season = seasons.get(season).title;
  };

  // Loading...
  @observable isLoading = false;

  // block
  @observable chart = "Temp";
  @observable geom = "State";
  @observable state = "New York";
  @observable county = "Albany County";
  @observable basin = "Middle Hudson";
  @observable station = "ALBANY INTL AP";
  @observable elem = "Maximum Temperature";
  @observable season = "Annual";
  @observable rpc = 4.5;

  @action setField = (name, val) => (this[name] = val);
}
