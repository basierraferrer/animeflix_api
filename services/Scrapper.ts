import {Scrapper} from '../models';

async function scrapperAnimeEpisodeData(episode: string) {
  const animeData = await Scrapper.getEpisodeData(episode);
  await Scrapper.closeBrowser();

  return animeData;
}

export default {
  scrapperAnimeEpisodeData,
};
