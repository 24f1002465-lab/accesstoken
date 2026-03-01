import { chromium } from 'playwright';

const seeds = [28,29,30,31,32,33,34,35,36,37];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/playwright/seed${seed}.html`;

    await page.goto(url);

    const numbers = await page.$$eval("table td", cells =>
      cells.map(c => parseFloat(c.innerText)).filter(n => !isNaN(n))
    );

    totalSum += numbers.reduce((a,b)=>a+b,0);
  }

  console.log("FINAL TOTAL:", totalSum);

  await browser.close();
})();
