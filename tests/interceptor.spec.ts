import {test, expect } from '@playwright/test'
import { LoginPage } from './LoginPage';
  

test ('Interceptor 1', async ({ page }) => {
    // Metodo si no quiero carcagr items (si lo encuantra lo cancela)

    await page.on ("request", req => {
        console.log(req.url());
    });

    await page.route(
        "**/*.{png,jpg,jpeg.svg}",
    (route) => route.abort()
    
    );


    await page.goto('https://www.saucedemo.com/')
    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user','secret_sauce')
    await login.checkSuccessfulLogin()

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

    await page.screenshot({path: 'Login.png', fullPage:true})

})
  
// modificando respuestas de servicios (Si lo encuentra lo modifica)
test ('interceptor  2', async ({ page }) => {


    await page.route(
    "https://demoqa.com/BookStore/v1/Books",
    (route) => {
        route.fulfill({
            status: 200,
            headers:{ 
                'Content-Type': 'aplicatiom/json'
            },
            body: `
            
            {
                "books": [
            {
            "isbn": "9781449325862",
            "title": "Teito bello",
            "subTitle": "A Working Introduction",
            "author": "Richard E. Silverman",
            "publish_date": "2020-06-04T08:48:39.000Z",
            "publisher": "O'Reilly Media",
            "pages": 234,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
            }
        ]
    }`
        })
         
    }
    );
    await page.goto('https://demoqa.com/books');
    await page.screenshot({path: 'Login.png', fullPage:true});

});