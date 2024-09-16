import { Page, expect } from "@playwright/test"
import { utils } from "../helper/customCommands.js"
import commonData from "../../testData/common.data.js"
import socialMediaPage from "./socialMediaDashboard.page.js"
import darkWebData from "../../testData/darkWeb.data.js"
// import { da, faker } from "@faker-js/faker"

export default class DarkWebPage {
  page: Page
  utils: utils
  sm: socialMediaPage

  constructor(page: Page) {
    this.page = page
    this.utils = new utils(page)
    this.sm = new socialMediaPage(page)
  }

  dropdowns = ".dropdown-component"
  dropdownItems = ".dropdown-item"
  searchTermInputBox = '[data-testid="textInput"]'
  submitButton = ".btn-primary"
  searchTermElements = '[col-id="searchTerm"]'
  alertPopup = ".global-alert-item"
  leftMenuNavigationItems = ".drawer-sub-item"
  searchTermElementsTimes = '[col-id="times"]'
  async navigateSearchTermPage(endpoint: string) {
    await this.page
      .locator(this.leftMenuNavigationItems, {
        hasText: commonData.elements.addSearchTermsText,
      })
      .click()
    //Verify the landed page url
    await this.utils.verifyRedirectedURL(endpoint)
  }

  async selectSearchTermCategory(category: string) {
    // This function can be used to select category of search term
    const parent = this.page.locator(this.dropdowns)
    await parent.nth(0).click()
    await this.page.locator(this.dropdownItems, { hasText: category }).click()
  }

  async selectSearchTermEntity(entity: string) {
    // This function can be used to select entity of search term
    const parent = this.page.locator(this.dropdowns)
    await parent.nth(1).click()
    await this.page.locator(this.dropdownItems, { hasText: entity }).click()
  }

  async inputSearchTermValue(value: string) {
    // This function can be used to add value in entity value of search term
    await this.page.locator(this.searchTermInputBox).fill(value)
  }

  async checkSuccessSearchTermAddition(expectedText: string) {
    const searchTermElements = this.page.locator(this.searchTermElements)
    const count = await searchTermElements.count()
    await this.page.waitForTimeout(10000)
    // Iterate through each element until the text is found
    for (let i = 0; i < count; i++) {
      const elementText = await searchTermElements.nth(i).textContent()
      // Check if the text matches the expected text
      if (elementText?.trim() === expectedText) {
        console.log(`Text "${expectedText}" found at index ${i}`)
        return i // Return the index where the text was found and stop further iteration
      }
    }
    // Return null if the text was not found in any element
    console.log(`Text "${expectedText}" not found`)
    return null
  }

  async addSearchTermInDarkWeb(
    category: string,
    entity: string,
    value: string,
    validationMsg: string
  ) {
    await this.selectSearchTermCategory(category)
    await this.page.waitForTimeout(2000)
    await this.selectSearchTermEntity(entity)
    await this.inputSearchTermValue(value)
    await this.page.locator(this.submitButton).click()
    // Verify the message on adding search term
    await this.utils.verifyGlobalMessage(validationMsg)
    await this.page.locator(this.alertPopup).isVisible({ timeout: 3000 })
  }
}
