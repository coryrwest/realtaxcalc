var React = require('react');
var NavBarComponent = require('./NavBarComponent.jsx');
var BodyComponent = require('./BodyComponent.jsx');

require('../styles/style.scss');

var ContainerComponent = React.createClass({
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