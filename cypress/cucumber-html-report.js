const report = require(`multiple-cucumber-html-reporter`);

const options = {
    theme: `bootstrap`,
    jsonDir: `cypress/cucumber-json`,  // ** Path of .json file **//
    reportPath: `test-reports/cucumber-report/cucumber-htmlreport`,
    scenarioTimestamp: true,
    displayDuration: true,
    durationInMS: true,
    reportSuiteAsScenarios: true,
    displayReportTime: true,
    launchReport: true,
    ignoreBadJsonFile: true,
    metadata:  {
        browser: {
            name: `chrome`,
            version: `96.x.x`,
        },
        device: `Local Test Machine`,
        platform: {
            name: `Mac`,
            version: `Monterey`,
        },
    },
};

//generate report
report.generate(options);
