/* eslint-disable */
import {
	composeMiddlewares,
	allow,
} from "~/Util/ApiHelpers";
import fs                from "fs";
import fileController from "~/Server/controllers/files/file_controller.js";

const ApiImages = async (req, res) => {
	const {
		fileId
	} = req.query;

	let imagePath = await fileController.downloadFile(fileId);

	const imageStream = await fs.createReadStream(imagePath);
	imageStream.on("error", function(){});
	res.status(200);
	imageStream.pipe(res);
	res.on("error", function(){});
};

// export default ApiImages;
export default composeMiddlewares(
	allow("GET")
)(ApiImages);

