# playWright Installation

|
|**\_**npm install playwright typescript ts-node --save-dev

# Installation of different brower

|\_\_\_\_ npm init playwright@latest -- --quiet --browser=chromium --browser=firefox --browser=webkit

# Installation of All Dependency

|
|\_\_\_\_ npm install / npm i

# Folder Structure

# run using particular config file

npx playwright test tests/platformUI/platformLogin.spec.ts --project chromium --config=playwright.config.platform.ts

# run using different env version

version=platformProd npx playwright test /tests/platformUI --project chromium --config=playwright.config.platform.ts

|
|\_**\_ Playwright
|
|\_\_** Support \_**\_ POM (This folder has all the page files )
|
|\_\_** testData (This folder has all the test data file)
|
|\_**\_ tests(This Folder is set to default Directory for running Test)
|
|\_\_** playwright-report (This folder contains the test report in html format )
|
|\_**\_ Package.json (this has all the dependency)
|
|\_\_** Playwright.congig.ts (To make test setup, we need to follow up here.)

# Running Playwright Test

|
|\_\_\_\_ npx playwright test --project firefox (after project please use the browser name)
To set new Baseline snapshot : npx playwright test --update-snapshots
