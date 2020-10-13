import styled from "styled-components";
import { geniusYellow } from "./Containers";

export const MyInputbox = styled.input.attrs((props) => ({
  type: "text",
  placeholder: props.placeholder,
}))`
  background-color: ${geniusYellow};
  margin-left: 5px;
  display: "block";
`;
