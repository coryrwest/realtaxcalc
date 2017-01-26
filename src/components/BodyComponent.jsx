import React from 'react';
import State from '../state';
var ScenarioContainer = require('./ScenarioContainerComponent.jsx');

import '../reactions';
import '../styles/bs-callout.scss';

let BodyComponent = React.createClass({
    componentWillMount: function() {
        State.trigger('state:initialize');  
    },
    componentDidMount: function () {
        let me = this;
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
    resetAppData: function () {
        State.trigger('state:resetall');
    },
    render: function() {
        let state = State.get();
        
        return (
            <div className={state.scenarios.length > 3 ? 'container-fluid': 'container'}>
                <div className="row">
                    <div className="col-md-12">
                    <p className="bs-callout bs-callout-info">This tax calulator was built to give you a complete image of your tax burden. 
                        Including FICA and other state or local taxes that you will have to pay. Most other online calculators do not give 
                        you the full picture when you are trying to calculate your tax. This one tries to. This calculator focuses on the 
                        money that gets withheld from your paycheck in order to calculate take home pay. It does not attempt to account 
                        for decductions or other credits that you may have when filing your tax return.</p>
                    </div>
                </div>
                <div className="row">
                    {state.scenarios.map((e, i) => {
                        return <div className={state.scenarios.length == 3 ? 'col-md-4': state.scenarios.length == 4 ? 'col-md-3': 'col-md-6'}>
                            <div className="row">
                                <div className="col-md-12">
                                        <ScenarioContainer scenarioSettings={e} index={i} />
                                </div>
                            </div>
                        </div>
                    })}
                    <div className="col-md-6">
                        <div className="row">
                            <div className={state.scenarios.length < 4 ? "visible" : "hidden"}>
                                <button className="btn btn-default" onClick={this.addScenario}>Add Scenario</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div>
                                <button className="btn btn-default" onClick={this.resetAppData}>Reset Application Data</button>
                                <p>Use this button if the app is not working as expected to reset all saved data.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BodyComponent;