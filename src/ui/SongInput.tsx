import * as React from "react";
import styled from "styled-components";
import { MyInputbox } from "../styles/Inputbox";
import { fetchLyricsBackground } from "../util/genius";
import { waitForVideo } from "../util/youtube";

export const SongInput = () => {
  const inputbox = React.useRef();

  //   async function runWithInput() {
  //     const title = inputbox.current.value;
  //     if (title === "") return;
  //     inputbox.current.value = null;
  //     const titleKey = `title-${title}`;
  //     const curData = await new Promise((resolve) =>
  //       chrome.storage.local.get([titleKey], (obj) => {
  //         console.log(obj?.[titleKey], obj, titleKey);
  //         resolve(obj?.[titleKey]);
  //       })
  //     );
  //     if (curData) return; // if we already have data for this song then we don't need to make a request
  //     chrome.storage.local.set({
  //       [titleKey]: {
  //         loading: true,
  //         lastUpdated: new Date().getTime(),
  //       },
  //     });
  //     const data = await fetchLyricsBackground(title);
  //     chrome.storage.local.set({
  //       [titleKey]: { ...data, lastUpdated: new Date().getTime() },
  //     });
  //   }

  return (
    <MyInputbox
      placeholder="Song lookup"
      ref={inputbox}
      onKeyPress={(e) => {
        if (e.key === "Enter") console.log("hi");
      }}
    />
  );
};
