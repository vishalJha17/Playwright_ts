import { Page, expect } from "@playwright/test"
import { utils } from "../helper/customCommands" // Adjust the path accordingly
import { el } from "@faker-js/faker"
import darkWebPage from "./darkWeb.page"
import commonData from "../../testData/common.data"

export default class socialMediaPage {
  private page: Page
  private utils: utils
  // private dw: darkWebPage

  constructor(page: Page) {
    this.page = page
    this.utils = new utils(page)
    // this.dw = new darkWebPage(page)
  }
  attack_SurfaceButton = ".first-level-nav-item.flyout-nav-item" // same in dark web dashboard
  private socialMediaUrl = "social-media/dashboard"
  dashboardButton = ".flyout-menu-item ul div"
  successRedirect = ".page-title div"
  private dashboardFieldsLocator = ".summary-widget-item-label"
  private totalDetectionsText = "Total Detections"
  private monitoredPlatformsText = "Monitored Platforms"
  private monitoredSearchterms = "Monitored Search Terms"
  private monitoredImages = "Monitored Images"
  private calendarDropDownLocator = ".date-range-dropdown"
  private calendarTextLocator = 'button[id="dropdown-date-range-picker"] span'
  private calendarCurrentYear = new Date().getUTCFullYear()
  private detectionOverviewLocator = ".title-wrapper"
  private detectionOverviewText = "Detection Overview"
  private detectionHeadersLocator = ".social-detect-label"
  private liveDetectionText = "Live Detection"
  private liveDetectionLocator = ""
  private takedownInProgressText = "Takedown in Progress"
  private takedownText = "Taken Down"
  private detectionFilterLocator = "#multi-select-toggle"
  private filterDropdownMenuLocator = ".w-100.pb-0.dropdown-menu.show"
  private dropdownFilterlistLocator = "#multi-select-toggle"
  dropdownListLocator = ".dropdown-item"
  private detectionOverviewOptionsLocator = ".card-content-label"
  private chartsHeaderLocator = ".dashboard-chart-title"
  private topSearchTermsDetectedtxt = "Top Search Terms Detected"
  private detectedByCatagoryTxt = "Detections By Category"
  private overallDetctionsTxt = "Overall Detections"
  private topPlatformWithDetectionsTxt = "Top Platforms with Detections"
  private detectionTxt = "detection"
  private takedownProgressTxt = "takedown-in-progress"
  private takendownTxt = "takendown"
  private LiveDetectDashboardTbleLocator = ".social-content-wrapper"
  rowCountLocator = ".ag-row-no-focus"
  private widgetLocator = ".card-content-value"
  private spinner = ".ag-loading"
  private totalRowCount = "[ref='lbRecordCount']"
  private cardLabelLocator = ".card-content-label"
  private categoryLocator = ".ag-floating-filter-button-button"
  private chartsLocator = "svg.apexcharts-svg"
  private bulletsCount = ".apexcharts-legend-text"
  private filterSearchField = '[placeholder="Filter..."]'
  private totalRows = '[ref="lbRecordCount"]'
  leftMenuNavigationItems = ".drawer-sub-item"
  entityDropDownToggle = ".dropdown-toggle"
  inputField = `#textInput`
  formButton = ".btn-primary"
  addSearchTermSection = ".add-search-term-section"
  actionThreeDotButton = ".MuiButtonBase-root.MuiButton-root"

  // async redirectToSocialMediaDashboard(page: Page) {
  //   await this.utils.click(this.attack_SurfaceButton)
  //   await this.utils.clickWithIndex(this.dashboardButton, 5)
  //   await this.utils.verifyTextPresent(this.successRedirect, "Dashboard")
  //   await this.utils.waitforElementDisappear(this.spinner), { timeout: 15000 }
  // }

  async dashboardDetailsSummary() {
    await this.utils.verifyTextPresentIndexing(
      this.dashboardFieldsLocator,
      this.totalDetectionsText,
      0
    )
    await this.utils.verifyTextPresentIndexing(
      this.dashboardFieldsLocator,
      this.monitoredPlatformsText,
      1
    )
    await this.utils.verifyTextPresentIndexing(
      this.dashboardFieldsLocator,
      this.monitoredSearchterms,
      2
    )
    await this.utils.verifyTextPresentIndexing(
      this.dashboardFieldsLocator,
      this.monitoredImages,
      3
    )
  }

  async calendarDropDownPresent() {
    await this.utils.verifyElementVisibility(this.calendarDropDownLocator)
    console.log(this.calendarCurrentYear)
    await this.utils.verifyPartialText(
      this.calendarTextLocator,
      this.calendarCurrentYear
    )
  }

