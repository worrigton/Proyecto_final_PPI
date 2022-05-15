/* eslint-disable max-len */

exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("email").del()
		.then(function() {
			// Inserts seed entries
			return knex("email").insert([
				{
					id          : 1,
					name        : "Pedido Realizado",
					description : "Te enviaremos un email al finalizar tu pedido con las instrucciones para realizar el pago de tu pedido.",
					type        : "CUSTOMER",
				},
				{
					id          : 2,
					name        : "Pedido aprobado",
					description : "Te notificaremos automáticamente cuando el vendedor haya recibido tu pago.",
					type        : "CUSTOMER",
				},
				{
					id          : 3,
					name        : "Pedido preparado",
					description : "Te notificaremos automáticamente cuando el vendedor tenga listo tu pedido y haya inciado el envío a tu dirección seleccionada",
					type        : "CUSTOMER",
				},
				{
					id          : 4,
					name        : "Pedido entregado",
					description : "Te notificaremos automáticamente cuando hayamos finalizado tu pedido y puedas proceder a evaluar al vendedor.",
					type        : "CUSTOMER",
				},
				{
					id          : 5,
					name        : "Pedido rechazado",
					description : "Te notificaremos automáticamente si un vendedor ha cancelado alguno de tus pedidos y la razón por la que no procedió la venta.",
					type        : "CUSTOMER",
				},
				{
					id          : 6,
					name        : "Promociones",
					description : "Me gustaría recibir comunicaciones promocionales",
					type        : "CUSTOMER",
				},
			]);
		});
};
