/* eslint-disable camelcase */

// Import Models
import FileModel from "~/Server/database/models/info/file";

const EXEC_PATH = process.cwd().replace(/[\\]+/ig, "/");

const getFile = async (fileId) => {
	try {
		const fileModel = await new FileModel({ id : fileId })
			.query(function(builder) {
				builder.columns(
					"file.*",
				);
			}).fetch();

		const file = fileModel.attributes;

		return file;

	} catch (error) {
		throw error && error.status && error.label ? error : {
			status  : 500,
			label   : "DATABASE_ERROR",
			message : "There was a problem with the database",
			error   : error,
		};
	}
};

/**
 * Gets from the database a price list register according to the given ID.
 *
 * @author  Montserrat Delgado Alvarez
 * @version 0.10.0
 * @since   0.10.0
 *
 * @param fileId - Constains the necesary information to get image path.
 * @return {Promise.<{
 *     imagePath : string,
 * }, Error>} Returns a promise, in case of success is fullfilled with the found record attributes,
*            otherwise rejects image_not_found path.
*/
const downloadFile = async (fileId) => {
	try {
		const fileModel = await new FileModel({ id : fileId }).fetch();

		let imagePath = fileModel.attributes.path.replace(/[\\]+/ig, "/");

		imagePath = `${EXEC_PATH}/${imagePath}`;
		return imagePath;

	} catch (error) {
		// In case of error return a default image path for the products
		return error;
	}
};

module.exports = {
	getFile,
	downloadFile,
};
