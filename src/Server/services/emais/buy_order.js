const nodemailer = require("../mailer_service.js");

export const newBuyOrderNotificationEmail = async ({ to, html, subject }) => {
	try {
		const mailOptions = {
			from : "<info@mailer.montse.mx>", // sender address
			to,
			html,
			subject, // Subject line
		};

		nodemailer.transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				// throw { error };
				return;
			}
			return;
		});
	} catch (error) {
		throw {
			status  : 200,
			message : "El correo no pudo ser enviado exitosamente",
			error,
		};
	}
};
