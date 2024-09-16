import { Page, expect } from "@playwright/test"

export default class CheckPhish {
  page: Page
  dropdown = ".bs-header-link-icon-span"
  submenu = ".bs-submenu-link-text"
  headers = ".bs-header-link-text"

  constructor(page: Page) {
    this.page = page
  }

  async checkRedirection() {
    // This function is used to fetch submenu items and verify their redirection
    const count = await this.page.locator(this.dropdown).count()
    for (let i = 0; i < count; i++) {
      await this.page.locator(this.dropdown).nth(i).click()
      const submenuCount = await this.page.locator(this.submenu).count()
      for (let j = 0; j < submenuCount; j++) {
        await this.page.locator(this.submenu).nth(j).click()
        await this.page.waitForNavigation()
        const url = await this.page.url()
        expect(url).not.toContain("dev")
        expect(url).not.toContain("stage")
      }
    }
  }

  async checkRedirectionNoSubmenu() {
    // This function is used to check all the redirections where there are no submenus
    const count = await this.page.locator(this.headers).count()
    for (let i = 2; i < count; i++) {
      await this.page.locator(this.headers).nth(i).click()
      const url = await this.page.url()
      expect(url).not.toContain("dev")
      expect(url).not.toContain("stage")

      // Navigate back to the main page to reset the state
      // await this.page.goto("https://checkphish.bolster.ai")
    }
  }
}
