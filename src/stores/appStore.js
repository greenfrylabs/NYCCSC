import { observable, action } from "mobx";

export default class AppStore {
  fetch;
  constructor(fetcher) {
    this.fetch = fetcher;
  }
  @observable isModal = false;
  @action toggleModal = () => (this.isModal = !this.isModal);
}
