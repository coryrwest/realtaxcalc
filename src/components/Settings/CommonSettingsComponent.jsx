var React = require('react');
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');
var State = require('../../state');
var Globals = require('../../globals');

var Select = FRC.Select;
var Input = FRC.Input;
var Checkbox = FRC.Checkbox;

var CommonSettingsComponent = React.createClass({
    updateOption: function updateOption(name, value) {
        State.trigger('setting:set', name, value);
    },
    render: function () {      
      return (
        <div>
            <Select
                name="currentFilingStatus"
                label="Filing Status"
                value={this.props.state.currentFilingStatus}
                options={Globals.filingStatuses}
                required
                validations="isWords"
                validationError="Filing Status is required."
                onChange={this.updateOption}
            />
            <Input
                name="agi"
                id="agi"
                value={this.props.state.agi}
                label="Income"
                type="text"
                required
                validations="isNumeric"
                validationError="Income is required and must contain only numbers."
                onChange={this.updateOption}
            />
            <Input
                name="dependents"
                id="dependents"
                value=""
                label="Dependents"
                type="text"
                onChange={this.updateOption}
            />
            <Checkbox
                name="personalExemp"
                value={this.props.state.personalExemp}
                label="Personal Exemption"
                rowLabel="Personal Exemption"
                onChange={this.updateOption}
            />
            <Checkbox
                name="spouseExemp"
                value={this.props.state.spouseExemp}
                label="Spouse Exemption"
                rowLabel="Spouse Exemption"
                onChange={this.updateOption}
            />
        </div>
      );
    }
});

module.exports = CommonSettingsComponent;