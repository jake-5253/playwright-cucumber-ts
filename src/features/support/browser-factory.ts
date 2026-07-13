import { Browser, chromium, firefox, webkit } from "playwright";
import { config } from "./env";

export async function launchBrowser(): Promise<Browser> {
  switch (config.browser.toLowerCase()) {
    case "firefox":
      return firefox.launch({
        headless: config.headless
      });

    case "webkit":
      return webkit.launch({
        headless: config.headless
      });

    default:
      return chromium.launch({
        headless: config.headless,
        args: [
          '-incognito',
          '-disable-blink-features=AutomationControlled',
          '-disable-dev-shm-usage',
          '-no-sandbox',
          '-disable-setuid-sandbox',
          '-disable-web-security',
          '-disable-features=IsolateOrigins,site-per-process'
        ]
      }
    );
  }
}