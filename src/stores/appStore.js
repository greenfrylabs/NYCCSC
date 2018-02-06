import { observable, action } from "mobx";

import CountyStore from "../stores/countyStore";
import StateStore from "../stores/stateStore";
import BasinStore from "../stores/basinStore";
import StationStore from "../stores/stationStore";
import BlockStore from "../stores/blockStore";

import { geoms } from "../api";

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

  @observable isModal = false;
  @action toggleModal = () => (this.isModal = !this.isModal);
}
