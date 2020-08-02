'use strict';

const packageMeta = require('../package.json');

module.exports = {
    debug: false,
    port: process.env.PORT,
    staticBasePath: '/',

    sequelizeOptions: {
        host: 'ruby.db.elephantsql.com',
        port: 5432,
        username: 'mdtcsphp',
        password: process.env.TAP_PASSWORD,
        database: 'mdtcsphp',

        ssl: true,

        dialect: 'postgres'
    }
};
