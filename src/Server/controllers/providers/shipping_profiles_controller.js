/* eslint-disable camelcase */
//Import Dependences
import { bookshelf } from "~/Server/database/db";

// Import Models
import ShippingProfilesModel from "~/Server/database/models/providers/shipping_profiles";


/**
 * Inserts a new Billing register into the database.
 *
 * @author  Cesar A. Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 * @param {{
 *     provider_id : number,
 *     state_id    : number,
 *     price       : number,
 *     frezee_tax  : number,
 *     min_weight   : number,
 *     max_weight   : number,
 *     transport   : string,
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} Returns a Promise which in case of success is fullfilled with the
 *                                   new record's database ID, otherwise rejects with some error.
*/
const create = async (body, transacting = undefined) => {
	async function doWork(t) {
		const attributes = {
			provider_id : body.provider_id,
			state_id    : body.state_id,
			price       : body.price,
			frezee_tax  : body.frezee_tax,
			min_weight  : body.min_weight,
			max_weight  : body.max_weight,
			transport   : body.transport,
		};

		const options = {
			transacting : t,
		};

		const shippingProfilesModel = await new ShippingProfilesModel().save(attributes, options);

		return { id : shippingProfilesModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

const update = async (body, transacting = undefined) => {
	async function doWork(t) {
		const attributes = {
			price      : body.price       || undefined,
			frezee_tax : body.frezee_tax  || undefined,
			min_weight : body.min_weight  || undefined,
			max_weight : body.max_weight  || undefined,
		};
		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		const shippingProfilesModel = await new ShippingProfilesModel({ id : body.id }).fetch(options);
		if (!shippingProfilesModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'billing profile' with ID [${ body.id }] was not found`,
				info    : { attributes },
			};
		}

		await shippingProfilesModel.save(attributes, options);

		return { id : shippingProfilesModel.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

const getShippingProfiles = async (id) => {
	try {

		const shippingProfilesModel = await new ShippingProfilesModel({ id : id })
			.query(function(builder) {
				builder.columns(
					"shipping_profiles.*",
				);
			}).fetch();

		const data = shippingProfilesModel.attributes;

		return data;

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
};

const getPage = async (query) => {
	try {
		const options = {
			withRelated : ["state"],
		};

		const column = query.order_by || "state_id";
		const order  = query.order || "DESC";

		const shippingProfilesCollection = await ShippingProfilesModel.query(function(builder) {
			builder.columns(
				"shipping_profiles.*"
			);

			if (query.provider_id) {
				builder
					.where("provider_id", query.provider_id)
					.whereIn("state_id", function() {
						this.select("rp.state_id")
							.from("region_provider as rp")
							.where("provider_id", query.provider_id);
					});
			}

			builder.orderBy(column, order);
		}).fetchAll(options);

		const collection = shippingProfilesCollection.models.map(shippingProfilesModel => {
			const state = shippingProfilesModel.related("state").attributes;
			shippingProfilesModel.attributes.state = state;
			return shippingProfilesModel.attributes;
		});

		if (query.group) {
			const collectionGroup = collection.reduce((accum, shippingProfile) => {
				if (!accum[shippingProfile.state.name]) {
					accum[shippingProfile.state.name] = [];
				}
				accum[shippingProfile.state.name].push(shippingProfile);
				return accum;
			}, {});
			return collectionGroup;
		}

		return collection;

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
};

const addShippingProfiles = async (providerId, stateId, transacting = undefined) => {
	const transportTypes = ["HEAVY", "NORMAL", "LIGHT"];
	async function doWork(t) {
		try {
			const options = { transacting : t };
			const shippingProfilesCollection =  await new ShippingProfilesModel()
				.query(function(builder) {
					builder
						.where("provider_id", providerId)
						.where("state_id", stateId);
				})
				.fetchAll(options);
			if (shippingProfilesCollection.models.length <= 0) {
				for (const transport of transportTypes) {
					await create({
						provider_id : providerId,
						state_id    : stateId,
						price       : 0,
						frezee_tax  : 0,
						min_weight  : 0,
						max_weight  : 0,
						transport,
					}, t);
				}
			}
			return;
		} catch (error) {
			return;
		}
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
};

module.exports = {
	create,
	update,
	getShippingProfiles,
	getPage,
	addShippingProfiles,
};
