const { faker } = require("@faker-js/faker")

module.exports = {
  elements: {
    emailDomainText: "Email Domain",
    addSearchTermsText: "Add Search Terms",
    activeFindings: "Active Findings",
    mitigatedFindings: "Mitigated Findings",
    ignoredFindings: "Ignored Findings",
    dashboardText: "Dashboard",
    deleteButton: "Delete",
    deactivateButton: "Deactivate",
    submitButton: "Submit",
    emailDomainOption: "Email-Domain",
    emailAddressText: "Email ID",
    creditCardText: "Credit Card",
    passwordDetailsHeading:
      "Breakdown of emails with plaintext passwords, hashed passwords or no passwords at all.",
    noDataAlertMessage:
      "Nothing to display in the table at the moment. This could be a result of applied filters or a temporary absence of data.",
    addSearchTermsText: "Add Search Terms",
    successAlertMessage: (searchTerm) =>
      `Search term "${searchTerm}" successfully added, click refresh button to see updated search status`,
    alertFailureMessage: (searchTerm) =>
      `Search term already exists "${searchTerm}"`,
    socialMediaFailureMessage: (searchTerm) =>
      `Search term '${searchTerm}' already exists for this brand and type. "${searchTerm}"`,
    deleteAlertMessage: (searchTerm) =>
      `Search term "${searchTerm}" successfully deleted`,
    emptyStringErrorMessage: `searchTerm should not be empty ""`,
    deactivateAlertMessage: (searchTerm) =>
      `Search term "${searchTerm}" successfully deactivated.`,
    deletePopupTitleText: "Delete Search Term",
    deactivatePopupTitleText: "Deactivate Search Term",
    addSearchTermTitleTest: "Search Terms",
  },
  fakeData: {
    searchTerm: faker.company.buzzNoun(),
  },
  endpoint: {
    socialMediaSearchEndpoint: "social-media/search",
    appStoreSearchEndpoint: "app-store/search",
  },
}
