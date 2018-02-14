import { observable, action } from "mobx";
import BlockStore from "../stores/blockStore";
import { geoms } from "../api";

export default class AppStore {
  fetch;
  history;
  blockStore;
  constructor(fetcher, history) {
    this.fetch = fetcher;
    this.history = history;
    this.blockStore = new BlockStore(this);
  }

  get geoms() {
    return geoms;
  }

  get bStore() {
    return this.blockStore;
  }

  get blocks() {
    return this.blockStore.blocks;
  }

  @observable isModal = false;
  @action toggleModal = () => (this.isModal = !this.isModal);
}
