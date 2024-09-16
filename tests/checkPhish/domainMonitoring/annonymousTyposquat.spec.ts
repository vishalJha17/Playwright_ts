import { test, Page } from "@playwright/test"
import Typosquat from "../../../support/checkPhish/domainMonitoring/typosquat.ts"
import CheckphishLoginPage from "../../../support/checkPhish/login/login.page"
import testData from "../../../testData/testData.json"
import { faker } from "@faker-js/faker"
test.describe("Domain Monitoring", () => {
  let data: any
  let typo: Typosquat
  test.beforeEach(async ({ page }) => {
    typo = new Typosquat(page)
    data = testData
    await page.goto("https://checkphish.bolster.ai/")
  })
  test("To verify the Annonymous Typosquat scan is working ", async ({
    page,
  }) => {
    test.setTimeout(150000)
    const progressBar = '[data-testid="spinner"]'
    const domain = faker.person.firstName() + ".com"
    const scans = await page.locator(".nav-link")
    await scans.locator(`text= Typosquat Monitoring `).click()
    await page.locator(".bs-submit-url").nth(1).fill(domain)
    await page.locator(".bs-monitoring-button").nth(1).click()
    await page.waitForTimeout(50000)
    await page.waitForSelector(progressBar, {
      state: "hidden",
      timeout: 150000,
    })
    const uielement = await page.locator(".align-items-center")
    await uielement.locator(
      "text = Sign up for a free account to scan these typosquats for suspicious activity and monitor any potential risks."
    )
  })
})
