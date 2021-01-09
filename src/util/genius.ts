import axios from "axios";
import { LyricResult } from "./types";

export async function fetchLyrics(title: string): Promise<LyricResult> {
  try {
    const { data } = await axios.post(`${process.env.BACKEND_URL}/songdata`, {
      title,
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error(`Error fetching lyrics: ${err?.response?.data?.error}`);
    throw err; // maybe don't throw in the future
  }
}

// this is run in the background script
// it waits for a message from the content script or from the popup script
// and then runs fetchLyrics FOR THEM
export function subscribeToGeniusFetchLyrics() {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.name === "fetchLyrics" && !!message.title) {
      // immediately invoked function because we want to await fetchLyrics
      (async function () {
        try {
          const data = await fetchLyrics(message.title);
          sendResponse({ status: "success", data });
        } catch (err) {
          sendResponse({ status: "error", message: err.toString() });
        }
      })();
      // we need to return true to tell the other script that we have an asynchronous result on its way
      // the chrome API isn't sophisticated enough to take in a promise
      return true;
    }
  });
}

// this is run in the content script
export async function fetchLyricsBackground(
  title: string
): Promise<LyricResult> {
  return new Promise((resolve, reject) =>
    chrome.runtime.sendMessage(
      { name: "fetchLyrics", title },
      (response: {
        status: "success" | "error";
        data?: LyricResult;
        message?: string;
      }) => {
        if (response.status === "success") {
          resolve(response.data);
        } else {
          reject(response.message);
        }
      }
    )
  );
}
