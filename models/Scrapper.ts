import puppeteer, {Browser, Page} from 'puppeteer';
import * as cheerio from 'cheerio';
import {getTimerSelector, getTimerMilliseconds} from '../utils/timer';
import {PLAYER} from '../utils/constants';
import {EpisodeProps, ScrapperUrlFromOption} from '../types';

interface LiNavDataProps {
  id: number;
  title: string;
}

export class Scrapper {
  private _browser: Browser | undefined;

  constructor() {
    this.init();
  }

  private async init() {
    if (!this._browser) {
      this._browser = await puppeteer.launch();
    }
  }

  private async getPage() {
    return this._browser!.newPage();
  }

  private async getTabListHTML(page: Page) {
    return page.$eval('ul[role="tablist"]', (el: Element) => el.outerHTML);
  }

  private getLiElements(stringHTML: string) {
    const $cheerio = cheerio.load(stringHTML);
    const elements = $cheerio('li[role="presentation"]', 'ul', stringHTML);
    const results: LiNavDataProps[] = [];
    elements.each((_index: number, el: any) => {
      results.push({
        id: Number(el.attribs['data-id']),
        title: el.attribs['title'],
      });
      return el;
    });
    return results;
  }

  private getCallBack(title: string) {
    let callBack: (param: Element) => string = (el: Element) => '';
    switch (title) {
      case PLAYER.SW:
        callBack = (el: Element) => el.outerHTML;
        break;
      case PLAYER.YOUR_UPLOAD:
        callBack = (el: Element) => el.textContent as string;
    }
    return callBack;
  }

  private async getTimerFromUrl(page: Page, title: string) {
    try {
      const timerSelector = getTimerSelector(title);
      const timerTextHTML = await page.$eval(
        timerSelector,
        this.getCallBack(title),
      );
      const totalMilliseconds = getTimerMilliseconds(timerTextHTML, title);
      return totalMilliseconds;
    } catch (error) {
      return 0;
    }
  }

  private async getUrlData(srcUrl: string, title: string) {
    const newPage = await this.getPage();
    try {
      await newPage.goto(srcUrl);
      const timerData = await this.getTimerFromUrl(newPage, title);
      return {
        playerUrl: srcUrl,
        duration: timerData,
      };
    } catch (error) {
      return undefined;
    }
  }

  private async getUrlFromOption(page: Page, item: LiNavDataProps) {
    try {
      await page.$eval(`li[data-id="${item.id}"]`, el => el.click());
      const srcUrl = await page.$eval(
        '#video_box iframe',
        el => el.getAttribute('src') as string,
      );
      const urlData = await this.getUrlData(srcUrl, item.title);
      return urlData;
    } catch (error) {
      return undefined;
    }
  }

  private async recursiveMapData(
    page: Page,
    values: LiNavDataProps[],
    index: number[],
  ): Promise<ScrapperUrlFromOption | undefined> {
    let dataFromOption: ScrapperUrlFromOption | undefined;
    if (index[0] > values.length) {
      return undefined;
    }

    const item = values[index[0]];
    dataFromOption = await this.getUrlFromOption(page, item);

    if (dataFromOption !== undefined) {
      return dataFromOption;
    }

    index[0] += 1;

    return await this.recursiveMapData(page, values, index);
  }

  private async getUrlAndDuration(page: Page, liElements: LiNavDataProps[]) {
    let dataValues;

    if (liElements.length) {
      const index = [0];
      dataValues = await this.recursiveMapData(page, liElements, index);
    }

    return dataValues;
  }

  async closeBrowser() {
    return this._browser!.close();
  }

  async getEpisodeData(episode: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www3.animeflv.net/ver/detective-conan-${episode}`);
    const tabListHTML = await this.getTabListHTML(page);
    const liElements = this.getLiElements(tabListHTML);
    const urlAndDuration = await this.getUrlAndDuration(page, liElements);

    return {episode, ...urlAndDuration} as EpisodeProps;
  }
}
