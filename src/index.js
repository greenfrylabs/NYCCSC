import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// Mobx
import { Provider } from "mobx-react";
import AppStore from "stores/appStore";

// history
import createHistory from "history/createBrowserHistory";
const history = createHistory({ basename: "" });

const fetcher = url => window.fetch(url).then(response => response.json());
const app = new AppStore(fetcher, history);

ReactDOM.render(
  <Provider app={app}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
