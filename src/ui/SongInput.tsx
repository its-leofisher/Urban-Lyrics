import * as React from "react";
import styled from "styled-components";
import { fetchLyricsBackground } from "../util/genius";
import { waitForVideo } from "../util/youtube";
import { geniusYellow } from "../styles/Containers";

export const MyInputbox = styled.input.attrs((props) => ({
  ref: props.ref,
}))`
  background-color: ${geniusYellow};
  display: "block";
`;

export const SongInput = ({ setTitle }) => {
  const inputbox = React.useRef<HTMLInputElement | undefined>();

  async function runWithInput() {
    const title = inputbox.current.value;
    if (title === "") return; //do nothing if title is empty
    inputbox.current.value = ""; // reset inputbox
    const titleKey = `title-${title}`;
    const curData = await new Promise((resolve) =>
      chrome.storage.local.get([titleKey], (obj) => {
        console.log(obj?.[titleKey], obj, titleKey);
        resolve(obj?.[titleKey]);
      })
    );
    if (curData) return; // if we already have data for this song then we don't need to make a request
    await new Promise((resolve) =>
      chrome.storage.local.set(
        {
          [titleKey]: {
            loading: true,
            lastUpdated: new Date().getTime(),
          },
        },
        resolve
      )
    );
    setTitle(title);
    const data = await fetchLyricsBackground(title);
    chrome.storage.local.set({
      [titleKey]: { ...data, lastUpdated: new Date().getTime() },
    });
  }

  return (
    <MyInputbox
      type="text"
      placeholder="Song lookup"
      ref={inputbox}
      onKeyPress={(e) => {
        if (e.key === "Enter") runWithInput();
      }}
    />
  );
};
