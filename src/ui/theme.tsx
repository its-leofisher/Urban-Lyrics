import styled from "styled-components";

export const geniusYellow = "#FFFC64";

export const BigText = styled.span`
  font-family: "Montserrat", sans-serif;
  text-align: center;
  padding-bottom: 0.5em;
`;

export const GeneralContainer = styled.div`
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

export const Input = styled.input`
  outline: none;
  background-color: ${geniusYellow};
  width: 100%;
  border-style: 0.25px solid black;
  border-radius: 0px;
  padding: 0.5em;
  margin: 0.125em;
  font-family: "Montserrat";
  box-sizing: border-box;
  background-color: black;
  color: ${geniusYellow};
  font-style: normal;

  &::placeholder {
    color: ${geniusYellow};
    font-style: normal;
  }
`;
