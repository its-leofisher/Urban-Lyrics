import * as React from "react";
import styled from "styled-components";
import ScaleLoader from "react-spinners/ScaleLoader";

export const geniusYellow = "#FFFC64";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${geniusYellow};
  height: 100%;
  padding: 0.5em;
  width: 300;
  height: 600;
  font-size: 24px;
`;
export const BigText = styled.span`
  font-family: "Montserrat", sans-serif;
  text-align: center;
  padding-bottom: 0.5em;
`;

export const Loading = () => {
  return (
    <Container>
      <BigText>One moment...</BigText>
      <ScaleLoader />
    </Container>
  );
};
