var Freezer = require('freezer-js'),
	Utils = require('./utils'),
    Globals = require('./globals');

// Try to recover the state from the localStorage
var state = Utils.store(Globals.storeName) || 
{
	displayFederal: true,
    displayState: false,
    state: 'CA',
    agi: 0,
    currentFilingStatus: "single",
    personalExemp: true,
    spouseExemp: false,
    dependents: 0,
    standardDeduction: true,
    // Calculated Taxes
    taxableIncome: 0,
    taxCredits: 0,
    federalTax: 0,
    stateTax: 0,
    FICA: 0,
    totalTax: 0,
    // Calculated values
    percentage: 0,
    takeHomePay: 0
};

// Returns the freezer instance with the state.
module.exports = new Freezer( state );