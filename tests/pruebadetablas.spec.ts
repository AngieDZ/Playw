import { test, expect } from '@playwright/test'

test ('prueba tablas', async ({ page }) => {

 await page.goto('https://cosmocode.io/automation-practice-webtable/')


 const contenedorTabla = page.locator("xpath=//table[@id='countries']")

 const filas = await contenedorTabla.locator("xpath=.//tr").all()

 const paises: Country[] = []

 console.log(filas.length)

 for(let fila of filas){
    let country: Country = {
        name: await fila.locator('xpath=.//td[2]').innerText(),
        capital: await fila.locator('xpath=.//td[3]').innerText(),
        moneda: await fila.locator('xpath=.//td[4]').innerText(),
        Lenguaje: await fila.locator('xpath=.//td[5]').innerText()
    }
    paises.push(country)
 }

 /*for (let country of paises ){
    console.log(country)
 }*/

 const paisesHablaPortugues = paises.filter(country => country.Lenguaje === 'Portuguese')

 console.log(paisesHablaPortugues)

})

interface Country{
    name:string
    capital:string
    moneda:string
    Lenguaje: string

}
/*elemento contenedor: //table[@id='countries']
.//tr -> filas
//table[@id='countries']//tr[2]//td[1] -> Chequeo
//table[@id='countries']//tr[2]//td[2] -> pais
//table[@id='countries']//tr[2]//td[3] -> capital
//table[@id='countries']//tr[2]//td[4] -> moneda
//table[@id='countries']//tr[2]//td[5] -> lenguaje*/