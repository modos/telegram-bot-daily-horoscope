const puppeteer = require('puppeteer');
const { Telegraf } = require('telegraf');
const bot = new Telegraf("ENETER YOUR TOKEN HERE");

let fals = [];
 
async function getPup(){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.beytoote.com/daily-horoscope/');

  const crawl = await page.evaluate(() => {
    let fal = [];
    let rows = document.querySelectorAll("#innertop > div:nth-child(3) > div > table > tbody > tr");

    rows.forEach(element => {
      fal.push(element.innerText);
      console.log(element.innerText);
    });

    return fal;
  });

  fals = crawl;
  //console.log(fals[0]);
  await browser.close();
}

getPup().then(() => {
  bot.start(async (ctx) => {
    for (let i = 0; i < fals.length; i++) {
      await ctx.reply(fals[i])    
    }
  })
  bot.launch()
});

