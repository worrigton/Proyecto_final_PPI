/* eslint-disable camelcase */
/* eslint-disable import/extensions */
import jwt from "jsonwebtoken";

// Import Settings Config
import settings from "~/Server/settings.json";

const auth_validation = (validProfiles) => async (req, res) => {
	if (settings?.security?.disable_session_control || req.method == "HEAD" || req.method == "OPTIONS") {
		return;
	}

	if (req?.headers?.authorization) {
		const token = req?.headers?.authorization?.split(" ")[1];

		await jwt.verify(token, settings?.security?.jwt_key, (err, decoded) => {
			if (err) {
				return res.status(401).send({ message : "Token inválido" });
			}

			if (
				(typeof validProfiles === "string" && decoded.data.type !== validProfiles) ||
				(Array.isArray(validProfiles) && !validProfiles.includes(decoded.data.type))
			) {
				return res.status(401).send({ message : "Access Forbidden" });
			}

			req.decoded = decoded;
		});
	} else {
		return res.status(401).send({
			label   : "VALIDATION_ERROR",
			message : "Denied access you have to include a token",
		});
	}
};

export default auth_validation;
