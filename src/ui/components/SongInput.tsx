import * as React from "react";
import { fetchLyricsBackground } from "../../util/genius";
import { Input } from "../theme";
import { FC } from "react";

type SongInputProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const SongInput: FC<SongInputProps> = ({ setTitle }) => {
  const inputbox = React.useRef<HTMLInputElement | null>(null);

  async function runWithInput() {
    const title = inputbox.current?.value;
    if (!title) return; //do nothing if title is empty
    setTitle(title);
    inputbox.current.value = ""; // reset inputbox
    const titleKey = `title-${title}`;
    console.log(title);
    const curData = await new Promise((resolve) =>
      chrome.storage.local.get([titleKey], (obj) => {
        console.log(obj?.[titleKey], obj, titleKey);
        resolve(obj?.[titleKey]);
      })
    );
    if ((curData as any)?.lyrics) return; // check if we already have lyrics for this song
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
    const data = await fetchLyricsBackground(title);
    chrome.storage.local.set({
      [titleKey]: { ...data, lastUpdated: new Date().getTime() },
    });
  }

  return (
    <Input
      type="text"
      placeholder="Song Lookup"
      ref={inputbox}
      onKeyPress={(e) => {
        if (e.key === "Enter") runWithInput();
      }}
    />
  );
};
