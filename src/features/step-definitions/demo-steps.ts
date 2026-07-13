import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";

Given("user goes to landing page", async function (this: CustomWorld) {
  await this.loginPage.open();
});

When("user select a product {string} from home page", async function (
    this: CustomWorld,
    product: string) {
        this.runtimeProductName = product ?? undefined;
        await this.shopifyPage.selectProductLink(product);
    });

When("user adds the product to cart", async function (this: CustomWorld) {
    this.runtimeProductPrice = (await this.productDetailPage.getProductPrice()) ?? undefined;
    await this.productDetailPage.clickAddToCartButton();
});

When("user opens the My Cart widget", async function (this: CustomWorld) {
  await this.commonPage.openMyCart();
});

When("product quantity are increased to {string}", async function (
    this: CustomWorld,
    quantity: string) {
      this.runtimeProductQuantity = quantity ?? undefined;
      await this.cartPage.enterWidgetQuantity(quantity);
});

When("user proceeds to check out from cart widget", async function (this: CustomWorld) {
  await this.cartPage.clickWidgetCheckoutButton();
});

When("user proceeds to check out from cart", async function (this: CustomWorld) {
  await this.cartPage.clickCheckoutButton();
});

Then("user validates product price on the cart widget", async function (this: CustomWorld) {
    await this.cartPage.validateProductPriceInWidget(this.runtimeProductPrice ?? "");
});

Then("user validates product name on the cart widget", async function (this: CustomWorld) {
  await this.cartPage.validateProductNameInWidget(this.runtimeProductName ?? "");
});

Then("user validates total of the added products on the cart", async function (this: CustomWorld) {
  var productPrice = this.runtimeProductPrice ?? "0";
  var productQuantity = this.runtimeProductQuantity ?? "0";
  await this.cartPage.validateTotalProductPriceInCart(productPrice, productQuantity);
});

When("user fill in contact details {string}", async function (
  this: CustomWorld,
  email: string) {
  await this.checkoutPage.enterEmail(email);
});

When("user fill in payment details", async function (this: CustomWorld) {
  await this.checkoutPage.enterCardDetails(
    process.env.CARD_NUMBER ?? "",
    process.env.NAME_ON_CARD ?? "",
    process.env.EXPIRATION_DATE ?? "",
    process.env.SECURITY_CODE ?? ""
  );
});

When("user fill in delivery details", async function (this: CustomWorld, dataTable: DataTable) {
  const dataset = dataTable.hashes();
  const details = dataset[0];

  await this.checkoutPage.selectCountry(details.Country);
  await this.checkoutPage.enterLastName(details.LastName);
  await this.checkoutPage.enterAddress(details.Address);
  await this.checkoutPage.enterPostalCode(details.PostalCode);
  await this.checkoutPage.enterCity(details.City);
});

When("user proceed to payment", async function (this: CustomWorld) {
  await this.checkoutPage.clickPayNow();
});

Then("order must be completed", async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/checkout\/thank_you/);
});

When(
"I login with username {string} and password {string}",
  async function (
    this: CustomWorld,
    username: string,
    password: string
  ) {
    await this.loginPage.login(username, password);
  }
);

Then(
  "I should be redirected to the inventory page",
  async function (this: CustomWorld) {
    await expect(this.page).toHaveURL(/inventory.html/);
  }
);