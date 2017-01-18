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

/**
 * Sets a setting.
 * @param  {Key} The setting key. {Value} The setting value.
 */
State.on('state:initialize', function() {
    if(!Utils.storeExists(Globals.storeName)) {
        Utils.store(Globals.storeName, State.get()); 
    }
});

State.on('setting:set', function(name, value, scenarioIndex){
    console.log('Setting ' + name + ' ' + value + ' Saving');
    let setting = {};
    setting[name] = value;
    State.get()[scenarioIndex].set(setting);
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
    console.log('Setting ' + name + ' ' + value + ' Saved');
});


State.on('scenario:reset', function(){
    // Reset the store
    State.get().set(Globals.defaultState);
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
    console.log('State reset');
});

// TODO: look into using Freezers Array nodes:
// https://github.com/arqex/freezer#update-methods
State.on('state:newScenario', function(){
    let scenarios = State.get();
    
	if(scenarios.length < 2) {
		State.get().set(1, Globals.defaultState[0]);
	}
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
});

State.on('state:deleteScenario', function(){
    let scenarios = State.get();
	
	if(scenarios.length > 1) {
        var newScenarios = [];
        newScenarios[0] = scenarios[0];
		State.get().reset(newScenarios);
	}
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
});

