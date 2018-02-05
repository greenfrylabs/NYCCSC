import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { geoms, seasons, elems } from "./api";

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
    const { isModal, toggleModal } = this.props.app;

    const geomList = [];
    geoms.forEach((val, key) =>
      geomList.push(
        <Option key={val} value={val}>
          {val}
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
            <Select defaultValue="State" style={{ width: 120 }}>
              {geomList}
            </Select>
            <Select placeholder="Select a county" style={{ width: 200 }}>
              <Option value="List...">List...</Option>
            </Select>

            <Select placeholder="Calculated Variables" style={{ width: 250 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>

            <Select placeholder="Annual" style={{ width: 120 }}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </BlockHeader>

          <WRadioButtons>
            <RadioGroup>
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
