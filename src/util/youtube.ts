import { $x } from "./xpath";

function getVideoTitle() {
  const res = $x(
    '//*[@id="container"]/h1/yt-formatted-string/text()',
    document
  )[0].nodeValue;
  if (!res) throw Error("no video title found!");

  return res as string;
}

export async function getVideoContent(): Promise<string> {
  const tabs = await new Promise((resolve) =>
    chrome.tabs.query({ active: true, currentWindow: true }, resolve)
  );
  const title = await new Promise<string>((resolve, reject) =>
    chrome.tabs.sendMessage(tabs[0].id, "getTitle", (res) => {
      if (!res.error) resolve(res.title);
      else reject(res.error);
    })
  );
  return title;
}

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

export async function waitForVideo() {
  const maxTries = 16;
  return new Promise<string>((resolve, reject) => {
    let count = 0;
    const interval = setInterval(() => {
      try {
        const title = getVideoTitle();
        clearInterval(interval);
        resolve(title);
      } catch (err) {}
      count += 1;
      if (count > maxTries) reject("Could not find video title");
    }, 500);
  });
}
