import styled from "styled-components";

export const geniusYellow = "#FFFC64";

export const Container = styled.div`
  background-color: ${geniusYellow};
`;

export const MainContainer = styled.div`
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export const SongNameContainer = styled.div`
  padding-top: 5px;
  font: bold 18px Arial;
`;

export const ArtistNameContainer = styled.div`
  padding-top: 5px;
  font: italic 16px Arial;
`;

export const LyricsContainer = styled.div`
  font-size: 14px;
  height: 460px;
`;
