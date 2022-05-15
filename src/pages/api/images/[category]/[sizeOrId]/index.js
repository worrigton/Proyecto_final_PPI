/* eslint-disable */
import fs from "fs";

// Import Own Components
import {
	composeMiddlewares,
	allow,
} from "~/Util/ApiHelpers";
import ProductController from "~/Server/controllers/products/product_controller";
import UserController    from "~/Server/controllers/users/user_controller";

const ApiImages = async (req, res) => {
	const {
		sizeOrId : id,
		category,
	} = req.query;

	let imagePath = "";

	if (category === "users") {
		imagePath = await UserController.getImageUser({id});
	}
	if (category === "products") {
		imagePath = await ProductController.getImageProduct({file_id : id});
	}
	const imageStream = await fs.createReadStream(imagePath);
	imageStream.on("error", function(){});
	res.status(200);
	imageStream.pipe(res);
	res.on("error", function(){});
};

export default composeMiddlewares(
	allow("GET")
)(ApiImages);

