const puppeteer = require ('puppeteer');
(async() =>{
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto('https://www.pokemon.com/us/pokedex/');

    await page.waitForSelector("h5");
    await page.waitFor(3000);
    let datospokemon = await page.evaluate(() => {
        let nombrepokemon = [];
        let pokenombre = document.querySelectorAll('section.pokedex-results > ul > li');

        pokenombre.forEach((pokeelement) => {

            // esta es la parte editada -->

            let pokenombrecito = {};
            pokenombrecito.nombre = pokeelement.querySelector('h5').innerText;
            pokenombrecito.id = pokeelement.querySelector('p.id').innerText;
            pokenombrecito.tipos = pokeelement.querySelector('div.abilities').innerText;

            nombrepokemon.push(pokenombrecito);

            // <-- hasta acá la parte editada

        });
        return nombrepokemon;
    })
    console.log(datospokemon);
    await browser.close();
})();