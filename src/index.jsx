import React from 'react';
import ReactDOM from 'react-dom';
var ContainerComponent = require('./components/ContainerComponent.jsx');

var root = ReactDOM.render(
  <ContainerComponent/>,
  document.getElementById("react-container")
);