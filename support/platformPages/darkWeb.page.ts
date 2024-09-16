import { Page, expect } from "@playwright/test"
import { utils } from "../helper/customCommands.js"
import commonData from "../../testData/common.data.js"
import socialMediaPage from "./socialMediaDashboard.page.js"
import darkWebData from "../../testData/darkWeb.data.js"
import { da, faker } from "@faker-js/faker"

export default class darkWebPage {
  page: Page
  utils: utils
  sm: socialMediaPage
  constructor(page: Page) {
    this.page = page
    this.utils = new utils(page)
    this.sm = new socialMediaPage(page)
  }

  //locator
  attack_SurfaceButton = ".first-level-nav-item.flyout-nav-item"
  dropDownNavigatorClass = ".dashboard-label-wrapper"
  successRedirect = ".page-title div"
  entityTitle = ".entity-title"
  entityDropDownButton = ".entity-dropdown-btn"
  entityDropDown = ".dropdown-menu"
  dashboardButton = ".flyout-menu-item ul div"
  expandButton = ".expand-collapse-icon"
  seeFindingsButton = ".see-findings-wrap"
  activeFindingsEntity = ".widget-details-item"
  entityHeading = ".matrix-dataset-wrap .heading"
  entityFindingsLabel = ".matrix-data-set .label"
  entityFindingsValue = ".matrix-data-set .value"
  spinner = ".spinner-border"
  searchTermCounterDashboard = ".subtext"
  searchTermCounterAddSearchTerm =
    '[col-id="times"].ag-cell-value div:first-child'
  leftMenuNavigationItems = ".drawer-sub-item"
  agIconClosed = ".ag-icon-tree-closed" // expand record button
  ibutton = ".stroke"
  labelsWithIButton = ".data-set-wrap .data-set"
  dataLeakContainer = ".data-leak-container"
  leakSource = ".data-leak-value"
  ibuttonClick = ".data-set-wrap .data-set .stroke"
  widgetCardInFindings = ".widget-details-item"
  // dashboardMenu = ".dashboard-label-wrapper"
  totalDatasetValue = '[data-testid="total-data-set-value"]'
  refreshButton = ".tools-button-wrapper"
  entityDropDownToggle = ".dropdown-toggle"
  actionThreeDotButton = ".MuiButtonBase-root.MuiButton-root"
  formButton = ".btn-primary"

  inputField = `#textInput`
  entitySubHeading = ".donut-wrapper .heading"
  detailsHeading = ".details .heading"
  columnInputFilter = ".ag-input-field-input.ag-text-field-input"
  domainNameValue = ".ag-group-value"

  //methods
  async checkAndReloadUntilNotInProgress(expectedSearchTerm: string) {
    // Find all rows in the table
    const rows = this.page.locator(this.sm.rowCountLocator)
    console.log(rows)
    // Iterate through each row
    for (let i = 0; i < (await rows.count()); i++) {
      const row = rows.nth(i)

      // Check if the row contains the expected search term
      const searchTermCell = row.locator('[col-id="searchTerm"]')
      const cellValue = await searchTermCell.textContent()

      if (cellValue?.trim() === expectedSearchTerm) {
        const statusCell = row.locator('[col-id="historyCreatedTs"]')
        const searchStatus = await statusCell.textContent()
        console.log(searchStatus)

        if (searchStatus?.includes("In Progress")) {
          // Wait for 60 seconds
          await this.page.waitForTimeout(60000)

          // Click the refresh button and wait for 5 seconds
          await this.page.click(this.refreshButton)
          await this.page.waitForTimeout(5000)

          // Click the refresh button again
          await this.page.click(this.refreshButton)
        } else {
          return
        }
      }
    }
  }
  async getDomainCountInDashboard(index: number): Promise<number> {
    // Locate the element containing the search term count
    const element = await this.page
      .locator(this.searchTermCounterDashboard)
      .nth(index)
    console.log(element)
    // Get the text content of the element
    const text = await element.textContent()

    if (text) {
      // Extract all numbers (including decimals) from the text
      const count = text.match(/\d+(\.\d+)?/g) || []

      // Sum up all the extracted numbers
      const sum = count.reduce((acc, val) => acc + parseFloat(val), 0)

      return sum
    }

    // If text is empty or null, return 0 as the default
    return 0
  }

  async verifyDropDown(index: number): Promise<void> {
    // Click the dropdown button at the specified index
    await this.page.locator(this.entityDropDownButton).nth(index).click()

    // Verify that the dropdown element is visible
    await expect(this.page.locator(this.entityDropDown)).toBeVisible()
  }

