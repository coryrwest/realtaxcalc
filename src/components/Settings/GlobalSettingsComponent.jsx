var React = require('react');
var Formsy = require('formsy-react');
var Checkbox = require('formsy-react-components').Checkbox;
var FederalTax = require('./FederalSettingsComponent.jsx');
var StateTax = require('./StateSettingsComponent.jsx');
var Common = require('./CommonSettingsComponent.jsx');
var State = require('../../state');

var TaxTable = require('../../common/TaxTable');
var TaxData = require('json!../../data/2015-Fed.json');

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
            <Checkbox name="displayState" rowLabel="Use State Tax"
                value={this.props.state.displayState}
                onChange={this.updateOption}/>
        </Formsy.Form>
      );
    }
});

module.exports = GlobalSettingsComponent;