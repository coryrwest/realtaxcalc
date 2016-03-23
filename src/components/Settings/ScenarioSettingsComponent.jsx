var React = require('react');
var Formsy = require('formsy-react');
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
    reset: function() {
        State.trigger('reset');
    },
    render: function () {
        return (
            <div>
                <Formsy.Form>
                    <Common state={this.props.state}/>
                    <FederalTax visible={this.props.state.displayFederal} state={this.props.state}/>
                    <StateTax visible={this.props.state.displayState} state={this.props.state}/>
                    <button className="btn btn-default" onClick={this.reset}>Reset Scenario</button>
                </Formsy.Form>
                <hr />
            </div>
        );
    }
});

module.exports = ScenarioSettingsComponent;