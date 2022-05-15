const settings = require("../settings");

const dbConfig = {
	client     : "mysql",
	connection : {
		host     : settings.database.host,
		port     : settings.database.port,
		user     : settings.database.user,
		password : settings.database.password,
		database : settings.database.database,
		charset  : settings.database.charset,
	},
	pool : {
		min : settings.database.pooling.minimum,
		max : settings.database.pooling.maximum,
	},
	acquireConnectionTimeout : settings.database.connectionTimeout,
	migrations               : {
		directory : "src/Server/migrations",
		tableName : "_migrations",
	},
	seeds : {
		directory : "src/Server/seeds",
	},
	debug : settings.debug,
};

const knex      = require("knex")(dbConfig);
const bookshelf = require("bookshelf")(knex);

// bookshelf.plugin("registry");
// bookshelf.plugin("pagination");

module.exports = {
	dbConfig  : dbConfig,
	knex      : knex,
	bookshelf : bookshelf,
};
