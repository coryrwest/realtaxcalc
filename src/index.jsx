var React = require('react');
var ReactDOM = require('react-dom');
var ContainerComponent = require('./components/ContainerComponent.jsx');

var root = ReactDOM.render(
  <ContainerComponent/>,
  document.getElementById("react-container")
);

if (module.hot) {
  require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
    getRootInstances: function () {
      // Help React Hot Loader figure out the root component instances on the page:
      return [root];
    }
  });
}