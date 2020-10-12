import axios from "axios";
import { LyricResult } from "./types";

// async/await -- waiter at multiple tables
// multithreading -- multiple waiters

// IO bound application -- read/write to files a lot (or do a lot of http requests)
// CPU bound -- lots of computation
// API status codes: https://developer.amazon.com/docs/amazon-drive/ad-restful-api-response-codes.html
export async function fetchLyrics(title: string): Promise<LyricResult> {
  const url = `${process.env.BACKEND_URL}/scrape`;
  try {
    const { data } = await axios.post(url, { title }); // Postman/http request
    return data;
  } catch (err) {
    console.error(`Error fetching lyrics: ${err?.response?.data?.error}`);
    throw err;
  }
}

// this is run in the background script
export function subscribeToGeniusFetchLyrics() {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.name === "findGeniusUrl" && !!message.title) {
      (async function () {
        try {
          const data = await fetchLyrics(message.title);
          sendResponse({ status: "success", data });
        } catch (err) {
          sendResponse({ status: "error", message: err.toString() });
        }
      })();
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
      { name: "findGeniusUrl", title },
      (response: {
        status: "success" | "error";
        data?: LyricResult;
        message?: string;
      }) => {
        if (response.status !== "success") {
          reject(response.message);
        } else {
          resolve(response.data);
        }
      }
    )
  );
}
