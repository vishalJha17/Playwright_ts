import { test, expect, Page } from "@playwright/test"
import LoginPage from "../../../support/platformPages/platformLogin.page"
import socialMediaPage from "../../../support/platformPages/socialMediaDashboard.page"
import { utils } from "../../../support/helper/customCommands"

test.describe("Login Test", () => {
  let sm: socialMediaPage
  let loginPage: LoginPage
  let util: utils

  test.beforeEach(async ({ page }) => {
    // loginPage = new LoginPage(page)
    sm = new socialMediaPage(page)
    util = new utils(page)

    await page.goto("/")
    // await loginPage.logIntoPlatform()
    await util.redirectToAnyModule(
      sm.dashboardButton,
      5,
      "Dashboard",
      "social-media/dashboard"
    )
  })

  test("SM-01: Social Media Dashboard is opening", async ({ page }) => {
    await util.redirectToAnyModule(
      sm.dashboardButton,
      5,
      "Dashboard",
      "social-media/dashboard"
    )
  })

  test("SM-02 : Verify the Monitored Search Terms Summary for Social Media is Present on Dashboard", async ({
    page,
  }) => {
    await sm.dashboardDetailsSummary()
  })

  test("SM-03 : Verify if Social Media Dashboard has Calendar Filter to Sort the Data Accordingly", async ({
    page,
  }) => {
    await sm.calendarDropDownPresent()
  })

  test("SM-04 : Verify Detection Overview Social Threat table is present on the Dashboard", async ({
    page,
  }) => {
    await sm.detectionOverviewTableDataPresent()
  })

  test("SM-05 : Verify the Drop Down Filter for Detection Overview Chart", async ({
    page,
  }) => {
    await sm.verifyDropDownFilterDetectionDashboard(page)
  })

  test("SM-06 : Verify the titles inside the Detection Overview Table under the Headers", async ({
    page,
  }) => {
    await sm.verifyTitlesInDetectionOverview(page)
  })

  test("SM-07 : Verify Top Search Terms Charts is present on the Dashboard", async ({
    page,
  }) => {
    await sm.verifyTopSearchTermsDetected()
  })

  test("SM-08 : Verify Detection By Category Chart is present on the Dashboard", async ({
    page,
  }) => {
    await sm.verifyDetectionByCategory()
  })

  test("SM-09 : Verify Overall Detections Charts is present on the Dashboard", async ({
    page,
  }) => {
    await sm.verifyOveralLDetections()
  })

  test("SM-10 : Verify Top Platforms with Detections is present on the Dashboard", async ({
    page,
  }) => {
    await sm.verifyTopPlatformsWithDetections()
  })

  test("SM-11 : Verify that clicking on Live Detection inside the Detection Overview Redirects to Live Detections Page", async ({
    page,
  }) => {
    await sm.verifyLiveDetectionRedirectPage(page)
  })

  test("SM-12 : Verify that clicking on Takedown in Progress inside the Detection Overview Redirects to Takedown in Progress Page", async ({
    page,
  }) => {
    await sm.verifyTakedownProgressRedirectPage(page)
  })

  test("SM-13 : Verify that clicking on Takendown inside the Detection Overview Redirects to Takendown Page", async ({
    page,
  }) => {
    await sm.verifyTakendownRedirectPage(page)
  })

  test("SM-14 : Verify the count for Live Detections on Dashboard from Live Detections Page", async ({
    page,
  }) => {
    await sm.verifyLiveDetectionsCount()
  })

  test("SM-15 : Verify the count for the page cards are also present on the respective pages for Live Detections on Dashboard", async ({
    page,
  }) => {
    await sm.verifyCardsCountSMLiveDetection()
  })

  test("SM-16 : Verify the count for the page cards are also present on the respective pages for Takedown in Progress on Dashboard", async ({
    page,
  }) => {
    await sm.verifyCardsCountSMLTakedownInProgress()
  })

  test("SM-17 : Verify the count for the page cards are also present on the respective pages for Takendown on Dashboard", async ({
    page,
  }) => {
    await sm.verifyCardsCountSMLTakendown()
  })

  test("SM-18 : Verify the count for Top Platforms on Dashboard Graph on Dashbaord", async ({
    page,
  }) => {
    await sm.verifyTpPltfrmsWthDetectnsGraph(page)
  })
})
