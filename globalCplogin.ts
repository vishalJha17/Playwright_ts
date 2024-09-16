import { Browser, chromium, Page } from "@playwright/test"
import CheckphishLoginPage from "./support/checkPhish/login/login.page"
import dataLogin from "./testData/testData.json" // Adjust the path accordingly

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page: Page = await context.newPage()

  // Instantiate the login page object
  const loginPage = new CheckphishLoginPage()

  // Perform login
  await loginPage.checkphishLogin(
    page,
    dataLogin.firstTimeUser.email,
    dataLogin.firstTimeUser.password
  )
  await context.storageState({ path: "./LoginAuth.json" })
  // Optionally close the browser if not needed after login
  await browser.close()
}

export default globalSetup
