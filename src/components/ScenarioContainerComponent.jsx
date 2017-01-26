import React from 'react';
var GlobalSettings = require('./Settings/GlobalSettingsComponent.jsx');
var ScenarioSettings = require('./Settings/ScenarioSettingsComponent.jsx');
var Overview = require('./OverviewComponent.jsx');
var Bracket = require('./BracketDisplayComponent.jsx');
import State from '../state';

let ScenarioContainerComponent = React.createClass({
    removeScenario: function () {
        State.trigger('state:deleteScenario', this.props.index);
    },
    render: function() {
        return (
            <div className="settingsContainer">
                <div className="row">
                    <div className="col-md-12">
                        <GlobalSettings scenarioSettings={this.props.scenarioSettings} index={this.props.index} />
                    </div>
                    <div className="col-md-12">
                        <ScenarioSettings scenarioSettings={this.props.scenarioSettings} index={this.props.index} />
                    </div>
                    <div className="col-md-12">
                        <Overview scenarioSettings={this.props.scenarioSettings} index={this.props.index} />
                    </div>
                    <div className="col-md-12">
                        <Bracket scenarioSettings={this.props.scenarioSettings} index={this.props.index} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className={this.props.index != 0 ? "visible" : "hidden"}>
                                <button className="btn btn-default" onClick={this.removeScenario}>Remove Scenario</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
  }
});

module.exports = ScenarioContainerComponent;