import { observable, action, when } from "mobx";

export default class CountyStore {
  app;
  constructor(app) {
    this.app = app;
    when(() => this.counties.size === 0, () => this.loadCounties());
  }

  @observable counties = new Map();

  @action
  updateCounties = json =>
    json.forEach(blockJson => this.counties.set(blockJson.id, blockJson));

  @action
  loadCounties() {
    this.app
      .fetch("/data/county.json")
      .then(json => {
        // console.log(json.meta);
        this.updateCounties(json.meta);
      })
      .catch(err => {
        console.log("Failed to load counties", err);
      });
  }
}
