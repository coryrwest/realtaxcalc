var React = require('react');
var Formsy = require('formsy-react');
var classnames = require('classnames');

var Dropdown = React.createClass({
    mixins: [Formsy.Mixin],
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue: function (event) {
        this.setValue(event.currentTarget.value);
    },
    render: function () {
        // Set a specific className based on the validation
        // state of this component. showRequired() is true
        // when the value is empty and the required prop is
        // passed to the input. showError() is true when the
        // value typed is invalid
        // var classes = classNames('form-control', {
        //     'required': this.showRequired(),
        //     'error': this.showError()
        // });

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        var errorMessage = this.getErrorMessage();

        return (
            <div className="form-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <select className="form-control" name={this.props.name} onChange={this.changeValue} value={this.getValue()}>
                    <option value=""></option>
                    <option value="single">Single</option>
                    <option value="marriedJoint">Married Filing Jointly</option>
                    <option value="marriedSeparate">Married Filing Separately</option>
                </select>
                <span>{errorMessage}</span>
            </div>
        );
    }
});

module.exports = Dropdown;