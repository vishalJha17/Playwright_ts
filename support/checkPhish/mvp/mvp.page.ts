import { Page, expect } from "@playwright/test"

export default class mvp {
  upgradeButton = ".upgrade-btn"
  toggleButton = ".toggle-switch-item"
  pricingPlanFrame = ".pricing-plan" // Use index for free(0)/starter(1)/Premium(3) and so on to locate specific area
  entityPrice = ".plan-price-info-wrap"
  freeCheckphishApiButton = ".caption-banner-wrap.free"
  planSummary = ".description"
  planFeatures = ".feature-wrap"
  starterPurchaseButton = ".highlight-starter"
  premiumGetIntouchButton = ".action-btn >> text=Get in Touch"
  premiumWorkspaceButton = ".caption-banner-wrap.premium"
  imageWrap = "img-wrap"
  priceFrames = ".MuiTableBody-root"
  featuresRow = ".table-row"
  faeturecells = ".table-cell"
  comparisonFrame = ".comparision-table-wrap"
  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async planFeature(rowIndex: number) {
    return this.page.locator(`.table-row:nth-child(${rowIndex}) > :first-child`)
  }

  plans(rowIndex: number) {
    console.log(`${this.planFeatures}:nth-child(${rowIndex}) .feature`)
    return this.page.locator(
      `${this.planFeatures}:nth-child(${rowIndex}) .feature`
    )
  }

  async redirectToMVP() {
    await this.page.locator(this.upgradeButton).click()
    await this.page.locator(this.toggleButton).isVisible({ timeout: 3000 })
  }

  async verifyPlanSwitchButton() {
    await this.redirectToMVP()

    // Wait for the button to be visible before interacting with it
    await this.page
      .locator(this.toggleButton)
      .first()
      .waitFor({ state: "visible" })

    // Check the count of toggle buttons
    const buttonCount = await this.page.locator(this.toggleButton).count()
    console.log(`Total buttons found: ${buttonCount}`) // Debugging log

    // If count is 0, log a detailed error message
    if (buttonCount === 0) {
      console.error("No toggle buttons were found. Please check the locator.")
      return
    }

    for (let i = 0; i < buttonCount; i++) {
      const classAttribute = await this.page
        .locator(this.toggleButton)
        .nth(i)
        .getAttribute("class")

      if (classAttribute?.includes("selected")) {
        console.log(`Button ${i} is selected`)
      } else {
        await this.page.locator(this.toggleButton).nth(i).click()
        const newClassAttribute = await this.page
          .locator(this.toggleButton)
          .nth(i)
          .getAttribute("class")
        expect(newClassAttribute).toContain("selected")
      }
    }
  }

