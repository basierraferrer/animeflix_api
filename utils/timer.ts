import {PLAYER} from './constants';
import * as cheerio from 'cheerio';

export const getTimerSelector = (playerName: string) => {
  let selector = '';

  switch (playerName) {
    case PLAYER.MEGA:
      throw new Error(`Selector no definido para ${playerName}`);
    case PLAYER.SW:
      selector = '.jw-slider-time';
      break;
    case PLAYER.YOUR_UPLOAD:
      selector = '.jw-text-duration';
      break;
    case PLAYER.FEMBED:
      throw new Error(`Selector no definido para ${playerName}`);
    default:
      throw new Error(`Selector no definido para ${playerName}`);
  }
  return selector;
};

export const getTimerArray = (textHTML: string, title: string) => {
  let timerArray: string[] = [];

  if (title === PLAYER.SW) {
    const $cheerio = cheerio.load(textHTML);
    const timerSelector = getTimerSelector(title);
    timerArray = $cheerio(timerSelector)
      .attr('aria-valuetext')
      ?.replace('0 seconds of ', '')
      .trim()
      .split(',') as string[];
  }

  if (title === PLAYER.YOUR_UPLOAD) {
    timerArray = textHTML.split(':');
    timerArray[0] += ' minutes';
    timerArray[1] += ' seconds';
  }

  return timerArray;
};

export const getTimerMilliseconds = (textHTML: string, title: string) => {
  const timerArray = getTimerArray(textHTML, title);
  const totalMilliseconds: number = timerArray.reduce(
    (total: number, item: string) => {
      const [value, unit] = item.split(' ');
      let milliseconds = 0;
      if (unit === 'minutes') {
        milliseconds = parseInt(value, 10) * 60 * 1000;
      } else if (unit === 'seconds') {
        milliseconds = parseInt(value, 10) * 1000;
      }
      return total + milliseconds;
    },
    0,
  );
  return totalMilliseconds;
};
