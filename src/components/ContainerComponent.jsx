import React from 'react';
var NavBarComponent = require('./NavBarComponent.jsx');
var BodyComponent = require('./BodyComponent.jsx');

import '../styles/style.scss';

let ContainerComponent = React.createClass({
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