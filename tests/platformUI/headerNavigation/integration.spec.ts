import { test, expect, Page } from "@playwright/test"
import LoginPage from "../../../support/platformPages/platformLogin.page"
import IntegrationPage from "../../../support/platformPages/integration.page"
import testData from "../../../testData/integration.data.js"
// test.use({ storageState: "storageState.json" })

test.describe("Verify Integration tab", () => {
  let integrationPage: IntegrationPage
  let login: LoginPage
  test.beforeEach(async ({ page }) => {
    integrationPage = new IntegrationPage(page)
    login = new LoginPage(page)
    await page.goto("/")
    await login.logIntoPlatform()
    await integrationPage.NavigateToIntegrations()
    const element = page.locator(integrationPage.integrationHeader)
    await expect(element).toBeVisible()
  })

  test("TC-1: Verify integration tab and available connectors", async ({
    page,
  }) => {
    await integrationPage.verifyAvailableConnectorsName()
    // Wait for 3 seconds
    await page.waitForTimeout(3000)
    // Take a screenshot of the element with the .integrations-tab class
    expect(page.locator(".integrations-tab")).toBeVisible()
    const screenshot = await page.locator(".integrations-tab").screenshot()
    // Compare the screenshot with a stored baseline image
    expect(screenshot).toMatchSnapshot("test.png", { maxDiffPixels: 30 })
  })

  test("TC-2: Verify `Splunk` connector integration form and knowledge base doc", async ({
    page,
  }) => {
    const splunkConnectorName = integrationPage.generateConnectorName(
      testData.elements.splunkText
    )
    //click on connector
    await integrationPage.clickOnConnectorWithName(testData.elements.splunkText)
    //Verify the fields and placeholders display in the connector form
    await integrationPage.verifyConnectorsSetupForm(
      `${integrationPage.ConnectorNameText},${integrationPage.UrlText},${integrationPage.tokenText}`,
      `${
        testData.elements.connectorPlaceholderText
      },${testData.elements.urlPlaceholderText(
        testData.elements.splunkText
      )},${testData.elements.tokenPlaceholderText(
        testData.elements.splunkText
      )}`
    )
    //verify the connector by entering values in the form
    await integrationPage.verifyTestConnectorButton(
      `${splunkConnectorName},${"UrlValue"},${"tokenValue"}`,
      testData.elements.splunkText,
      testData.elements.splunkDocTitle
    )
    //Delete the created connector
    await integrationPage.deleteCreatedConnector(`${splunkConnectorName}`)
  })

  test("TC-3: Verify `TINES` connector integration form and knowledge base doc", async ({
    page,
  }) => {
    const tinesConnectorName = integrationPage.generateConnectorName(
      testData.elements.tinesText
    )
    //click on connector
    await integrationPage.clickOnConnectorWithName(testData.elements.tinesText)
    await page.waitForTimeout(6000)
    //Verify the fields and placeholders display in the connector form
    await integrationPage.verifyConnectorsSetupForm(
      `${integrationPage.ConnectorNameText},${integrationPage.UrlText}`,
      `${
        testData.elements.connectorPlaceholderText
      },${testData.elements.urlPlaceholderText(testData.elements.tinesText)}`
    )
    //verify the connector by entering values in the form
    await integrationPage.verifyTestConnectorButton(
      `${tinesConnectorName},${testData.elements.tinesUrl}`,
      testData.elements.tinesText,
      testData.elements.tinesDocTitle
    )
    await integrationPage.deleteCreatedConnector(`${tinesConnectorName}`)
  })
  test("TC-4: Verify `SumoLogic` connector integration form and knowledge base doc", async ({
    page,
  }) => {
    const sumologicConnectorName = integrationPage.generateConnectorName(
      testData.elements.sumologicText
    )
    //click on connector
    await integrationPage.clickOnConnectorWithName(
      testData.elements.sumologicText
    )
    //Verify the fields and placeholders display in the connector form
    await integrationPage.verifyConnectorsSetupForm(
      `${integrationPage.ConnectorNameText},${integrationPage.UrlText}`,
      `${
        testData.elements.connectorPlaceholderText
      },${testData.elements.urlPlaceholderText(
        testData.elements.sumologicText
      )}`
    )
    //verify the connector by entering values in the form
    await integrationPage.verifyTestConnectorButton(
      `${sumologicConnectorName},${testData.elements.sumoLogicUrl}`,
      testData.elements.sumologicText,
      testData.elements.sumoLogicDocTitle
    )
    await integrationPage.deleteCreatedConnector(`${sumologicConnectorName}`)
  })

  test("TC-5: Verify `XSOAR` connector integration form and knowledge base doc", async ({
    page,
  }) => {
    const cortexXsoarConnectorName = integrationPage.generateConnectorName(
      testData.elements.cortexXsoarText
    )
    //click on connector
    await integrationPage.clickOnConnectorWithName(
      testData.elements.cortexXsoarText
    )
    //Verify the fields and placeholders display in the connector form
    await integrationPage.verifyConnectorsSetupForm(
      `${integrationPage.ConnectorNameText},${integrationPage.UrlText},${integrationPage.tokenText}`,
      `${
        testData.elements.connectorPlaceholderText
      },${testData.elements.urlPlaceholderText(
        testData.elements.cortexXsoarText
      )},${testData.elements.tokenPlaceholderText(
        testData.elements.cortexXsoarText
      )}`
    )
    //verify the connector by entering values in the form
    await integrationPage.verifyTestConnectorButton(
      `${cortexXsoarConnectorName},${testData.elements.xsoarUrl}`,
      testData.elements.cortexXsoarText,
      testData.elements.xsoarDocTitle
    )
    await integrationPage.deleteCreatedConnector(`${cortexXsoarConnectorName}`)
  })

  test("TC-6: Verify `ThreatConnect` connector integration form and knowledge base doc", async ({
    page,
  }) => {
    const threatConnectConnectorName = integrationPage.generateConnectorName(
      testData.elements.threatConnectText
    )
    //click on connector
    await integrationPage.clickOnConnectorWithName(
      testData.elements.threatConnectText
    )
    //Verify the fields and placeholders display in the connector form
    await integrationPage.verifyConnectorsSetupForm(
      `${integrationPage.ConnectorNameText},${integrationPage.UrlText}`,
      `${
        testData.elements.connectorPlaceholderText
      },${testData.elements.urlPlaceholderText(
        testData.elements.threatConnectText
      )}`
    )
    //verify the connector by entering values in the form
    await integrationPage.verifyTestConnectorButton(
      `${threatConnectConnectorName},${testData.elements.sumoLogicUrl}`,
      testData.elements.threatConnectText,
      testData.elements.threatConnectDocTitle
    )
    await integrationPage.deleteCreatedConnector(
      `${threatConnectConnectorName}`
    )
  })

  test("TC-7: Verify `Teams` connector integration form and knowledge base doc", async ({
    page,
  }) => {
    const teamsConnectorName = integrationPage.generateConnectorName(
      testData.elements.teamsText
    )
    //click on connector
    await integrationPage.clickOnConnectorWithName(testData.elements.teamsText)
    //Verify the fields and placeholders display in the connector form
    await integrationPage.verifyConnectorsSetupForm(
      `${integrationPage.ConnectorNameText},${integrationPage.UrlText}`,
      `${
        testData.elements.connectorPlaceholderText
      },${testData.elements.urlPlaceholderText(testData.elements.teamsText)}`
    )
    //verify the connector by entering values in the form
    await integrationPage.verifyTestConnectorButton(
      `${teamsConnectorName},${testData.elements.teamsUrl}`,
      testData.elements.teamsText,
      testData.elements.teamsDocTitle
    )
    await integrationPage.deleteCreatedConnector(`${teamsConnectorName}`)
  })

  test("TC-8: Verify `Microsoft Sentinel` connector integration form and knowledge base doc", async ({
    page,
  }) => {
    const sentinelConnectorName = integrationPage.generateConnectorName(
      testData.elements.sentinelText
    )
    //click on connector
    await integrationPage.clickOnConnectorWithName(
      testData.elements.sentinelText
    )
    //Verify the fields and placeholders display in the connector form
    await integrationPage.verifyConnectorsSetupForm(
      `${integrationPage.ConnectorNameText},${integrationPage.UrlText}`,
      `${
        testData.elements.connectorPlaceholderText
      },${testData.elements.urlPlaceholderText(testData.elements.sentinelText)}`
    )
    //verify the connector by entering values in the form
    await integrationPage.verifyTestConnectorButton(
      `${sentinelConnectorName},${testData.elements.teamsUrl}`,
      testData.elements.sentinelText,
      testData.elements.sentinelDocTitle
    )
    await integrationPage.deleteCreatedConnector(`${sentinelConnectorName}`)
  })

  test("TC-9: Verify `Slack` connector integration form and knowledge base doc", async ({
    page,
  }) => {
    const slackConnectorName = integrationPage.generateConnectorName(
      testData.elements.slackText
    )
    //click on connector
    await integrationPage.clickOnConnectorWithName(testData.elements.slackText)
    //Verify the fields and placeholders display in the connector form
    await integrationPage.verifyConnectorsSetupForm(
      `${integrationPage.ConnectorNameText},${integrationPage.slackChannel},${integrationPage.slackToken}`,
      `${testData.elements.connectorPlaceholderText}`
    )
    //verify the connector by entering values in the form
    await integrationPage.verifyTestConnectorButton(
      `${slackConnectorName},${testData.elements.slackText}`,
      testData.elements.slackText,
      testData.elements.slackDocTitle
    )
    await integrationPage.deleteCreatedConnector(`${slackConnectorName}`)
  })

  test("TC-10: Verify `Defender` connector integration form and knowledge base doc", async ({
    page,
  }) => {
    const defenderConnectorName = integrationPage.generateConnectorName(
      testData.elements.defenderText
    )
    //click on connector
    await integrationPage.clickOnConnectorWithName(
      testData.elements.defenderText
    )
    //Verify the fields and placeholders display in the connector form
    await integrationPage.verifyConnectorsSetupForm(
      `${integrationPage.ConnectorNameText},${integrationPage.tenantId},${integrationPage.primaryDomain}`,
      `${testData.elements.connectorPlaceholderText},${testData.elements.tenantPlaceholderText},${testData.elements.primaryDomainPlaceholderText}`
    )
    //verify the connector by entering values in the form
    await integrationPage.verifyTestConnectorButton(
      `${defenderConnectorName},${testData.elements.defenderText}`,
      testData.elements.defenderText,
      testData.elements.defenderDocTitle
    )
    await integrationPage.deleteCreatedConnector(`${defenderConnectorName}`)
  })

  test("TC-11: Verify `API Integration` connector integration form and knowledge base doc", async ({
    page,
  }) => {
    const apiIntegrationConnectorName = integrationPage.generateConnectorName(
      testData.elements.apiIntegrationText
    )
    //click on connector
    await integrationPage.clickOnConnectorWithName(
      testData.elements.apiIntegrationText
    )
    //Verify the fields and placeholders display in the connector form
    await integrationPage.verifyConnectorsSetupForm(
      `${integrationPage.ConnectorNameText},${integrationPage.UrlText},${integrationPage.methodText},Headers (Optional),Form Data (Optional),Request Body`,
      `${testData.elements.connectorPlaceholderText},Paste URL obtained from API Integration`
    )
    //verify the connector by entering values in the form
    await integrationPage.verifyApiIntegrationForm(
      `${apiIntegrationConnectorName},${testData.elements.teamsUrl}`,
      testData.elements.apiIntegrationText,
      testData.elements.apiDocTitle
    )
    await integrationPage.deleteCreatedConnector(
      `${apiIntegrationConnectorName}`
    )
  })
})
