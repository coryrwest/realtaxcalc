var React = require('react');
var NavBarComponent = require('./NavBarComponent.jsx');
var BodyComponent = require('./BodyComponent.jsx');
var State = require('../state');

require('../reactions');

var ContainerComponent = React.createClass({
    componentDidMount: function () {
        var me = this;

        // Here the magic happens. Everytime that the
        // state is updated the app will re-render.
        // A real data driven app.
        State.on('update', function(){
            console.log("State is updating");
            me.forceUpdate();
        });
    },
    render: function() {
        return (
            <div>
            <NavBarComponent /> 
            <BodyComponent />     
            </div>
        );
    }
});

module.exports = ContainerComponent;