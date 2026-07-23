import { BasePage } from "./basePage";
import { config } from "../features/support/env";
import { expect } from "@playwright/test";

export class SauceDemoCartPage extends BasePage {

  readonly productLink = this.page.locator("[data-test*='title-link']");
  readonly checkoutButton = this.page.locator("#checkout");

  inventoryItemName(productName: string) {
    return this.page.locator(`[data-test='inventory-item-name']:text('${productName}')`);
  }

  inventoryItemPrice(productName: string) {
    return this.page.locator(`[data-test='inventory-item-price']`);
  }

  private productSlug(productName: string) {
    return productName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  removeProductButton(productName: string) {
    return this.page.locator(`[data-test='remove-${this.productSlug(productName)}']`);
  }

  productPriceText(productName: string) {
    return this.page.locator("[data-test='inventory-item-price']").filter({
      hasText: productName
    });
  }

  async verifyProductInCart(productName: string) {
    await this.inventoryItemName(productName).waitFor({
      state: "visible"
    });
    expect(this.inventoryItemName(productName)).toBeVisible();
  }

  async removeProduct(productName: string) {
    await this.removeProductButton(productName).click();
  }

  async verifyProductPriceInCart(index: number, productPriceList: string[], productName: string) {
    var actualProductPrice = await this.inventoryItemPrice(productName).nth(index).innerText();
    var expectedProductPrice = productPriceList[index];
    expect(actualProductPrice).toBe(expectedProductPrice);
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}