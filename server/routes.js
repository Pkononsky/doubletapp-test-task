const {parse} = require('url');

const Database = require('database').default;

const DB = new Database();

exports.default = app => {
    DB.init().then(() => {
        app.get('/', (_req, res) => res.renderPage('/studentsList'));

        app.get('/api/db/getAllGenders', DB.getAllGenders.bind(DB));
        app.get('/api/db/getAllGroups', DB.getAllGroups.bind(DB));
        app.get('/api/db/getAllSpecialty', DB.getAllSpecialty.bind(DB));
        app.get('/api/db/getAllColor', DB.getAllColor.bind(DB));
        app.get('/api/db/getAllStudents', DB.getAllStudents.bind(DB));
        app.get('/api/db/getAllStudentWithResolvedIds', DB.getAllStudentWithResolvedIds.bind(DB));

        app.get('/api/db/getGroupById', DB.getGroupById.bind(DB));
        app.get('/api/db/getSpecialtyById', DB.getSpecialtyById.bind(DB));
        app.get('/api/db/getColorById', DB.getColorById.bind(DB));

        app.post('/api/addStudentToDatabase', DB.addStudentToDatabase.bind(DB));

        app.delete('/api/deleteStudentFromDatabase', DB.deleteStudentFromDatabase.bind(DB));


        app.all('*', (req, res) => {
            const handleRequest = req.nextApp.getRequestHandler();
            const parsedUrl = parse(req.url, true);

            return handleRequest(req, res, parsedUrl);
        });
    });
};
