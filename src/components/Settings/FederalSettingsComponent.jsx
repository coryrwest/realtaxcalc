var React = require('react');
var Formsy = require('formsy-react');
var FRC = require('formsy-react-components');
var State = require('../../state');

var Select = FRC.Select;
var Input = FRC.Input;
var Checkbox = FRC.Checkbox;

var FederalSettingsComponent = React.createClass({
    updateOption: function updateOption(name, value) {
        State.trigger('setting:set', name, value, 0);
    },
    render: function () {      
      return (
        <div>
            <Checkbox
                name="standardDeduction"
                value={this.props.state[0].standardDeduction}
                label=""
                rowLabel="Standard Deduction"
                onChange={this.updateOption}
                labelClassName={[{'col-sm-3': false}, 'col-sm-4']}
                elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-8']}
            />
            <div className={this.props.state[0].standardDeduction ? 'hidden' : 'visible'}>
                <Input
                    name="itemizedDeduction"
                    id="itemizedDeduction"
                    value={this.props.state[0].itemizedDeduction}
                    label="Itemized Deductions"
                    type="text"
                    onChange={this.updateOption}
                    labelClassName={[{'col-sm-3': false}, 'col-sm-4']}
                    elementWrapperClassName={[{'col-sm-9': false}, 'col-sm-8']}
                />
            </div>
        </div>
      );
    }
});

module.exports = FederalSettingsComponent;