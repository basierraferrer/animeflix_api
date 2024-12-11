export interface ScrapperUrlFromOption {
  playerUrl: string;
  duration: number;
}

export interface EpisodeProps extends ScrapperUrlFromOption {
  episode: string;
}
