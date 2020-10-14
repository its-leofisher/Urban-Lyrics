import * as React from "react";
import { FC, useState, useEffect } from "react";
import { LyricCacheObj, isLoading, LoadingState } from "../util/types";
import { getVideoContent } from "../util/youtube";
import { Error } from "./components/Error";
import { Loading } from "./components/Loading";
import { LyricView } from "./components/LyricView";
import { SongInput } from "./components/SongInput";
import { DefineWordInput } from "./components/DefineWordInput";

type State = LyricCacheObj | { error: string } | false;

// fetches the title (and then lyrics) from storage
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
  // TODO: setTitle needs to be called from SongInput
  const [curTitle, setTitle] = useState<string | null>(null);

  // when the popup is opened, start the interval
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // TODO: if curTitle is non-null, get the data based on curTitle instead (new helper function needed)
        setData(await getData());
      } catch (err) {
        // some kind of error getting the title or loading from storage
        setData({ error: err.toString() });
      }
    }, 500);
    return () => clearInterval(interval);
  }, [curTitle]);

  // case 1: the content script hasn't even set the state to loading yet
  if (!data) return <Loading />;

  // case 2: it's in loading state
  if (isLoading(data)) return <Loading />;

  // case 3: there was some kind of error fetching the title or lyrics
  if (isErrorState(data)) return <Error />;

  // case 4: all's good
  const lyricsByLine = data.lyrics.split(/\n/);

  return (
    <LyricView
      lyrics={lyricsByLine}
      songTitle={data.songTitle}
      artist={data.artist}
    >
      <DefineWordInput />
      <SongInput setTitle={setTitle} />
    </LyricView>
  );
};
