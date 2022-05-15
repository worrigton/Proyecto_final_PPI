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
		id,
		sizeOrId : size,		
		category,
	} = req.query;

	let imagePath = "";
	console.log(category);
	if (category === "users") {
		imagePath = await UserController.getImageUser({id, size});
	}
	if (category === "products") {
		imagePath = await ProductController.getImageProduct({file_id : id, size});
	}
	const imageStream = await fs.createReadStream(imagePath);
	imageStream.on("error", function(error) {
		res.status(400).send({"error" : error.code, "label" : error.path});
	});
	res.status(200);
	imageStream.pipe(res);
	res.on("error", function(error) {
		res.status(400).send(error);
	});
};

export default composeMiddlewares(
	allow("GET")
)(ApiImages);
