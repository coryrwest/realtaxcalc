/*
The reactions are what make the app state change.
They are similar to the Flux concept of actions, but you never
call them imperatively. Reactions just respond to an event,
so ideally your React components just trigger events, being
completely decoupled from actions/reactions.
 */

var State = require('./state');
var Utils = require('./utils');
var Globals = require('./globals');

/**
 * Sets a setting.
 * @param  {Key} The setting key. {Value} The setting value.
 */
State.on('setting:set', function(name, value){
    console.log('Setting ' + name + ' ' + value + ' Saving');
    var setting = {};
    setting[name] = value;
    State.get().set(setting);
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
    console.log('Setting ' + name + ' ' + value + ' Saved');
});


State.on('reset', function(){
    // Reset the store
    State.get().set(Globals.defaultState);
    // Save the state in localStorage
    Utils.store(Globals.storeName, State.get());
    console.log('State reset');
});

/**
 * Deletes a todo.
 * @param  { FreezerNode } The todo to delete.
 */
State.on('todo:delete', function( todo ){

	// Since we are receiving the todo to delete from
	// the arguments. We can use directly instead of
	// making use of the state.
	var updated = todo.pivot()
						.ui.set({ status: 'deleting' })
	;

    // We just remove the todo from teh list
    State.get()
        .todos.splice( getTodoIndex( updated ), 1 )
    ;

    // Save the state in localStorage
    Utils.store('freezerTodos', State.get());
});

/**
 * Updates a todo text. Shows how a reaction can receive more
 * than one parameter.
 *
 * @param  {FreezerNode} todo   The todo to update.
 * @param  {String} text    The new text for the todo.
 */
State.on('todo:update', function( todo, text ){
	// Set the todo in an 'updating' state
	// to let the user know.
	// The updated node is returned.
	var updated = todo.pivot().ui.set({ status: 'updating' });

	// Call the server
	setTimeout( function(){
		var todo = State.get().todos[ getTodoIndex( updated ) ];

		// We need to pivot in the node to modify multiple children.
		// Pivoting will make children changes return the updated
		// todo instead the updated child.
		todo.pivot()
			.model.set({ title: text })
			.ui.set({ status: 'ready' })
		;

		// Save the state in localStorage
		Utils.store('freezerTodos', State.get());
	}, lag);
});

/**
 * Removes completed nodes from the list.
 */
State.on('todo:clearCompleted', function(){
	var todos = State.get().todos.pivot(),
		toRemove = []
	;

	// Let's mark all the completed nodes as deleting
	for( var i = todos.length - 1; i>= 0; i-- ){
		if( todos[i].model.completed ){
			// Pivoting makes us to have always the updated
			// reference to todos.
			todos = todos[i].ui.set({status: 'deleting'});
			toRemove.push( i );
		}
	}

	// Call the server
	setTimeout( function(){
		var todos = State.get().todos;

		// Remove all the completed children now.
		toRemove.forEach( function( i ){
			todos = todos.splice( i, 1 );
		});

		// Save the state in localStorage
		Utils.store('freezerTodos', State.get());
	}, lag);
});