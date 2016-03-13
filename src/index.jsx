var React = require('react');
var ReactDOM = require('react-dom');
var ContainerComponent = require('./components/ContainerComponent.jsx');

var root = ReactDOM.render(
  <ContainerComponent/>,
  document.getElementById("react-container")
);