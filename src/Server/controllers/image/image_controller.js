/* eslint-disable no-console */
const fs = require("fs");

/**
 * Stores an image in the local file system.
 *
 * @param  {string} fileName - Image's full path name with extension.
 * @param  {Buffer} image - Contains the image data.
 * @return {Promise.<undefined, Error>} On success resolves a Promise without any data,
 *                                      otherwise rejects with some error.
 */
async function save(fileName, image) {
	try {
		await fs.open(fileName, "w+", function(err, fd) {
			if (err) {
				throw { ...err };
			}
			else {
				fs.writeFile(fd, image, function(err) {
					if (err) {
						throw { ...err };
					}
					else {
						fs.close(fd, function(err) {
							if (err) {
								throw { ...err };
							}
							else {
								return;
							}
						});
					}
				});
			}
		});
	} catch (error) {
		fs.unlink(fileName, function(unlinkingErr) {
			console.log("Warning! File System Error:", error);
			throw error?.status && error?.label ? error : {
				status  : 401,
				label   : "IMAGE_ERROR",
				message : "An error occurred while trying to upload the image",
				error   : error,
			};
		});
	}
}

/**
 * Stores a base64 image in the local file system.
 *
 * @param  {string} fileName - Image's full path name with extension.
 * @param  {string|Base64} base64Image - Contains the base64 image.
 * @return {Promise.<undefined, Error>} On success resolves a Promise without any data,
 *                                      otherwise rejects with some error.
 */
function saveFromBase64(fileName, base64Image) {
	return save(fileName, new Buffer.from(base64Image, "base64"));
}

/**
 * Loads an image identified by its fileName from the local file system.
 * If the requested image does not exist the result will be null
 *
 * @param  {string} fileName - Image's full path name with extension.
 * @return {Promise.<?Buffer, Error>} On success resolves with a buffer which contains the raw image data,
 *                                    otherwise rejcts wih some error.
 */
async function load(fileName) {
	fs.access(fileName, function(err) {
		if (err) {
			return;
		}
		fs.readFile(fileName, function(err, image) {
			if (err) {
				throw  { ...err };
			}
			else {
				return (new Buffer.from(image, "binary"));
			}
		});
	});
}

/**
 * Loads an image identified by its fileName from the local file system.
 * If the requested image does not exist the result will be null
 * The file is loaded as a base64 encoded string.
 *
 * @param  {string} fileName - Image's full path name with extension.
 * @return {Promise.<string|Base64, Error>} On success resolves with a Base64 encoded string,
 *                                          otherwise rejcts wih some error.
 */
async function loadAsBase64(fileName) {
	try {
		const imageBuffer = load(fileName);
		if (imageBuffer) {
			const extension = fileName.split(".").pop();
			return (`data:image/${  extension  };base64,${  imageBuffer.toString("base64")}`);
		}
	} catch (error) {
		throw  { ...error };
	}
}

/**
 * Removes the image file from the file system.
 *
 * @param  {string} fileName - Image's full path name with extension.
 * @return {Promise.<undefined, Error>} On success resolves a Promise without any data,
 *                                      otherwise rejects with some error.
 */
async function remove(fileName) {
	await fs.unlink(fileName, function(err) {
		if (err) {
			console.log("Warning! File System Error:", err);
		}
		return;
	});
}

module.exports = {
	save,
	saveFromBase64,
	load,
	loadAsBase64,
	remove,
};
