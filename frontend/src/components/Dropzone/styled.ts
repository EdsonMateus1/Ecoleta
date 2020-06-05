import styled from "styled-components";
import * as color from "../../config/colors";

export const DropzoneContainer = styled.div`
  height: 300px;
  width: 600px;
  background: ${color.backgroundColor};
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
  outline: 0;

  img {
    width: 80%;
    height: 80%;
    object-fit: cover;
  }

  p {
    height: 300px;
    width: 600px;
    border-radius: 10px;
    border: 1px dashed ${color.dropzoneColor};

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${color.dropzoneColorCinza};
  }

  p svg {
    color: ${color.dropzoneColor};
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
  }
`;