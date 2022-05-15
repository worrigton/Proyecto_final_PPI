
exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("state").del()
		.then(function() {
			// Inserts seed entries
			return knex("state").insert([
				{ id : 1, name : "Aguascalientes" },
				{ id : 2, name : "Baja California" },
				{ id : 3, name : "Baja California Sur" },
				{ id : 4, name : "Campeche" },
				{ id : 5, name : "Coahuila de Zaragoza" },
				{ id : 6, name : "Colima" },
				{ id : 7, name : "Chiapas" },
				{ id : 8, name : "Chihuahua" },
				{ id : 9, name : "Ciudad de México" },
				{ id : 10, name : "Durango" },
				{ id : 11, name : "Guanajuato" },
				{ id : 12, name : "Guerrero" },
				{ id : 13, name : "Hidalgo" },
				{ id : 14, name : "Jalisco" },
				{ id : 15, name : "México" },
				{ id : 16, name : "Michoacán de Ocampo" },
				{ id : 17, name : "Morelos" },
				{ id : 18, name : "Nayarit" },
				{ id : 19, name : "Nuevo León" },
				{ id : 20, name : "Oaxaca" },
				{ id : 21, name : "Puebla" },
				{ id : 22, name : "Querétaro" },
				{ id : 23, name : "Quintana Roo" },
				{ id : 24, name : "San Luis Potosí" },
				{ id : 25, name : "Sinaloa" },
				{ id : 26, name : "Sonora" },
				{ id : 27, name : "Tabasco" },
				{ id : 28, name : "Tamaulipas" },
				{ id : 29, name : "Tlaxcala" },
				{ id : 30, name : "Veracruz de Ignacio de la Llave" },
				{ id : 31, name : "Yucatán" },
				{ id : 32, name : "Zacatecas" },
			]);
		});
};
