import { knex } from "~/Server/database/db";

// Import Models
import HistoryPaymentModel from "~/Server/database/models/providers/history_payment";

export const getPage = async (query) => {
	try {
		const options = {
			pageSize : query.page_size > 0 && query.page_size <= 1000 ? query.page_size : 25,
			page     : query.page > 0 ? query.page : 1,
		};

		const column = query.order_by || "id";
		const order  = query.order || "DESC";

		const historyPaymentCollection = await HistoryPaymentModel.query(function(builder) {
			builder
				.columns(
					"history_payment.*",
					function() {
						this.select("s.name")
							.from("subscription AS s")
							.where("s.id", "=", knex.raw("history_payment.subscription_id"))
							.as("email");
					},
				)
				.where("payment_status", "PAID_OUT");

			if (query.provider_id) {
				builder
					.where("provider_id", query.provider_id);
			}

			builder.orderBy(column, order);
		}).fetchPage(options);

		const collection = historyPaymentCollection.models
			.map(shippingProfilesModel => shippingProfilesModel.attributes);

		return {
			collection : collection,
			pagination : historyPaymentCollection.pagination,
		};

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
};
