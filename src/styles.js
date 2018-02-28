import styled from "styled-components";

const primary = "#628FC5";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const WHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 93px;
  padding: 1rem;
  border-bottom: 2px solid ${primary};
`;

export const Header = styled.div`
  font-size: 4rem;
`;

export const WBlock = styled.div`
  // max-width: 1600px;
  display: flex;
  // margin: 0 auto;
  flex-direction: column;
  height: 650px;
  padding: 1rem;
  border-bottom: 2px solid ${primary};
  // background: pink;
`;

export const BlockHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 0 48px 0;
  // height: 40px;
  // background: teal;
`;

export const WRadioButtons = styled.div`
  height: 40px;
  margin: 0 0 8px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // background: pink;
`;

export const Body = styled.div`
  display: flex;
  height: 100%;
`;
export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 250px;
  padding: 0px 0.5em;
`;

export const WMap = styled.div`
  flex: 7;
  width: 100%;
  height: 350px;
  // border: 1px solid #dedede;
  // border-radius: 4px;
`;

export const WImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  // background: pink;
`;

export const RightContainer = styled.div`
  display: flex;
  flex: 3;
  padding: 0px 0.5em;
  // border: 1px solid #dedede;
  // border-radius: 4px;
`;

export const RowColumn = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const WGraphTitle = styled.div`
  text-align: center;
  height: 5%;
`;

export const WLegend = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 20%;
  // background: teal;
  margin: 0 auto;
`;

export const ObservedCell = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.3rem;
  margin-right: 5px;
`;

export const ModeledCell = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  justify-content: center;
  align-items: center;
  height: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.3rem;
`;

export const CellRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 65%px;
  // background: pink;
  margin: 1px;
  font-size: 0.8rem;
`;

export const CellCol = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Baseline = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  width: 100%;
  height: 35%;
`;

export const HeaderCol = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 2px;
`;