  async detectionOverviewTableDataPresent() {
    await this.utils.checkTextPresent(
      this.detectionOverviewLocator,
      this.detectionOverviewText
    )
    await this.utils.verifyTextPresentIndexing(
      this.detectionHeadersLocator,
      this.liveDetectionText,
      0
    )
    await this.utils.verifyTextPresentIndexing(
      this.detectionHeadersLocator,
      this.takedownInProgressText,
      1
    )
    await this.utils.verifyTextPresentIndexing(
      this.detectionHeadersLocator,
      this.takedownText,
      2
    )
    await this.utils.verifyElementVisibility(this.detectionFilterLocator)
    await this.utils.click(this.detectionFilterLocator)
    await this.utils.verifyElementVisibility(this.filterDropdownMenuLocator)
  }

  async verifyDropDownFilterDetectionDashboard(page: Page) {
    const stores: string[] = [
      "YouTube",
      "Facebook",
      "LinkedIn",
      "Instagram",
      "Discord",
      "Telegram",
      "TikTok",
      "Pinterest",
      "X",
      "Reddit",
    ]
    await this.utils.click(this.dropdownFilterlistLocator)
    const dropdownItems = page.locator(this.dropdownListLocator)
    const values: string[] = await dropdownItems.evaluateAll((elements) =>
      elements.map((el) => el.textContent?.trim() || "")
    )
    for (let el in values) {
      expect(stores).toContain(values[el])
    }
  }

  async verifyTitlesInDetectionOverview(page: Page) {
    const expectedTitles: string[] = ["OTHERS", "PAUSED", "IN PROGRESS", "DOWN"]
    const overviewOptions = page.locator(this.detectionOverviewOptionsLocator)
    const values = await overviewOptions.evaluateAll((elements) =>
      elements.map((el) => el.textContent?.trim() || "")
    )
    for (let el in values) {
      expect(expectedTitles).toContain(values[el])
    }
  }

  async verifyTopSearchTermsDetected() {
    await this.utils.verifyTextPresentIndexing(
      this.chartsHeaderLocator,
      this.topSearchTermsDetectedtxt,
      3
    )
  }

  async verifyDetectionByCategory() {
    await this.utils.verifyTextPresentIndexing(
      this.chartsHeaderLocator,
      this.detectedByCatagoryTxt,
      2
    )
  }

  async verifyOveralLDetections() {
    await this.utils.verifyTextPresentIndexing(
      this.chartsHeaderLocator,
      this.overallDetctionsTxt,
      1
    )
  }

  async verifyTopPlatformsWithDetections() {
    await this.utils.verifyTextPresentIndexing(
      this.chartsHeaderLocator,
      this.topPlatformWithDetectionsTxt,
      0
    )
  }

  async verifyLiveDetectionRedirectPage(page: Page) {
    const detectionTxt = this.detectionTxt
    await this.utils.clickWithIndex(this.detectionHeadersLocator, 0)
    console.log(page.url())
    await expect(page).toHaveURL(new RegExp(`${detectionTxt}`), {
      timeout: 3000,
    })
  }

  async verifyTakedownProgressRedirectPage(page: Page) {
    const currentUrl = page.url()
    await this.utils.clickWithIndex(this.detectionHeadersLocator, 1)
    // await page.waitForURL(`**${this.takedownProgressTxt}**`, { timeout: 3000 })
    // expect(currentUrl).toContain(this.takedownProgressTxt)
    await expect(page).toHaveURL(new RegExp(`${this.takedownProgressTxt}`), {
      timeout: 3000,
    })
    expect(currentUrl).toContain(this.socialMediaUrl)
  }

  async verifyTakendownRedirectPage(page: Page) {
    const currentUrl = page.url()
    await this.utils.clickWithIndex(this.detectionHeadersLocator, 2)
    // await page.waitForURL(`**${this.takendownTxt}**`, { timeout: 3000 })
    // expect(currentUrl).toContain(this.detectionHeadersLocator)
    await expect(page).toHaveURL(new RegExp(`${this.takendownTxt}`), {
      timeout: 3000,
    })
    expect(currentUrl).toContain(this.socialMediaUrl)
  }

  async verifyLiveDetectionsCount() {
    await this.utils.verifyCountMatch(
      this.widgetLocator,
      0,
      3,
      this.detectionHeadersLocator,
      0
    )
  }

  async verifyCardsCountSMLiveDetection() {
    await this.utils.verifyCardsCount(
      0,
      2,
      this.cardLabelLocator,
      this.widgetLocator,
      this.totalRowCount,
      "Live Detection"
    )
  }

  async verifyCardsCountSMLTakedownInProgress() {
    await this.utils.verifyCardsCount(
      4,
      5,
      this.cardLabelLocator,
      this.widgetLocator,
      this.totalRowCount,
      "Takedown In Progress"
    )
  }

  async verifyCardsCountSMLTakendown() {
    await this.utils.verifyCardsCount(
      6,
      6,
      this.cardLabelLocator,
      this.widgetLocator,
      this.totalRowCount,
      "Taken Down"
    )
  }

