import styled from "styled-components";
import * as color from "../../../src/config/colors";
export const MainContainer = styled.header`
  background-color: ${color.headerColor};
  height: 80px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: ${color.titleColor};
    font-size: 0.9em;
    text-decoration: none;
    color: ${color.titleColor};
    &:hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }
`;
