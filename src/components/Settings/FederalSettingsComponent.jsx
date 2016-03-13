var React = require('react');
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');
var State = require('../../state');

var Select = FRC.Select;
var Input = FRC.Input;
var Checkbox = FRC.Checkbox;

var FederalSettingsComponent = React.createClass({
    updateOption: function updateOption(name, value) {
        State.trigger('setting:set', name, value);
    },
    render: function () {      
      return (
        <div>
            <Checkbox
                name="standardDeduction"
                value={this.props.state.standardDeduction}
                label="Standard Deduction"
                rowLabel="Standard Deduction"
                onChange={this.updateOption}
            />
        </div>
      );
    }
});

module.exports = FederalSettingsComponent;