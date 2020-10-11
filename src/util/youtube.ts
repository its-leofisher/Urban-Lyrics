import { $x } from "./xpath";

export function getVideoTitle() {
  const res = $x(
    '//*[@id="container"]/h1/yt-formatted-string/text()',
    document
  )[0].nodeValue;
  if (!res) throw Error("no video title found!");

  return res as string;
}
