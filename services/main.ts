import {ScrapperData} from '../models';

async function scrapperAnimeEpisodeData(episode: string) {
  console.log(
    '🚀 ~ scrapperAnimeEpisodeData ~ start scrapperAnimeEpisodeData ',
    episode,
  );
  const scrapperData = new ScrapperData();
  const animeData = await scrapperData.getEpisodeData(episode);
  await scrapperData.closeBrowser();
  console.log('🚀 ~ scrapperAnimeEpisodeData ~ end scrapperAnimeEpisodeData ');
  return animeData;
}

async function scrapperEpisodeAnime(episode: string, animeName: string) {
  console.log(
    '🚀 ~ scrapperAnimeEpisodeData ~ start scrapperEpisodeAnime ',
    episode,
    animeName,
  );
  const scrapperData = new ScrapperData();
  const episodeData = await scrapperData.getEpisodeOfAnime(episode, animeName);
  await scrapperData.closeBrowser();
  console.log('🚀 ~ scrapperAnimeEpisodeData ~ end scrapperEpisodeAnime ');
  return episodeData;
}

export default {
  scrapperAnimeEpisodeData,
  scrapperEpisodeAnime,
};
