var controllers = require('../../controllers/headline');
var controllersNotes = require('../../controllers/note');

module.exports = function(app) {
	app.get('/api/headlines', controllers.headlines);
	app.post('/api/headlines/save/:id', controllers.saveHeadline);
	app.put('/api/headlines/delete/:id', controllers.deleteHeadline);
	app.get('/api/headlines/:id', controllersNotes.getNotes);
	app.post('/api/headlines/:id', controllersNotes.saveNote);
	app.put('/api/headlines/:id/:note_id/', controllersNotes.deleteNote);
};