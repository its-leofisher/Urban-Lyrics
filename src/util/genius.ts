import axios from "axios";
import { DOMParser } from "xmldom";
import { $x } from "./xpath";

// const { DOMParser } = xmldom;

// async/await -- waiter at multiple tables
// multithreading -- multiple waiters

// IO bound application -- read/write to files a lot (or do a lot of http requests)
// CPU bound -- lots of computation
// API status codes: https://developer.amazon.com/docs/amazon-drive/ad-restful-api-response-codes.html
export async function findUrl(title: string): Promise<string> {
  const url = encodeURI(`https://genius.com/search?q=${title}`);

  console.log(title);
  const { data } = await axios.get(url); // Postman/http request

  // query xpath here
  console.log(data);
  const doc = new DOMParser().parseFromString(data);
  const res = $x('//*[name()="mini-song-card"]//a', doc)[0].href;
  console.log(res);
  return res;
}

// this is run in the background script
export function subscribeToGeniusFindUrl() {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.name === "findGeniusUrl" && !!message.title) {
      (async function () {
        try {
          const url = await findUrl(message.title);
          sendResponse({ status: "success", url });
        } catch (err) {
          sendResponse({ status: "error", message: err.toString() });
        }
      })();
      return true;
    }
  });
}

// this is run in the content script
export async function findUrlBackground(title: string): Promise<string> {
  return new Promise((resolve, reject) =>
    chrome.runtime.sendMessage(
      { name: "findGeniusUrl", title },
      (response: {
        status: "success" | "error";
        url?: string;
        message?: string;
      }) => {
        if (response.status !== "success") {
          reject(response.message);
        } else {
          resolve(response.url);
        }
      }
    )
  );
}
