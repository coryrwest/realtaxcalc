var React = require('react');
var Formsy = require('formsy-react');
var Dropdown = require('./formInputs/Dropdown.jsx');

var FederalSettingsComponent = React.createClass({
    render: function () {      
      return (
        <div className={this.props.visible ? "visible" : "hidden"}>
            <Dropdown name="filingstatus" label="Filing Status"/>
        </div>
      );
    }
});

module.exports = FederalSettingsComponent;