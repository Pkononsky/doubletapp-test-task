exports.default = nextApp => (req, res, next) => {
    req.nextApp = nextApp;
    res.renderPage = (pathname, query) => {
        nextApp.render(req, res, pathname, query);
    };


    next();
};
