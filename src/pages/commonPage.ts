import { BasePage } from "./basePage";

export class CommonPage extends BasePage {
  
  readonly searchInput = this.page.locator("#search-field");
  readonly searchMenuLink = this.page.locator("[href='/search']");
  readonly aboutUsMenuLink = this.page.locator("[href='/pages/about-us']");
  readonly loginMenuLink = this.page.locator("#customer_login_link");
  readonly signUpMenuLink = this.page.locator("#customer_register_link");
  readonly myCartButton = this.page.locator("a[class*='cart desktop']");
  readonly checkoutButton = this.page.locator("[class='checkout']");
  cartItemCountText(quantity: string) {
    return this.page.locator(`a[class*='cart desktop'] span[class='count']:text('(${quantity})')`);
  } 

  async goGoMenu(menu: string) {

    switch (menu.toLowerCase()) {
      case "search":
        await this.searchMenuLink.click();
        break;
      case "about us":
        await this.aboutUsMenuLink.click();
        break;
      case "login":
        await this.loginMenuLink.click();
        break;
      case "sign up":
        await this.signUpMenuLink.click();
        break;
      default:
        throw new Error(`Provide correct menu: 
          Search, About Us, Login, Sign Up. You provided: ${menu}`);
    }

  }

  async openMyCart() {
    await this.wait(this.cartItemCountText("1"));
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
    await this.myCartButton.click();
  }
  
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}