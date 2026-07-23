import { Given, When, Then, DataTable } from "@cucumber/cucumber";

import { CustomWorld } from "../support/world";

Given("user logs in to Sauce Demo page", async function (this: CustomWorld) {
  await this.sauceDemoLoginPage.openSauceDemo();
  await this.sauceDemoLoginPage.login(
    process.env.SAUCE_DEMO_USERNAME ?? "",
    process.env.SAUCE_DEMO_PASSWORD ?? ""
  );
});

Then("user verifies that products are listed on the landing page", async function (this: CustomWorld ) {
  await this.sauceDemoLandingPage.verifyProductsVisible();
});

Then("user verifies that the products listed are more than {string}", async function (this: CustomWorld, minCount: string) {
  await this.sauceDemoLandingPage.verifyProductsCountGreaterThan(parseInt(minCount));
}); 

When("user adds the following products to the cart", async function (this: CustomWorld, dataTable: DataTable) {
  const dataset = dataTable.hashes();
  for (const details of dataset) {
    const productName = details.productName ?? details.ProductName ?? "";
    if (!productName) continue;

    await this.sauceDemoLandingPage.addProductToCart(productName);
    const productPriceList = await this.sauceDemoLandingPage.getProductPrice(productName);
    this.runtimeProductPriceList.push(productPriceList ?? "");
  }
});

Then("user verifies that cart badge count is {string}", async function (this: CustomWorld, cartBadgeCount: string) {
  await this.sauceDemoLandingPage.verifyCartBadgeCount(cartBadgeCount);
});

When("user goes to the cart page", async function (this: CustomWorld) {
  await this.sauceDemoLandingPage.goToCart();
});

Then("user verifies that the cart contains the following products and price", async function (this: CustomWorld, dataTable: DataTable) {
  const dataset = dataTable.hashes();
  var index = 0;
  for (const details of dataset) {
    const productName = details.productName ?? "";
    
    await this.sauceDemoCartPage.verifyProductInCart(details.productName);
    await this.sauceDemoCartPage.verifyProductPriceInCart(index, this.runtimeProductPriceList, productName);
    index++;
  }
});

When("user removes {string} from the cart", async function(this: CustomWorld, productName: string) {
  await this.sauceDemoCartPage.removeProduct(productName);
});

When("user proceeds to checkout", async function(this: CustomWorld) {
  await this.sauceDemoCartPage.clickCheckoutButton();
});

When("user fills in payment information and continues", async function(this: CustomWorld, dataTable: DataTable ) {
  const dataset = dataTable.hashes();
  const details = dataset[0];

  await this.sauceDemoCheckoutPage.fillCheckoutDetails(
    details.firstName, 
    details.lastName, 
    details.postalCode
  );
  await this.sauceDemoCheckoutPage.clickContinueButton();
});

Then("the checkout page was properly displayed", async function(this: CustomWorld) {
  await this.sauceDemoCheckoutPage.verifyCheckoutPageRedirection();
});

Then("the checkout process is completed", async function(this: CustomWorld) {
  await this.sauceDemoCheckoutPage.clickFinishButton();
  await this.sauceDemoCheckoutPage.verifySuccessfulCheckout();
});
