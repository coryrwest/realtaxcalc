var React = require('react');
var Formsy = require('formsy-react');

var FederalSettingsComponent = React.createClass({
    render: function () {      
      return (
        <div className={this.props.visible ? "visible" : "hidden"}>
            <input type="text" placeholder="Exemptions"></input>
        </div>
      );
    }
});

module.exports = FederalSettingsComponent;