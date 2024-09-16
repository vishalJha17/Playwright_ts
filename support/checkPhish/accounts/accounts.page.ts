import { Page, expect } from "@playwright/test"
import { utils } from "../../helper/customCommands" // Adjust the path accordingly
import testData from "../../../testData/checkphishAssertions.json"
export default class Accounts {
  private utils: utils
  page: Page

  constructor(page: Page) {
    this.page = page
    this.utils = new utils(page)
  }

  private account_dropdown_button = ".chevron-down-wrapper"
  private account_header = ".account-header"
  private profile_info_link = ".account-drawer > :nth-child(1) > :nth-child(2)"
  private notification_settings_link =
    ".account-drawer > :nth-child(1) > :nth-child(3)"
  private security_privacy_link = ".account-sub-item"
  private logout_link = ".account-drawer > :nth-child(2) > .d-flex"
  private profile_picture_logo = ".user-big-avatar"
  private profile_name_locator = ".user-full-name"
  private primary_email_locator = ".primary-email-header"
  private primary_email_text_locator = ".no-padding.col-md-9"
  private primary_tag_locator = ".primary-tag"
  private subscription_locator = ".section-title"
  private subscription_plan_locator =
    "div[class='section-container'] p[class='card-label direction-column card-text']"
  private subscription_essential_api_locator =
    "div[class='d-flex'] div div:nth-child(1)"
  private scan_limit_locator = "div[class='d-flex'] div div:nth-child(2)"
  private upgrade_button_locator = '.section-container [type="button"]'
  private priceCatalog = ".pack-wrap"
  private work_email_locator = ".work-email-header.col-md-3"
  private work_email_no_data_field_locator =
    'input[placeholder="name@company.com"]'
  private work_email_add_button_locator =
    '.input-group-append [class="btn btn btn-primary"]'
  private work_email_added_locator = ".col-md-12 > .no-padding"
  private work_email_added_verified_locator = ".content"
  private upgrade_iframe =
    'iframe[name="__privateStripeMetricsController8060"] '
  private starter_pack_upgrade = ".starter-wrap.pack-wrap"
  private api_key_locator = ".card-label"
  private api_key_value = ".card-value"
  private api_key_copy_button = ".copy-button-wrapper"
  private api_documentation_locator = ":nth-child(2) > .card-label "
  private api_docs_link_locator = '[rel="noopener noreferrer"]'
  private theme_preference_locator =
    ":nth-child(5) > .col > .label-and-value-component > .card-label"
  private theme_button_grp = 'div[role="group"]'
  private light_button_locator = 'input[value="Light"]'
  private auto_button_locator = 'input[value="Auto"]'
  private dark_button_locator = 'input[value="Dark"]'
  private selected_button_locator =
    'class="btn-toggle-primary btn active btn-primary"]'
  private apiDocsButton = ".d-flex a"
  private lightModeButton = "#theme-btn-0"
  private darkModeButton = "#theme-btn-2"

  async checkAccountsDropDownFunctionality() {
    await expect(this.page.locator(this.account_dropdown_button)).toBeVisible()
  }

  async navigatingToProfileInfoPage(profile_info_text: string) {
    await this.page.locator(this.account_dropdown_button).hover()
    await this.page
      .locator(this.profile_info_link, { hasText: profile_info_text })
      .click()
  }

  async checkingDropDownMenuforAccounts(
    account_header_text: string,
    profile_info_text: string,
    notification_settings_text: string,
    security_privacy_text: string,
    logout_text: string
  ) {
    await this.utils.hover(this.account_dropdown_button)
    await this.utils.verifyTextPresent(this.account_header, account_header_text)
    await this.utils.verifyTextPresent(
      this.profile_info_link,
      profile_info_text
    )
    await this.utils.verifyTextPresent(
      this.notification_settings_link,
      notification_settings_text
    )
    await this.utils.verifyTextPresentIndexing(
      this.security_privacy_link,
      security_privacy_text,
      2
    )
    await this.utils.verifyTextPresent(this.logout_link, logout_text)
  }

  async accountProfileImageAndName() {
    await this.utils.verifyElementVisibility(this.profile_picture_logo)
    await this.utils.verifyElementVisibility(this.profile_name_locator)
    const text = await this.page
      .locator(this.profile_name_locator)
      .allInnerTexts()
    expect(text[0].trim()).toMatch(/^\w+\s\w+$/)
  }

  async accountProfileEmailDetails(
    primary_email_text: string,
    primary_tag_text: string,
    work_email_text: string
  ) {
    await this.utils.verifyTextPresent(
      this.primary_email_locator,
      primary_email_text
    )
    await this.utils.verifyTextPresent(
      this.primary_tag_locator,
      primary_tag_text
    )
    await this.utils.verifyTextPresent(this.work_email_locator, work_email_text)
  }

  async profileSubscriptionInformation(
    subscription_text: string,
    subscription_plan_text: string,
    subscription_essential_api_text: string,
    scan_limit_text: string
  ) {
    const subs_text = await this.page
      .locator(this.subscription_locator)
      .innerText()
    expect(subs_text).toContain(subscription_text)
    const plan_text = await this.page
      .locator(this.subscription_plan_locator)
      .innerText()
    expect(plan_text).toContain(subscription_plan_text)
    const essential_api_text = await this.page
      .locator(this.subscription_essential_api_locator)
      .innerText()
    expect(essential_api_text).toContain(subscription_essential_api_text)
    const scan_limit = await this.page
      .locator(this.scan_limit_locator)
      .innerText()
    expect(scan_limit).toContain(scan_limit_text)
  }

