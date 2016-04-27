var React = require('react');
var ScenarioContainer = require('./ScenarioContainerComponent.jsx');
var State = require('../state');

require('../reactions');
require('../styles/bs-callout.scss');

var BodyComponent = React.createClass({
    componentWillMount: function() {
        State.trigger('state:initialize');  
    },
    componentDidMount: function () {
        var me = this;
        // Here the magic happens. Everytime that the
        // state is updated the app will re-render.
        State.on('update', function(){
            console.log("State is updating");
            me.forceUpdate();
        });
    },
    addScenario: function () {
        State.trigger('state:newScenario');
    },
    removeScenario: function () {
        State.trigger('state:deleteScenario');
    },
    render: function() {
        var state = State.get();
        
        var secScenario;
        if(state.length > 1) {
            secScenario = <ScenarioContainer state={state} index="1" />;
        }
        
        return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                <p className="bs-callout bs-callout-info">This tax calulator was built to give you a complete image of your tax burden. 
                    Including FICA and other state or local taxes that you will have to pay. 
                    Most other online calculators do not give you the full picture when you are trying to calculate your tax. 
                    This tries to.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <ScenarioContainer state={state} index="0" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className={state.length < 2 ? "visible" : "hidden"}>
                            <button className="btn btn-default" onClick={this.addScenario}>Add Scenario</button>
                        </div>
                        <div className={state.length > 1 ? "visible" : "hidden"}>
                            {secScenario}
                            <button className="btn btn-default" onClick={this.removeScenario}>Remove Scenario</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
  }
});

module.exports = BodyComponent;