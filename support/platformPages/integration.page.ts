import { Page, expect } from "@playwright/test"
import { faker } from "@faker-js/faker"
const Ajv = require("ajv")
const fs = require("fs")
const path = require("path")

export default class integration {
  //locators
  connectorName = ".integration-name-hidden-on-hover"
  connectorEnableButton = ".integration-item.integration-enabled"
  selectedIntegrationTitle = ".selected-integration-title"
  knowledgeBaseElement = "#knowledge-base-content"
  setupPageHeader = ".modal-header"
  hintText = ".connector-hints"
  connectorFormFields = ".connector-modal-body"
  connectorButton = ".MuiButtonBase-root.MuiButton-root"
  integrationHeader = '.integrations-header:has-text("Available Connectors")'

  //data
  availableConnectorsName = `Sumo Logic,Splunk,Tines,Cortex XSOAR,ThreatConnect,Microsoft Sentinel,Slack,Microsoft Teams,Microsoft 365 Exchange/Defender,API Integration`
  ConnectorNameText = "Connector Name"
  UrlText = "URL"
  tokenText = "Token Value"
  methodText = "Request Method"
  slackChannel = "Slack Channel"
  slackToken = "Slack Token"
  tenantId = "Tenant ID"
  primaryDomain = "Primary Domain"

  //methods

  page: Page

  constructor(page: Page) {
    this.page = page
  }

  async delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  generateConnectorName(prefix: string): string {
    return `${prefix}${faker.person.firstName()}`
  }

  async NavigateToIntegrations() {
    this.page
      .locator("div.d-flex.align-items-center.first-level-nav-item", {
        hasText: "Integrations",
      })
      .click()
    // await this.page.locator(navigateToIntegration).click()
    await this.page.waitForURL("**/integrations/available-connectors")
  }

  //   Verify all avialable connectors name display in the  integration page
  async verifyAvailableConnectorsName() {
    const names = this.availableConnectorsName.split(",")

    for (const connectorName of names) {
      const connectorElement = this.page
        .locator(this.connectorName)
        .filter({ hasText: connectorName })
      await expect(connectorElement).toBeVisible()
    }
  }

  async clickOnConnectorWithName(connectorname: string) {
    const connectorElement = this.page.locator(this.connectorName, {
      hasText: connectorname,
    })
    // Move up to the parent of the parent element
    const parentElement = connectorElement.locator("..").locator("..")
    const enableButton = parentElement
      .locator(this.connectorEnableButton)
      .filter({ hasText: connectorname })
    const buttonLabel = enableButton.locator(".MuiButton-label")

    // await buttonLabel.hover()
    await buttonLabel.click({ force: true })

    // Verify selected integration title
    await expect(
      this.page.locator(this.selectedIntegrationTitle)
    ).toContainText(connectorname)

    // Verify the redirection URL
    await this.page.waitForURL("**/integrations/available-connectors", {
      waitUntil: "domcontentloaded",
    })
    await expect(this.page.locator(".mt-3.form-label").first()).toBeVisible()
  }

  async verifyKnowledgeBaseDocScreenshot(
    connectorName: string,
    docTitle: string
  ) {
    // Scroll to top and take a screenshot
    const contentElement = this.page.locator(`[id="knowledge-base-content"]`)
    //Verify the title
    await expect(
      this.page.locator(`[id="knowledge-base-content"]`)
    ).toContainText(docTitle)
    await contentElement.evaluate((el) => el.scrollTo(0, 0))
    const screenshotTop = await contentElement.screenshot()
    expect(screenshotTop).toMatchSnapshot("test" + connectorName + ".png", {
      maxDiffPixels: 30,
    })
  }

  async verifyFormButtonIsDisabled() {
    // Get the buttons
    const connectorButtons = this.page.locator(this.connectorButton)
    // Verify the first button is disabled
    await expect(connectorButtons.nth(0)).toHaveAttribute("disabled")
    // Verify the save button (third button) is disabled
    await expect(connectorButtons.nth(2)).toHaveAttribute("disabled")
    // Verify the cancel button (second button) is not disabled
    await expect(connectorButtons.nth(1)).not.toHaveAttribute("disabled")
  }

