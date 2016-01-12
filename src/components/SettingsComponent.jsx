var React = require('react');
var Formsy = require('formsy-react');
var Checkbox = require('formsy-react-components').Checkbox;
var Federal = require('./FederalSettingsComponent.jsx');

var SettingsComponent = React.createClass({
  getInitialState: function () {
      return {
        canSubmit: true,
        displayFederal: true
      }
    },
    enableButton: function () {
      this.setState({
        canSubmit: true
      });
    },
    disableButton: function () {
      this.setState({
        canSubmit: false
      });
    },
    submit: function (model) {
      alert(model.filingstatus);
    },
    changeOption: function(name, value) {
        var newState = {};
        newState[name] = value;
        this.setState(newState);
    },
    render: function () {
      return (
        <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
            <Checkbox name="federal" label="Use Federal Tax" value={this.state.displayFederal}
                onChange={this.props.changeOption}/>
            <Federal visible={this.state.displayFederal}/>
            <button type="submit" disabled={!this.state.canSubmit}>Calculate</button>
        </Formsy.Form>
      );
    }
});

module.exports = SettingsComponent;