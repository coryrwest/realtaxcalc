const Freezer = require('freezer-js');
import Utils from './utils';
import Globals from './globals';

// Try to recover the state from the localStorage
const globalState = Utils.store(Globals.storeName) || Globals.defaultState;

// var scenarioState = Utils.store(Globals.scenarioStoreName) ||
// {
// };

// Returns the freezer instance with the state.
let State = new Freezer( globalState );

export default State;