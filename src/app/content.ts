import { fetchLyricsBackground } from "../util/genius";
import { waitForVideo, subscribeToGetVideoContent } from "../util/youtube";

subscribeToGetVideoContent();

async function run() {
  const title = await waitForVideo();
  const titleKey = `title-${title}`;
  const curData = await new Promise((resolve) =>
    chrome.storage.local.get([titleKey], (obj) => {
      console.log(obj?.[titleKey], obj, titleKey);
      resolve(obj?.[titleKey]);
    })
  );
  if (curData) return; // if we already have data for this song then we don't need to make a request
  chrome.storage.local.set({
    [titleKey]: {
      loading: true,
      lastUpdated: new Date().getTime(),
    },
  });
  const data = await fetchLyricsBackground(title);
  chrome.storage.local.set({
    [titleKey]: { ...data, lastUpdated: new Date().getTime() },
  });
}

// runs in loop, every 1.5s
setInterval(run, 1500);
