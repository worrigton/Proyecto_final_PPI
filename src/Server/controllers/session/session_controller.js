/* eslint-disable import/extensions */
/* eslint-disable camelcase */
import moment        from "moment";
import handlebars    from "handlebars";
import fs            from "fs";

import { bookshelf } from "~/Server/database/db";
import settings      from "~/Server/settings.json";

// Import Serivces
import TokenService from "../../services/token_service";

// Import Model
import UserModel      from "../../database/models/users/user";
import UserTokenModel from "../../database/models/users/user_token";

// Import Controllers
import UserController from "../../controllers/users/user_controller";

import { encrypt }               from "../../../Util";
import { requestChangePasswordEmail } from "~/Server/services/emais/auth_email";

const makeTemplateRequestSaleOrder = async function(data) {
	const handlebarTemplate = fs.readFileSync("src/Server/templates/change_password_request.handlebars", "utf8");
	const template          = handlebars.compile(handlebarTemplate)(data);

	return template;
};

/**
 * Looks for a valid user in the database or the super user in the administrator table and returns a token session.
 * The token payload contains the following information:
 *     {
 *         user : {
 *             id       : number,
 *             username : string,
 *             email    : string,
 *         } object,
 *         customer : {
 *             id : number
 *             first_name : string,
 *             last_name : string,
 *         }
 *     }
 * @author  Cesar A Herrera de la T.
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param {{
 *     user     : string[username | email],
 *     password : string
 * }} body - Contains the necessary information to do the login.
 * @return {Promise<{token : string}, Error>} On success fulfills a Promise with the generated token for the session,
 *                                            otherwise rejects with an error.
 */
async function login(body) {
	try {
		let contents;

		const options = {
			withRelated : [
				"customer",
				"employee",
				"provider.membership",
			],
		};

		const userModel = await UserModel.query(function(builder) {
			builder
				.where(function() {
					this.orWhere("username", body.user)
						.orWhere("email", body.user);
				})
				.where("delete", false);
		}).fetch(options);

		if (await UserController.verifyPassword(body.password, userModel.attributes.password)) {
			contents = {
				id              : userModel.attributes.id,
				username        : userModel.attributes.username,
				email           : userModel.attributes.email,
				type            : userModel.attributes.type,
				fileId          : userModel.attributes.id,
				passwordUpdated : userModel.attributes.password_updated,
			};

			if (userModel.attributes.type === "CUSTOMER") {
				const customerModel = userModel.related("customer");
				contents.customer = (({
					id,
					first_name,
					last_name,
				}) => ({
					id,
					first_name,
					last_name,
				}))(customerModel.attributes);
			} else if (userModel.attributes.type === "EMPLOYEE" || userModel.attributes.type === "ADMIN") {
				const employeeModel = userModel.related("employee");
				contents.employee = (({
					id,
					first_name,
					last_name,
				}) => ({
					id,
					first_name,
					last_name,
				}))(employeeModel.attributes);
			} else if (userModel.attributes.type === "PROVIDER") {
				const providerModel         = userModel.related("provider");
				const membershipCollections = providerModel.related("membership");
				const membership            = membershipCollections.models?.length > 0
					? membershipCollections.models[0].attributes
					: null;
				contents.provider = (({
					id,
					first_name,
					last_name,
					legal_name,
					trade_name,
					store_email,
				}) => ({
					id,
					first_name,
					last_name,
					legal_name,
					trade_name,
					store_email,
				}))(providerModel.attributes);
				contents.provider.membership = membership;
			}

			const token = TokenService.createToken(contents);

			return { token };
		} else {
			throw {
				status  : 400,
				label   : "LOGIN_ERROR",
				message : "Error al loguear",
				error   : "Contraseña incorrecta",
			};
		}
	} catch (err) {
		if (err.message === "EmptyResponse") {
			err.message = "El usuario no existe";
		}
		throw err && err.status && err.label ? err : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was an error with the database",
			error   : err,
		};
	}
}

/**
 * Creates a new change password request and send a email with the instructions for user
 * @param {{
 *     email : string
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} .
*/
function passwordRecoveryRequest(body, transacting = null) {
	async function doWork(t) {
		const expiration = moment().add(15, "minutes");
		const payload    = {
			email      : body.email,
			expiration : expiration.valueOf(),
		};
		const encrypted = encrypt(JSON.stringify(payload));
		const options = {
			transacting : t,
			require     : true,
		};
		const attributes = {
			type : "PASSWORD_RECOVERY",
		};
		const userModel = await UserModel.query(function(builder) {
			builder
				.columns(
					"id",
					"email",
					"username",
				)
				.where("email", body.email);
		}).fetch(options);

		// Verify if exist a current token for a user
		const userToken =
			await UserTokenModel.where("user_id", userModel.get("id")).fetch({ transacting : t, require : false });

		if (userToken) {
			const currentDate =  moment();
			const activeDate  =  moment(userToken.get("created_at")).add(1, "minutes");
			if (currentDate < activeDate) {
				throw { status : 409 };
			}
			await userToken.destroy({ transacting : t, require : true });
		}

		attributes.user_id      = userModel.get("id");
		attributes.active_token = encrypted.toString("base64");

		const userTokenModel = await new UserTokenModel().save(attributes, options);
		const emailTemplate  = await makeTemplateRequestSaleOrder({
			userName             : userModel.get("username"),
			recoveryPasswordLink : `${settings.settings.server_url}/recovery?token=${attributes.active_token}`,
		});

		requestChangePasswordEmail({
			to      : body.email,
			html    : emailTemplate,
			subject : "Restablecer contraseña",
		});

		return { id : userTokenModel.get("id") };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

/**
 * Change password token is valid
 * @param {{
 *     password : string,
 *     token    : string,
 * }} body - Constains the necesary information to create the new register.
 * @return {Promise.<number, Error>} .
*/
function passwordRecoveryConfirmation(body, transacting = undefined) {
	async function doWork(t) {
		const userToken = await UserTokenModel.where("active_token", body.token).fetch();

		const options = {
			transacting : t,
			method      : "update",
			patch       : true,
		};

		if (!userToken) {
			throw {
				status  : 409,
				label   : "TOKEN_ERROR",
				message : "provided token is not valid",
			};
		}

		const currentDate =  moment();
		const expiration  =  moment(userToken.created_at).add(15, "minutes");

		if (currentDate > expiration) {
			throw {
				status  : 409,
				label   : "TOKEN_EXPIRED",
				message : "Token expired",
			};
		}

		const userModel = await new UserModel({ id : userToken.get("user_id") }).fetch(options);
		const password  = await UserController.hashPassword(body.password);

		if (!userModel) {
			throw {
				status  : 409,
				label   : "NOT_FOUND",
				message : `Requested 'user' with ID [${ body.id }] was not found`,
			};
		}
		const response = await userModel.save({ password }, options);
		await userToken.destroy({ transacting : t, require : true });


		return { id : response.id };
	}

	return transacting
		? doWork(transacting)
		: bookshelf.transaction(doWork);
}

module.exports = {
	login,
	passwordRecoveryRequest,
	passwordRecoveryConfirmation,
};
