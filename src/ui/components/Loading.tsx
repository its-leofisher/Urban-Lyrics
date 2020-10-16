import * as React from "react";
import { FC } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { BigText, GeneralContainer } from "../theme";
import { LookupContainer } from "./LyricView";

export const Loading: FC = ({ children }) => {
  return (
    <GeneralContainer>
      <BigText>One moment...</BigText>
      <ScaleLoader />
      <LookupContainer>{children}</LookupContainer>
    </GeneralContainer>
  );
};
