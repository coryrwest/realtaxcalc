var React = require('react');
var Formsy = require('formsy-react');
var Checkbox = require('formsy-react-components').Checkbox;
var Federal = require('./FederalSettingsComponent.jsx');
var State = require('../state');

var SettingsComponent = React.createClass({
  getInitialState: function () {
      return State.get()
    },
    submit: function (model) {
      alert(model.filingstatus);
    },
    changeOption: function(name, value) {
            console.log(name);
        State.trigger('setting:set', {name: value});
    },
    render: function () {
      return (
        <Formsy.Form onValidSubmit={this.submit}>
            <Checkbox name="federal" label="Use Federal Tax"
                value={this.state.displayFederal}
                onChange={this.props.changeOption}/>
            <Federal visible={this.state.displayFederal}/>
            <button className="btn btn-info" type="submit" disabled={!this.state.canSubmit}>Calculate</button>
        </Formsy.Form>
      );
    }
});

module.exports = SettingsComponent;