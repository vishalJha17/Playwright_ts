import { en } from "@faker-js/faker"
import { Page, expect } from "playwright/test"
import darkWebPage from "../platformPages/darkWeb.page"

class HelperClass {
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  //Locators
  attack_SurfaceButton = ".first-level-nav-item.flyout-nav-item"
  successRedirect = ".page-title div"
  spinner = ".ag-loading"
  alertMessageButton = ".global-alert-message"

  //Methods
  async navigateToPath(path: string): Promise<this> {
    const url = `/${path}`
    await this.page.goto(url)
    return this
  }

  async click(locator: string): Promise<this> {
    await this.page.locator(locator).click()
    return this
  }

  async type(locator: string, inputText: string): Promise<this> {
    await this.page.locator(locator).fill(inputText)
    return this
  }

  async select(locator: string, inputTextToSelect: string): Promise<this> {
    await this.page.selectOption(locator, inputTextToSelect)
    return this
  }

  async hover(locator: string): Promise<this> {
    await this.page.locator(locator).hover()
    return this
  }

  async doubleClick(locator: string): Promise<this> {
    await this.page.locator(locator).dblclick()
    return this
  }

  async scrollToTop(): Promise<this> {
    await this.page.evaluate(() => window.scrollTo(0, 0))
    return this
  }

  async scrollIntoView(locator: string): Promise<this> {
    await this.page.locator(locator).scrollIntoViewIfNeeded()
    return this
  }

  async verifyTextPresent(
    locator: string,
    passRequiredText: string
  ): Promise<this> {
    const text = await this.page.locator(locator).first().innerText()
    await expect(text).toEqual(passRequiredText)
    return this
  }

  async verifyTextPresentIndexing(
    locator: string,
    passRequiredText: string,
    index: number
  ): Promise<this> {
    const text = await this.page.locator(locator).nth(index).innerText()
    expect(text).toEqual(passRequiredText)
    return this
  }

  async verifyElementVisibility(locator: string): Promise<this> {
    await expect(this.page.locator(locator)).toBeVisible()
    return this
  }

  async shouldBeDisabled(locator: string): Promise<this> {
    await expect(this.page.locator(locator)).toBeDisabled()
    return this
  }

  async waitforElementDisappear(locator: string): Promise<this> {
    await expect(this.page.locator(locator)).toBeHidden()
    return this
  }

  async typeIndex(locator: string, index: number, text: string): Promise<this> {
    await this.page.locator(locator).nth(index).fill(text)
    return this
  }

  async clickWithIndex(locator: string, index: number): Promise<this> {
    await this.page.locator(locator).nth(index).click()
    return this
  }

  async verifyElementNotVisible(locator: string): Promise<this> {
    await expect(this.page.locator(locator)).not.toBeVisible()
    return this
  }

  async verifyElementNotExists(locator: string): Promise<this> {
    await expect(this.page.locator(locator)).not.toBeVisible()
    return this
  }

  async clickWithTextPresent(locator: string, text: string): Promise<this> {
    await this.page
      .locator(locator, { hasText: text })
      .click({ timeout: 10000 })
    return this
  }

  async checkTextPresent(locator: string, text: string): Promise<this> {
    await expect(this.page.locator(locator, { hasText: text })).toBeVisible()
    return this
  }

  async checkTextNotPresent(locator: string, text: string): Promise<this> {
    await expect(this.page.locator(locator)).not.toContainText(text)
    return this
  }

  async clickWithTextAndIndex(
    locator: string,
    text: string,
    index: number
  ): Promise<this> {
    await this.page.locator(locator, { hasText: text }).nth(index).click()
    return this
  }

  async verifyFullNamePresent(locator: string): Promise<this> {
    const text = await this.page.locator(locator).innerText()
    expect(text.length).not.toEqual(0)
    return this
  }

  async verifyEmailIsPresent(locator: string): Promise<this> {
    const text = await this.page.locator(locator).innerText()
    expect(text).toContain("@")
    return this
  }

