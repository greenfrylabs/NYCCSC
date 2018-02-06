import { observable, action } from "mobx";
// import { toJS } from "mobx";

export default class BlockStore {
  app;
  constructor(app) {
    this.app = app;
  }

  // Loading...
  @observable isLoading = false;

  @observable geom = "State";
  @observable rpc = 4.5;
  @action
  setField = (name, val) => {
    if (name === "geom") this[name] = val;
  };
}
