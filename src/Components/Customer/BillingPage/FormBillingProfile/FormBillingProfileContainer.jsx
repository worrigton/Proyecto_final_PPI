import {
	useState,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";
import { useRouter } from "next/router";

// Import own Components
import { bindAll }        from "~/Util";
import { useObjState }    from "~/Util/Hooks";
import Service            from "~/Service";
import AlertActions       from "~/Components/Alert/store/actions";
import FormBillingProfile from "./FormBillingProfile.jsx";

const BillingPageContainer = ({ alertActions, customerId }) => {
	const router  = useRouter();

	const [state, setState]         = useState([]);
	const [cities, setCities]       = useState([]);
	const [intNumber, setIntNumber] = useState("");
	const [submitBtn, setSubmitBtn] = useState(false);

	const [valuesAddress, setValuesAddress] = useObjState({
		checked      : false,
		label        : "",
		country      : "México",
		state        : null,
		city         : null,
		taxRegimen   : null,
		neighborhood : "",
		address      : "",
		zipCode      : "",
		extNumber    : "",
		telephone    : "",
		email        : "",
		rfc          : "",
	});

	const [flagsAddress, setFlagsAddress] = useObjState({
		taxRegimen   : false,
		state        : false,
		city         : false,
		neighborhood : false,
		address      : false,
		telephone    : false,
		zipCode      : false,
		extNumber    : false,
		rfc          : false,

	});

	const handleSelect = useCallback(name => (evnt, newInputValue) => {
		setValuesAddress({
			[name] : newInputValue != null ? newInputValue : null,
		});
		if (!flagsAddress[name]) {
			setFlagsAddress({ [name] : true });
		}
	}, [setValuesAddress, flagsAddress, setFlagsAddress]);

	const handleChange = useCallback(name => ({ target : { checked, value } }) => {
		if (name === "checked") {
			setValuesAddress({ [name] : checked });
		}
		else if (name == "intNumber") {
			setIntNumber(value);
		}
		else {
			setValuesAddress({ [name] : value });
		}
		if (!flagsAddress[name]) {
			setFlagsAddress({ [name] : true });
		}

	}, [flagsAddress, setFlagsAddress, setValuesAddress]);

	const validate = useCallback((input) => (
		(valuesAddress[input] === "" || valuesAddress[input] == null) && flagsAddress[input]
	) ? true : false, [valuesAddress, flagsAddress ]);


	/* VALID IF EM INPUT HAS BEEN TOUCHED AND IS EMPTY, return an error message */
	const validateText = useCallback((form, input) =>
		validate(form, input) ? "Se requiere este campo" : " ", [validate]
	);

	const validateEmail = useCallback(() => {
		const { email } = valuesAddress;
		// eslint-disable-next-line no-useless-escape
		return (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email) && flagsAddress.email) && email != "";
	}, [flagsAddress.email, valuesAddress]);

	const validateTextEmail = useCallback(() => validateEmail()
		? "El email que ingresó no es válido"
		: "",
	[validateEmail]);

	const formValidate = useCallback(() => {
		const status = Object.values(valuesAddress).some(item => (item === "" || item === null));
		return status || validateEmail();
	}, [valuesAddress, validateEmail]);

	const submit = useCallback(() => {
		( async () => {
			setSubmitBtn(true);
			alertActions.openAlert({
				message  : "Guardando tu información, espera",
				type     : "info",
				duration : 4000,
			});
			const response = await Service.api.customer.createBillingProfiles(valuesAddress, intNumber, customerId);
			if (response.status) {
				alertActions.openAlert({
					message  : "Perfil de facturación agregado",
					type     : "success",
					duration : 3000,
				}),
				router.push("/cliente/perfiles-de-facturacion");
			}
			else {
				alertActions.openAlert({
					message  : "Ups!, hubo un error al tratar de ingresar el perfil, inténtalo más tarde",
					type     : "warning",
					duration : 3000,
				});
			}
			setSubmitBtn(false);
		})();
	}, [alertActions, customerId, intNumber, router, valuesAddress]);

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

	useEffect(() => {
		if (state.length <= 0) {
			Service.api.getState(1, "page_size=50").then(data=>setState(data.collection));
		}
		if (valuesAddress.state == null) {
			setValuesAddress({ city : null });
		}
		const id = valuesAddress.state?.id || 0;
		Service.api.getCities(1, `page_size=800&state_id=${id}`)
			.then(data => setCities(data.collection));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [valuesAddress.state]);

	return (
		<FormBillingProfile delegations={{
			handleSelect,
			handleChange,
			validateText,
			validate,
			formValidate,
			submit,
			validateTextEmail,
			validateEmail,
			valuesAddress,
			intNumber,
			state,
			cities,
			submitBtn,
			taxReg,
		}} />

	);
};

BillingPageContainer.propTypes = {
	alertActions : PropTypes.object,
	customerId   : PropTypes.any,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

const mapStateToProps = ({ userReducer : { customer } }) => ({
	customerId : customer?.data?.customer.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(BillingPageContainer);
