import { test, expect, Page } from "@playwright/test"
import CheckphishLoginPage from "../../support/checkPhish/login/login.page"
import testData from "../../testData/testData.json"
// Define a fixture to handle test data loading
test.describe("Login: Test cases to validate user login", () => {
  let data: any
  const loginPage = new CheckphishLoginPage()

  // Determine the data file based on environment
  test.beforeEach(async ({ page }) => {
    // Load the test data before each test
    data = testData
  })

  test("TC-1: CheckPhish | Log in with valid credentials (smoke)", async ({
    page,
  }) => {
    await loginPage.checkphishLogin(
      page,
      data.firstTimeUser.email,
      data.firstTimeUser.password
    )
  })

  test("TC-2: CheckPhish | Login with invalid username", async ({ page }) => {
    await loginPage.checkphishLoginInvalidUsername(
      page,
      data.invalidUser.email,
      data.firstTimeUser.password
    )
  })

  test("TC-3: CheckPhish | Login with invalid password", async ({ page }) => {
    await loginPage.checkphishLoginInvalidPassword(
      page,
      data.firstTimeUser.email,
      data.invalidUser.password
    )
  })

  test("TC-4: Login - using Office 365 account. (smoke)", async ({ page }) => {
    await loginPage.ssoLogin(page, "Office_365", data.msCreds)
  })

  test.skip("TC-5: Login - using Google account. (smoke)", async ({ page }) => {
    await loginPage.ssoLogin(page, "Google", data.googleSso)
  })
})
