const express = require('express');
const next = require('next');
const config = require('config');
const bodyParser = require('body-parser');

const render = require('middlewares/render').default;
const routes = require('../server/routes').default;

const app = express();
const nextApp = next({dev: process.env.NODE_ENV !== 'production'});

app.use(render(nextApp));

routes(app);

app.use((err, _req, res, _next) => {
    console.error(err.stack);

    res.sendStatus(500);
});

app.use(bodyParser.urlencoded({
    extended: true
}));

nextApp.prepare().then(() => {
    const port = config.get('port');

    app.listen(port, () => {
        console.info(`Server started on ${port}`);
        console.info(`Open http://localhost:${port}/`);
    });
});
