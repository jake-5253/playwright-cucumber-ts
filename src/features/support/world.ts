import {
    Browser,
    BrowserContext,
    Page
} from "playwright";
import { SauceDemoLoginPage } from "../../pages/sauceDemoLoginPage";
import { SauceDemoLandingPage } from "../../pages/sauceDemoLandingPage";
import { SauceDemoCartPage } from "../../pages/sauceDemoCartPage";
import { LoginPage } from "../../pages/loginPage";
import { ShopifyPage } from "../../pages/shopifyPage";
import { CommonPage } from "../../pages/commonPage";
import { CartPage } from "../../pages/cartPage";
import { CheckoutPage } from "../../pages/checkoutPage";
import { ProductDetailPage } from "../../pages/productDetailPage";
import {
    IWorldOptions,
    World,
    setWorldConstructor
} from "@cucumber/cucumber";
import { SauceDemoCheckoutPage } from "../../pages/sauceDemoCheckoutPage";

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    loginPage!: LoginPage;
    shopifyPage!: ShopifyPage;
    commonPage!: CommonPage;
    cartPage!: CartPage;
    checkoutPage!: CheckoutPage;
    productDetailPage!: ProductDetailPage;
    sauceDemoLoginPage!: SauceDemoLoginPage;
    sauceDemoLandingPage!: SauceDemoLandingPage;
    sauceDemoCartPage!: SauceDemoCartPage;
    sauceDemoCheckoutPage!: SauceDemoCheckoutPage;
    
    // Shared data between steps
    runtimeProductName?: string;
    runtimeProductPrice?: string;
    runtimeProductQuantity?: string;
    runtimeProductPriceList: string[] = [];

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);