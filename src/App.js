import React, { Component } from "react";
import { inject, observer } from "mobx-react";

// styled
import { Main, WHeader, Header, Block, BlockHeader } from "./styles";

import { Dropdown } from "semantic-ui-react";

const options = [
  { key: 1, text: "Choice 1", value: 1 },
  { key: 2, text: "Choice 2", value: 2 },
  { key: 3, text: "Choice 3", value: 3 }
];

@inject("app")
@observer
class App extends Component {
  render() {
    return (
      <Main>
        <WHeader>
          <Header>NYCCSC</Header>
        </WHeader>
        <Block>
          <BlockHeader>
            <Dropdown
              placeholder="Select County"
              options={options}
              simple
              item
            />
            <Dropdown
              placeholder="Calculated Variables"
              options={options}
              simple
              item
            />
            <Dropdown placeholder="Season" options={options} simple item />
          </BlockHeader>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
          provident nobis quos iusto deleniti dolorum atque dolor adipisci
          libero. Maxime similique harum saepe soluta voluptates error assumenda
          optio minus vitae.
        </Block>
      </Main>
    );
  }
}

export default App;
