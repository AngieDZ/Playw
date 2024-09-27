import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('test mercado libre', async ({ page }) => {
  await page.goto('https://listado.mercadolibre.com.co')
  
  await page.locator('input[id=\'cb1-edit\']').fill('Iphone')
  await page.keyboard.press('Enter')
  await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible()
  const titles = await page.locator('//ol[contains(@class,\'ui-search-layout\')]//li//h2').allInnerTexts()

  console.log('El numeto total de resultados es: ', titles.length)
  for(let title of titles){
    console.log('El titulo es: ', title)
  }
});

test ('adivina la palabra', async ({page}) => {
 
  await page.goto('http://127.0.0.1:5500/juego-adivina-la-palabra/game_login.html');
  await page.getByPlaceholder('Player 1 Name').click();
  await page.getByPlaceholder('Player 1 Name').fill('Teo');
  await page.getByPlaceholder('Player 2 Name').click();
  await page.getByPlaceholder('Player 2 Name').fill('Angie');

  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  await page.getByPlaceholder('Palabra').click();
  await page.getByPlaceholder('Palabra').fill('Arcadio');

  await page.getByRole('button', { name: 'Enviar' }).click();

  await page.locator('#input_check_box').click();
  await page.locator('#input_check_box').fill('amor');
  await page.getByRole('button', { name: 'Comprobar' }).click(); 
  
});

