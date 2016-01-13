var Freezer = require('freezer-js'),
	Utils = require('./utils'),
    Globals = require('./globals');

// Try to recover the state from the localStorage
var state = Utils.store(Globals.storeName) || {
	displayFederal: true,
    displayState: false,
    state: 'CA',
    agi: 0
};

// Returns the freezer instance with the state.
module.exports = new Freezer( state );