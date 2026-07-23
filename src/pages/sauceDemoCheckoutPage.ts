import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

export class SauceDemoCheckoutPage extends BasePage {

  readonly firstNameInput = this.page.locator("#first-name");
  readonly lastNameInput = this.page.locator("#last-name");
  readonly postalCodeInput = this.page.locator("#postal-code");
  readonly continueButton = this.page.locator("#continue");
  readonly checkoutSummaryContainer = this.page.locator('#checkout_summary_container');
  readonly finishButton = this.page.locator("#finish");
  readonly completeCheckoutHeaderMessage = this.page.locator("[data-test='complete-header']");

  async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }
  
  async clickContinueButton() {
    await this.continueButton.click();
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }
  async verifyCheckoutPageRedirection() {
    await expect(this.checkoutSummaryContainer).toBeVisible();
  }

  async verifySuccessfulCheckout() {
    await expect(this.completeCheckoutHeaderMessage).toHaveText("Thank you for your order!");
  }
}