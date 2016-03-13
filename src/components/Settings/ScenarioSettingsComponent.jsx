var React = require('react');
var Formsy = require('formsy-react');
var Checkbox = require('formsy-react-components').Checkbox;
var FederalTax = require('./FederalSettingsComponent.jsx');
var StateTax = require('./StateSettingsComponent.jsx');
var Common = require('./CommonSettingsComponent.jsx');
var State = require('../../state');

var ScenarioSettingsComponent = React.createClass({
    updateOption: function(name, value) {
        State.trigger('setting:set', name, value);
    },
    shouldComponentUpdate: function(nextProps) {
		return nextProps.state.agi != this.props.state.agi;
	},
    render: function () {
        return (
            <Formsy.Form>
                <Common state={this.props.state}/>
                <FederalTax visible={this.props.state.displayFederal} state={this.props.state}/>
                <StateTax visible={this.props.state.displayState} state={this.props.state}/>
            </Formsy.Form>
        );
    }
});

module.exports = ScenarioSettingsComponent;