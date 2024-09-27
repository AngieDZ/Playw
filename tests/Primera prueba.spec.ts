import { test, expect } from '@playwright/test'
import { Formulario } from './Formulario';

test ('mi primera prueba', async ({ page }) => {

    await page.goto('https://demoqa.com/automation-practice-form')

    const formulario = new Formulario(page)

    await formulario.fillForm({
        username: 'Teo',
        lastname: 'Buelvas',
        email: 'teitoelmasbello@gmail.com',
        mobile: '3001234569',
        birthDate: '05-02-2020',
        address: 'calle 54 #86c-220',
        hobbies: false,
        subjects: 'English'
    })

    await formulario.submitForm();
    
});