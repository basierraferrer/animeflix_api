import {EpisodeService} from './episodeScraper';

export async function scrapperAnimeEpisodeData(episode: string) {
  const episodeServices = new EpisodeService();
  const animeData = await episodeServices.getEpisodeData(episode);
  await episodeServices.closeBrowser();

  return animeData;
}
