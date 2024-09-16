import { test, Page } from "@playwright/test"
import Typosquat from "../../../support/checkPhish/domainMonitoring/typosquat.ts"
import CheckphishLoginPage from "../../../support/checkPhish/login/login.page"
import testData from "../../../testData/testData.json"

test.describe("Domain Monitoring", () => {
  let data: any
  const login = new CheckphishLoginPage()
  let typo: Typosquat

  test.beforeEach(async ({ page }) => {
    typo = new Typosquat(page)
    data = testData
    await page.goto("/")
  })

  test("navigate to typosquat page", async ({ page }) => {
    await typo.navigateTyposquatPage()
  })

  test("verify export functionality on typosquat page", async ({ page }) => {
    await typo.checkExportFunctionality()
  })

  test("verify typosquat scan and ensure results are showing up for existing user", async ({
    page,
  }) => {
    test.setTimeout(900000)
    await typo.checkTyposquatScan()
  })

  test("verify after complete typoscan user is able to bulk select the results", async ({
    page,
  }) => {
    await typo.verifyBulkAction()
  })
})
