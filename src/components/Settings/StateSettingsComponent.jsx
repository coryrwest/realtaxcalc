import React from 'react';
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');
import Globals from '../../globals';
import State from '../../state';

const Select = FRC.Select;

let StateSettingsComponent = React.createClass({
    updateOption: function (name, value) {
        State.trigger('setting:set', name, value, this.props.index);
    },
    render: function () {
        return (
            <div>
                <Select
                    name="state"
                    label="Filing State"
                    value={this.props.scenarioSettings.state}
                    options={Globals.states}
                    required
                    validations="isWords"
                    validationError="Filing State is required."
                    onChange={this.updateOption}
                    labelClassName={[{ 'col-sm-3': false }, 'col-sm-4']}
                    elementWrapperClassName={[{ 'col-sm-9': false }, 'col-sm-8']}
                    />
            </div>
        );
    }
});

module.exports = StateSettingsComponent;