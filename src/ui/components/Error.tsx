import * as React from "react";
import styled from "styled-components";
import { BigText, GeneralContainer } from "../theme";

export const Error = () => {
  return (
    <GeneralContainer>
      <BigText>No song title found on this page.</BigText>
      <EmojiText>😕</EmojiText>
    </GeneralContainer>
  );
};

const EmojiText = styled.span`
  font-size: 3em;
`;
