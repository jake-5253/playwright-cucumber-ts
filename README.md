# Playwright + TypeScript + Cucumber Automation Framework

Enterprise-ready UI automation framework built using **Playwright**, **TypeScript**, and **Cucumber**, with support for:

- ✅ Page Object Model (POM)
- ✅ Workflow Pattern
- ✅ Scenario Context
- ✅ Environment Configuration
- ✅ Parallel Execution
- ✅ BrowserStack
- ✅ Xray for Jira
- ✅ Allure Reporting
- ✅ HTML Reports
- ✅ GitHub Actions CI/CD
- ✅ Screenshots & Traces on Failure

---

# Technology Stack

| Technology | Version |
|------------|----------|
| Node.js | 22+ |
| TypeScript | Latest |
| Playwright | Latest |
| Cucumber | Latest |
| Allure | Latest |
| BrowserStack | Optional |
| Xray | Optional |

---

# Framework Architecture

```
Feature File
      │
      ▼
Step Definition
      │
      ▼
Workflow Layer
      │
      ▼
Page Objects
      │
      ▼
Components
      │
      ▼
Playwright
      │
      ▼
Reporting / Integrations
```

---

# Project Structure

```
playwright-cucumber-framework/
│
├── .github/
│   └── workflows/
│
├── src/
│   ├── api/
│   │
│   ├── config/
│   │
│   ├── fixtures/
│   │
│   ├── integrations/
│   │   ├── allure/
│   │   ├── browserstack/
│   │   └── xray/
│   │
│   ├── pages/
│   │
│   ├── components/
│   │
│   ├── workflows/
│   │
│   ├── utils/
│   │
│   ├── support/
│   │
│   └── features/
│       ├── step-definitions/
│       └── *.feature
│
├── reports/
├── screenshots/
├── test-results/
├── allure-results/
├── browserstack.yml
├── cucumber.js
├── package.json
└── README.md
```

---

# Design Pattern

The framework follows the layered architecture below.

```
Feature
    ↓
Step Definition
    ↓
Workflow
    ↓
Page Object
    ↓
Reusable Components
    ↓
Playwright
```

## Why Workflow?

Business logic belongs inside workflows instead of step definitions.

Instead of

```typescript
await loginPage.open();
await loginPage.login(user, password);
await inventoryPage.verifyLoaded();
```

Use

```typescript
await loginWorkflow.login(user, password);
```

This keeps step definitions clean and reusable.

---

# Installation

Clone repository

```bash
git clone <repository-url>
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# Environment Configuration

Example `.env`

```
BASE_URL=https://www.saucedemo.com
BROWSER=chromium
HEADLESS=false
TIMEOUT=30000
XRAY_ENABLED=true
ALLURE_ENABLED=true
BROWSERSTACK_ENABLED=false
```

---

# Running Tests

Run all tests

```bash
npm test
```

Smoke tests

```bash
npm run smoke
```

Regression

```bash
npm run regression
```

Negative tests

```bash
npm run negative
```

Parallel execution

```bash
npm run parallel
```

Retry failed scenarios

```bash
npm run retry
```

CI mode

```bash
npm run ci
```

---

# Tags

Example

```gherkin
@smoke
@login
Scenario: Valid Login
```

Supported tags

```
@smoke
@regression
@negative
@api
@ui
@browserstack
@wip
```

---

# Browser Support

Run locally

```
Chromium
Firefox
WebKit
```

Run in BrowserStack

```
Chrome
Firefox
Edge
Safari
```

Configuration is managed through

```
browserstack.yml
```

---

# Reporting

## HTML Report

```
reports/report.html
```

Generate

```bash
npm run report
```

---

## Allure

Generate

```bash
npx allure generate allure-results --clean
```

Open

```bash
npx allure open allure-report
```

---

# Screenshots

Failed scenarios automatically capture

- Screenshot
- Trace
- Console logs (optional)

Location

```
screenshots/
```

---

# Trace Viewer

Open trace

```bash
npx playwright show-trace test-results/trace.zip
```

---

# BrowserStack

Enable

```
BROWSERSTACK_ENABLED=true
```

Run

```bash
npm run browserstack
```

---

# Xray Integration

Enable

```
XRAY_ENABLED=true
```

Scenario

```gherkin
@XRAY-123
Scenario: Login
```

Framework automatically uploads

```
reports/cucumber-report.json
```

to Xray.

---

# GitHub Actions

Workflow

```
.github/workflows/playwright.yml
```

Pipeline

```
Checkout

↓

Install Dependencies

↓

Install Playwright

↓

Run Tests

↓

Generate Reports

↓

Upload Artifacts
```

---

# Framework Layers

## Features

Business readable scenarios

```
src/features
```

---

## Step Definitions

Glue code between feature and workflow

```
src/features/step-definitions
```

---

## Workflows

Business actions

Example

```
LoginWorkflow
CheckoutWorkflow
CartWorkflow
```

---

## Pages

Each page represents one application page.

Example

```
LoginPage
InventoryPage
CheckoutPage
```

---

## Components

Reusable page components

```
Header
Menu
Footer
ShoppingCart
```

---

## Scenario Context

Stores data shared between steps.

Example

```typescript
this.scenario.orderNumber
this.scenario.customer
this.scenario.username
```

---

# Configuration

```
framework.ts
```

Controls

```
Allure

Xray

BrowserStack
```

without changing code.

---

# Coding Standards

- One assertion per business outcome where practical.
- No Playwright code inside feature files.
- No business logic inside step definitions.
- Reusable selectors belong in page objects.
- Shared UI belongs in components.
- Business flows belong in workflows.
- Shared scenario data belongs in `ScenarioContext`.
- Configuration belongs in `.env`.

---

# Best Practices

✔ Use accessibility-first locators (`getByRole`, `getByLabel`) whenever possible.

✔ Avoid hardcoded waits.

✔ Prefer explicit waits.

✔ Keep feature files business-readable.

✔ Avoid duplicate page methods.

✔ Keep tests independent.

✔ Support parallel execution.

✔ Keep credentials outside source code.

✔ Prefer API setup over UI setup whenever possible.

---
