var Freezer = require('freezer-js'),
	Utils = require('./utils'),
    Globals = require('./globals');

// Try to recover the state from the localStorage
var globalState = Utils.store(Globals.storeName) || Globals.defaultState;

// var scenarioState = Utils.store(Globals.scenarioStoreName) ||
// {
// };

// Returns the freezer instance with the state.
module.exports = new Freezer( globalState );