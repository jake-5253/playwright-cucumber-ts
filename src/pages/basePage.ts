import { Locator, Page } from "@playwright/test";

export class BasePage {

  constructor(protected page: Page) {}

  async goto(url: string) {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, text: string) {
    await locator.fill(text);
  }

  async getText(locator: Locator) {
    return locator.textContent();
  }

  async wait(locator: Locator) {
    await locator.waitFor({
      state: "visible"
    });
  }

  async screenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}.png`
    });
  }
}