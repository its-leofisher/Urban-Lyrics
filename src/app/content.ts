import { fetchLyricsBackground } from "../util/genius";
import { waitForVideo, subscribeToGetVideoContent } from "../util/youtube";

subscribeToGetVideoContent();

async function run() {
  const title = await waitForVideo(); //from youtube
  const titleKey = `title-${title}`; // ensures conflict-free naming
  const curData = await new Promise((resolve) =>
    // this storage is tied to the extension
    // never gets cleared unless you uninstall the extensino
    // this is NOT the same as localStorage the web api -- this is CHROME extension local storage
    chrome.storage.local.get([titleKey], (obj) => {
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
  try {
    const data = await fetchLyricsBackground(title);
    chrome.storage.local.set({
      // this object has 4 keys (lyrics, title, artist, lastUpdated)
      [titleKey]: { ...data, lastUpdated: new Date().getTime() },
    });
  } catch (err) {
    // in case there was an error fetching lyrics
    chrome.storage.local.set({
      [titleKey]: { error: err.toString(), lastUpdated: new Date().getTime() },
    });
  }
}

// runs in loop, every 1.5s
// so that if you switch songs in a playlist it fetches lyrics if necessary
setInterval(run, 1500);
