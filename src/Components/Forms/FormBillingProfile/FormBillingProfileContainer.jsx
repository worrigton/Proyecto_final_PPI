import { useMemo } from "react";

// Import Own Components
import FormBillingProfile from "./FormBillingProfile";

const FormBillingProfileContainer = () => {

	const taxReg = useMemo(() => [
		{
			name : "Persona física",
			id   : "PHYSICAL",
		},
		{
			name : "Persona moral",
			id   : "MORAL",
		},
	], []);

	return (
		<FormBillingProfile
			delegations={{
				taxReg,
			}}
		/>
	);
};

export default FormBillingProfileContainer;
