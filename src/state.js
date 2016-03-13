var Freezer = require('freezer-js'),
	Utils = require('./utils'),
    Globals = require('./globals');

// Try to recover the state from the localStorage
var globalState = Utils.store(Globals.storeName) || 
{
    displayState: false,
    state: 'CA',
    agi: 0,
    currentFilingStatus: "single",
    personalExemp: true,
    spouseExemp: false,
    dependents: 0,
    standardDeduction: true
};

// var scenarioState = Utils.store(Globals.scenarioStoreName) ||
// {
// };

// Returns the freezer instance with the state.
module.exports = new Freezer( globalState );