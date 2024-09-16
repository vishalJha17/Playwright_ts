module.exports = {
  elements: {
    integrationSetupMessage:
      "Follow the steps on the right side to first setup Splunk and then configure its integration with Bolster platform.",
    knowledgeBaseNoteText:
      "NOTE – Export Format on playbook should always be JSON for this guide to work.",
    connectorPlaceholderText: "Provide a name for the connector",

    urlPlaceholderText: (connectorName) =>
      `Paste URL obtained from ${connectorName}`,
    tokenPlaceholderText: (connectorName) =>
      `Paste Token obtained from ${connectorName}`,
    tenantPlaceholderText: "Enter your Tenant ID",
    primaryDomainPlaceholderText: "Enter Primary Domain",
    splunkText: "Splunk",
    tinesText: "Tines",
    sumologicText: "Sumo Logic",
    cortexXsoarText: "Cortex XSOAR",
    threatConnectText: "ThreatConnect",
    teamsText: "Microsoft Teams",
    sentinelText: "Microsoft Sentinel",
    slackText: "Slack",
    defenderText: "Microsoft 365 Exchange/Defender",
    apiIntegrationText: "API Integration",
    apiDocTitle: "Playbook Connector for APIs",
    tinesDocTitle: "Setting Up a Web Hook in Tines",
    sumoLogicDocTitle: "Steps to Set Up HTTP Source Collection",
    xsoarDocTitle:
      "Setting Up Integration Between XSOAR and Platform Using Generic Webhooks",
    slackDocTitle: "Playbook Connectors for Slack",
    defenderDocTitle:
      "Step 1. Prerequisite Steps To be Followed on Customer Microsoft Account",
    threatConnectDocTitle:
      "Steps to Set Up HTTP Source Collection. — ThreatConnect",
    teamsDocTitle: "Steps to Send Data from Platform to Microsoft Teams",
    sentinelDocTitle:
      "Setup Integration between Microsoft Sentinel and Platform",
    tinesUrl:
      "https://delicate-tree-2030.tines.com/webhook/6b704b8aef674c0472fd727b03309f69/d2ac3263463ece35de7ccaa29fe0d6b6",
    sumoLogicUrl:
      "https://endpoint4.collection.sumologic.com/receiver/v1/http/ZaVnC4dhaV0jLiDFQBERQjxpMopCTeikP6x2zBu_Hk18uGbuF61aY1hydBDpdJZzPemqdaoCwhbm0qhi37nSAcV3BYWWIFDrVtSvteo4mxJKvIdt76Objg==",
    xsoarUrl: "http://172.31.6.39:8081/incident/upload/14791",
    teamsUrl:
      "https://redmarlin7.webhook.office.com/webhookb2/6dcff4c8-786e-4195-87cb-224be9d10d90@41049815-43e1-44c7-b20f-8ed4920a49d4/IncomingWebhook/35cb062bab5a4da394b578e13760522c/f8dfb115-d800-46a7-99d2-f2085da2ad45",
    splunkDocTitle:
      "Setup New HTTP Event Collector Input in Splunk and Send Data",
    apiEndpoint: `https://platform.bolster.ai/platform-api/v1/playbook/connector`,
  },
}
