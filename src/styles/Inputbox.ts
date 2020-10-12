import styled from "styled-components";
import { geniusYellow } from "./Containers";

export const MyInputbox = styled.input.attrs((props) => ({
  type: "text",
  defaultValue: props.defaultValue,
}))`
  background-color: ${geniusYellow};
  margin-left: 5;
  display: "block";
`;
