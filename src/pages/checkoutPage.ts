import { BasePage } from "./basePage";

export class CheckoutPage extends BasePage {

  readonly emailInput = this.page.locator("#email");
  readonly countryDropdown = this.page.locator("select[name='countryCode']");
  readonly lastNameInput = this.page.locator("[placeholder='Last name']");
  readonly addressInput = this.page.locator("#shipping-address1");
  readonly postalCodeInput = this.page.locator("[placeholder='Postal code']");
  readonly cityInput = this.page.locator("[placeholder='City']");
  readonly cardNumberInput = this.page.locator("[data-current-field='number']");
  readonly expirationDateInput = this.page.locator("[data-card-fields='expiry']");
  readonly securityCodeInput = this.page.locator("[data-current-field='verification_value']");
  readonly nameOnCardInput = this.page.locator("[data-current-field='name']");
  readonly payNowButton = this.page.locator("#checkout-pay-button");

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async selectCountry(country: string) {
    await this.countryDropdown.selectOption(country);
  }

  async enterLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async enterAddress(address: string) {
    await this.addressInput.fill(address);
  }

  async enterPostalCode(postalCode: string) {
    await this.postalCodeInput.fill(postalCode);
  }

  async enterCity(city: string) {
    await this.cityInput.fill(city);
  }

  async enterCardNumber(cardNumber: string) {
    await this.cardNumberInput.fill(cardNumber);
  }

  async enterExpirationDate(expirationDate: string) {
    await this.expirationDateInput.fill(expirationDate);
  }

  async enterSecurityCode(securityCode: string) {
    await this.securityCodeInput.fill(securityCode);
  }

  async enterNameOnCard(nameOnCard: string) {
    await this.nameOnCardInput.fill(nameOnCard);
  }

  async enterCardDetails(cardNumber: string, nameOnCard: string, expirationDate: string, securityCode: string) {
    await this.enterCardNumber(cardNumber);
    await this.enterNameOnCard(nameOnCard);
    await this.enterExpirationDate(expirationDate);
    await this.enterSecurityCode(securityCode);
  }
  
  async clickPayNow() {
    await this.payNowButton.click();
  }
}