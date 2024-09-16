import { test, Page } from "@playwright/test"
import mvp from "../../../support/checkPhish/mvp/mvp.page"
import CheckphishLoginPage from "../../../support/checkPhish/login/login.page"
import testData from "../../../testData/testData.json"

test.describe("Domain Monitoring", () => {
  const login = new CheckphishLoginPage()
  let price: mvp
  let data: any
  test.beforeEach(async ({ page }) => {
    price = new mvp(page)
    await page.goto("/")
  })

  test("verify success redirect to MVP page when user clicks on upgrade ", async ({
    page,
  }) => {
    await price.redirectToMVP()
  })
  test("verify yearly and monthly button is clickable and visible  ", async ({
    page,
  }) => {
    await price.verifyPlanSwitchButton()
  })
  test("verify Free Plan has all the details as per the figma ", async ({
    page,
  }) => {
    await price.verifyFreePlanDetails()
  })
  test("verify Starter Plan has all the details as per the figma ", async ({
    page,
  }) => {
    await price.verifyStarterPlanDetails()
  })
  test("verify Premium Plan has all the details as per the figma ", async ({
    page,
  }) => {
    await price.verifyPremiumPlanDetails()
  })
  test("verify Api Plan has all the details as per the figma ", async ({
    page,
  }) => {
    await price.verifyApiPlanDetails()
  })
  test("verify Features Plan has all the details as per the figma ", async ({
    page,
  }) => {
    await price.compareplan()
  })
})
