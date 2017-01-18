let Globals = {
    storeName: 'realTaxCalc:taxSettings',
    scenarioStoreName: 'realTaxCalc:scenarioSettings',
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
    defaultState: [
        {
            displayState: false,
            state: 'CA',
            agi: 0,
            currentFilingStatus: "single",
            personalExemp: true,
            spouseExemp: false,
            dependents: 0,
            standardDeduction: true,
            itemizedDeduction: 0
        }
    ],
    states: [
        {
            value : "CA",
            label : "California"
        },
        {
            value : "TN",
            label : "Tennessee"
        },
    ]
};

export default Globals;