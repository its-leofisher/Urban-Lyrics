import * as express from "express";
import * as puppeteer from "puppeteer";
import * as bodyParser from "body-parser";
import * as cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json()); // parse body from string to json

type ScrapeRequest = Express.Request & {
  body: {
    title: string;
  };
};

// Make sure the scrape request is valid
function isValidScrapeRequest(req: any): req is ScrapeRequest {
  return typeof req?.body?.title === "string";
}

// the request needs to contain a youtube video (song) title
app.post("/scrape", async function (req, res) {
  if (!isValidScrapeRequest(req)) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }
  const {
    body: { title },
  } = req;
  try {
    const lyrics = await scrapeLyrics(title);
    res.status(200).json(lyrics);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

type LyricResult = {
  lyrics: string;
  songTitle: string;
  artist: string;
};

async function scrapeLyrics(title: string): Promise<LyricResult> {
  // 1. search genius.com
  // 2. click on the first song option
  // 3. grab the lyrics from the newly loaded page
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  let skippedResources = blockedUrls;
  page.on("request", (request) => {
    if (
      !["document", "script", "xhr", "other"].includes(request.resourceType())
    ) {
      request.abort();
      return;
    }
    const requestUrl = (request as any)._url.split("?")[0].split("#")[0];
    if (
      skippedResources.some((resource) => requestUrl.indexOf(resource) !== -1)
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto(encodeURI(`https://genius.com/search?q=${title}`));

  const firstSong = await page.waitForXPath('//*[name()="mini-song-card"]//a', {
    timeout: 15000,
  });
  await firstSong.click();
  const lyrics = await (
    await page.waitForXPath("//*[contains(@class,'Lyrics__Root')]|//section")
  ).evaluate((p: any) => p.innerText);
  const songTitle = await (
    await page.waitForXPath("//h1[contains(@class, 'itle')]")
  ).evaluate((p: any) => p.innerText);
  const artist = await (
    await page.waitForXPath(
      "//a[contains(@href,'https://genius.com/artists/') and contains(@class, 'rtist')]"
    )
  ).evaluate((p: any) => p.innerText);
  return {
    lyrics,
    songTitle,
    artist,
  };
}

const blockedUrls = [
  "ping.chartbeat.net",
  "librato-collector.genius.com",
  "api.mixpanel.com",
  "is1-ssl.mzstatic.com",
  "www.youtube.com",
  "connect.facebook.net",
  "sessions.bugsnag.com",
  "stats.g.doubleclick.net",
  "pixel.quantserve.com",
  "loadus.exelator.com",
  "api-js.mixpanel.com",
  "stats.pusher.com",
  "js-cdn.music.apple.com",
  "cds.taboola.com",
  "dialog.filepicker.io",
  "sb.scorecardresearch.com",
  "www.filepicker.io",
  "cdn.mxpnl.com",
  "trc.taboola.com",
  "www.google-analytics.com",
  "audio-ssl.itunes.apple.com",
  "secure.quantserve.com",
  "ws.pusherapp.com",
  "t2.genius.com",
  "cdn.taboola.com",
  "static.chartbeat.com",
  "pubmatic.com",
  "adsymptotic.com",
  "adsby.bidtheatre.com",
  "s.amazon-adsystem.com",
  "simpli.fi",
  "tapad.com",
  "googlesyndication.com",
  "gumgum.com",
];

app.listen(8000, () => console.log("Server started on port 8000"));
