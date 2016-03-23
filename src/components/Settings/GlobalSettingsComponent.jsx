var React = require('react');
var Formsy = require('formsy-react');
var Checkbox = require('formsy-react-components').Checkbox;
var State = require('../../state');

var GlobalSettingsComponent = React.createClass({
    updateOption: function(name, value) {
        State.trigger('setting:set', name, value);
    },
    shouldComponentUpdate: function( nextProps ){
		return nextProps.state != this.props.state;
	},
    render: function () {
      return (
        <Formsy.Form onValid={this.submit}>
            <h3>Tax Options:</h3>
            <Checkbox name="displayState" rowLabel="Use State Tax"
                value={this.props.state.displayState}
                onChange={this.updateOption}/>
        </Formsy.Form>
      );
    }
});

module.exports = GlobalSettingsComponent;