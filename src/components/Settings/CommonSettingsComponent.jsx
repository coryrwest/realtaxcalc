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
        State.trigger('setting:set', name, value, 0);
    },
    render: function () {      
      return (
        <div>
            <Select
                name="currentFilingStatus"
                label="Filing Status"
                value={this.props.state[0].currentFilingStatus}
                options={Globals.filingStatuses}
                required
                validations="isWords"
                validationError="Filing Status is required."
                onChange={this.updateOption}
                labelClassName={[{'col-sm-3': false}, 'col-sm-4']}
                elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-8']}
            />
            <Input
                name="agi"
                id="agi"
                value={this.props.state[0].agi}
                label="Income"
                type="text"
                required
                validations="isNumeric"
                validationError="Income is required and must contain only numbers."
                onChange={this.updateOption}
                labelClassName={[{'col-sm-3': false}, 'col-sm-4']}
                elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-8']}
            />
            <Input
                name="dependents"
                id="dependents"
                value={this.props.state[0].dependents}
                label="Dependents"
                type="text"
                onChange={this.updateOption}
                labelClassName={[{'col-sm-3': false}, 'col-sm-4']}
                elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-8']}
            />
            <Checkbox
                name="personalExemp"
                value={this.props.state[0].personalExemp}
                label=""
                rowLabel="Personal Exemption"
                onChange={this.updateOption}
                labelClassName={[{'col-sm-3': false}, 'col-sm-4']}
                elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-8']}
            />
            <Checkbox
                name="spouseExemp"
                value={this.props.state[0].spouseExemp}
                label=""
                rowLabel="Spouse Exemption"
                onChange={this.updateOption}
                labelClassName={[{'col-sm-3': false}, 'col-sm-4']}
                elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-8']}
            />
        </div>
      );
    }
});

module.exports = CommonSettingsComponent;