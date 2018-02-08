import { observable, action, when } from "mobx";

export default class StateStore {
  app;
  constructor(app) {
    this.app = app;
    when(() => this.states.size === 0, () => this.loadStates());
  }

  @observable states = new Map();

  @action
  updateStates = json =>
    json.forEach(blockJson => this.states.set(blockJson.id, blockJson));

  @action
  loadStates() {
    this.app
      .fetch("/data/state.json")
      .then(json => {
        // console.log(json.meta);
        this.updateStates(json.meta);
      })
      .catch(err => {
        console.log("Failed to load states", err);
      });
  }
}
