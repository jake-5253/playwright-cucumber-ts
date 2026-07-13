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
import { launchBrowser } from "./browser-factory";
import { CustomWorld } from "./world";
import { XrayService } from "../../integrations/xray/xrayService";
import { AllureService } from "../../integrations/allure/allureService";

const xray =
    new XrayService();
const allure =
    new AllureService();

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

});

After(async function (this: CustomWorld, scenario) {
    
  if (scenario.result?.status === Status.FAILED) {
    const screenshotPath = `screenshots/${Date.now()}.png`;

    const image = await this.page.screenshot({
      path: screenshotPath,
      fullPage: true
    });

    this.attach(
      fs.readFileSync(screenshotPath),
      "image/png"
    );

    allure.attachScreenshot(
        this.attach.bind(this),
        image
    );
  }

  await this.browser.close();
  await this.context.tracing.stop({
    path: `test-results/${Date.now()}.zip`
  });
});

AfterAll(async function () {
    await xray.uploadResults();
});