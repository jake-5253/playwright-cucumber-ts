module.exports = {
  default: {
    require: [
      "src/features/step-definitions/**/*.ts",
      "src/features/support/**/*.ts"
    ],
    requireModule: [
      "tsx/cjs"
    ],
    paths: [
      "src/features/**/*.feature"
    ],
    format: [
      "progress",
      "allure-cucumberjs/reporter",
      "json:reports/cucumber-report.json"
    ]
  }
};