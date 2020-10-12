import { $x } from "./xpath";

function getVideoTitle() {
  const res = $x(
    '//*[@id="container"]/h1/yt-formatted-string/text()',
    document
  )[0].nodeValue;
  if (!res) throw Error("no video title found!");

  return res as string;
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
