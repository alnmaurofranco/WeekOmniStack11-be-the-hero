const knex = require("knex");
const configuration = require("../../knexfile");

const env_config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

const connection = knex(env_config);

module.exports = connection;
