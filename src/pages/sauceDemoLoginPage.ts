import { BasePage } from "./basePage";
import { config } from "../features/support/env";

export class SauceDemoLoginPage extends BasePage {

  readonly username = this.page.locator("#user-name");
  readonly password = this.page.locator("#password");
  readonly loginButton = this.page.locator("#login-button");
  
  async openSauceDemo() {
    await this.goto(config.baseUrlSauceDemo);
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}