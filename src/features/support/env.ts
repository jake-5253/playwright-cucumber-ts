import dotenv from "dotenv";

dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || "",
  browser: process.env.BROWSER || "chromium",
  headless: process.env.HEADLESS === "true",
  timeout: Number(process.env.TIMEOUT) || 30000
};