  async verifyConnectorsSetupForm(fieldNames: string, placeholderText: string) {
    // Verify the header text contains "Setup"
    const setupHeader = this.page.locator(this.setupPageHeader)
    await expect(setupHeader).toHaveText(/Setup/)

    // Verify fields and their placeholder text
    const fieldNamesArray = fieldNames.split(",")
    const placeholderTextArray = placeholderText.split(",")

    for (const fieldName of fieldNamesArray) {
      const fieldLabel = this.page
        .locator(".form-label")
        .filter({ hasText: fieldName })
      // Add assertion to ensure the field label is visible
      await expect(fieldLabel).toBeVisible()
      // Optional: You can also assert the exact text if needed
      await expect(fieldLabel).toContainText(fieldName)
    }
    for (let index = 0; index < placeholderTextArray.length; index++) {
      const inputField = await this.page
        .locator("input.form-control")
        .nth(index)

      // Wait for the input field to be present in the DOM
      await this.page.waitForSelector("input.form-control", {
        state: "attached",
      })
      // Retrieve the placeholder attribute
      const actualPlaceholder = await inputField.getAttribute("placeholder", {
        timeout: 5000,
      })
      // Assert that the actual placeholder matches the expected placeholder
      await expect(actualPlaceholder).toBe(placeholderTextArray[index])
    }
  }

  async enterValuesInFormFields(fieldValues: string) {
    console.log("step2")
    // Verify test connector button by entering data
    const valuesArray = await fieldValues.split(",")
    for (let index = 0; index < (await valuesArray.length); index++) {
      const inputField = await this.page.locator(".form-control").nth(index)
      const value = await inputField.fill(valuesArray[index], { force: true }) // Type in the new value
      // Assert that the field contains the correct value after filling
      const filledValue = await inputField.inputValue() // Get the current value of the input field
      expect(filledValue).toBe(valuesArray[index]) // Assert that the filled value matches the expected value
    }
  }

  async enterConnectorFieldValues(fieldValues: string) {
    await this.verifyFormButtonIsDisabled()
    // Verify test connector button by entering data
    await this.enterValuesInFormFields(fieldValues)
    // Verify all buttons are not disabled
    for (let index = 0; index <= 2; index++) {
      await expect(
        this.page.locator(this.connectorButton).nth(index)
      ).not.toHaveAttribute("disabled", { timeout: 3000 })
    }
  }

  async verifySaveButton(value: string) {
    // Click the save button
    await this.page.locator(this.connectorButton).nth(1).click()
    // Verify redirect URL
    await expect(this.page).toHaveURL(
      /.*\/integrations\/implemented-connectors/
    )
    // Verify the connector is displayed
    const connectorName = this.page
      .locator(`[col-id="name"]`)
      .filter({ hasText: value })
    await expect(connectorName).toContainText(value)
  }

  async verifyTestConnectorButton(
    fieldValues: string,
    connectorName: string,
    docTitle: string
  ) {
    await this.enterConnectorFieldValues(fieldValues)
    // Click the test connector button
    await this.page.locator(this.connectorButton).nth(0).click()
    // Verify test connector button
    const testResultElement = this.page.locator(".ml-2").first()
    await this.page.waitForTimeout(3000)
    await this.verifyKnowledgeBaseDocScreenshot(connectorName, docTitle)

    // Log the element's text content for debugging
    const textContent = await testResultElement.textContent()
    if (textContent?.trim() === "Success!") {
      //verify the api response
      // Verify connector is saved
      await this.verifySaveButton(fieldValues.split(",")[0])
      // await this.verifyResponseBody(integrationData.elements.apiEndpoint)
    } else {
      await expect(
        this.page.locator('a:has-text("Re-test Connector")')
      ).toBeVisible()
      // Verify connector is saved
      await this.verifySaveButton(fieldValues.split(",")[0])
      // await this.verifyResponseBody(integrationData.elements.apiEndpoint)
    }
  }

