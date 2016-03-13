module.exports = {
    storeName: 'realTaxCalc:taxSettings',
    scenariostoreName: 'realTaxCalc:scenarioSettings',
    filingStatuses: [
        {
            value : "single",
            label : "Single"
        },
        {
            value : "marriedJoint",
            label : "Married Filing Jointly"
        },
        {
            value : "marriedSeparate",
            label : "Married Filing Separately"
        },
        {
            value : "hoh",
            label : "Head of Household"
        }
        // ,
        // {
        //     value : "widower",
        //     label : "Qualifying Widow(er)"
        // }
    ],
};