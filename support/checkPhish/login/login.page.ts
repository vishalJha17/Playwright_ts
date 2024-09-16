import { Page, expect } from "@playwright/test"
import fs from "fs"
export default class CheckphishLoginPage {
  private appStageURL = "https://app-stage.checkphish.ai"
  private prodURL = "https://app.checkphish.ai"
  private usernameField = 'input[type="email"]'
  private passwordField = 'input[type="password"]'
  private continueBtn = 'button:has-text("Continue")'
  private loginBtn = ".btn.submit-button"
  private loginErrorMessage = ".login-error"
  private ssoButtons = ".sso-sign-in-button-component"
  private msLoginURL = "https://login.microsoftonline.com"
  private googleLoginURL = "https://accounts.google.com"
  private dashboardButton = ".text-wrap-top-nav"
  private chooseGoogleAcount = ".YZVTmd"
  private googleContinueButton = "VfPpkd-vQzf8d >> text=Continue"
  private getBaseUrl(): string {
    // Get base URL from environment variables or other configuration
    return globalThis.globalBaseUrl || this.appStageURL // Default to prod URL if not specified
  }

  async visitURL(page: Page) {
    await page.goto(this.getBaseUrl())
    await page.click(this.loginBtn, { force: true })
  }

  async enterCredentials(page: Page, username: string, password: string) {
    await page.fill(this.usernameField, username)
    await page.click(this.continueBtn)
    await page.fill(this.passwordField, password)
    await page.click(this.loginBtn)
  }

  async checkphishLogin(page: Page, username: string, password: string) {
    const baseUrl = this.getBaseUrl()
    if (baseUrl.includes("stage")) {
      await page.goto(this.appStageURL, { timeout: 60000 })
      await this.enterCredentials(page, username, password)
      await page.waitForSelector(this.dashboardButton)
      const url = page.url()
      expect(
        url.endsWith("/domain-monitoring/dashboard") ||
          url.endsWith("/domain-monitoring/typosquat")
      ).toBe(true)
    } else {
      await page.goto(this.prodURL, { timeout: 60000 })
      await this.enterCredentials(page, username, password)
      await page.waitForSelector(this.dashboardButton)
      const url = page.url()
      expect(
        url.endsWith("/domain-monitoring/dashboard") ||
          url.endsWith("/domain-monitoring/typosquat")
      ).toBe(true)
    }
  }

  async checkphishLoginInvalidUsername(
    page: Page,
    invalidUsername: string,
    password: string
  ) {
    const baseUrl = this.getBaseUrl()

    if (baseUrl.includes("stage")) {
      await page.goto(`${this.appStageURL}/sign-in`)
      await this.enterCredentials(page, invalidUsername, password)
      const url = page.url()
      expect(url).toContain(`${this.appStageURL}/sign-in`)
    } else {
      await page.goto(`${this.prodURL}/sign-in`)
      await this.enterCredentials(page, invalidUsername, password)
      const url = page.url()
      expect(url).toContain(`${this.prodURL}/sign-in`)
    }
  }

  async checkphishLoginInvalidPassword(
    page: Page,
    username: string,
    invalidPassword: string
  ) {
    const baseUrl = this.getBaseUrl()

    if (baseUrl.includes("stage")) {
      await page.goto(this.appStageURL)
      await this.enterCredentials(page, username, invalidPassword)
      const url = page.url()
      expect(url).toContain(`${this.appStageURL}/sign-in`)
    } else {
      await page.goto(`${this.prodURL}/sign-in`)
      await this.enterCredentials(page, username, invalidPassword)
      const url = page.url()
      expect(url).toContain(`${this.prodURL}/sign-in`)
    }
  }

  async ssoLogin(
    page: Page,
    type: string,
    credentials: { email: string; password: string }
  ) {
    const baseUrl = this.getBaseUrl()

    if (baseUrl.includes("stage")) {
      await page.goto(this.appStageURL)
      await page.waitForURL(`${this.appStageURL}/sign-in`, { timeout: 25000 })

      if (type === "Office_365") {
        await page.click(`${this.ssoButtons}:nth-of-type(1)`)
        await page.waitForTimeout(1000)
        await this.msLogin(page, credentials.email, credentials.password)
        await page.goto(this.appStageURL)
        await page.click(`${this.ssoButtons}:nth-of-type(1)`)
        await page.waitForURL(
          `${this.appStageURL}/domain-monitoring/dashboard`,
          { timeout: 25000 }
        )
      } else if (type === "Google") {
        await page.click(`${this.ssoButtons}:nth-of-type(2)`)
        await page.waitForTimeout(1000)
        await this.googleLogin(page, credentials.email, credentials.password)
        await page.goto(this.appStageURL)
        await page.click(`${this.ssoButtons}:nth-of-type(2)`)
        await page
          .locator(this.chooseGoogleAcount)
          .nth(0)
          .click({ force: true })
        await page.click(this.googleContinueButton)
        await page.waitForURL(
          `${this.appStageURL}/domain-monitoring/dashboard`,
          { timeout: 25000 }
        )
      } else {
        console.log("Defined Login Type Does not exist")
      }
    } else {
      await page.goto(`${this.prodURL}/sign-in`)
      await page.waitForURL(`${this.prodURL}/sign-in`, { timeout: 25000 })

      if (type === "Office_365") {
        await page.click(`${this.ssoButtons}:nth-of-type(1)`)
        await page.waitForTimeout(1000)
        await this.msLogin(page, credentials.email, credentials.password)
        await page.goto(this.prodURL)
        await page.click(`${this.ssoButtons}:nth-of-type(1)`)
        await page.waitForURL(`${this.prodURL}/domain-monitoring/dashboard`, {
          timeout: 25000,
        })
      } else if (type === "Google") {
        await page.click(`${this.ssoButtons}:nth-of-type(2)`)
        await page.waitForTimeout(1000)
        await this.googleLogin(page, credentials.email, credentials.password)
        await page.goto(this.prodURL)
        await page.click(`${this.ssoButtons}:nth-of-type(2)`)
        await page
          .locator(this.chooseGoogleAcount)
          .nth(0)
          .click({ force: true })
        await page.click(this.googleContinueButton)
        await page.waitForURL(`${this.prodURL}/domain-monitoring/dashboard`, {
          timeout: 25000,
        })
      } else {
        console.log("Defined Login Type Does not exist")
      }
    }
  }

  async msLogin(page: Page, username: string, password: string) {
    const yesButton = "#idSIButton9"
    await page.goto(this.msLoginURL)
    await page.fill('[type="email"]', username)
    await page.click('[id="idSIButton9"]')
    await page.fill('[type="password"]', password)
    await page.click('[type="submit"]')
    await page.click(yesButton)
    // await page.waitForNavigation({ waitUntil: "networkidle" })
  }

  async googleLogin(page: Page, username: string, password: string) {
    const nextButton = ".VfPpkd-vQzf8d >> text=Next"
    await page.goto(this.googleLoginURL)
    await page.fill('[type="email"]', username)
    await page.click(nextButton)
    await page.fill('[type="password"]', password)
    await page.click(nextButton)
    //await page.waitForNavigation({ waitUntil: "networkidle" })
  }
}
