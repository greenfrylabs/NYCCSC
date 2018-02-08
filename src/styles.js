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
  height: 95px;
  padding: 1rem;
`;

export const Header = styled.div`
  font-size: 4rem;
`;

export const WBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 600px;
  padding: 1rem;
  border-top: 2px solid ${primary};
  border-bottom: 2px solid ${primary};
`;

export const BlockHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const WRadioButtons = styled.div`
  height: 40px;
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Body = styled.div`
  display: flex;
  height: 100%;
`;
export const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0px 0.5em;
`;

export const WMap = styled.div`
  flex: 3;
  width: 100%;
  height: 300px;
  border: 1px solid #dedede;
  border-radius: 4px;
`;

export const WImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const RightContainer = styled.div`
  display: flex;
  flex: 3;
  padding: 0px 0.5em;
  border: 1px solid #dedede;
  border-radius: 4px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-top: 16px;
`;
