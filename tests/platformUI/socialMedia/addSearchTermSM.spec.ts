import { test, expect, Page } from "@playwright/test"
import darkWebpage from "../../../support/platformPages/darkWeb.page.js"
import { utils } from "../../../support/helper/customCommands"
import socialMediaPage from "../../../support/platformPages/socialMediaDashboard.page"
import commonData from "../../../testData/common.data.js"
import appStore from "../../../support/platformPages/appStore.page.js"

test.use({ storageState: "platformAuth.json" })

test.describe("Verify add search terms tab in SocialMedia", () => {
  let util: utils
  let sm: socialMediaPage
  let as: appStore
  let darkWebPage: darkWebpage
  const searchTerm = "Mark Zuckerberg"
  test.beforeEach(async ({ page }) => {
    darkWebPage = new darkWebpage(page)
    sm = new socialMediaPage(page)
    util = new utils(page)
    as = new appStore(page)
    await page.goto("/")
    await util.redirectToAnyModule(
      sm.dashboardButton,
      10,
      commonData.elements.addSearchTermTitleTest,
      commonData.endpoint.socialMediaSearchEndpoint
    )
  })

  test("SM_AST-1: Verify add search term functionality in social Media", async ({
    page,
  }) => {
    await page.waitForTimeout(10000)
    //Delete search term if exists
    await as.verifyActionCol(
      searchTerm,
      commonData.elements.deleteButton,
      commonData.elements.deletePopupTitleText,
      commonData.elements.deleteAlertMessage(searchTerm)
    )
    // Add the new search term
    await sm.addSearchTermInSocialMedia(
      commonData.endpoint.socialMediaSearchEndpoint,
      "Toxicity",
      searchTerm,
      0,
      commonData.elements.successAlertMessage(searchTerm)
    )

    //Verify adding existing search term with similar platform and category functionality in social Media"
    // Add the existing search term
    await sm.addSearchTermInSocialMedia(
      commonData.endpoint.socialMediaSearchEndpoint,
      "Toxicity",
      searchTerm,
      0,
      commonData.elements.socialMediaFailureMessage(searchTerm)
    )
  })
  // test("SM_AST-2: Verify adding existing search term with similar platform and category functionality in social Media", async ({
  //   page,
  // }) => {
  //   // Add the existing search term
  //   await sm.addSearchTermInSocialMedia(
  //     commonData.endpoint.socialMediaSearchEndpoint,
  //     "Toxicity",
  //     searchTerm,
  //     0,
  //     commonData.elements.socialMediaFailureMessage(searchTerm)
  //   )
  // })

  test("SM_AST-2: Verify adding existing search term with different category and platform in social Media", async ({
    page,
  }) => {
    // Add the new search term
    await sm.addSearchTermInSocialMedia(
      commonData.endpoint.socialMediaSearchEndpoint,
      "Phishing",
      searchTerm,
      3,
      commonData.elements.socialMediaFailureMessage(searchTerm)
    )
  })

  test("SM_AST-3: Verify adding search term without data in social Media", async ({
    page,
  }) => {
    // Add the new search term
    await sm.addSearchTermInSocialMedia(
      commonData.endpoint.socialMediaSearchEndpoint,
      "Phishing",
      "",
      3,
      commonData.elements.emptyStringErrorMessage
    )
  })
  test("SM_AST-4: Verify deleting search term in social Media", async ({
    page,
  }) => {
    // Add the new search term
    await sm.addSearchTermInSocialMedia(
      commonData.endpoint.socialMediaSearchEndpoint,
      "Phishing",
      commonData.fakeData.searchTerm,
      3,
      commonData.elements.successAlertMessage(commonData.fakeData.searchTerm)
    )
    await as.verifyActionCol(
      searchTerm,
      commonData.elements.deleteButton,
      commonData.elements.deletePopupTitleText,
      commonData.elements.deleteAlertMessage(commonData.fakeData.searchTerm)
    )
  })

  test("SM_AST-5: Verify deactivating search term in social Media", async ({
    page,
  }) => {
    // Add the new search term
    await sm.addSearchTermInSocialMedia(
      commonData.endpoint.socialMediaSearchEndpoint,
      "Phishing",
      commonData.fakeData.searchTerm,
      3,
      commonData.elements.successAlertMessage(commonData.fakeData.searchTerm)
    )
    await as.verifyActionCol(
      searchTerm,
      commonData.elements.deactivateButton,
      commonData.elements.deactivatePopupTitleText,
      commonData.elements.deactivateAlertMessage(commonData.fakeData.searchTerm)
    )
  })
})
