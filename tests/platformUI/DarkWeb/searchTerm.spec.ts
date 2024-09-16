import { test, expect, Page } from "@playwright/test"
import darkWebpage from "../../../support/platformPages/darkwebSearchterm.ts"
import darkWebData from "../../../testData/darkWeb.data.js"
import socialMediaPage from "../../../support/platformPages/socialMediaDashboard.page"
import commonData from "../../../testData/common.data.js"
import appStore from "../../../support/platformPages/appStore.page.ts"
test.describe("Verify add search terms tab in DarkWeb", () => {
  let darkWebPage: darkWebpage
  let sm: socialMediaPage
  let as: appStore

  test.beforeEach(async ({ page }) => {
    darkWebPage = new darkWebpage(page)
    sm = new socialMediaPage(page)
    as = new appStore(page)
    await page.goto("/dark-web")
    await page.waitForTimeout(8000)
    await darkWebPage.navigateSearchTermPage(
      darkWebData.elements.addSearchTermEndpoint
    )
  })

  test("DW-1: Verify add search term functionality in darkWeb", async ({
    page,
  }) => {
    let searchTerm = commonData.fakeData.searchTerm

    await darkWebPage.addSearchTermInDarkWeb(
      "Any",
      darkWebData.elements.emailDomainOption,
      searchTerm,
      commonData.elements.successAlertMessage(searchTerm)
    )

    // await darkWebPage.checkSuccessSearchTermAddition("intel.com")

    ////Verify add search term functionality with existing search term in same category and entity in darkWeb
    // Add the existing search term
    await darkWebPage.addSearchTermInDarkWeb(
      "Any",
      darkWebData.elements.emailDomainOption,
      searchTerm,
      commonData.elements.successAlertMessage(searchTerm)
    )
  })
  test("DW-2: Verify add search term functionality with no search term in darkWeb", async ({
    page,
  }) => {
    // Add the new search term
    await darkWebPage.addSearchTermInDarkWeb(
      "Any",
      darkWebData.elements.emailDomainOption,
      "",
      commonData.elements.emptyStringErrorMessage
    )
  })

  test("DW-3: Verify add search term functionality with existing search term and different entity & category in darkWeb", async ({
    page,
  }) => {
    const searchTerm = commonData.fakeData.searchTerm
    // Add the new search term
    await darkWebPage.addSearchTermInDarkWeb(
      "Breach Data for Sale",
      "Crypto Address",
      searchTerm,
      commonData.elements.successAlertMessage(searchTerm)
    )
  })
  test("DW-4: Verify delete search term functionality in darkWeb", async ({
    page,
  }) => {
    const searchTerm = commonData.fakeData.searchTerm
    // Add the new search term
    await darkWebPage.addSearchTermInDarkWeb(
      "Breach Data for Sale",
      "Crypto Address",
      searchTerm,
      commonData.elements.successAlertMessage(searchTerm)
    )
    await as.verifyActionCol(
      searchTerm,
      commonData.elements.deleteButton,
      commonData.elements.deletePopupTitleText,
      commonData.elements.deleteAlertMessage(searchTerm)
    )
  })
  test("DW-5: Verify deactivate search term functionality in darkWeb", async ({
    page,
  }) => {
    const searchTerm = commonData.fakeData.searchTerm
    // Add the new search term
    await darkWebPage.addSearchTermInDarkWeb(
      "Breach Data for Sale",
      "Crypto Address",
      searchTerm,
      commonData.elements.successAlertMessage(searchTerm)
    )
    await as.verifyActionCol(
      searchTerm,
      commonData.elements.deactivateButton,
      commonData.elements.deactivatePopupTitleText,
      commonData.elements.deactivateAlertMessage(searchTerm)
    )
  })
})
