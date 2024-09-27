import { test, expect } from '@playwright/test'
import { LoginPage } from './LoginPage';

test ('prueba 3', async ({ page }, testInfo) => {

    await page.goto('https://www.saucedemo.com/')
    
    await page.getByRole('textbox', {name:'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name:'Login'}).click()

    //await page.screenshot({path: 'screenshots/login.png', fullPage: true})

    await testInfo.attach('login' , {
        body: await page.screenshot(),
        contentType:'image/png'
    })

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

    const randomIndex = Math.floor(Math.random() * itemsContainer.length);

    const randomItem = itemsContainer[randomIndex]

    const expectedDescripcion = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedNombre = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrecio = await randomItem.locator('.inventory_item_price').innerText()

    console.log(`Precio: ${expectedPrecio}, Nombre: ${expectedNombre}, Descripcipcion: ${expectedDescripcion}`);

    await randomItem.getByRole('button', {name:'Add to cart'}).click()
    await page.locator('a.shopping_cart_link').click()

    expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible

    const actualNombre = await page.locator('.inventory_item_name').innerText()
    const actualDescripcion = await page.locator('.inventory_item_desc').innerText()
    const actualPrecio = await page.locator('.inventory_item_price').innerText()

    expect(actualNombre).toEqual(expectedNombre)
    expect(actualDescripcion).toEqual(expectedDescripcion)
    expect(actualPrecio).toEqual(expectedPrecio)

    await page.getByRole('button', {name:'Checkout'}).click()

    await page.getByRole('textbox', {name:'First Name'}).fill('Teo')
    await page.getByRole('textbox', {name:'Last Name'}).fill('Buelvas')
    await page.getByRole('textbox', {name:'Zip/Postal Code'}).fill('050035')

    await page.getByRole('button', {name:'Continue'}).click()
    await page.getByRole('button', {name:'Finish'}).click()
    await page.getByRole('button', {name:'Back Home'}).click()

    await  expect(page.getByRole('heading', {name: 'Thank you for your order'})).toBeVisible

});

test ('prueba 3 mejorada', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/')
    
    const login = new LoginPage(page)
    await login.fillUsername('standard_user')
    await login.fillPassword('secret_sauce')
    await login.clickOnLogin()

});

test ('prueba 3 mejorada version 2', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/')
    const login = new LoginPage(page)
    await login.loginWithCredentials('standard_user','secret_sauce')
    await login.checkSuccessfulLogin()

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

    const randomIndex = Math.floor(Math.random() * itemsContainer.length);

    const randomItem = itemsContainer[randomIndex]

    const expectedDescripcion = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedNombre = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrecio = await randomItem.locator('.inventory_item_price').innerText()

    console.log(`Precio: ${expectedPrecio}, Nombre: ${expectedNombre}, Descripcipcion: ${expectedDescripcion}`);

    await randomItem.getByRole('button', {name:'Add to cart'}).click()
    await page.locator('a.shopping_cart_link').click()

    expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible

    const actualNombre = await page.locator('.inventory_item_name').innerText()
    const actualDescripcion = await page.locator('.inventory_item_desc').innerText()
    const actualPrecio = await page.locator('.inventory_item_price').innerText()

    expect(actualNombre).toEqual(expectedNombre)
    expect(actualDescripcion).toEqual(expectedDescripcion)
    expect(actualPrecio).toEqual(expectedPrecio)

    await page.getByRole('button', {name:'Checkout'}).click()

    await page.getByRole('textbox', {name:'First Name'}).fill('Teo')
    await page.getByRole('textbox', {name:'Last Name'}).fill('Buelvas')
    await page.getByRole('textbox', {name:'Zip/Postal Code'}).fill('050035')

    await page.getByRole('button', {name:'Continue'}).click()
    await page.getByRole('button', {name:'Finish'}).click()
    await page.getByRole('button', {name:'Back Home'}).click()

    await  expect(page.getByRole('heading', {name: 'Thank you for your order'})).toBeVisible
    

});