import React from 'react';
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');
import Globals from '../../globals';
import State from '../../state';

const Select = FRC.Select;
const Input = FRC.Input;
const Checkbox = FRC.Checkbox;

let CommonSettingsComponent = React.createClass({
    updateOption: function updateOption(name, value) {
        State.trigger('setting:set', name, value, this.props.index);
    },
    render: function () {      
        return (
            <div>
                <Select
                    name="currentFilingStatus"
                    label="Filing Status"
                    value={this.props.state[this.props.index].currentFilingStatus}
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
                    value={this.props.state[this.props.index].agi}
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
                    value={this.props.state[this.props.index].dependents}
                    label="Dependents"
                    type="text"
                    onChange={this.updateOption}
                    labelClassName={[{'col-sm-3': false}, 'col-sm-4']}
                    elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-8']}
                />
                <Checkbox
                    name="personalExemp"
                    value={this.props.state[this.props.index].personalExemp}
                    label=""
                    rowLabel="Personal Exemption"
                    onChange={this.updateOption}
                    labelClassName={[{'col-sm-3': false}, 'col-sm-4']}
                    elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-8']}
                />
                <Checkbox
                    name="spouseExemp"
                    value={this.props.state[this.props.index].spouseExemp}
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