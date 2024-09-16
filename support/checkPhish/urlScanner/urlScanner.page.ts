import { Page, expect } from "playwright/test"
import { faker } from "@faker-js/faker"

export default class urlScanner {
  private urlScannerButton = ".item-label.nav-link >> text=URL Scanner"
  private liveScanButton = '[data-testid="navItem"] >> text=Live Scan'
  private liveScanTextArea = '[id="bulkScan.scanUrls"]'
  private fakerUrl = faker.name.firstName() + ".com"
  private url = this.fakerUrl.toLowerCase()
  private submitButton = "#bulk-scan-submit-button"
  private spinner = ".spinner-border-sm"
  private checkUrl = ".card-value"
  page: Page
  constructor(page: Page) {
    this.page = page
  }

  async navigateLiveScanPage() {
    await this.page
      .locator(this.urlScannerButton)
      .click()
      .then(() => {
        this.page.locator(this.liveScanButton).click()
      })
  }
  async checkLiveScan() {
    await this.navigateLiveScanPage().then(async () => {
      await this.page.fill(this.liveScanTextArea, this.url)
      await this.page.click(this.submitButton)

      await this.page.click(this.submitButton)
      // this.page.waitForTimeout(100000)
      await expect(this.page.locator(this.spinner)).toBeVisible({
        timeout: 100000,
      })
      await expect(this.page.locator(this.spinner)).toBeHidden({
        timeout: 100000,
      })
      // this.page.waitForTimeout(10000)
      const text = await this.page.locator(this.checkUrl).first().innerText()
      await expect(text).toContain(this.url)
    })
  }
}
