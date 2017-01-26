/*
The reactions are what make the app state change.
They are similar to the Flux concept of actions, but you never
call them imperatively. Reactions just respond to an event,
so ideally your React components just trigger events, being
completely decoupled from actions/reactions.
 */

import State from './state';
import Utils from './utils';
import Globals from './globals';
import moment from 'moment';

/**
 * Sets a setting.
 * @param  {Key} The setting key. {Value} The setting value.
 */
State.on('state:initialize', function() {
    // If state doesnt exist in localStorage put it there.
    if(!Utils.storeExists(Globals.storeName)) {
        Utils.store(Globals.storeName, State.get()); 
    }
});

State.on('setting:set', function(name, value, scenarioIndex){
    console.log('Setting ' + name + ' ' + value + ' Saving');
    let setting = {};
    setting[name] = value;
    State.get().scenarios[scenarioIndex].set(setting);
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
    console.log('Setting ' + name + ' ' + value + ' Saved');
});


State.on('scenario:reset', function(i){
    // Reset the store
    State.get().scenarios[i].set(Globals.defaultState);
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
    console.log('State reset');
});

// TODO: look into using Freezers Array nodes:
// https://github.com/arqex/freezer#update-methods
State.on('state:newScenario', function(){
    let state = State.get();
    
    if(state.scenarios.length < 5) {
        State.get().scenarios.set(state.scenarios.length, Globals.defaultState);
    }
    
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
});

State.on('state:deleteScenario', function(i){
    let state = State.get();
	
    var newScenarios = [];
    newScenarios = state.scenarios.splice(i, 1);
	State.get().scenarios.reset(newScenarios);
	
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
});


State.on('state:resetall', function(){
    let state = Globals;
    state.scenarios[0] = Globals.defaultState;
    // Reset the store
    State.get().set(state);
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
    console.log('Full state reset');
});

