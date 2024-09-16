import { defineConfig, devices } from "@playwright/test"

const baseUrls = {
  checkphishStage: "https://app-stage.checkphish.ai",
  checkphishProd: "https://app.checkphish.ai",
  platformStage: "https://platform-stage.bolster.ai",
  platformProd: "https://platform.bolster.ai",
}
const login = {
  checkphishStage: "./globalCplogin",
  checkphishProd: "./globalCplogin",
  platformStage: "./globalPlatform",
  platformProd: "./globalPlatform",
}
// Function to set a global base URL
function setGlobalBaseUrl(baseUrl: string) {
  globalThis.globalBaseUrl = baseUrl
  console.log("Global baseUrl set to:", globalThis.globalBaseUrl)
}
const globalstoragestate = {
  checkphishStage: "./LoginAuth.json",
  checkphishProd: "./LoginAuth.json",
  platformStage: "./platformAuth.json",
  platformProd: "./platformAuth.json",
}
// Get the version from environment variables, default to 'platformStage'
const version = process.env.version || "platformProd"
const baseUrl = baseUrls[version]
const globalLogin = login[version]
const storage = globalstoragestate[version]
// console.log(storage, login, baseUrl)
// Set the base URL
setGlobalBaseUrl(baseUrl)
export default defineConfig({
  globalSetup: globalLogin,
  // globalSetup: "./globalCplogin",
  testDir: "./tests",
  timeout: 60000,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 10,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["dot"],
    ["json", { outputFile: "test-results.json" }],
    ["html", { open: "always" }], // Always open HTML report
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "on", // 'on', 'off', or 'only-on-failure'
    video: "on", // 'retain-on-failure', 'off' or 'on'
    storageState: storage,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        viewport: null,
        launchOptions: {
          args: ["--window-size=1920,1080"],
          // ...devices["Desktop Chrome"]
        },
      },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: {
        viewport: null,
        launchOptions: {
          args: ["--window-size=1920,1080"],
          // ...devices["Desktop Chrome"]
        },
      },
      //use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
