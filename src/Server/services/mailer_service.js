/* eslint-disable import/extensions */
import settings   from "../settings.json";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	/* used this config if the email acount owner to other service mailer
	debug : true,
	host: 'mail.mvmmexico.com',
	port: 26,
	secure: false,
	tls : {
		rejectUnauthorized : false
	},
	*/
	service : "gmail",
	auth    : {
		user : settings.mail.user,
		pass : settings.mail.pass,
	},
});
