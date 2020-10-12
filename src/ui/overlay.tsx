import * as React from "react";
import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { LyricCacheObj, isLoading, LoadingState } from "../util/types";
import { getVideoContent } from "../util/youtube";

type State = LyricCacheObj | { error: string } | false;

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
    () => clearInterval(interval);
  }, []);

  if (!data) return <div>Loading</div>;

  if (isLoading(data))
    return <div>Loading as of {new Date(data.lastUpdated).toTimeString()}</div>;

  if (isErrorState(data)) return <div>Error: {data.error}</div>;

  const geniusYellow = "#FFFC64";
  const inputboxStyle = {
    backgroundColor: geniusYellow,
    marginLeft: 5,
    display: "block",
  };
  const lyricsByLine = data.lyrics.split(/\n/);

  return (
    <div style={{ backgroundColor: geniusYellow }}>
      <div style={{ overflowY: "auto", scrollBehavior: "smooth" }}>
        <div style={{ paddingTop: 5, font: "bold 18px Arial" }}>
          {data.songTitle}
        </div>
        <div style={{ font: "italic 16px Arial" }}>{data.artist}</div>
        <br />
        <div style={{ fontSize: 14, height: 460 }}>
          {lyricsByLine.map((line, idx) =>
            !line.trim() ? <br key={idx} /> : <p key={idx}>{line}</p>
          )}
        </div>
      </div>
      <br />
      <input
        type="text"
        defaultValue="Search a word..."
        style={inputboxStyle}
      ></input>
      <input
        type="text"
        defaultValue="Search a song..."
        style={inputboxStyle}
      ></input>
    </div>
  );
};

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

// const Container = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
//   min-height: 400px;
//   min-width: 400px;
//   background-color: blueviolet; // temporary
// `;
