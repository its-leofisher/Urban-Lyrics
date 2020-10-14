import * as React from "react";
import styled from "styled-components";
import { Container, geniusYellow } from "./Loading";

export const LyricBar = styled.p`
  margin: 0 0 1px 0;
  padding-right: 20px; /*Test this*/
  font-family: "Montserrat";
  font-size: 0.6em;
`;

export const LineBreak = styled.br`
  margin: 0;
  padding: 0;
  padding-right: 0px;
  font-size: 0.2em;
  line-height: 0.3em;
`;

export const MainContainer = styled.div`
  overflow-y: auto;
  height: 90%;
`;

export const SongTitle = styled.h2`
  padding: 0;
  margin: 0;
  font-family: "Montserrat";
  font-size: 1em;
`;

export const ArtistName = styled.h4`
  padding: 0;
  margin: 0 0 0.5em 0;
  font-family: "Montserrat";
  font-style: italic;
  font-size: 0.7em;
`;

export const LookupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Input = styled.input`
  outline: none;
  background-color: ${geniusYellow};
  width: 100%;
  border-style: 0.25px solid black;
  border-radius: 10px;
  padding: 0.5em;
  margin: 0.125em;
  font-family: "Montserrat";
  box-sizing: border-box;
`;
