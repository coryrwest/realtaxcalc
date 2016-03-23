var React = require('react');
var Utils = require('../utils');

var FedTaxScenario = require('../common/FedTaxScenario');
var TaxData = require('json!../data/2015-Fed.json');

var BracketDisplayComponent = React.createClass({
    getBracket: function() { 
        // Build scenario data
        var scenarioData = {
            agi : this.props.state.agi,
            personalExemp : this.props.state.personalExemp,
            spouseExemp : this.props.state.spouseExemp,
            dependents : this.props.state.dependents,
            deduction : this.props.state.standardDeduction ? true : 0,
            filingStatus : this.props.state.currentFilingStatus
        };
        
        this.scenario = new FedTaxScenario.default(TaxData, scenarioData);
               
        var taxTable = this.scenario.fedTaxTable;
        var brackets = taxTable.getBracket(this.props.state.currentFilingStatus, this.scenario.taxableIncome);
        this.bracketIndex = brackets[0];
        this.brackets = brackets[1];
    },
    render: function render() {
        this.getBracket();
        var index = this.bracketIndex;
        var bracketItems = this.brackets.map(function(bracket, i){
            return (
                <tr className={i === index ? 'active' : ''}>
                    <td>{Utils.cleanAndFormatMoney(bracket.bottom)}</td>
                    <td>{Utils.cleanAndFormatMoney(bracket.top)}</td>
                    <td>{Utils.twoDigitRound(bracket.taxRate * 100)} %</td>
                    <td>{Utils.cleanAndFormatMoney(bracket.flatTax)}</td>
                </tr>
            )
        });
        
        return (
            <div className="row">
                <div className="col-md-12">
                    <h3>Tax Bracket:</h3>
                    <table className="table table-striped data-table">
                        <tbody>
                            <tr>
                                <th>Bottom</th>
                                <th>Top</th>
                                <th>Tax Rate</th>
                                <th>Flat Tax</th>
                            </tr>
                            {bracketItems}
                        </tbody>
                    </table>  
                </div>
            </div>
        );
    }
});

module.exports = BracketDisplayComponent;