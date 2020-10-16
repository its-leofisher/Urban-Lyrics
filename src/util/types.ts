export type LyricResult = {
  lyrics: string;
  songTitle: string;
  artist: string;
  geniusUrl: string;
};

export type LoadingState = {
  loading: true;
  lastUpdated: number;
};

export type LyricCacheObj = LoadingState | LyricResult;
