import { test, Page } from "@playwright/test"
import urlScanner from "../../../support/checkPhish/urlScanner/urlScanner.page"
import CheckphishLoginPage from "../../../support/checkPhish/login/login.page"
import testData from "../../../testData/testData.json"

test.describe("URL SCANNER ", () => {
  let data: any
  const login = new CheckphishLoginPage()
  let scan: urlScanner

  test.beforeEach(async ({ page }) => {
    scan = new urlScanner(page)
    await page.goto("/")
    await page.waitForTimeout(6000)
  })

  test("navigate to live Scan  page", async () => {
    await scan.navigateLiveScanPage()
  })
  test("to verify that user is able to do the Url scan in checkphish", async () => {
    await scan.checkLiveScan()
  })
})
