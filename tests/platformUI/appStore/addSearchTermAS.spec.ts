import { test, expect, Page } from "@playwright/test"
import LoginPage from "../../../support/platformPages/platformLogin.page.js"
import darkWebpage from "../../../support/platformPages/darkWeb.page.js"
import { utils } from "../../../support/helper/customCommands.js"
import appStorePage from "../../../support/platformPages/appStore.page.js"
import socialMediaPage from "../../../support/platformPages/socialMediaDashboard.page.js"
import commonData from "../../../testData/common.data.js"
import DarkWebPage from "../../../support/platformPages/darkwebSearchterm.js"

test.describe("Verify add search terms tab in appStore", () => {
  let login: LoginPage
  let util: utils
  let as: appStorePage
  let sm: socialMediaPage
  let dw: DarkWebPage
  let searchTerm1 = commonData.fakeData.searchTerm
  let searchTerm2 = "Roblox"
  test.beforeEach(async ({ page }) => {
    sm = new socialMediaPage(page)
    login = new LoginPage(page)
    as = new appStorePage(page)
    util = new utils(page)
    dw = new DarkWebPage(page)

    await page.goto("/")
    await util.redirectToAnyModule(
      sm.dashboardButton,
      17,
      commonData.elements.addSearchTermTitleTest,
      commonData.endpoint.appStoreSearchEndpoint
    )
    await page.waitForTimeout(10000)
  })

  test("AS_AST-1: Verify add search term functionality in appStore", async ({
    page,
  }) => {
    //Navigate to menuitems
    await dw.navigateSearchTermPage(commonData.endpoint.appStoreSearchEndpoint)
    // Add the new search term
    await as.addSearchTermInAppstore(
      searchTerm1,
      commonData.elements.successAlertMessage(searchTerm1)
    )

    //Verify adding existing search term functionality in appStore
    // Add the existing search term
    await as.addSearchTermInAppstore(
      searchTerm1,
      commonData.elements.alertFailureMessage(searchTerm1)
    )
  })

  // test("AS_AST-2: Verify adding existing search term functionality in appStore", async ({
  //   page,
  // }) => {
  //   // Add the existing search term
  //   await as.addSearchTermInAppstore(
  //     commonData.endpoint.appStoreSearchEndpoint,
  //     searchTerm1,
  //     commonData.elements.alertFailureMessage(searchTerm1)
  //   )
  // })
  test("AS_AST-2: Verify deleting search term functionality in appStore", async ({
    page,
  }) => {
    // Add the new search term
    await as.addSearchTermInAppstore(
      searchTerm2,
      commonData.elements.successAlertMessage(searchTerm2)
    )
    await as.verifyActionCol(
      searchTerm2,
      commonData.elements.deleteButton,
      commonData.elements.deletePopupTitleText,
      commonData.elements.deleteAlertMessage(searchTerm2)
    )
  })

  test("AS_AST-3: Verify deactivating search term functionality in appStore", async ({
    page,
  }) => {
    // Add the new search term
    await as.addSearchTermInAppstore(
      commonData.fakeData.searchTerm,
      commonData.elements.successAlertMessage(commonData.fakeData.searchTerm)
    )
    await as.verifyActionCol(
      commonData.fakeData.searchTerm,
      commonData.elements.deactivateButton,
      commonData.elements.deactivatePopupTitleText,
      commonData.elements.deactivateAlertMessage(commonData.fakeData.searchTerm)
    )
  })
  test("AS_AST-4: Verify with no data in search term in appStore", async ({
    page,
  }) => {
    await as.verifyEmptyDataInSearchTerm()
  })
})
