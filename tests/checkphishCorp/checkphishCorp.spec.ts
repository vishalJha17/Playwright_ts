import { test, expect, Page } from "@playwright/test"
import checkphish from "../../support/checkphish.bolster.ai/checkphish.bolster.ai"
test.describe(" Test cases to validate user Profile info", () => {
  let page: Page
  let cp: checkphish
  test.beforeEach(async ({ page }) => {
    cp = new checkphish(page)
    await page.goto("https://checkphish.bolster.ai/plans/")
  })

  test("CP_A-01 : Verify all the checkphis prod items are pointing to prod ", async () => {
    cp.checkRedirection()
  })
})
