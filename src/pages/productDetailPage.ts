import { BasePage } from "./basePage";
import { config } from "../features/support/env";

export class ProductDetailPage extends BasePage {


  readonly addToCartButton = this.page.locator("#add");
  readonly productPriceText = this.page.locator("[class='product-price']");
  
  async clickAddToCartButton() {
    await this.addToCartButton.click();
  }

  async getProductPrice() {
    var productPrice = await this.productPriceText.textContent();
    return productPrice;
  }
}