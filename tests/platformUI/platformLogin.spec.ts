import { test, expect } from "@playwright/test"
import LoginPage from "../../support/platformPages/platformLogin.page"
test.describe("Login Test", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("ZION-7795: Log in with valid credentials (smoke)", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.logIntoPlatform()
  })

  test("ZION-7796: Login with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.loginInvalidCredentials()
  })

  // test('ZION-7798: SSO Login with valid credentials', async ({ page }) => {
  //   const loginPage = new LoginPage(page);
  //   await loginPage.loginSSOValidCredentials(globalThis.data.okta);
  // });

  //   test("ZION-7797: SSO Login with invalid credentials", async ({ page }) => {
  //     const loginPage = new LoginPage(page)
  //     await loginPage.loginSSOInvalidCredentials()
  //   })
})
