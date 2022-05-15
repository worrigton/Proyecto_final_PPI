/* eslint-disable camelcase */
exports.seed = async (knex) => {
	// Deletes ALL existing entries
	await knex("subscription").insert([
		{
			id                      : 1,
			name                    : "Hasta 10 productos",
			price                   : 500,
			quantity_product        : 10,
			quantity_product_status : "LIMITED",
		},
		{
			id                      : 2,
			name                    : "Hasta 20 productos",
			price                   : 900,
			quantity_product        : 20,
			quantity_product_status : "LIMITED",
		},
		{
			id                      : 3,
			name                    : "Hasta 40 productos",
			price                   : 1600,
			quantity_product        : 40,
			quantity_product_status : "LIMITED",
		},
		{
			id                      : 4,
			name                    : "Más de 100 productos",
			price                   : 2500,
			quantity_product        : 100,
			quantity_product_status : "UNLIMITED",
		},
	]);

	await knex("subscription_feature").insert([
		{
			id              : 1,
			subscription_id : 1,
			description     : "Perfecto para proveedores en crecimiento.",
		},
		{
			id              : 2,
			subscription_id : 1,
			description     : "Publica de 1 a 10 productos.",
		},
		{
			id              : 3,
			subscription_id : 1,
			description     : "Oferta hasta 9 variedades para cada uno de tus productos.",
		},
		{
			id              : 4,
			subscription_id : 2,
			description     : "Perfecto para pequeños proveedores locales.",
		},
		{
			id              : 5,
			subscription_id : 2,
			description     : "Publica de 1 a 20 productos.",
		},
		{
			id              : 6,
			subscription_id : 2,
			description     : "Oferta hasta 9 variedades para cada uno de tus productos.",
		},
		{
			id              : 7,
			subscription_id : 3,
			description     : "Perfecto para proveedores de materia prima de gran catálogo.",
		},
		{
			id              : 8,
			subscription_id : 3,
			description     : "Publica de 1 a 40 productos.",
		},
		{
			id              : 9,
			subscription_id : 3,
			description     : "Oferta hasta 9 variedades para cada uno de tus productos.",
		},
		{
			id              : 10,
			subscription_id : 4,
			description     : "Perfecto para proveedores de cualquier tamaño que busquen potencializar sus ventas.",
		},
		{
			id              : 11,
			subscription_id : 4,
			description     : "Publica productos de manera ilimitada.",
		},
		{
			id              : 12,
			subscription_id : 4,
			description     : "Oferta variedades ilimitadas para cada uno de tus productos.",
		},
	]);
};
