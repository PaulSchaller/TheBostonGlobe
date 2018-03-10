var controllers = require('../../controllers/headline');

module.exports = function(app) {
	app.get('/headlines', controllers.headlines)
}