import { BasePage } from "./basePage";
import { config } from "../features/support/env";

export class LoginPage extends BasePage {

  readonly username = this.page.locator("#customer_email");
  readonly password = this.page.locator("#customer_password");
  readonly loginButton = this.page.locator("[value='Sign In']");

  async open() {
    await this.goto(config.baseUrl);
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}