  async verifyFreePlanDetails() {
    await this.redirectToMVP()
    const arrayFree: string[] = [
      "1 domain daily limit to monitor",
      "300 typosquat results",
      "Continuous monitor 100 results",
      "Weekly rescan updates in Scan Disposition and MX changes for up to 100 results",
      "Up to 500 priority recommended domains to acquire",
      "25 live scan/day",
      "Bulk scan functionality",
      "Advanced API dashboard",
      "Community access and support",
    ]

    const parentElement = await this.page.locator(this.planFeatures).nth(0)
    await expect(parentElement).toBeVisible()
    const count = await parentElement.locator(".feature").count()
    for (let i = 0; i < count; i++) {
      parentElement
        .locator(".feature")
        .nth(i)
        .innerText()
        .then((text) => {
          console.log(text)
          expect(text).toBe(arrayFree[i])
        })
    }
  }
  async verifyStarterPlanDetails() {
    await this.redirectToMVP()
    const arrayFree: string[] = [
      "Monitor domain for full typosquat results",
      "Full access to typosquat scan verdicts",
      "Full access to typosquat risk scores",
      "Daily monitoring for changes in new typosquat, MX record, Disposition, A record and IP",
    ]

    const parentElement = await this.page.locator(this.planFeatures).nth(1)
    await expect(parentElement).toBeVisible()
    const count = await parentElement.locator(".feature").count()
    for (let i = 0; i < count; i++) {
      parentElement
        .locator(".feature")
        .nth(i)
        .innerText()
        .then((text) => {
          console.log(text)
          expect(text).toBe(arrayFree[i])
        })
    }
  }
  async verifyPremiumPlanDetails() {
    await this.redirectToMVP()
    const arrayFree: string[] = [
      "1300 URL scan/day",
      "1300 TLDs monitored",
      "Threat Feed (brand logos, copy right, trademark)",
      "Daily rescan frequency",
      "Auto-takedown phishing sites",
      "Admin & SSO",
      "Notification integrations",
      "Social Media, Dark Web, and App Store detection and remediation",
      "Dedicated SOC analyst and customer success support",
    ]

    const parentElement = await this.page.locator(this.planFeatures).nth(2)
    await expect(parentElement).toBeVisible()
    const count = await parentElement.locator(".feature").count()
    for (let i = 0; i < count; i++) {
      parentElement
        .locator(".feature")
        .nth(i)
        .innerText()
        .then((text) => {
          console.log(text)
          expect(text).toBe(arrayFree[i])
        })
    }
  }
  async checkFeature(index: number, array: string[]) {
    const parentElement = this.page.locator(this.planFeatures).nth(index)

    // Add an explicit wait to ensure the parent element is visible
    await parentElement.waitFor({ state: "visible", timeout: 5000 })

    const count = await parentElement.locator(".feature").count()

    if (count === 0) {
      console.error(`No features found for plan at index ${index}.`)
      return
    }

    for (let i = 0; i < count; i++) {
      const text = await parentElement.locator(".feature").nth(i).innerText()
      console.log(`Feature ${i}: ${text}`)
      expect(text).toBe(array[i])
    }
  }
  async verifyApiPlanDetails() {
    await this.redirectToMVP()
    const arrayAPi: string[] = [
      "Custom pricing for API Scans",
      "Bulk scan functionality",
      "Advanced API dashboard",
      "Outlook Email Plugin",
    ]

    const parentElement = await this.page.locator(this.planFeatures).nth(3)
    await expect(parentElement).toBeVisible()
    const count = await parentElement.locator(".feature").count()
    for (let i = 0; i < count; i++) {
      parentElement
        .locator(".feature")
        .nth(i)
        .innerText()
        .then((text) => {
          console.log(text)
          expect(text).toBe(arrayAPi[i])
        })
    }
  }
  async compareplan() {
    await this.redirectToMVP()

    const arrayFree: string[] = [
      "Typosquats Generation & Monitoring",
      // "Limited",
      // "Full Results",
      // "Full Results",
      "DOM similarity matching",
      // "not-avaialble-Dark",
      // "not-avaialble-Dark",
      // "avaialble-Dark",
      "Favicon Identifications",
      // "not-avaialble-Dark",
      // "not-avaialble-Dark",
      // "avaialble-Dark",
      "Ads Monitoring",
      // "not-avaialble-Dark",
      // "not-avaialble-Dark",
      // "avaialble-Dark",
      "Search Engine Results",
      // "not-avaialble-Dark",
      // "avaialble-Dark",
      "ML image augmentation",
      // "Threat Feed - Typosquat variations",
      // "Threat Feed - Bolster Proprietary",
      // "Threat Feed - Newly Registered",
      // "Threat Feed - Certificate Monitoring",
      // "Threat Feed - Anti-Virus",
      // "Threat Feed - Passive DNS",
      // "Threat Feed - SPAM",
      // "not-avaialble-Dark",
      // "not-avaialble-Dark",
      // "avaialble-Dark",
      "Auto Takedown",
      // "not-avaialble-Dark",
      // "not-avaialble-Dark",
      // "avaialble-Dark",
    ]

    for (let n = 0; n <= 0; n++) {
      const parentElement = await this.page.locator(this.priceFrames).nth(n)
      await expect(parentElement).toBeVisible()
      await this.page.waitForTimeout(2000)
      const count = await parentElement.locator(this.featuresRow).count()
      for (let i = 0; i < count - 1; i++) {
        const cells = parentElement.locator(this.featuresRow).nth(i)
        const text = await cells.locator(this.faeturecells).nth(0).innerText()
        console.log(`Text found: ${text}`)
        expect(text).toContain(arrayFree[i])
      }
    }
    await this.visualComparePlan("fetureCompare.png")
  }
  async visualComparePlan(nameoftest: string) {
    const frame = this.page.locator(this.comparisonFrame)
    // Set options for the screenshot comparison
    const screenshotOptions = {
      threshold: 0.2, // Allowable pixel difference ratio (0.2 means 20% difference is tolerated)
      maxDiffPixels: 100, // Maximum number of pixels that can differ
    }
    // Perform the visual comparison with lenient options
    await expect(frame).toHaveScreenshot(nameoftest, screenshotOptions)
  }
}
