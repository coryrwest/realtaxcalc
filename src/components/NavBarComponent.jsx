import React from 'react';

let NavBarComponent = React.createClass({
  render: function() {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        Real Tax Calculator
                    </a>
                </div>
            </div>
        </nav>
    );
  }
});

module.exports = NavBarComponent;