const { Model } = require('objection');
const Knex = require('knex');

const knex = Knex({
    client: 'pg',
    useNullAsDefault: true,
    searchPath: ['public', 'lookup'],
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    debug: process.env.DB_DEBUG === 'true'
});

Model.knex(knex);

export default Model;