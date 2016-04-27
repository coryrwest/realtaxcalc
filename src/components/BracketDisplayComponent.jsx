var React = require('react');
var Utils = require('../utils');

var TaxPicture = require('../common/TaxPicture');
var FedTaxData = require('json!../data/2015-Fed.json');
var StateTaxData = require('json!../data/2015-CA.json');

var BracketDisplayComponent = React.createClass({
    getBracket: function() {
        // Build scenario data
        var scenarioData = {
            agi : this.props.state[this.props.index].agi,
            personalExemp : this.props.state[this.props.index].personalExemp,
            spouseExemp : this.props.state[this.props.index].spouseExemp,
            dependents : this.props.state[this.props.index].dependents,
            deduction : this.props.state[this.props.index].standardDeduction ? true : 0,
            filingStatus : this.props.state[this.props.index].currentFilingStatus
        };
        
        this.picture = new TaxPicture.default(FedTaxData, StateTaxData, scenarioData);
               
        // Federal Brackets
        var fedTaxTable = this.picture.fed.taxTable;
        var fedBrackets = fedTaxTable.incomeTax.getBracket(this.props.state[this.props.index].currentFilingStatus, this.picture.fed.taxableIncome);
        this.fedBracketIndex = fedBrackets[0];
        this.fedBrackets = fedBrackets[1];
        
        // State Brackets
        var stateTaxTable = this.picture.state.taxTable;
        var stateBrackets = stateTaxTable.incomeTax.getBracket(this.props.state[this.props.index].currentFilingStatus, this.picture.state.taxableIncome);
        this.stateBracketIndex = stateBrackets[0];
        this.stateBrackets = stateBrackets[1];
    },
    render: function render() {
        this.getBracket();
        var fedIndex = this.fedBracketIndex;
        var fedBracketItems = this.fedBrackets.map(function(bracket, i){
            return (
                <tr className={i === fedIndex ? 'active' : ''}>
                    <td>{Utils.cleanAndFormatMoney(bracket.bottom)}</td>
                    <td>{Utils.cleanAndFormatMoney(bracket.top)}</td>
                    <td>{Utils.twoDigitRound(bracket.taxRate * 100)} %</td>
                    <td>{Utils.cleanAndFormatMoney(bracket.flatTax)}</td>
                </tr>
            )
        });
        
        var stateIndex = this.stateBracketIndex;
        var stateBracketItems = this.stateBrackets.map(function(bracket, i){
            return (
                <tr className={i === stateIndex ? 'active' : ''}>
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
                    <h3>Federal Tax Bracket:</h3>
                    <table className="table table-striped data-table">
                        <tbody>
                            <tr>
                                <th>Bottom</th>
                                <th>Top</th>
                                <th>Tax Rate</th>
                                <th>Flat Tax</th>
                            </tr>
                            {fedBracketItems}
                        </tbody>
                    </table> 
                    
                    <div className={this.props.state[this.props.index].displayState ? "visible" : "hidden"}> 
                        <h3>State Tax Bracket:</h3>
                        <table className="table table-striped data-table">
                            <tbody>
                                <tr>
                                    <th>Bottom</th>
                                    <th>Top</th>
                                    <th>Tax Rate</th>
                                    <th>Flat Tax</th>
                                </tr>
                                {stateBracketItems}
                            </tbody>
                        </table>  
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BracketDisplayComponent;