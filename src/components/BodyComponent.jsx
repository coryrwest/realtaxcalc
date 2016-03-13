var React = require('react');
var GlobalSettings = require('./Settings/GlobalSettingsComponent.jsx');
var ScenarioSettings = require('./Settings/ScenarioSettingsComponent.jsx');
var Overview = require('./OverviewComponent.jsx');
var State = require('../state');

require('../reactions');
require('../styles/bs-callout.scss');

var BodyComponent = React.createClass({
    componentDidMount: function () {
        var me = this;
        // Here the magic happens. Everytime that the
        // state is updated the app will re-render.
        State.on('update', function(){
            console.log("State is updating");
            me.forceUpdate();
        });
    },
    render: function() {
        var state = State.get();
      
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                <p className="bs-callout bs-callout-info">This tax calulator was built to give you a complete image of your tax burden. 
                    Including FICA and other state or local taxes that you will have to pay. 
                    Most other online calculators do not give you the full picture when you are trying to calculate your tax. 
                    This one does.</p>
                </div>
                <div className="col-md-6">
                    <GlobalSettings state={state} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <ScenarioSettings state={state} />
                        </div>
                        <div className="col-md-12">
                            <Overview state={state} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <button className="btn btn-default">Add Scenario</button>
                    </div>
                </div>
            </div>
        </div>
        );
  }
});

module.exports = BodyComponent;