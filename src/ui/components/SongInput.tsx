import * as React from "react";
import { fetchLyricsBackground } from "../../util/genius";
import { Input } from "../theme";
import { FC } from "react";

type SongInputProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const SongInput: FC<SongInputProps> = ({ setTitle }) => {
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
    <Input
      type="text"
      placeholder="Song lookup"
      ref={inputbox}
      onKeyPress={(e) => {
        if (e.key === "Enter") runWithInput();
      }}
    />
  );
};
