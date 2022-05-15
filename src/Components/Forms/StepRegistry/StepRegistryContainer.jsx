import { useState, useEffect } from "react";
import PropTypes               from "prop-types";

// Import Own Components
import FormAccount        from "~/Components/Forms/FormAccount";
import FormBillingProfile from "~/Components/Forms/FormBillingProfile";
import FormProvider       from "~/Components/Forms/FormProvider";
import FormSubscription   from "~/Components/Forms/FormSubscription";
import FormPay            from "~/Components/Forms/FormPay";
import StepRegistry       from "./StepRegistry.jsx";

function getStepText(step, type) {
	switch (step) {
		case 0:
			return "Crear cuenta";
		case 1:
			return type === "customer" ? "Facturación" : "Información General";
		case 2:
			return "Subscripción";
		case 3:
			return "Confirmar";
		default:
			return "";
	}
}

function getStepContent(step, type) {
	switch (step) {
		case 0:
			return <FormAccount />;
		case 1:
			return type === "customer" ? <FormBillingProfile /> : <FormProvider />;
		case 2:
			return <FormSubscription />;
		case 3:
			return <FormPay />;
		default:
			return <></>;
	}
}

const StepRegistryContainer = ({ steps, reset, skip, type }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped]       = useState();
	const [submitBtn, setSubmitBtn]   = useState(false);

	const handleNext = (e) => {
		e.preventDefault();

		const newSkipped = skipped;
		if (skipped) {
			newSkipped.delete(activeStep);
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	useEffect(() => {
		if (skip)
			setActiveStep(1);
		else
			setActiveStep(0);
	}, [reset, skip, submitBtn]);

	return (
		<StepRegistry
			delegations={{
				handleNext,
				handleBack,
				getStepContent,
				getStepText,
				activeStep,
				skipped,
				submitBtn,
				setSubmitBtn,
			}}
			steps={steps}
			type={type}
		/>
	);
};

StepRegistryContainer.propTypes = {
	steps : PropTypes.array,
	reset : PropTypes.any,
	skip  : PropTypes.bool,
	type  : PropTypes.string,
};

StepRegistryContainer.defaultProps = {
	steps : [],
};

export default StepRegistryContainer;
