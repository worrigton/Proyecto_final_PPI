const CronJob  = require("cron").CronJob;
const settings = require("../settings.json");

const paymentCronJob = async () => {
	const job = new CronJob("0 0 12 * * *", async () => {
		const response = await fetch(`${settings.settings.server_url}/api/providers/subscriptions/renewal`)
			.then(response => response.json());
		// eslint-disable-next-line no-console
		console.log(response);
	}, null, true, "America/Mexico_City");

	job.start();
};

module.exports = {
	paymentCronJob,
};

