import { observable, action, computed } from "mobx";

import CountyStore from "../stores/countyStore";
import StateStore from "../stores/stateStore";
import BasinStore from "../stores/basinStore";
import StationStore from "../stores/stationStore";
import BlockStore from "../stores/blockStore";

// utils
import { isEquivalent } from "../utils";
import { geoms, parseURL, correctParam } from "../api";

// history
import createHistory from "history/createBrowserHistory";
const history = createHistory({ basename: "/dataproduct/" });

export default class AppStore {
  fetch;
  countyStore;
  stateStore;
  basinStore;
  stationStore;
  blockStore;
  constructor(fetcher) {
    this.fetch = fetcher;
    this.countyStore = new CountyStore(this);
    this.stateStore = new StateStore(this);
    this.basinStore = new BasinStore(this);
    this.stationStore = new StationStore(this);
    this.blockStore = new BlockStore(this);
    this.setLocation(this.c);
  }

  get counties() {
    return this.countyStore.counties;
  }

  get states() {
    return this.stateStore.states;
  }

  get basins() {
    return this.basinStore.basins;
  }

  get stations() {
    return this.stationStore.stations;
  }

  get geoms() {
    return geoms;
  }

  get bStore() {
    return this.blockStore;
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
    return query;
  };

  @computed
  get query() {
    return parseURL(this.c);
  }

  @observable isModal = false;
  @action toggleModal = () => (this.isModal = !this.isModal);
}
