import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// styled
import { Main, WHeader, Header } from "./styles";

// components
import Block from "./components/Block";

@inject("app")
@observer
class App extends Component {
  render() {
    const { blocks } = this.props.app;
    const blockList = blocks.map((block, i) => <Block key={i} block={block} />);
    return (
      <Main>
        <WHeader>
          <Header>NYCCSC</Header>
        </WHeader>
        {blockList}
      </Main>
    );
  }
}

export default App;
