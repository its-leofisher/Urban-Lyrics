import * as React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";
import { geniusYellow } from "../styles/Containers";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${geniusYellow};
`;

export const Loading = () => {
  return (
    <Container>
      <ScaleLoader />
    </Container>
  );
};