  async verifyTpPltfmswthDetectionsChart(page: Page) {
    const index = 0
    await this.utils.verifyTextPresentIndexing(
      this.chartsHeaderLocator,
      this.topPlatformWithDetectionsTxt,
      index
    )
    const headerElement = page.locator(this.chartsHeaderLocator, {
      hasText: this.topPlatformWithDetectionsTxt,
    })
    await headerElement.scrollIntoViewIfNeeded()
    await expect(headerElement).toBeVisible()
    const parentElement = headerElement.locator("..") // '..' to get the parent element
    const chartElement = parentElement.locator(this.chartsLocator).nth(index)
    await expect(chartElement).toBeVisible()
  }

  async verifybulletCountsFromGraph(page: Page): Promise<number[]> {
    const bulletText: number[] = []
    const headerElement = page.locator(this.chartsHeaderLocator, {
      hasText: this.topPlatformWithDetectionsTxt,
    })
    const parentElement = headerElement.locator("..") // '..' to get the parent element
    const bulletElements = parentElement.locator(this.bulletsCount)
    const count = await bulletElements.count()
    for (let index = 0; index < count; index++) {
      const text = await bulletElements.nth(index).innerText()
      const regex = /(\d+)/
      const match = text.match(regex)

      if (match) {
        const numberValue = Number(match[0])
        bulletText.push(numberValue)
        console.log(`Fetched legend text at index ${index}: ${numberValue}`)
      } else {
        console.log(`No numeric value found in legend text at index ${index}`)
      }
    }

    return bulletText
  }

  async fetchBarGraphValuesAndVerify(page: Page, bulletText: number[]) {
    // Find the header element containing specific text and get its parent
    const headerElement = page.locator(this.chartsHeaderLocator, {
      hasText: this.topPlatformWithDetectionsTxt,
    })
    const parentElement = headerElement.locator("..") // '..' to get the parent element

    // Find the SVG element that contains the chart
    const svgElement = parentElement.locator(this.chartsLocator)
    const subClasses = svgElement.locator(".apexcharts-series")
    const barValuesBySeries: number[][] = []

    // Loop through each series in the chart
    const subClassesCount = await subClasses.count()
    for (let index = 0; index < subClassesCount; index++) {
      const barValues: number[] = []
      const subClass = subClasses.nth(index)

      // Find each bar area within the current series
      const barAreas = await subClass.locator(".apexcharts-bar-area")
      const barAreaCount = await barAreas.count()

      // Loop through each bar element to fetch its value
      for (let i = 0; i < barAreaCount; i++) {
        const val = await barAreas.nth(i).getAttribute("val")
        if (val) {
          const numericValue = Number(val)
          barValues.push(numericValue)
        }
      }

      // Push bar values for the current series
      barValuesBySeries.push(barValues)
    }

    // Verify bar values against bulletText
    for (
      let seriesIndex = 0;
      seriesIndex < barValuesBySeries.length;
      seriesIndex++
    ) {
      const barValues = barValuesBySeries[seriesIndex]
      const barSum = barValues.reduce((a, b) => a + b, 0)
      const legendText = bulletText[seriesIndex]

      console.log(
        `Sum of bar values for series ${seriesIndex}: ${barSum}, Expected: ${legendText}`
      )
      expect(barSum).toBe(legendText)
    }
  }

  async verifyTpPltfrmsWthDetectnsGraph(page: Page) {
    await this.verifyTpPltfmswthDetectionsChart(page)
    const bulletText = await this.verifybulletCountsFromGraph(page)
    await this.fetchBarGraphValuesAndVerify(page, bulletText)
  }

  async addSearchTermInSocialMedia(
    endpoint: string,
    entityOptionName: string,
    searchTerm: string,
    index: number,
    alertMessage: string
  ) {
    //Navigate to menuitems
    await this.utils.clickWithTextPresent(
      this.leftMenuNavigationItems,
      commonData.elements.addSearchTermsText
    )
    //Verify the landed page url
    await this.utils.verifyRedirectedURL(endpoint)
    //Verify the description text
    await this.utils.checkTextPresent(
      this.addSearchTermSection,
      "Enter search terms below to improve monitoring results."
    )
    //Add search term
    //Click on the select category drop down
    await this.utils.clickWithTextPresent(
      this.entityDropDownToggle,
      "select platform(s)"
    )
    //Select the option from the dropdown
    await this.utils.clickWithIndex(".check-box-container", index)
    //Click on the select entity drop down
    await this.utils.clickWithTextPresent(
      this.entityDropDownToggle,
      "select category"
    )
    //Select the option from the dropdown
    await this.utils.clickWithTextPresent(
      this.dropdownListLocator,
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
    await this.utils.verifyGlobalMessage(alertMessage)
  }
}
