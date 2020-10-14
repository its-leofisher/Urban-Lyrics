import { $x } from "./xpath";

function getVideoTitle() {
  const res = $x(
    '//*[@id="container"]/h1/yt-formatted-string/text()',
    document
  )[0].nodeValue; //why nodeValue here?
  console.log(res);
  if (!res) throw Error("no video title found!");

  return res as string;
}

// gets called from popup script; popup script doesn't have access to the title
// so it needs to send a message to content script to get it
export async function getVideoContent(): Promise<string> {
  const tabs: chrome.tabs.Tab[] = await new Promise((resolve) =>
    chrome.tabs.query({ active: true, currentWindow: true }, resolve)
  );
  const title = await new Promise<string>((resolve, reject) =>
    // sends message to content script in order to get the title of the video
    chrome.tabs.sendMessage(tabs[0].id, "getTitle", (res) => {
      if (!res.error) resolve(res.title);
      else reject(res.error);
    })
  );
  return title;
}

// run in content script, returns the title
export function subscribeToGetVideoContent() {
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg === "getTitle") {
      try {
        const title = getVideoTitle();
        sendResponse({ title });
      } catch (err) {
        sendResponse({ error: "Couldn't fetch title" });
      }
    }
  });
}

// this is called in content script
// the page might not have loaded yet, so we need to keep checking for a video title
export async function waitForVideo() {
  const maxTries = 16;
  return new Promise<string>((resolve, reject) => {
    let count = 0;
    // setInterval(cb, x) runs cb every x milliseconds
    const interval = setInterval(() => {
      try {
        const title = getVideoTitle();
        clearInterval(interval);
        resolve(title);
        return;
      } catch (err) {}

      count += 1;
      if (count > maxTries) {
        clearInterval(interval);
        reject("Could not find video title");
      }
    }, 500);
  });
}
