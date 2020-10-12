import "../ui/overlay";
import { fetchLyricsBackground } from "../util/genius";
import { waitForVideo } from "../util/youtube";

async function run() {
  const title = await waitForVideo();
  const titleKey = `title-${title}`;
  const curData = new Promise((resolve) =>
    chrome.storage.local.get([titleKey], (obj) => {
      resolve(obj?.[titleKey]);
    })
  );
  if (curData) return;
  chrome.storage.local.set({
    [titleKey]: {
      loading: true,
      lastUpdated: new Date().getTime(),
    },
  });
  const data = await fetchLyricsBackground(title);

  chrome.storage.local.set({
    [titleKey]: { data, lastUpdated: new Date().getTime() },
  });
}

run();
