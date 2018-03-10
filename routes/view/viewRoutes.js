var controllers = require('../../controllers/headline');
var controllersA = require('../../controllers/fetch');

module.exports = function(app) {
	app.get('/', controllers.home);
	app.get('/fetch', controllersA.fetch);
}