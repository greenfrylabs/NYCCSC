import { observable, action, computed } from "mobx";

import CountyStore from "../stores/countyStore";

// utils
import { isEquivalent } from "../utils";
import { parseURL, correctParam } from "../api";

// history
import createHistory from "history/createBrowserHistory";
const history = createHistory({ basename: "/dataproduct/" });

export default class AppStore {
  fetch;
  counties;
  constructor(fetcher) {
    this.fetch = fetcher;
    this.counties = new CountyStore(this);
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
    return query;
  };

  @computed
  get query() {
    return parseURL(this.c);
  }

  @observable isModal = false;
  @action toggleModal = () => (this.isModal = !this.isModal);
}
