var React = require('react');
var Formsy = require('formsy-react');
var Checkbox = require('formsy-react-components').Checkbox;
var FederalTax = require('./FederalSettingsComponent.jsx');
var StateTax = require('./StateSettingsComponent.jsx');
var Common = require('./CommonSettingsComponent.jsx');
var State = require('../state');

var TaxTable = require('../common/TaxTable');
var TaxData = require('json!../data/2015-Fed.json');

var SettingsComponent = React.createClass({
    submit: function (model) {
      console.log('Form Valid');    
      var table = new TaxTable.default(TaxData);
      var tax = table.determineBracketAndCalculateTax(this.props.state.currentFilingStatus, this.props.state.agi);
      var otherTax = table.calculateOtherTax(this.props.state.agi);
      
      this.updateOption('federalTax', tax);
      this.updateOption('FICA', otherTax);
      this.updateOption('totalTax', tax + otherTax);
      
      if(this.props.state.agi > 0 && this.props.state.totalTax > 0) {
        // Percent
        var percent = (this.props.state.totalTax / this.props.state.agi) * 100;
        this.updateOption('percentage', percent);
        
        // Take home pay
        var takeHome = this.props.state.agi - this.props.state.totalTax;
        this.updateOption('takeHomePay', takeHome);
    }
    },
    updateOption: function(name, value) {
        State.trigger('setting:set', name, value);
    },
    shouldComponentUpdate: function( nextProps ){
		return nextProps.state != this.props.state;
	},
    render: function () {
      return (
        <Formsy.Form onValid={this.submit}>
            <Checkbox name="displayFederal" rowLabel="Use Federal Tax"
                value={this.props.state.displayFederal}
                onChange={this.updateOption}/>
            <Checkbox name="displayState" rowLabel="Use State Tax"
                value={this.props.state.displayState}
                onChange={this.updateOption}/>
            <Common state={this.props.state}/>
            <FederalTax visible={this.props.state.displayFederal}/>
            <StateTax visible={this.props.state.displayState}/>
        </Formsy.Form>
      );
    }
});

module.exports = SettingsComponent;