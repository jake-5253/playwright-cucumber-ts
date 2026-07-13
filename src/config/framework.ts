export const framework = {

    xray: process.env.XRAY_ENABLED === "true",

    allure: process.env.ALLURE_ENABLED === "true",

    browserStack: process.env.BROWSERSTACK_ENABLED === "true"

};