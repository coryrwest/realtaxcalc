import React from 'react';
var Formsy = require('formsy-react');
var Checkbox = require('formsy-react-components').Checkbox;
import State from '../../state';

let GlobalSettingsComponent = React.createClass({
    updateOption: function(name, value) {
        State.trigger('setting:set', name, value, this.props.index);
    },
    shouldComponentUpdate: function( nextProps ){
		return nextProps.scenarioSettings != this.props.scenarioSettings;
	},
    render: function () {
      return (
            <Formsy.Form>
                <h3>Tax Options:</h3>
                <Checkbox name="displayState" rowLabel="Use State Tax"
                    value={this.props.scenarioSettings.displayState}
                    onChange={this.updateOption}/>
            </Formsy.Form>
      );
    }
});

module.exports = GlobalSettingsComponent;