var React = require('react');
var GlobalSettings = require('./Settings/GlobalSettingsComponent.jsx');
var ScenarioSettings = require('./Settings/ScenarioSettingsComponent.jsx');
var Overview = require('./OverviewComponent.jsx');
var Bracket = require('./BracketDisplayComponent.jsx');
var State = require('../state');

var ScenarioContainerComponent = React.createClass({
    render: function() {
        return (
        <div className="settingsContainer">
            <div className="row">
                <div className="col-md-12">
                    <GlobalSettings state={this.props.state} index={this.props.index} />
                </div>
                <div className="col-md-12">
                    <ScenarioSettings state={this.props.state} index={this.props.index} />
                </div>
                <div className="col-md-12">
                    <Overview state={this.props.state} index={this.props.index} />
                </div>
                <div className="col-md-12">
                    <Bracket state={this.props.state} index={this.props.index} />
                </div>
            </div>
        </div>
        );
  }
});

module.exports = ScenarioContainerComponent;