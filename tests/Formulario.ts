import { expect, Locator, Page } from "@playwright/test"

export class Formulario {
   

    private readonly usernameTextbox: Locator
    private readonly lastnameTextbox: Locator
    private readonly emailTexbox: Locator
    private readonly gender: Locator
    private readonly mobilTexbox: Locator
    private readonly birthTexbox: Locator
    private readonly subjectsTexbox: Locator
    private readonly hobbiesCheckbox: Locator
    private readonly selectButton: Locator
    private readonly addressTexbox: Locator
    private readonly stateDropdown: Locator
    private readonly opcionState: Locator
    private readonly cityDropdown: Locator
    private readonly opcionCity: Locator
    private readonly submitButton: Locator
 
    constructor (page : Page) {
        
      this.usernameTextbox = page.getByRole('textbox', {name:'First Name'})
      this.lastnameTextbox = page.getByRole('textbox', { name: 'Last Name' });
      this.emailTexbox =page.getByRole('textbox', {name:'name@example.com'})
      this.gender = page.locator("text=Other")
      this.mobilTexbox = page.locator("//input[@id='userNumber']")
      this.birthTexbox = page.locator("//input[@id='dateOfBirthInput']")
      this.subjectsTexbox = page.locator("//div[@id='subjectsContainer']")
      this.hobbiesCheckbox = page.locator("//input[@id='hobbies-checkbox-1']")
      this.selectButton = page.getByRole('button', {name:'Select picture'})
      this.addressTexbox = page.getByRole('textbox', {name:'Current Address'})
      this.stateDropdown = page.locator("//div[@id='state']")
      this.opcionState = page.locator("text=Uttar Pradesh")
      //this.cityDropdown = page.locator('//div[id="react-select-4-input"]')
      //this.opcionCity = page.locator("text=Agra")
      this.submitButton = page.getByRole('button', {name:'Submit'})
     
    }
    
    async fillForm(data: {
      username: string;
      lastname: string;
      email: string;
      mobile: string;
      birthDate: string;
      subjects: string;
      address: string;
      hobbies: boolean;
  }) {
      
    
await this.usernameTextbox.fill(data.username);
      
 
await this.lastnameTextbox.fill(data.lastname);
      
  
await this.emailTexbox.fill(data.email);
      

await this.mobilTexbox.fill(data.mobile);
      
await this.birthTexbox.fill(data.birthDate);

await this.subjectsTexbox.click();

await this.addressTexbox.fill(data.address);
    
      
if (data.hobbies) {
        await this.hobbiesCheckbox.check();
 } 

await this.gender.check(); 
      
await this.stateDropdown.click();
await this.opcionState.click();


//await this.cityDropdown.waitFor({ state: 'visible' });     
//await this.cityDropdown.click();
//await this.opcionCity.click(); 
  }

async submitForm() {
  await this.submitButton.click();
}
}

