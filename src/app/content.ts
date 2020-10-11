import "../ui/overlay";
import { findUrlBackground } from "../util/genius";
import { getVideoTitle } from "../util/youtube";

async function run() {
  await new Promise((res) => setTimeout(res, 3000));
  const title = getVideoTitle();
  console.log("got title");
  const url = await findUrlBackground(title);
  console.log(title, url);
}

run();
