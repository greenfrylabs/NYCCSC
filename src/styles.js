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

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 500px;
  padding: 1rem;
  border-top: 2px solid ${primary};
  border-bottom: 2px solid ${primary};
`;

export const BlockHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
