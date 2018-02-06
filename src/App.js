import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { geoms, elems, seasons } from "./api";

// styled
import {
  Main,
  WHeader,
  Header,
  Block,
  BlockHeader,
  WRadioButtons,
  Body,
  LeftContainer,
  RightContainer,
  Footer,
  WMap,
  WImage
} from "./styles";

import ACISLogo from "./assets/images/acis_logo.png";

// components
import InfoModal from "./components/InfoModal";

import { Button, Select, Radio, Modal } from "antd";
const Option = Select.Option;
const RadioGroup = Radio.Group;

@inject("app")
@observer
class App extends Component {
  render() {
    const {
      isModal,
      toggleModal,
      counties,
      states,
      basins,
      stations,
      bStore
    } = this.props.app;

    // geom type
    const geomList = [];
    geoms.forEach((val, key) =>
      geomList.push(
        <Option key={val} value={val}>
          {val}
        </Option>
      )
    );

    // counties
    const countyList = [];
    counties.forEach((val, key) =>
      countyList.push(
        <Option key={key} value={key}>
          {key}
        </Option>
      )
    );

    // states
    const stateList = [];
    states.forEach((val, key) =>
      stateList.push(
        <Option key={key} value={key}>
          {key}
        </Option>
      )
    );

    // basins
    const basinList = [];
    basins.forEach((val, key) =>
      basinList.push(
        <Option key={key} value={key}>
          {key}
        </Option>
      )
    );

    // stations
    const stationList = [];
    stations.forEach((val, key) =>
      stationList.push(
        <Option key={key} value={key}>
          {key}
        </Option>
      )
    );

    // list to render
    const list = geom => {
      switch (geom) {
        case "County":
          return countyList;
        case "Basin":
          return basinList;
        case "Station":
          return stationList;
        default:
          return stateList;
      }
    };

    let firstValue = "";
    switch (bStore.geom) {
      case "County":
        firstValue = bStore.county;
        break;
      case "Basin":
        firstValue = bStore.basin;
        break;
      case "Station":
        firstValue = bStore.station;
        break;
      default:
        firstValue = bStore.state;
        break;
    }

    // elements
    const elemList = [];
    elems.forEach((obj, key) =>
      elemList.push(
        <Option key={key} value={obj.label}>
          {obj.label}
        </Option>
      )
    );

    // seasons
    const seasonList = [];
    seasons.forEach((obj, key) =>
      seasonList.push(
        <Option key={key} value={obj.title}>
          {obj.title}
        </Option>
      )
    );

    return (
      <Main>
        <WHeader>
          <Header>NYCCSC</Header>
        </WHeader>
        <Block>
          <BlockHeader>
            <Select
              style={{ width: 120 }}
              onChange={val => bStore.setField("geom", val)}
              value={bStore.geom}
            >
              {geomList}
            </Select>
            <Select
              style={{ width: 250 }}
              onChange={val =>
                bStore.setField(
                  bStore.geom.charAt(0).toLowerCase() + bStore.geom.slice(1),
                  val
                )
              }
              value={firstValue}
            >
              {list(bStore.geom)}
            </Select>

            <Select
              style={{ width: 320 }}
              onChange={val => bStore.setField("elem", val)}
              value={bStore.elem}
            >
              {elemList}
            </Select>

            <Select
              style={{ width: 120 }}
              onChange={val => bStore.setField("season", val)}
              value={bStore.season}
            >
              {seasonList}
            </Select>
          </BlockHeader>

          <WRadioButtons>
            <RadioGroup
              defaultValue={4.5}
              onChange={e => bStore.setField("rpc", e.target.value)}
            >
              <Radio value={4.5}>Low Emission rpc 4.5</Radio>
              <Radio value={8.5}>Hi Emission rpc 8.5</Radio>
            </RadioGroup>
          </WRadioButtons>

          <Body>
            <LeftContainer>
              <WMap>map...</WMap>
              <WImage>
                <img src={ACISLogo} alt="ACISLogo" />
              </WImage>
            </LeftContainer>
            <RightContainer>graph...</RightContainer>
          </Body>

          <Footer>
            <Button type="primary" icon="plus" style={{ marginRight: 16 }}>
              Add Chart
            </Button>
            <Button type="primary" icon="download" style={{ marginRight: 16 }}>
              Download Data
            </Button>
            <Button type="primary" icon="info-circle-o" onClick={toggleModal}>
              About Source Data
            </Button>
          </Footer>
          <Modal
            width={800}
            title=""
            closable={false}
            visible={isModal}
            okText="Close"
            onOk={toggleModal}
            footer={<Button type="primary">Ciccio</Button>}
            onCancel={toggleModal}
          >
            <InfoModal />
          </Modal>
        </Block>
      </Main>
    );
  }
}

export default App;
