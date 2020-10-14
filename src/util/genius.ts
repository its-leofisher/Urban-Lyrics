import axios from "axios";
import { LyricResult } from "./types";

// async/await -- waiter at multiple tables
// multithreading -- multiple waiters

// IO bound application -- read/write to files a lot (or do a lot of http requests)
// CPU bound -- lots of computation
// API status codes: https://developer.amazon.com/docs/amazon-drive/ad-restful-api-response-codes.html

// async function = the function can have "await" in it
export async function fetchLyrics(title: string): Promise<LyricResult> {
  const url = `${process.env.BACKEND_URL}/scrape`;
  try {
    const { data } = await axios.post(url, { title }); // http request
    return data;
  } catch (err) {
    console.error(`Error fetching lyrics: ${err?.response?.data?.error}`);
    throw err;
  }
}

// this is run in the background script
// it waits for a message from the content script or from the popup script
// and then runs fetchLyrics FOR THEM
export function subscribeToGeniusFetchLyrics() {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.name === "fetchLyrics" && !!message.title) {
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
