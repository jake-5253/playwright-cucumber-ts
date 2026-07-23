import { BasePage } from "./basePage";
import { config } from "../features/support/env";
import { expect } from "@playwright/test";

export class SauceDemoLandingPage extends BasePage {

  readonly productLink = this.page.locator("[data-test*='title-link']");

  private productSlug(productName: string) {
    return productName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  private productCard(productName: string) {
    return this.page.locator(".inventory_item").filter({
      has: this.page.locator("[data-test='inventory-item-name']", {
        hasText: productName
      })
    });
  }

  addToCartButton(productName: string) {
    return this.page.locator(`[data-test='add-to-cart-${this.productSlug(productName)}']`);
  }

  productPriceText(productName: string) {
    return this.productCard(productName).locator("[data-test='inventory-item-price']");
  }

  readonly cartBadgeCountText = this.page.locator("[data-test='shopping-cart-badge']");
  readonly shoppingCartIcon = this.page.locator("#shopping_cart_container");

  async verifyProductsVisible() {
    await this.productLink.first().waitFor({
      state: "visible"
    });
    await expect(this.productLink.first()).toBeVisible();
  }

  async verifyProductsCountGreaterThan(minCount: number) {
    const productCount = await this.productLink.count();
    expect(productCount).toBeGreaterThan(minCount);
  }

  async getProductPrice(productName: string) {
    const productPrice = await this.productPriceText(productName).textContent();
    return productPrice;
  }
  async addProductToCart(productName: string) {
    await this.addToCartButton(productName).click();
  }

  async verifyCartBadgeCount(expectedCount: string) {
    await expect(this.cartBadgeCountText).toHaveText(expectedCount);
  }

  async goToCart() {
    await this.shoppingCartIcon.click();
  }
}