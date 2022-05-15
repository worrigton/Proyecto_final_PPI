const fs = require("fs");

exports.up = async function(knex, Promise) {
	// Tables.
	let tablesSql = fs.readFileSync("./src/Server/scripts/SQL/db_v0-10-0/tables.sql");

	tablesSql = tablesSql.toString("utf8")
		.split(/\r?\n/)
		.filter(str => str && !str.match(/^--.*$/ig))
		.join(" ")
		.split(";")
		.filter(str => typeof str == "string" && str.length > 0);

	for (const query of tablesSql) {
		await knex.schema.raw(query);
	}

	// Procedures.
	// var proceduresSql = fs.readFileSync("./scripts/SQL/db_v0-11-0/procedures.sql");

	// Triggers
	// var triggersSql = fs.readFileSync("./scripts/SQL/db_v0-11-0/triggers.sql");
};

exports.down = function(knex, Promise) {
	return Promise.resolve(knex);
};
