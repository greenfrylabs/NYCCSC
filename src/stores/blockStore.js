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
  @observable state = "New York";
  @observable county = "Albany County";
  @observable basin = "Middle Hudson";
  @observable station = "ALBANY INTL AP";
  @observable elem = "Maximum Temperature";
  @observable season = "Annual";
  @observable rpc = 4.5;

  @action
  setField = (name, val) => {
    console.log(name, val);
    this[name] = val;
  };
}
