var apiRoutes = require("./api/apiRoutes");
var viewRoutes = require('./view/viewRoutes');

module.exports = function(app) {
	apiRoutes(app);
	viewRoutes(app);
}