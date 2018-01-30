import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("app")
@observer
class App extends Component {
  render() {
    return <div>NYCCSC site...</div>;
  }
}

export default App;
