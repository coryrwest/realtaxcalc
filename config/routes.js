var index = require('../controllers/home');

var routes = function routes(app, config) {
	app.get('/', index.home);
};

module.exports = routes;