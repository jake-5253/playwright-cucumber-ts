import {
    Browser,
    BrowserContext,
    Page
} from "playwright";
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

    // Shared data between steps
    runtimeProductName?: string;
    runtimeProductPrice?: string;
    runtimeProductQuantity?: string;

    constructor(options: IWorldOptions) {
        super(options);
    }
}

setWorldConstructor(CustomWorld);