import React, { Component } from "react";
import { inject, observer } from "mobx-react";

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

import ACISLogo from "./data/images/acis_logo.png";

// components
import InfoModal from "./components/InfoModal";

import { Button, Select, Radio, Modal } from "antd";
const Option = Select.Option;
const RadioGroup = Radio.Group;

const options = [
  { key: 1, text: "Choice 1", value: 1 },
  { key: 2, text: "Choice 2", value: 2 },
  { key: 3, text: "Choice 3", value: 3 }
];

@inject("app")
@observer
class App extends Component {
  render() {
    const { isModal, toggleModal } = this.props.app;
    return (
      <Main>
        <WHeader>
          <Header>NYCCSC</Header>
        </WHeader>
        <Block>
          <BlockHeader>
            <Select defaultValue="State" style={{ width: 120 }}>
              <Option value="State">State</Option>
              <Option value="County">County</Option>
              <Option value="Basin">Basin</Option>
              <Option value="Station">Station</Option>
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
            footer={() => <Button type="primary">Ciccio</Button>}
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