  async verifyEmailIsPresentAndReturnTrue(locator: string): Promise<boolean> {
    const text = await this.page.locator(locator).innerText()
    expect(text).toContain("@")
    return true
  }

  async getIframeDocument(iframelocator: string): Promise<this> {
    const frame = await this.page.frameLocator(iframelocator).frame()
    await expect(frame.locator("body")).toBeVisible()
    return this
  }

  async verifyPartialText(
    locator: string,
    passRequiredText: number
  ): Promise<this> {
    const text = await this.page.locator(locator).innerText()
    expect(text).toContain(passRequiredText.toString())
    return this
  }

  async verifyCountMatch(
    countLocator: string,
    start: number,
    iterateUpTo: number,
    redirectLocator: string,
    redirectIndex: number
  ): Promise<this> {
    let totalCount = 0
    const spinner = ".spinner-border"
    const rowCountLocator = '[ref="lbRecordCount"]'
    const dataSpinner = ".ag-loading"

    await this.page.waitForSelector(spinner, {
      state: "hidden",
      timeout: 15000,
    })

    for (let index = start; index <= iterateUpTo; index++) {
      const text = await this.page.locator(countLocator).nth(index).innerText()
      const number = parseInt(text)
      if (!isNaN(number)) {
        totalCount += number
        console.log("Total Count = " + totalCount)
      }
    }

    await this.page.locator(redirectLocator).nth(redirectIndex).click()
    await this.page.waitForSelector(dataSpinner, {
      state: "hidden",
      timeout: 10000,
    })
    const text = await this.page.locator(rowCountLocator).innerText()
    const cattext = parseInt(text)
    expect(totalCount).toEqual(cattext)
    return this
  }

  async find(locator: string, text: string): Promise<this> {
    await this.page.locator(locator, { hasText: text }).click()
    return this
  }

  async verifyModuleUrl(modulePath: string): Promise<this> {
    const url = await this.page.url()
    expect(url).toContain(modulePath)
    return this
  }

  async getColIndex(colName: string): Promise<number> {
    const headerCell = await this.page.locator(`[col-id="${colName}"]`)
    return await headerCell.evaluate((cell) => cell.cellIndex)
  }

  async getColumnDataByColId(colId: string): Promise<string[]> {
    const colIndex = await this.getColIndex(colId)
    const columnData: string[] = []
    const cells = await this.page.locator(`[col-id="${colId}"]`)

    for (let i = 0; i < (await cells.count()); i++) {
      const text = await cells.nth(i).innerText()
      if (text.trim() !== "") {
        columnData.push(text.trim())
      }
    }

    console.log(columnData)
    return columnData
  }

  async categoryChange(name: string, categoryName: string) {
    const clearFilter = '[ref="resetFilterButton"]'
    const dataSpinner = ".ag-loading"
    const filterOption = ".ag-filter-body-wrapper .ag-picker-field .ag-wrapper"
    const listItems = ".ag-popup-child .ag-list-item"
    await this.clickFilterButtonForColumn(name)
    await this.page.locator(clearFilter).click()
    await this.page.waitForSelector(dataSpinner, {
      state: "hidden",
      timeout: 10000,
    })
    await this.page.locator(filterOption).click()
    await this.page.locator(listItems, { hasText: categoryName }).click()
    await this.page.waitForSelector(dataSpinner, {
      state: "hidden",
      timeout: 10000,
    })
  }

