import { BasePage } from "./basePage";

export class ShopifyPage extends BasePage {
    productLink(product: string) {
        return this.page.locator(`a[href*='${product}']`);
    }
    
    async selectProductLink(product: string) {
        await this.productLink(product.toLowerCase().replace(' ', '-')).click();
    }
}