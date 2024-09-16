import { Browser, chromium, Page } from "@playwright/test"
import LoginPage from "./support/platformPages/platformLogin.page"

async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: false })
  const context = await browser.newContext()
  const page: Page = await context.newPage()

  // Instantiate the login page object
  const loginPage = new LoginPage(page)

  // Perform login
  await loginPage.logIntoPlatform()
  await context.storageState({ path: "./platformAuth.json" })
  // Optionally close the browser if not needed after login
  await browser.close()
}

export default globalSetup
