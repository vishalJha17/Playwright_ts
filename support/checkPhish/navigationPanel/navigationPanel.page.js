import helpers from "../../../support/genericCommands/genericCommands"
const page = new helpers()

export default class navigationPanel {
  navigationPanelLocator = ".side-bar-web-level"
  navButton = ".item-label.nav-link"
  typosquatMenu = '[id="/domain-monitoring/typosquat"]'
  domainAcquisitionMenu = '[id="/domain-monitoring/domain-acquisition"]'
  liveScanMenu = '[id="/bulk-scan"]'
  allScansMenu = '[id="/checkphish/allscans"]'
  expandable = ".expandable-item"

  checkNavigationPanelExpanded() {
    cy.get(this.navigationPanelLocator)
      .invoke("attr", "class")
      .then((value) => {
        expect(value).to.not.include("width-0")
      })
  }
  checkButtonPresent(locator, index, buttonName) {
    cy.get(locator)
      .eq(index)
      .invoke("text")
      .then((text) => {
        expect(text).to.be.equal(buttonName)
      })
    return cy.wrap(this)
  }
  checkBothButtonPresent() {
    this.checkButtonPresent(this.navButton, 0, "Domain Monitoring")
    this.checkButtonPresent(this.navButton, 1, "URL Scanner")
  }
  checkTyposquatPresent() {
    page.clickWithIndex(this.navButton, 0)
    page.verifyElementVisiblity(this.typosquatMenu)
  }
  checkDomainAcquisitionPresent() {
    page.clickWithIndex(this.navButton, 0)
    page.verifyElementVisiblity(this.domainAcquisitionMenu)
  }
  checkLiveScanPresent() {
    page.clickWithIndex(this.navButton, 1)
    page.verifyElementVisiblity(this.liveScanMenu)
  }
  checkDAllScansPresent() {
    page.clickWithIndex(this.navButton, 1)
    page.verifyElementVisiblity(this.allScansMenu)
  }
  verifyUrlScanMenuHides() {
    cy.get(this.expandable)
      .eq(0)
      .invoke("attr", "class")
      .then((value) => {
        if (value.includes("active")) {
          page.verifyElementNotExists(this.liveScanMenu)
          page.verifyElementNotExists(this.allScansMenu)
        } else {
          page.clickWithIndex(this.expandable, 0).then(() => {
            page.verifyElementNotExists(this.liveScanMenu)
            page.verifyElementNotExists(this.allScansMenu)
          })
        }
      })
  }
  verifyDomainMonitoringnMenuHides() {
    cy.get(this.expandable)
      .eq(1)
      .invoke("attr", "class")
      .then((value) => {
        if (value.includes("active")) {
          page.verifyElementNotExists(this.typosquatMenu)
          page.verifyElementNotExists(this.domainAcquisitionMenu)
        } else {
          page.clickWithIndex(this.expandable, 1).then(() => {
            page.verifyElementNotExists(this.typosquatMenu)
            page.verifyElementNotExists(this.domainAcquisitionMenu)
          })
        }
      })
  }
}
