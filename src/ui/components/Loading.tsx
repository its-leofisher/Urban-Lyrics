import * as React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { BigText, GeneralContainer } from "../theme";

export const Loading = () => {
  return (
    <GeneralContainer>
      <BigText>One moment...</BigText>
      <ScaleLoader />
    </GeneralContainer>
  );
};
