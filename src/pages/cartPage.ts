import { expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {

    // Cart widget
    readonly widgetQuantityInput = this.page.locator("div[class*='quantity desktop'] input");
    readonly widgetRemoveButton = this.page.locator("div[class*='one column remove'] > a");
    readonly widgetCheckoutButton = this.page.locator("[value='Check Out']");
    readonly widgetProductNameLink = this.page.locator("div[class='nine columns description'] a");
    readonly widgetProductPriceLabel = this.page.locator("div[class*='two columns price desktop']");
    readonly widgetTotalPriceLabel = this.page.locator("div[class*='two columns total desktop']");

    // My Cart page
    readonly quantityInput = this.page.locator("div[class*='one columns quantity'] > input");
    readonly productNameLink = this.page.locator("div[class='six columns alpha description'] p");
    readonly productPriceTextLabel = this.page.locator("div[class='twelve columns alpha omega'] div[class='row'] div[class*='price']");
    readonly totalPriceTextLabel = this.page.locator("div[class='twelve columns alpha omega'] div[class='row'] div[class*='total']");
    readonly removeButton = this.page.locator("div[class*='one column remove omega'] > a");
    readonly checkoutButton = this.page.locator("#checkout");
    readonly updateButton = this.page.locator("#update");
    readonly noteTextarea = this.page.locator("#note");
    readonly continueShoppingLink = this.page.locator("div[class*='continue-shopping']");

    async enterWidgetQuantity(quantity: string) {
        await this.widgetQuantityInput.clear();
        await this.widgetQuantityInput.fill(quantity);
    }

    async clickWidgetRemoveButton() {
        await this.widgetRemoveButton.click();
    }

    async clickWidgetCheckoutButton() {
        await this.widgetCheckoutButton.click();
    }

    async getWidgetProductNameLink() {
        return await this.widgetProductNameLink.textContent();
    }

    async getWidgetProductPriceLabel() {
        return await this.widgetProductPriceLabel.textContent();
    }

    async getWidgetTotalPriceLabel() {
        return await this.widgetTotalPriceLabel.textContent();
    }

    async enterQuantity(quantity: string) {
        await this.quantityInput.fill(quantity);
    }

    async clickProductNameLink() {
        await this.productNameLink.click();
    }

    async getProductPriceTextLabel() {
        return await this.productPriceTextLabel.textContent();
    }

    async getTotalPriceTextLabel() {
        return await this.totalPriceTextLabel.textContent();
    }
    async clickRemoveButton() {
        await this.removeButton.click();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }

    async enterNote(note: string) {
        await this.noteTextarea.fill(note);
    }

    async clickContinueShoppingLink() {
        await this.continueShoppingLink.click();
    }

    async clickUpdateButton() {
        await this.updateButton.click();
    }

    async validateProductPriceInWidget(expectedProductPrice: string) {
        var actualProductPrice = (await this.getWidgetProductPriceLabel() ?? "").trim();
        expect(actualProductPrice, 
            `Product price in widget does not match. Expected: ${expectedProductPrice}, Actual: ${actualProductPrice}`).toEqual(expectedProductPrice); 
    }

    async validateProductNameInWidget(expectedProductName: string) {
        const actualProductName = (await this.getWidgetProductNameLink() ?? "").trim();
        expect(actualProductName,
            `Product name in widget does not contain expected text. Expected: ${expectedProductName}, Actual: ${actualProductName}`).toContain(expectedProductName);
    }

    async validateTotalProductPriceInCart(productPrice: string, productQuantity: string ) {
        const expectedProductPrice: string = productPrice.replace(/[^0-9.-]/g, ""); 
        const expectedQuantity: string = productQuantity.replace(/[^0-9.-]/g, "");
        const actualTotalProductPrice: string = ((await this.getTotalPriceTextLabel())?.replace(/[^0-9.-]/g, "")) ?? "0";
        const expectedTotalProductPrice: string = (parseFloat(expectedProductPrice) * parseFloat(expectedQuantity)).toFixed(2);
        expect(actualTotalProductPrice,
            `Total product price in cart does not match. Expected: ${expectedTotalProductPrice}, Actual: ${actualTotalProductPrice}`).toEqual(expectedTotalProductPrice);
    }
}