  async verifyCardsCount(
    start: number,
    iterateUpTo: number,
    cardNameLocator: string,
    countLocator: string,
    rowCountLocator: string,
    sectionName: string | null = null
  ): Promise<this> {
    let totalCount = 0
    const dataSpinner = ".ag-loading"
    const spinner = ".spinner-border"

    await this.page.waitForSelector(spinner, {
      state: "hidden",
      timeout: 10000,
    })

    for (let index = start; index <= iterateUpTo; index++) {
      const categoryName = await this.page
        .locator(cardNameLocator)
        .nth(index)
        .innerText()
      console.log("Category Name is:", categoryName)

      const countText = await this.page
        .locator(countLocator)
        .nth(index)
        .innerText()
      const categoryCount = parseInt(countText)
      console.log("Category count is:", categoryCount)

      totalCount += categoryCount

      await this.page.locator(cardNameLocator).nth(index).click()
      await this.page.waitForSelector(dataSpinner, {
        state: "hidden",
        timeout: 10000,
      })

      if (sectionName) {
        if (sectionName === "Live Detection") {
          await this.page.waitForURL("**/detection")
          await this.categoryChange("Category", categoryName)
        } else if (sectionName === "Takedown in Progress") {
          await this.page.waitForURL("**/takedown-in-progress")
          await this.categoryChange("Status", categoryName)
        } else if (sectionName === "Taken Down") {
          await this.page.waitForURL("**/takendown")
        }
      }

      await this.page.waitForTimeout(3000)
      const element = this.page.locator(rowCountLocator)
      await element.scrollIntoViewIfNeeded()
      const text = await this.page.locator(rowCountLocator).innerText()
      console.log("Total count from page is:", text)
      const cattext = parseInt(text)
      expect(categoryCount).toEqual(cattext)

      await this.page.locator(".dashboard-label-wrapper").click()
    }

    return this
  }

  async clickFilterButtonForColumn(
    columnName: string,
    scrollAmount = 200,
    maxScrollAttempts = 10
  ): Promise<void> {
    const headerRow = ".ag-header-row.ag-header-row-column"
    const columnNameHeaderCell = ".ag-header-cell"
    const rowsOfData = ".ag-center-cols-viewport"
    const filterHeaderCell = "aria-colindex"

    const findAndClickFilterButton = async (attempt = 0): Promise<void> => {
      const headerCells = await this.page
        .locator(headerRow)
        .locator(columnNameHeaderCell)
      for (let i = 0; i < (await headerCells.count()); i++) {
        const cell = headerCells.nth(i)
        const text = await cell.innerText()
        if (text.includes(columnName)) {
          const colIndex = await cell.getAttribute(filterHeaderCell)
          await this.page
            .locator(
              `.ag-header-row.ag-header-row-column-filter .ag-header-cell[aria-colindex="${colIndex}"] .ag-floating-filter-button-button`
            )
            .click()
          return
        }
      }

      if (attempt < maxScrollAttempts) {
        console.log(
          `Scroll attempt ${
            attempt + 1
          }: Scrolling right to find the column "${columnName}"`
        )
        await this.page.evaluate((scrollAmount) => {
          const el = document.querySelector(".ag-center-cols-viewport")
          if (el) el.scrollBy(scrollAmount, 0)
        }, scrollAmount)

        await this.page.waitForTimeout(500)
        await findAndClickFilterButton(attempt + 1)
      } else {
        throw new Error(
          `Column with name "${columnName}" not found after ${maxScrollAttempts} attempts`
        )
      }
    }

    await findAndClickFilterButton()
  }
  async verifyRedirectedURL(endpoint: string) {
    await this.page.waitForURL(endpoint)
  }

  async redirectToAnyModule(
    itemName: string,
    index: number,
    titleName: string,
    endpoint: string
  ) {
    await this.page.click(this.attack_SurfaceButton)
    await this.clickWithIndex(itemName, index)
    await this.verifyTextPresent(this.successRedirect, titleName)
    await this.waitforElementDisappear(this.spinner), { timeout: 15000 }
    await this.verifyRedirectedURL(`**/${endpoint}`)
  }

  async verifyGlobalMessage(messageText: string) {
    // Verify the message on adding search term
    const alertMessageLocator = this.page.locator(this.alertMessageButton, {
      hasText: messageText,
    })
    // Ensure that the message is visible
    await expect(alertMessageLocator).toBeVisible({ timeout: 15000 })
  }
}

// Exporting the HelperClass with alias
export { HelperClass as utils }
