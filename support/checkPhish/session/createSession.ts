import { chromium, Browser, Page } from "playwright"
import CheckphishLoginPage from "../../../support/checkPhish/login/login.page"
import testData from "../../../testData/testData.json"

async function createGlobalSession() {
  const browser: Browser = await chromium.launch() // Launch Chromium (you can use any browser)
  const page: Page = await browser.newPage()

  // Instantiate the CheckphishLoginPage class
  const loginPage = new CheckphishLoginPage()

  // Retrieve credentials from testData.json
  const username = testData.firstTimeUser.email // Replace with the correct key in your JSON file
  const password = testData.firstTimeUser.password // Replace with the correct key in your JSON file

  // Perform login using the checkphishLogin function
  await loginPage.checkphishLogin(page, username, password)

  // Save the session state to a file
  await page.context().storageState({ path: "globalSession.json" })

  await browser.close()
}

createGlobalSession()
