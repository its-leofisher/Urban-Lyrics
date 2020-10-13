import * as React from "react";
import { FC, useState, useEffect } from "react";
import { LyricCacheObj, isLoading, LoadingState } from "../util/types";
import { getVideoContent } from "../util/youtube";
import { MyInputbox } from "../styles/Inputbox";
import { GlobalStyle } from "../styles/Global";
import {
  Container,
  ArtistNameContainer,
  MainContainer,
  SongNameContainer,
  LyricsContainer,
} from "../styles/Containers";
import { Loading } from "./loading";
import { DefineWordInput } from "./DefineWordInput";
import { SongInput } from "./SongInput";

type State = LyricCacheObj | { error: string } | false;

async function getData(): Promise<LyricCacheObj> {
  const title = await getVideoContent();
  const titleKey = `title-${title}`;
  return new Promise((resolve, reject) =>
    chrome.storage.local.get([titleKey], (obj) => {
      if (obj[titleKey]) resolve(obj[titleKey]);
      else reject("data not found in storage");
    })
  );
}

function isErrorState(s: State): s is { error: string } {
  return !!(s as { error: string }).error;
}

export const Overlay: FC = () => {
  const [data, setData] = useState<State>(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        setData(await getData());
      } catch (err) {
        setData({ error: err.toString() });
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <Loading />;

  if (isLoading(data)) return <Loading />;

  if (isErrorState(data)) return <div>Error: {data.error}</div>;

  const lyricsByLine = data.lyrics.split(/\n/);

  return (
    <Container>
      <GlobalStyle />
      <MainContainer>
        <SongNameContainer>{data.songTitle}</SongNameContainer>
        <ArtistNameContainer>{data.artist}</ArtistNameContainer>
        <br />
        <LyricsContainer>
          {lyricsByLine.map((line, idx) =>
            !line.trim() ? <br key={idx} /> : <p key={idx}>{line}</p>
          )}
        </LyricsContainer>
      </MainContainer>
      <br />
      <DefineWordInput />
      <SongInput />
    </Container>
  );
};
