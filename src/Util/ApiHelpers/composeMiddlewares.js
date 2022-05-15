const composeMiddlewares = (...middlewares) => callback => async (req, res) => {
	if (typeof req?.body === "string") {
		req.body = JSON.parse(req.body || "{}");
	}

	for (const receivedMiddleware of middlewares) {
		await receivedMiddleware(req, res);
	}

	callback(req, res);
};

export default composeMiddlewares;
