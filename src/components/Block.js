import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// api
import { geoms, elems, seasons, chartDefs } from "../api";

// styled
import {
  WBlock,
  BlockHeader,
  WRadioButtons,
  Body,
  LeftContainer,
  RightContainer,
  Footer,
  WMap,
  WImage
} from "../styles";

// logo
import ACISLogo from "../assets/images/acis_logo.png";

// components
import InfoModal from "./InfoModal";
import MiniMap from "../components/MiniMap";

// antd
import { Button, Select, Radio, Modal } from "antd";
const Option = Select.Option;
const RadioGroup = Radio.Group;

@inject("app")
@observer
export default class Block extends Component {
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

    const {
      chart,
      geom,
      bGeom,
      element,
      season,
      sid,
      setField,
      rpc,
      setRpc,
      blockIdx
      // geojson,
      // bbox
    } = this.props.block;

    const cDef = chartDefs.get(chart);
    const seasonsAdj = element === "grow_32" ? ["ANN"] : cDef.seasons;
    const elementsAdj = geom === "stn" ? cDef.elems : cDef.gElems;
    // console.log(cDef);

    // geom type
    const geomList = [];
    geoms.forEach((val, key) =>
      geomList.push(
        <Option key={key} value={key}>
          {val}
        </Option>
      )
    );

    // counties
    const countyList = [];
    counties.forEach((val, key) =>
      countyList.push(
        <Option key={key} value={key}>
          {val.name}
        </Option>
      )
    );

    // states
    const stateList = [];
    states.forEach((val, key) =>
      stateList.push(
        <Option key={key} value={key}>
          {val.name}
        </Option>
      )
    );

    // basins
    const basinList = [];
    basins.forEach((val, key) =>
      basinList.push(
        <Option key={key} value={key}>
          {val.name}
        </Option>
      )
    );

    // stations
    const stationList = [];
    stations.forEach((val, key) =>
      stationList.push(
        <Option key={key} value={key}>
          {val.properties.name}
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

    let val = "";
    let t;
    let bbox;
    let geojson;
    switch (geom) {
      case "County":
        t = counties.get(sid);
        if (t) {
          bbox = t.bbox.slice();
          geojson = t.geojson;
        }
        t ? (val = t.name) : (val = "Albany County");
        break;
      case "Basin":
        t = basins.get(sid);
        if (t) {
          bbox = t.bbox.slice();
          geojson = t.geojson;
        }
        t ? (val = t.name) : (val = "Middle Hudson");
        break;
      case "Station":
        t = stations.get(sid);
        if (t) {
          // bbox = t.geometry;
          geojson = t.geometry;
        }
        t ? (val = t.properties.name) : (val = "ALBANY INTL AP");
        break;
      default:
        t = states.get(sid);
        if (t) {
          bbox = t.bbox.slice();
          geojson = t.geojson;
        }
        t ? (val = t.name) : (val = "NY");
        break;
    }

    // console.log(bbox, geojson);

    // elements
    const elemList = [];
    elementsAdj.forEach(el =>
      elemList.push(
        <Option key={el} value={el}>
          {elems.get(el).label}
        </Option>
      )
    );

    // seasons
    const seasonList = [];
    seasonsAdj.forEach(el =>
      seasonList.push(
        <Option key={el} value={el}>
          {seasons.get(el).title}
        </Option>
      )
    );

    return (
      <WBlock>
        <BlockHeader>
          <Select
            style={{ width: 120 }}
            onChange={d => setField("bGeom", d)}
            value={geom}
          >
            {geomList}
          </Select>
          <Select
            style={{ width: 250 }}
            onChange={d => setField("bSid", d)}
            value={val}
          >
            {list(geom)}
          </Select>

          <Select
            style={{ width: 320 }}
            onChange={d => setField("bElement", d)}
            value={element}
          >
            {elemList}
          </Select>

          <Select
            style={{ width: 120 }}
            onChange={d => setField("bSeason", d)}
            value={season}
          >
            {seasonList}
          </Select>
        </BlockHeader>

        <WRadioButtons>
          <RadioGroup defaultValue={rpc} onChange={e => setRpc(e.target.value)}>
            <Radio value={4.5}>Low Emission rpc 4.5</Radio>
            <Radio value={8.5}>Hi Emission rpc 8.5</Radio>
          </RadioGroup>
        </WRadioButtons>

        <Body>
          <LeftContainer>
            <WMap>
              {bbox && (
                <MiniMap
                  geomType={bGeom}
                  geoJSON={geojson}
                  bbox={bbox}
                  sid={sid}
                />
              )}
            </WMap>
            <WImage>
              <img src={ACISLogo} alt="ACISLogo" />
            </WImage>
          </LeftContainer>
          <RightContainer>graph...</RightContainer>
        </Body>

        <Footer>
          <Button
            type="primary"
            icon="plus"
            style={{ marginRight: 16 }}
            onClick={() => bStore.addChart(blockIdx)}
          >
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
      </WBlock>
    );
  }
}
