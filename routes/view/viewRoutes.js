var controllers = require('../../controllers/headline');
var controllersA = require('../../controllers/fetch');

module.exports = function(app) {
	app.get('/', controllers.home);
	app.post('/fetch', controllersA.fetch);
};