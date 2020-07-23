'use strict';

const config = require('config');

module.exports = {
    assetPrefix: config.get('staticBasePath'),
    distDir: '_next',
    useFileSystemPublicRoutes: false
};
