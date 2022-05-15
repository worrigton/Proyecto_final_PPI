const nodemailer = require("../mailer_service.js");

export const sendMailSubscription = async ({ html, to, subject }) => {
	try {
		const mailOptions = {
			from : "Zoko <info@mailer.zoko.mx>", // sender address
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

export const sentMailPaymentsNotificacion = async ({ to, html, subject }) => {
	try {
		const mailOptions = {
			from : "Zoko <info@mailer.zoko.mx>", // sender address
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
