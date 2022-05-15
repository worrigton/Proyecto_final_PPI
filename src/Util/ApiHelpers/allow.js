const allow = method => (req, res) => {
	// If it is a string, the the requested method must be the string defined method
	// If it is an array, it must include the requested method
	if (
		(typeof method === "string" && req.method === method)
		|| (Array.isArray(method) && method.includes(req.method))
	) {
		// Continue with the next middlewares
		return;
	}

	// Bad request
	res.status(405).send("Method now allowed");
};

export default allow;
