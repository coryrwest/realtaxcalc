import React from 'react';
var Formsy = require('formsy-react');
var FederalTax = require('./FederalSettingsComponent.jsx');
var StateTax = require('./StateSettingsComponent.jsx');
var Common = require('./CommonSettingsComponent.jsx');
import State from '../../state';

let ScenarioSettingsComponent = React.createClass({
    updateOption: function(name, value) {
        State.trigger('setting:set', name, value, this.props.index);
    },
    reset: function() {
        State.trigger('scenario:reset');
    },
    render: function () {
        return (
            <div>
                <Formsy.Form>
                    <Common state={this.props.state} index={this.props.index}/>
                    <h4>Federal Options</h4>
                    <FederalTax state={this.props.state} index={this.props.index}/>
                    <div className={this.props.state[this.props.index].displayState ? "visible" : "hidden"}>
                        <h4>State Options</h4>
                        <StateTax state={this.props.state} index={this.props.index}/>
                    </div>
                    <button className="btn btn-default" onClick={this.reset}>Reset Scenario</button>
                </Formsy.Form>
                <hr />
            </div>
        );
    }
});

module.exports = ScenarioSettingsComponent;