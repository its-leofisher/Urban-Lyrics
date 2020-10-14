import * as React from "react";
import { FC } from "react";
import styled from "styled-components";
import { BigText, GeneralContainer } from "../theme";
import { LookupContainer } from "./LyricView";

export const Error: FC = ({ children }) => {
  return (
    <GeneralContainer>
      <BigText>No song title found on this page.</BigText>
      <EmojiText>😕</EmojiText>
      <LookupContainer>{children}</LookupContainer>
    </GeneralContainer>
  );
};

const EmojiText = styled.span`
  font-size: 3em;
`;