  async accountNameDetails(profile_info_text: string) {
    await this.navigatingToProfileInfoPage(profile_info_text)
    await this.accountProfileImageAndName()
  }

  async emailDetailsPresent(
    profile_info_text: string,
    primary_email_text: string,
    primary_tag_text: string,
    work_email_text: string
  ) {
    await this.navigatingToProfileInfoPage(profile_info_text)
    await this.accountProfileEmailDetails(
      primary_email_text,
      primary_tag_text,
      work_email_text
    )
  }

  async primaryEmailDetailsPresent(
    profile_info_text: string,
    primary_email_text: string,
    primary_tag_text: string
  ) {
    await this.navigatingToProfileInfoPage(profile_info_text)
    await this.utils.verifyTextPresent(
      this.primary_email_locator,
      primary_email_text
    )
    await this.utils.verifyTextPresent(
      this.primary_tag_locator,
      primary_tag_text
    )
  }

  async workEmailDetailsPresent(
    profile_info_text: string,
    work_email_text: string,
    work_email_added_verified_text: string
  ) {
    await this.navigatingToProfileInfoPage(profile_info_text)
    await this.utils.verifyTextPresent(this.work_email_locator, work_email_text)
    const emailExists = await this.utils.verifyElementVisibility(
      this.work_email_added_locator
    )
    if (emailExists) {
      await expect(
        this.page.locator(this.work_email_added_verified_locator, {
          hasText: "Verified",
        })
      ).toBeVisible()
    } else {
      await this.utils.verifyElementVisibility(
        this.work_email_no_data_field_locator
      )
      await this.utils.verifyElementVisibility(
        this.work_email_add_button_locator
      )
    }
  }

  async subscriptionDetailsArePresent(
    profile_info_text: string,
    subscription_text: string,
    subscription_plan_text: string,
    subscription_essential_api_text: string,
    scan_limit_text: string
  ) {
    await this.navigatingToProfileInfoPage(profile_info_text)
    await this.profileSubscriptionInformation(
      subscription_text,
      subscription_plan_text,
      subscription_essential_api_text,
      scan_limit_text
    )
  }

  async subscriptionUpgradeButtonPresent(
    profile_info_text: string,
    upgrade_text: string
  ) {
    await this.navigatingToProfileInfoPage(profile_info_text)
    const upgradetext = await this.page
      .locator(this.upgrade_button_locator)
      .innerText()
    expect(upgradetext).toBe(upgrade_text)

    // Uncomment and adapt if needed
    // await this.utils.click(this.upgrade_button_locator);
    // await this.utils.getIframeDocument(this.upgrade_iframe, this.starter_pack_upgrade);
  }

  async apiKeyPresent(profile_info_text: string) {
    await this.navigatingToProfileInfoPage(profile_info_text)
    await expect(
      this.page.locator(this.api_key_locator, {
        hasText: testData.api_key_text,
      })
    ).toBeVisible()
    const apikey = await this.page.locator(this.api_key_value).innerText()
    expect(apikey).toHaveLength(64)
    await this.utils.verifyElementVisibility(this.api_key_copy_button)
  }

  async apiDocumentationPresent(profile_info_text: string) {
    await this.navigatingToProfileInfoPage(profile_info_text)
    await this.utils.verifyElementVisibility(this.api_documentation_locator)
    await this.utils.verifyTextPresent(
      this.api_documentation_locator,
      testData.api_documentation_text
    )
    await this.utils.verifyElementVisibility(this.api_docs_link_locator)
  }

  async themePreferencesPresent(profile_info_text: string) {
    await this.navigatingToProfileInfoPage(profile_info_text)
    await this.utils.verifyElementVisibility(this.dark_button_locator)
    await this.utils.verifyElementVisibility(this.auto_button_locator)
    await this.utils.verifyElementVisibility(this.light_button_locator)
  }

  // Example for a theme switch with Playwright
  async verifyLightMode() {
    var lightModeButton = this.page.locator(this.lightModeButton)
    var className = await lightModeButton.getAttribute("class")
    if (!className?.includes("active")) {
      await lightModeButton.click()
      // await this.page.reload({ waitUntil: "networkidle" })
      await this.page.waitForTimeout(20000)
      className = await lightModeButton.getAttribute("class") // Re-fetch the class attribute after clicking
      await expect(className).toContain("active")
    } else {
      console.log("already in light mode")
    }
  }

  async verifyDarkMode() {
    const darkModeButton = this.page.locator(this.darkModeButton)
    let className = await darkModeButton.getAttribute("class")

    if (!className?.includes("active")) {
      await darkModeButton.click()
      await this.page.waitForTimeout(2000) // Reduced wait time to 2 seconds
      className = await darkModeButton.getAttribute("class") // Re-fetch the class attribute after clicking
      await expect(className).toContain("active")
    } else {
      console.log("Already in Dark mode")
    }
  }
}
