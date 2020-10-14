import * as React from "react";
import styled from "styled-components";
import { BigText, Container, geniusYellow } from "./Loading";

const EmojiText = styled.span`
  font-size: 3em;
`;

export const Error = () => {
  return (
    <Container>
      <BigText>No song title found on this page.</BigText>
      <EmojiText>😕</EmojiText>
    </Container>
  );
};
