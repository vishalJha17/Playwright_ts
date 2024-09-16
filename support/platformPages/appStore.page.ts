import { test, Page, expect } from "@playwright/test"
import { utils } from "../helper/customCommands.js"
import commonData from "../../testData/common.data.js"
import socialMediaPage from "./socialMediaDashboard.page.js"
import darkWebPage from "./darkwebSearchterm.js"
import darkWebData from "../../testData/darkWeb.data.js"
import { da, faker } from "@faker-js/faker"

export default class appStore {
  page: Page
  utils: utils
  sm: socialMediaPage
  dw: darkWebPage
  constructor(page: Page) {
    this.page = page
    this.utils = new utils(page)
    this.sm = new socialMediaPage(page)
    this.dw = new darkWebPage(page)
  }
  async addSearchTermInAppstore(searchTerm: string, alertMessage: string) {
    //Add search term
    //Enter the search term in value field
    await this.utils.type(this.sm.inputField, searchTerm)
    //Click on submit button
    await this.utils.clickWithTextPresent(
      this.sm.formButton,
      //   `[type="button"]`,
      commonData.elements.submitButton
    )
    await expect(this.sm.formButton).not.toHaveProperty(`disabled`)
    // Verify the message on adding search term
    await this.utils.verifyGlobalMessage(alertMessage)
  }

  async verifyActionCol(
    expectedSearchTerm: string,
    buttonName: string,
    popupTitle: string,
    validationMsg: string
  ) {
    // Find all rows in the table
    const rows = this.page.locator(this.sm.rowCountLocator)
    const rowCount = await rows.count()
    console.log(rowCount)
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i)

      // Locate the search term cell within the row
      const searchTermCell = row.locator(
        '[col-id="searchTerm"] div.ag-cell-wrapper span.ag-cell-value div'
      )
      const cellValue = await searchTermCell.textContent()

      if (cellValue?.trim() === expectedSearchTerm) {
        await row.locator(this.sm.actionThreeDotButton).scrollIntoViewIfNeeded()
        await row.locator(this.sm.actionThreeDotButton).isVisible()
        // Click on the action three-dot button
        await row.locator(this.sm.actionThreeDotButton).click()

        // Click on the delete button in the dropdown menu
        await this.utils.clickWithTextPresent('[role="menuitem"]', buttonName)

        // Verify the pop-up and click on delete
        await expect(this.page.locator(".modal-title.h4")).toHaveText(
          popupTitle
        )
        await this.page
          .locator(this.sm.formButton)
          .locator(`text=${buttonName}`)
          .click({ clickCount: 2, force: true, delay: 500 })

        // Verify the message on adding search term
        await this.utils.verifyGlobalMessage(validationMsg)

        break // Exit the loop once the search term is found and deleted
      }
    }
  }

  async verifyEmptyDataInSearchTerm() {
    //Navigate to menuitems

    await this.utils.clickWithTextPresent(
      this.sm.leftMenuNavigationItems,
      commonData.elements.addSearchTermsText
    )
    //Click on submit button
    await this.utils.clickWithTextPresent(
      this.sm.formButton,
      commonData.elements.submitButton
    )
    // Verify the message on adding search term
    await this.utils.verifyGlobalMessage(
      commonData.elements.emptyStringErrorMessage
    )
  }
}
