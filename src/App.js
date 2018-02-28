import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// styled
import { Main, WHeader, Header } from "./styles";

// components
import Block from "./components/Block";
import InfoModal from "./components/InfoModal";

// antd
import { Button, Modal } from "antd";

@inject("app")
@observer
class App extends Component {
  render() {
    const { blocks, isModal, toggleModal } = this.props.app;
    const blockList = blocks.map((block, i) => <Block key={i} block={block} />);
    console.log(blocks[0]);
    return (
      <Main>
        <WHeader>
          <Header>NYCCSC</Header>
        </WHeader>

        {blockList}

        <Modal
          width={800}
          title=""
          closable={true}
          visible={isModal}
          okText="Close"
          onCancel={toggleModal}
          footer={
            <Button type="primary" onClick={toggleModal}>
              Close
            </Button>
          }
        >
          <InfoModal />
        </Modal>
      </Main>
    );
  }
}

export default App;
