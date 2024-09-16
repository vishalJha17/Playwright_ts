import { Page, expect } from "@playwright/test"
import platformStageData from "../../testData/platformData.json"

export default class LoginPage {
  private getBaseUrl(): string {
    // Get base URL from environment variables or other configuration
    return globalThis.globalBaseUrl // Default to prod URL if not specified
  }

  usernamefield = `[type="email"]`
  passwordfield = `[type="password"]`
  loginButton = `[type="submit"]`
  SSOLoginButton = ".sso-login-button"
  login_error = ".login-error"
  oktaSignInButton = "#okta-signin-submit"
  oktaURL = "https://dev-3868123.okta.com"
  tempEmail = "testplatform@bolster.ai"
  tempPassword = "Test@123321"

  page: Page

  constructor(page: Page) {
    this.page = page
  }
  async logIntoPlatform() {
    await this.page.goto(this.getBaseUrl(), { timeout: 60000 })
    await this.page
      .locator(this.usernamefield)
      .fill(process.env.email || this.tempEmail)
    await this.page
      .locator(this.passwordfield)
      .fill(process.env.password || this.tempPassword)
    await this.page.locator(this.loginButton).click()
    await this.page.waitForTimeout(10000)
    await this.page.waitForURL(/\/dashboard/)
  }

  async loginInvalidCredentials() {
    await this.page
      .locator(this.usernamefield)
      .fill(platformStageData.platform.invalid_email)
    await this.page
      .locator(this.passwordfield)
      .fill(platformStageData.platform.invalid_password)
    await this.page.locator(this.loginButton).click()
    this.page.locator(this.login_error).isVisible
  }
  async loginSSOInvalidCredentials() {
    await this.page.locator(this.SSOLoginButton).click()
    await this.page.waitForURL("/sign-in-sso")
    await this.page
      .locator(this.usernamefield)
      .fill(platformStageData.platform.invalid_email)
    await this.page.locator(this.loginButton).click()
    this.page.locator(this.login_error).isVisible
  }
  // async  loginSSOValidCredentials(credentials) {
  //   await this.page.locator(this.SSOLoginButton).click()
  //   await this.page.waitForURL("/sign-in-sso")
  //   await this.page.locator(this.usernamefield).fill(credentials.email)
  //   await this.page.locator(this.loginButton).click()
  //   this.oktaLogin(credentials.email, credentials.password)
  //   await this.page.waitForTimeout(1000)
  //   await this.page.waitForURL("/dashboard")
  // }
  // async oktaLogin(username, password) {
  //   await this.page.origin(
  //     this.oktaURL,
  //     { args: [username, password] },
  //     ([username, password]) => {
  //       const emailField = "#okta-signin-username"
  //       const passwordField = "#okta-signin-password"
  //       const signinButton = "#okta-signin-submit"
  //       await this.page.locator(emailField).fill(username, { log: false })
  //       await this.page.locator(passwordField).fill(password, { log: false })
  //       await this.page.locator(signinButton).click()
  //       await this.page.wait(1000)
  //     }
  //   )
  // }
}
