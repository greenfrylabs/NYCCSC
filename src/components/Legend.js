import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// import { Menu, Dropdown, Icon, Checkbox } from "antd";
import { WLegend } from "../styles";

@inject("app")
@observer
export default class Legend extends Component {
  render() {
    return <WLegend>sdfsdf</WLegend>;
  }
}
