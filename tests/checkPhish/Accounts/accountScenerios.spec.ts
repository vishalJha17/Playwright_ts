import { test, expect, Page } from "@playwright/test"
import CheckphishLoginPage from "../../../support/checkPhish/login/login.page"
import Accounts from "../../../support/checkPhish/accounts/accounts.page"
import { utils } from "../../../support/helper/customCommands"
import testData from "../../../testData/checkphishAssertions.json"
import LoginTesData from "../../../testData/testData.json"
test.describe(" Test cases to validate user Profile info", () => {
  let data: any
  let loginPage: CheckphishLoginPage
  let accounts: Accounts
  let helpers: utils
  let page: Page
  let dataLogin: any
  test.beforeAll(async ({ browser }) => {
    data = testData
    dataLogin = LoginTesData
    loginPage = new CheckphishLoginPage()
    // You need to start a new browser context and page for your tests
    const context = await browser.newContext()
    page = await context.newPage()
    accounts = new Accounts(page)
    helpers = new utils(page)
  })

  test.beforeEach(async () => {
    // await loginPage.checkphishLogin(
    //   page,
    //   dataLogin.firstTimeUser.email,
    //   dataLogin.firstTimeUser.password
    // )
    await page.goto("/")
  })

  test("CP_A-01 : Verify DropDown Button for Account Details is present", async () => {
    await accounts.checkAccountsDropDownFunctionality()
    // await page.screenshot({ path: 'DropDown_Button.png' }); // If you use snapshot testing
  })

  test("CP_A-02 : Verify the Drop Down Menu for Accounts Section", async () => {
    await accounts.checkingDropDownMenuforAccounts(
      data.account_header_text,
      data.profile_info_text,
      data.notification_settings_text,
      data.security_privacy_text,
      data.logout_text
    )
  })

  test("CP_A-03 : Verify Title Details Account Profile Information should be visible", async () => {
    await accounts.accountNameDetails(data.profile_info_text)
  })

  test("CP_A-04 : Verify Email Section in Profile information Page should be Visible", async () => {
    await accounts.emailDetailsPresent(
      data.profile_info_text,
      data.primary_email_text,
      data.primary_tag_text,
      data.work_email_text
    )
  })

  test("CP_A-05 : Verify Primary Email Details in Profile information Page should be Visible", async () => {
    await accounts.primaryEmailDetailsPresent(
      data.profile_info_text,
      data.primary_email_text,
      data.primary_tag_text
    )
  })

  test("CP_A-06 : Verify Work Email Details in Profile information Page should be Visible", async () => {
    await accounts.workEmailDetailsPresent(
      data.profile_info_text,
      data.work_email_text,
      data.work_email_added_verified_text
    )
  })
  test("CP_A-07 : Verify Subscription Details should be Visible", async () => {
    await accounts.subscriptionDetailsArePresent(
      data.profile_info_text,
      data.subscription_text,
      data.subscription_plan_text,
      data.subscription_essential_api_text,
      data.scan_limit_text
    )
  })

  test("CP_A-08 : Verify Upgrade Button Present for Subscription is Visible", async () => {
    await accounts.subscriptionUpgradeButtonPresent(
      data.profile_info_text,
      data.upgrade_text
    )
  })
  test("CP_A-09 : Verify API key Present for User is Visible", async () => {
    await accounts.apiKeyPresent(data.profile_info_text)
    // await page.screenshot({ path: 'Account_API_Key.png' }); // If you use snapshot testing
  })

  test("CP_A-10 : Verify API Documentation Present for User is Visible", async () => {
    await accounts.apiDocumentationPresent(data.profile_info_text)
    // await page.screenshot({ path: 'API_Document.png' }); // If you use snapshot testing
  })

  test("CP_A-11 : Verify Theme Preferences Present for User is Visible", async () => {
    await accounts.themePreferencesPresent(data.profile_info_text)
  })
  test("CP_A-15 : Verify Light Mode Button is working", async () => {
    await accounts.navigatingToProfileInfoPage(data.profile_info_text)
    await accounts.verifyLightMode()
  })

  test("CP_A-16 : Verify Dark Mode Button is working", async () => {
    await accounts.navigatingToProfileInfoPage(data.profile_info_text)
    await accounts.verifyDarkMode()
  })

  test.afterAll(async () => {
    // Clean up and close the browser context
    await page.context().close()
  })
})
