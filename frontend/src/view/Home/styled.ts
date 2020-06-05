import styled from "styled-components";
import * as color from "../../config/colors";

export const MainContainer = styled.main`
  width: 100%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  padding: 100px;
  overflow-x: hidden;
`;
export const LeftContainer = styled.div`
  height: 80%;
  max-width: 420px;
  margin-left: 60px;
  a {
    max-width: 300px;
    height: 72px;
    background: ${color.primaryColor};
    border-radius: 8px;
    text-decoration: none;
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-top: 40px;
    &:hover{
      cursor: pointer;
      opacity: 0.5;
    }
  }
  p{
    margin-top: 40px;
    color: ${color.textColor};
  }
  span {
    display: block;
    background: rgba(0, 0, 0, 0.08);
    width: 72px;
    height: 72px;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  strong {
    text-align: center;
    color: #fff;
    font-size: 1em;
  }
`;

export const RignttContainer = styled.img`
  max-height: 500px;

  @media screen and (max-width: 800px) {
    height: 250px;
  }
`;
