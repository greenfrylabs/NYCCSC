import { observable, action, when } from "mobx";

export default class BasinStore {
  app;
  constructor(app) {
    this.app = app;
    when(() => this.basins.size === 0, () => this.loadBasins());
  }

  @observable basins = new Map();

  @action
  updateBasins = json =>
    json.forEach(blockJson => this.basins.set(blockJson.id, blockJson));

  @action
  loadBasins() {
    this.app
      .fetch("/data/basin.json")
      .then(json => {
        // console.log(json.meta);
        this.updateBasins(json.meta);
      })
      .catch(err => {
        console.log("Failed to load basins", err);
      });
  }
}
