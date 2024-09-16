import { faker } from "@faker-js/faker"
import { Page, expect } from "@playwright/test"

export default class Typosquat {
  page: Page
  domainMonitoringButton =
    '[class="item-label nav-link "] >> text=Domain Monitoring'
  typosquatButton = ".nav-link >> text=Typosquat"
  monitorNewDomainButton = ".edit-domain-wrap .mr-3"
  continueButton = ".continue-btn"
  searchField = ".search-text-field"
  generateButton = ".web-only"
  domain = faker.person.firstName() + ".com"
  progressBar = ".progress-bar-container"
  navMenuLocator = ".item-label"
  dashboardTitle = ".page-parent-label"
  exportButton = ".export-btn"
  checkbox = ".checkmark-style"
  rowChecked = ".row-wrapper"

  constructor(page: Page) {
    this.page = page
  }
  async navigateTyposquatPage() {
    await this.page.locator(this.typosquatButton).click()
    await this.page.locator(this.dashboardTitle).isVisible()
  }
  async checkExportFunctionality() {
    // Navigate to the Typosquat page
    await this.navigateTyposquatPage()

    // Check if the monitor new domain button is visible
    const buttonVisible = await this.page
      .locator(this.monitorNewDomainButton)
      .isVisible()

    if (buttonVisible) {
      // Click the monitor new domain button
      await this.page
        .locator(this.monitorNewDomainButton)
        .click({ delay: 2000 })

      // Click the export button and wait for the download event
      const [download] = await Promise.all([
        this.page.waitForEvent("download"), // Wait for download event
        this.page.locator(this.exportButton).click(), // Click the export button to start the download
      ])

      // Verify that the downloaded file has the expected name
      const suggestedFilename = download.suggestedFilename()
      expect(suggestedFilename).toContain("Bolster_Typosquat_Detections.csv")

      // Optionally, save the file and check if it exists
      const filePath = await download.path()
      const fs = require("fs")

      if (fs.existsSync(filePath)) {
        console.log(`File downloaded successfully: ${filePath}`)
      } else {
        throw new Error("Download failed: File does not exist.")
      }
    } else {
      throw new Error(
        "Monitor new domain button is not visible, cannot proceed with export functionality."
      )
    }
  }

  async checkTyposquatScan() {
    await this.navigateTyposquatPage()
    const button = this.page.locator(this.monitorNewDomainButton)
    await this.page.waitForTimeout(1000)
    if (await button.isVisible()) {
      await button.click()
      await this.page.locator(this.continueButton).click()
      await this.page.locator(this.searchField).fill(this.domain)
      await this.page.click(this.generateButton)
      await this.page.waitForSelector(this.progressBar, {
        state: "hidden",
        timeout: 2700000,
      })
      await this.page.click(this.navMenuLocator)
      const text = await this.page
        .locator(this.dashboardTitle)
        .nth(0)
        .innerText()
      expect(text).toContain(this.domain)
    } else {
      await this.page.fill(this.searchField, this.domain)
      await this.page.click(this.generateButton)
      await this.page.waitForSelector(this.progressBar, {
        state: "hidden",
        timeout: 2700000,
      })
      await this.page.click(this.navMenuLocator)
      const text = await this.page
        .locator(this.dashboardTitle)
        .nth(0)
        .innerText()
      expect(text).toContain(this.domain)
    }
  }

  async verifyBulkAction() {
    await this.navigateTyposquatPage()
    const button = await this.page.locator(this.monitorNewDomainButton)
    await this.page.waitForTimeout(1000)
    if (await button.isVisible()) {
      await button.click()
      await this.page.locator(this.checkbox).nth(0).check()
      const checkboxes = this.page.locator(this.rowChecked).count()
      console.log(checkboxes)
      for (let i = 1; i < (await checkboxes) - 1; i++) {
        const classText = await this.page
          .locator(this.rowChecked)
          .nth(i)
          .getAttribute("class")
        await expect(classText).toContain("row-is-checked")
      }
    }
  }
}
