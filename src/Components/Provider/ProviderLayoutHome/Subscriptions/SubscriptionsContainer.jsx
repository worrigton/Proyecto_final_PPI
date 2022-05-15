import { useEffect, useState } from "react";

// Import Own Components
import Service       from "~/Service";
import Subscriptions from "./Subscriptions";

const SubscriptionContainer = () => {
	const [subscriptions, setSubscriptions] = useState([]);

	useEffect(() => {
		(async () => {
			const { collection : subs } = await Service.api.getSubscriptions();
			setSubscriptions({ subs });
		})();
	}, []);

	return (
		<Subscriptions subscriptions={subscriptions} />
	);
};

export default SubscriptionContainer;
