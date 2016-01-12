var React = require('react');
var Settings = require('./SettingsComponent.jsx');

var NavBarComponent = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
            <div className="col-md-12">
               <p className="bs-callout bs-callout-info">This tax calulator was built to give you a complete image of your tax burden. 
                Including FICA and other state or local taxes that you will have to pay. 
                Most other online calculators do not give you the full picture when you are trying to calculate your tax. 
                This one does.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <Settings />
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                Inputs
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                Overview
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                Table
            </div>
        </div>
      </div>
    );
  }
});

module.exports = NavBarComponent;