import {
  Before,
  After,
  AfterAll,
  Status
} from "@cucumber/cucumber";
import * as fs from "fs";
import { LoginPage } from "../../pages/loginPage";
import { CartPage } from "../../pages/cartPage";
import { CheckoutPage } from "../../pages/checkoutPage";
import { CommonPage } from "../../pages/commonPage";
import { ProductDetailPage } from "../../pages/productDetailPage";
import { ShopifyPage } from "../../pages/shopifyPage";
import { SauceDemoLoginPage } from "../../pages/sauceDemoLoginPage";
import { SauceDemoLandingPage } from "../../pages/sauceDemoLandingPage";
import { SauceDemoCartPage } from "../../pages/sauceDemoCartPage";
import { launchBrowser } from "./browser-factory";
import { CustomWorld } from "./world";
import { XrayService } from "../../integrations/xray/xrayService";
import { SauceDemoCheckoutPage } from "../../pages/sauceDemoCheckoutPage";

const xray =
    new XrayService();

Before(async function (this: CustomWorld) {

    this.browser = await launchBrowser();
    this.context = await this.browser.newContext();
    await this.context.tracing.start({
      screenshots: true,
      snapshots: true
    });
    this.page = await this.context.newPage();
    
    this.loginPage = new LoginPage(this.page);
    this.shopifyPage = new ShopifyPage(this.page);
    this.commonPage = new CommonPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.productDetailPage = new ProductDetailPage(this.page);
    this.sauceDemoLoginPage = new SauceDemoLoginPage(this.page);
    this.sauceDemoLandingPage = new SauceDemoLandingPage(this.page);
    this.sauceDemoCartPage = new SauceDemoCartPage(this.page);
    this.sauceDemoCheckoutPage = new SauceDemoCheckoutPage(this.page);
});

After(async function (this: CustomWorld, scenario) {
  const status = scenario.result?.status;

  if (status && status !== Status.PASSED) {
    const screenshotPath = `screenshots/${Date.now()}.png`;

    try {
      const image = await this.page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      const screenshotBuffer = fs.readFileSync(screenshotPath);
      await this.attach(screenshotBuffer, "image/png");
    } catch (error) {
      console.warn("Unable to attach screenshot to report:", error);
    }
  }

  try {
    await this.browser.close();
  } catch (error) {
    console.warn("Unable to close browser cleanly:", error);
  }

  try {
    if (this.context) {
      await this.context.tracing.stop({
        path: `test-results/${Date.now()}.zip`
      });
    }
  } catch (error) {
    // Ignore tracing shutdown errors if the browser/context is already closed.
  }
});

AfterAll(async function () {
    await xray.uploadResults();
});