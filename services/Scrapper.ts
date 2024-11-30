import {Scrapper} from '../models/Scrapper';

async function scrapperAnimeEpisodeData(episode: string) {
  const scrapperClass = new Scrapper();
  const animeData = await scrapperClass.getEpisodeData(episode);
  await scrapperClass.closeBrowser();

  return animeData;
}

export default {
  scrapperAnimeEpisodeData,
};
