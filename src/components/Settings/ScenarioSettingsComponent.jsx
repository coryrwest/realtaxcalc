var React = require('react');
var Formsy = require('formsy-react');
var FederalTax = require('./FederalSettingsComponent.jsx');
var StateTax = require('./StateSettingsComponent.jsx');
var Common = require('./CommonSettingsComponent.jsx');
var State = require('../../state');


var ScenarioSettingsComponent = React.createClass({
    updateOption: function(name, value) {
        State.trigger('setting:set', name, value, 0);
    },
    reset: function() {
        State.trigger('reset');
    },
    render: function () {
        return (
            <div>
                <Formsy.Form>
                    <Common state={this.props.state}/>
                    <h4>Federal Options</h4>
                    <FederalTax state={this.props.state}/>
                    <div className={this.props.state[0].displayState ? "visible" : "hidden"}>
                        <h4>State Options</h4>
                        <StateTax state={this.props.state}/>
                    </div>
                    <button className="btn btn-default" onClick={this.reset}>Reset Scenario</button>
                </Formsy.Form>
                <hr />
            </div>
        );
    }
});

module.exports = ScenarioSettingsComponent;