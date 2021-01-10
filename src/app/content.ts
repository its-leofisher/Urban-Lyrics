import { fetchLyricsBackground } from "../util/genius";
import { waitForVideo, subscribeToGetVideoContent } from "../util/youtube";

subscribeToGetVideoContent();

async function fetchAndStoreData(title, titleKey) {}

async function run() {
  const title = await waitForVideo(); //from youtube
  const titleKey = `title-${title}`; // ensures conflict-free naming
  const curData = await new Promise((resolve) =>
    // this storage is tied to the extension
    // this is NOT the same as localStorage the web api -- this is CHROME extension local storage
    chrome.storage.local.get([titleKey], (obj) => {
      resolve(obj?.[titleKey]);
    })
  );

  if ((curData as any)?.lyrics) return; // check if we already have lyrics for this song
  if (!curData)
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
      [titleKey]: { error: err.toString(), lastUpdated: new Date().getTime() }, // change this? Right now it always errors if it errored before
    });
  }
}

// set an interval in case server is asleep or no paage refresh is done
setInterval(run, 2000);
