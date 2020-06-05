import { createGlobalStyle } from "styled-components";
import * as color from "../../src/config/colors";
export default createGlobalStyle`
    *{
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    html , body , #root{
        height: 100%;
    }
    body, input, button {
        font-family: Roboto, Arial, Helvetica, sans-serif;
    }

    h1, h2, h3, h4, h5, h6 {
        color: ${color.titleColor};
        font-family: Ubuntu;
    }
    body {
        background-color:${color.backgroundColor};
        -webkit-font-smoothing: antialiased;
    }
`;
