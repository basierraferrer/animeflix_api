const puppeteer = require('puppeteer');

export class ScrapeAnimeData {
  
  constructor(){
    
  };



  scrapeAnimeData = async (episode) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`https://www3.animeflv.net/ver/detective-conan-${episode}`);


    const items = await page.$eval('ul[role="tablist"]', el=>el.childNodes.length); 
    console.log("**__** ~ app.get ~ items:", items);
    let index = 0;
    const urlsAvailable = [];
    while(index < items){
      const url = await this.getUrl(page, index);
      urlsAvailable.push(url);
      console.log("**__** ~ ScrapeAnimeData ~ scrapeAnimeData= ~ url:", url)
      index++;
    }

    const titleDiv = (await page.$eval('.CapiTop', el => el.textContent.trim())).split('\n');


    const title = titleDiv[0].trim();
    const synopsis = titleDiv[1].trim();

    await page.$eval('li[data-id="2"]', el=>el.click());
    const iframeVideo = await page.$eval('#video_box iframe', el=>el.getAttribute('src'));

    await browser.close();

    res.json({title,synopsis, url: iframeVideo});
  }

  getUrl = async (page, index)=>{
    await page.locator(`li[data-id="${index}"]`).setTimeout(1000).click();
    const src = await page.$eval('#video_box iframe', el=>el.getAttribute('src'));
    console.log("**__** ~ app.get ~ src:", index, src);    
  } 

}
