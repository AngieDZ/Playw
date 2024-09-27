import { expect, Locator, Page } from "@playwright/test"

export class LoginPage {

   private readonly usernameTextbox: Locator
   private readonly passwordTexbox: Locator
   private readonly loginButton: Locator
   private readonly shoppingCartIcon : Locator
  

   constructor (page : Page) {
     this.usernameTextbox = page.getByRole('textbox', {name:'Username'})
     this.passwordTexbox =page.getByRole('textbox', {name:'Password'})
     this.loginButton =page.getByRole('button', {name:'Login'})
     this.shoppingCartIcon = page.locator("//Xpath=//a[contains(@class,'shopping_cart_link')]")
    
   }

   async fillUsername(username:string){
   await this.usernameTextbox.fill(username)
   }

   async fillPassword(password:string){
   await this.passwordTexbox.fill(password)
   }

   async clickOnLogin(){
   await this.loginButton.click()
   }
   
   async loginWithCredentials(username: string, password: string){
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.clickOnLogin()
   }

   async checkSuccessfulLogin(){
    expect(this.shoppingCartIcon).toBeVisible
   }


}