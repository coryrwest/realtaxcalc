const Freezer = require('freezer-js');
import Utils from './utils';
import Globals from './globals';

// Try to recover the state from the localStorage
let globalState = Utils.store(Globals.storeName) || Globals;

// Add first scenario
if(globalState.scenarios.length == 0) {
    globalState.scenarios.push(globalState.defaultState);
}

// var scenarioState = Utils.store(Globals.scenarioStoreName) ||
// {
// };

// Returns the freezer instance with the state.
let State = new Freezer( globalState );

export default State;