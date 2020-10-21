const puppeteer = require ('puppeteer');
(async() =>{
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto('https://www.pokemon.com/us/pokedex/');
    const form = await page.$('#loadMore > span');
    await form.evaluate( form => form.click() );
    await autoScroll(page);
    await page.waitForSelector("h5");
    await page.waitFor(15000);
    let datospokemon = await page.evaluate(() => {
        let nombrepokemon = [];
        let pokenombre = document.querySelectorAll('section.pokedex-results > ul > li');

        pokenombre.forEach((pokeelement) => {

          

            let pokenombrecito = {};
            pokenombrecito.nombre = pokeelement.querySelector('h5').innerText;
            pokenombrecito.id = pokeelement.querySelector('p.id').innerText;
            pokenombrecito.tipos = pokeelement.querySelector('div.abilities').innerText;

            nombrepokemon.push(pokenombrecito);

         

        });
        return nombrepokemon;
    })
    console.log(datospokemon);
    await browser.close();
})();

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}
