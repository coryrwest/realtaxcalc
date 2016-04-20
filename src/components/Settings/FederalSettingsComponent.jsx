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
                label=""
                rowLabel="Standard Deduction"
                onChange={this.updateOption}
                labelClassName={[{'col-sm-3': false}, 'col-sm-4']}
                elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-8']}
            />
        </div>
      );
    }
});

module.exports = FederalSettingsComponent;