  async verifyAddSearchTermInDashboard(
    searchedTerm: string,
    prevCount: number,
    index: number
  ) {
    // Wait for a short delay
    await this.page.waitForTimeout(1000)

    // Navigate to the dashboard
    await this.utils.clickWithTextPresent(
      this.dropDownNavigatorClass,
      "Dashboard"
    )

    // Verify that the correct module URL is loaded
    await this.utils.verifyRedirectedURL(
      darkWebData.elements.addSearchTermEndpoint
    )

    // Scroll the entity title into view based on the index
    const entityTitleElement = this.page.locator(this.entityTitle).nth(index)
    await entityTitleElement.scrollIntoViewIfNeeded()

    // Get the new count from the dashboard after adding the search term
    const newCount = await this.getDomainCountInDashboard(index)

    // Verify that the new count is not equal to the previous count
    if (newCount === prevCount) {
      // Verify the dropdown and check for the presence of the searched term
      await this.verifyDropDown(index)

      // Check that the searched term is present in the dropdown list
      await this.utils.checkTextPresent(
        this.sm.dropdownListLocator,
        searchedTerm
      )
    }
  }

  async verifyDeleteSearchTermInDashboard(
    searchedTerm: string,
    prevCount: number,
    index: number
  ) {
    // Wait for 1 second
    await this.page.waitForTimeout(1000)

    // Navigate to the dashboard
    // Navigate to the dashboard
    await this.utils.clickWithTextPresent(
      this.dropDownNavigatorClass,
      "Dashboard"
    )
    // Verify that the correct module URL is loaded
    await this.utils.verifyRedirectedURL(
      darkWebData.elements.addSearchTermEndpoint
    )
    // Scroll the specified entity title into view
    await this.page
      .locator(this.entityTitle)
      .nth(index)
      .scrollIntoViewIfNeeded()

    // Verify the count in the dashboard after deleting the search term
    const newCount = await this.getDomainCountInDashboard(index)

    // Assert that the new count is not equal to the previous count
    if (newCount !== prevCount) {
      // Verify the dropdown and the absence of the searched term
      await expect(newCount).toBe(prevCount - 1)
      await this.verifyDropDown(index)
      await this.page.waitForSelector(this.sm.dropdownListLocator)
      await expect(
        this.page.locator(this.sm.dropdownListLocator)
      ).not.toContainText(searchedTerm)
    }
  }

  async verifyTableRowData(
    expectedSearchTerm: string,
    prevCount: number,
    index: number
  ) {
    // Wait until the search term is not "In Progress"
    await this.checkAndReloadUntilNotInProgress(expectedSearchTerm)

    // Locate all rows in the table
    const rows = this.page.locator(this.sm.rowCountLocator)

    // Iterate through each row
    for (let i = 0; i < (await rows.count()); i++) {
      const row = rows.nth(i)

      // Get the search term from the current row
      const searchTermCell = row.locator('[col-id="searchTerm"]')
      const cellValue = await searchTermCell.textContent()
      console.log(cellValue)

      if (cellValue?.trim() === expectedSearchTerm) {
        // Get the "times" value from the current row
        const timesCell = row.locator('[col-id="times"]')
        const timesValue = await timesCell.textContent()
        const times = parseInt(timesValue?.trim() || "0", 10)

        if (times > 0) {
          // Assert that times is greater than 0
          expect(times).toBeGreaterThan(0)

          // Verify the search term in the dashboard
          await this.verifyAddSearchTermInDashboard(
            expectedSearchTerm,
            prevCount,
            index
          )
        } else {
          console.log("No data found")
          // // Handle the case where times is not greater than 0
          // await this.verifyDeleteSearchTermInDashboard(
          //   expectedSearchTerm,
          //   prevCount,
          //   index
          // )
        }
      }
    }
  }

  async addSearchTermInDarkWeb(
    endpoint: string,
    categoryOptionName: string,
    entityOptionName: string,
    searchTerm: string,
    validationMsg: string
  ) {
    //Navigate to menuitems
    await this.utils.clickWithTextPresent(
      this.leftMenuNavigationItems,
      commonData.elements.addSearchTermsText
    )
    //Verify the landed page url
    await this.utils.verifyRedirectedURL(endpoint)
    //Add search term
    //Click on the select category drop down
    await this.utils.clickWithTextPresent(
      this.entityDropDownToggle,
      "select category"
    )
    //Select the option from the dropdown
    await this.utils.clickWithTextPresent(
      this.sm.dropdownListLocator,
      categoryOptionName
    )
    //Click on the select entity drop down
    await this.utils.clickWithTextPresent(
      this.entityDropDownToggle,
      "select entity"
    )
    //Select the option from the dropdown
    await this.utils.clickWithTextPresent(
      this.sm.dropdownListLocator,
      entityOptionName
    )
    //Enter the search term in value field
    await this.utils.type(this.inputField, searchTerm)
    //Click on submit button
    await this.utils.clickWithTextPresent(
      this.formButton,
      commonData.elements.submitButton
    )
    // Wait for 5 seconds (if necessary, consider using a better approach like waiting for a specific element or condition)
    await this.page.waitForTimeout(5000)

    // Verify the message on adding search term
    await this.utils.verifyGlobalMessage(validationMsg)
  }
}