  async deleteCreatedConnector(fieldValues: string) {
    this.page.reload()
    const implementedConnectorsSelector = this.page.locator(
      "div.d-flex.align-items-center.drawer-sub-item",
      {
        hasText: "Implemented Connectors",
      }
    )
    // Navigate to implemented connectors
    await implementedConnectorsSelector.click()
    // Find the row with the matching name
    const rowLocator = this.page.locator('div[role="row"]').filter({
      has: this.page.locator(`div[col-id="name"] span`, {
        hasText: fieldValues,
      }),
    })
    // Click on the three dots button in the action column of the matching row
    await rowLocator.locator('div[col-id="actionColumn"] button').click()
    // Wait for the delete button to appear and click it
    await this.page.locator("text=Delete").click()
    await expect(this.page.locator(".global-alert-message")).toContainText(
      `Successfully deleted connector '${fieldValues}'`
    )
  }

  //async verifyResponseBody(page: Page, apiEndpoint: string) {
  //   console.log("API Endpoint:", apiEndpoint)

  //   // Load the schema
  //   const schemaPath = path.resolve(
  //     __dirname,
  //     "../../testData/integration.schema.json"
  //   )
  //   const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"))
  //   console.log("Schema Loaded:", schema)

  //   const ajv = new Ajv()
  //   const validate = ajv.compile(schema)

  //   // Intercept the request and fulfill it
  //   await this.page.route(apiEndpoint, async (route) => {
  //     console.log("Intercepted request:", route.request().url())

  //     // Continue with the request and capture the response
  //     const response = await route.continue()

  //     try {
  //       // Verify response status
  //       const status = response.status()
  //       console.log("Response Status:", status)
  //       if (status !== 200) {
  //         throw new Error(`Unexpected status code: ${status}`)
  //       }

  //       // Check if the response is JSON
  //       const contentType = response.headers()["content-type"] || ""
  //       if (contentType.includes("application/json")) {
  //         const responseBody = await response.json()
  //         console.log("Response Body:", responseBody)

  //         // Validate the response body against the schema
  //         const valid = validate(responseBody)
  //         if (!valid) {
  //           console.log("Validation Errors:", validate.errors)
  //           throw new Error("Response body validation failed")
  //         } else {
  //           console.log("Response body validation succeeded")
  //         }
  //       } else {
  //         console.log("Response is not JSON. Content-Type:", contentType)
  //       }
  //     } catch (error) {
  //       console.error("Error during response handling:", error)
  //     }
  //   })
  // }

  async verifyApiIntegrationForm(
    fieldValues: string,
    connectorName: string,
    docTitle: string
  ) {
    //enter values
    await this.verifyFormButtonIsDisabled()
    // Verify test connector button by entering data
    await this.enterValuesInFormFields(fieldValues)
    //Click on add button in request body
    await this.page.locator(".add").nth(2).click()
    await this.page
      .locator(".mr-2.form-control")
      .fill(`{"text":"%FILE_URL%"}`, { force: true })
    // Verify all buttons are not disabled
    for (let index = 0; index <= 2; index++) {
      await expect(
        this.page.locator(this.connectorButton).nth(index)
      ).not.toHaveAttribute("disabled", { timeout: 3000 })
    }
    //verify test connector button
    // Click the test connector button
    await this.page.locator(this.connectorButton).nth(0).click()
    //click on save button // Verify test connector button
    const testResultElement = this.page.locator(".ml-2").first()
    await this.page.waitForTimeout(3000)
    await this.verifyKnowledgeBaseDocScreenshot(connectorName, docTitle)

    // Log the element's text content for debugging
    const textContent = await testResultElement.textContent()
    if (textContent?.trim() === "Success!") {
      // Verify connector is saved
      await this.verifySaveButton(fieldValues.split(",")[0])
    } else {
      await expect(
        this.page.locator('a:has-text("Re-test Connector")')
      ).toBeVisible()

      // Verify connector is saved
      await this.verifySaveButton(fieldValues.split(",")[0])
    }
  }
}
