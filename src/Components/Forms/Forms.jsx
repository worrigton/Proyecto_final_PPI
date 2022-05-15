/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes     from "prop-types";
import { connect }   from "react-redux";
import { useRouter } from "next/router";
import {
	useState,
	useCallback,
	useEffect,
} from "react";

// Import Own Components
import AlertActions 	from "~/Components/Alert/store/actions";
import UserActions  	from "~/Store/UserStore/actions";
import LoaderActions 	from "~/Components/Loader/store/actions";
import Services     	from "~/Service";
import {
	bindAll,
	Base64,
	reverseCompose as c,
} from "~/Util";
import { useObjState } from "~/Util/Hooks";
import FormsContext    from "./context";
import StepRegistry    from "./StepRegistry";

const Forms = ({
	alertActions,
	userActions,
	loaderActions,
	steps,
	type,
	formData,
	// clientSecret,
}) => {
	const router = useRouter();
	const [showPassword, setShowPassword]   = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [submitBtn, setSubmitBtn]         = useState(false);
	const [response, setResponse]           = useState({});
	const [intNumber, setIntNumber]         = useState("");
	const [state, setState]                 = useState([]);
	const [cities, setCities]               = useState([]);
	const [subscription, setSubscription]   = useState([]);
	const [selectSubs, setSelectSubs]       = useState("");
	const [clientSecret, setClientSecret]   = useState("");
	const [coupon, setCoupon]               = useState("");
	const [couponInfo, setCouponInfo]       = useState();

	const [valuesAccount, setValuesAccount] = useObjState({
		firstName    : formData?.firstName || "",
		lastName     : formData?.lastName || "",
		username     : formData?.username || "",
		pwd          : formData?.pwd || "",
		pwd2         : formData?.pwd2 || "",
		email        : formData?.email || "",
		notification : formData?.notification || true,
	});

	const [valuesBillingProfile, setValuesBillingProfile] = useObjState({
		rfc        : "",
		taxRegimen : null,
		email      : "",
		legalName  : "",
		name       : "",
	});

	const [valuesAddress, setValuesAddress] = useObjState({
		state        : null,
		city         : null,
		neighborhood : "",
		address      : "",
		zipCode      : "",
		extNumber    : "",
		telephone    : "",
	});

	const [valuesProvider, setValuesProvider] = useObjState({
		tradeName  : "",
		storeEmail : "",
		legalName  : "",
		taxRegimen : "",
		rfc        : "",
	});

	const [flagsAccount, setFlagsAccount] = useObjState({
		firstName : false,
		lastName  : false,
		username  : false,
		pwd       : false,
		pwd2      : false,
		email     : false,
	});

	const [flagsBillingProfile, setFlagsBillingProfile] = useObjState({
		rfc        : false,
		taxRegimen : false,
		legalName  : false,
		name       : false,
	});

	const [flagsValuesProvider, setFlagsValuesProvider] = useObjState({
		tradeName : false,
		rfc       : false,
	});


	const [flagsAddress, setFlagsAddress] = useObjState({
		rfc          : false,
		taxRegimen   : false,
		state        : false,
		city         : false,
		neighborhood : false,
		address      : false,
		telephone    : false,
		zipCode      : false,
		extNumber    : false,
		email        : false,
	});

	const handleChange = useCallback(prop => ({ target : { checked, value } }) => {
		if (prop === "notification") {
			setValuesAccount({ [prop] : checked });
		}
		else {
			setValuesAccount({ [prop] : value });
			if (prop === "email") {
				setValuesBillingProfile({ email : value });
				setValuesProvider({ storeEmail : valuesAccount.email });
				setFlagsAddress({ email : true });

			}
			if (!flagsAccount[prop]) {
				setFlagsAccount({ [prop] : true });
			}
		}
		setValuesProvider({ tradeName : `${valuesAccount.firstName} ${valuesAccount.lastName}` });
		setValuesBillingProfile({ name : `${valuesAccount.firstName} ${valuesAccount.lastName}` });
		if (valuesBillingProfile.tradeName?.length > 0 ) {
			setFlagsBillingProfile({ tradeName : true });
		}
	}, [setValuesAccount, flagsAccount, setFlagsAccount]);

	const handleChangeProvider = useCallback(prop => ({ target : { checked, value } }) => {
		if (prop == "rfc") {
			setValuesProvider({ [prop] : value.toUpperCase() });
		} else {
			setValuesProvider({ [prop] : value });
		}

		if (!flagsValuesProvider[prop]) {
			setFlagsValuesProvider({ [prop] : true });
		}
	}, [setValuesProvider, flagsValuesProvider, setFlagsValuesProvider]);


	const handleChangeAddress = useCallback(prop => ({ target : { value } }) => {
		if (prop == "intNumber") {
			setIntNumber(value);
		}
		else {
			setValuesAddress({ [prop] : value });
			if (!flagsAddress[prop]) {
				setFlagsAddress({ [prop] : true });
			}
		}
	}, [setValuesAddress, flagsAddress, setFlagsAddress]);

	const handleCouponChange = useCallback(event => ({ target : { value } }) =>{
		setCoupon(value);
	});

	const handleSelect = useCallback(prop => (evnt, newInputValue) => {
		if (prop === "taxRegimen") {
			setValuesBillingProfile({
				[prop] : newInputValue != null ? newInputValue.props.value : null,
			});
			setValuesProvider({ taxRegimen : newInputValue.props.value });

			if (!flagsBillingProfile[prop]) {
				setFlagsBillingProfile({ [prop] : true });
			}
		}
		else {
			setValuesAddress({
				[prop] : newInputValue != null ? newInputValue : null,
			});
			if (!flagsAddress[prop]) {
				setFlagsAddress({ [prop] : true });
			}
		}
	}, [
		setValuesBillingProfile,
		flagsBillingProfile,
		setFlagsBillingProfile,
		setValuesAddress,
		flagsAddress,
		setFlagsAddress,
	]);

	const handleChangeBillingProfile = useCallback(prop => ({ target : { value } }) => {
		setValuesBillingProfile({ [prop] : value });
		if (!flagsBillingProfile[prop]) {
			setFlagsBillingProfile({ [prop] : true });
		}
	}, [
		setValuesBillingProfile,
		setFlagsBillingProfile,
		flagsBillingProfile,
	]);


	/* VALID IF EM INPUT HAS BEEN TOUCHED AND IS EMPTY, return an error event */
	const validate = useCallback((form, input) => {
		if (input == "username" && valuesAccount[input] && valuesAccount[input].length < 6) {
			return true;
		}
		if (input == "pwd" && valuesAccount[input] && valuesAccount[input].length < 6) {
			return true;
		}

		if (input == "rfc"  && valuesProvider[input] ) {
			if (!validateRFC(valuesProvider[input])) {
				return true;
			}
		}

		if ((input == "rfc" && form == "billing")  && valuesBillingProfile[input] ) {
			if (!validateRFC(valuesBillingProfile[input])) {
				return true;
			}
		}

		switch (form) {
			case "account":
				return valuesAccount[input] === "" && flagsAccount[input];
			case "billing":
				return valuesBillingProfile[input] === "" && flagsBillingProfile[input];
			case "address":
				return (
					(valuesAddress[input] === "" || valuesAddress[input] == null || validateEmail() ) &&
					flagsAddress[input]
				) ? true : false;
			case "provider":
				return valuesProvider[input] === "" && flagsValuesProvider[input];
			default:
				return false;
		}
	}, [
		valuesAccount,
		flagsAccount,
		valuesBillingProfile,
		flagsBillingProfile,
		valuesAddress,
		flagsAddress,
		valuesProvider,
		flagsValuesProvider,
	]);

	const validateEmail = useCallback(() => {
		const { email } = valuesAccount;
		// eslint-disable-next-line no-useless-escape
		return (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) && email != "";
	}, [valuesAccount]);

	const validateTextEmail = useCallback(() => validateEmail()
		? "El email que ingresó no es válido"
		: "",
	[validateEmail]);


	/* VALID IF EM INPUT HAS BEEN TOUCHED AND IS EMPTY, return an error message */
	const validateText = useCallback((form, input) => {
		if (input == "username" &&  valuesAccount[input] && valuesAccount[input].length < 6) {
			return "Debe tener al menos 6 letras.";
		}

		if (input == "pwd" && valuesAccount[input] && valuesAccount[input].length < 6) {
			return "Debe tener al menos 6 letras.";
		}

		if (input == "rfc"  && valuesProvider[input] ) {
			if (!validateRFC(valuesProvider[input])) {
				return "RFC invalido";
			}
		}

		if ((input == "rfc" && form == "billing")  && valuesBillingProfile[input] ) {
			if (!validateRFC(valuesBillingProfile[input])) {
				return "RFC invalido";
			}
		}
		return validate(form, input) ? "Se requiere este campo" : "";
	}, [validate]
	);

	const validateRFC = useCallback((string) => {
		let valid = "";
		if (string.length > 13) {
			return false;
		}
		if (string.length == 12) {
			valid = "^(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))";
		} else {
			valid = "^(([A-Z]|[a-z]|\\s){1})(([A-Z]|[a-z]){3})([0-9]{6})((([A-Z]|[a-z]|[0-9]){3}))";
		}
		const validRfc = new RegExp(valid);
		if (!string.match(validRfc)) {
			return false;
		}
		return true;
	}, []);

	/* FUNCTIONS TO DISPLAY OR HIDE THE PASSWORD */
	const handleClickShowPassword = useCallback(() => setShowPassword(prevState => !prevState), []);

	const handleClickShowPassword2 = useCallback(() => setShowPassword2(prevState => !prevState), []);

	const handleMouseDownPassword = useCallback((e) => {
		e.preventDefault();
	}, []);

	/* VALID IF BOTH PASSWORDS MATCH */
	const passwordValidate = !(valuesAccount.pwd === valuesAccount.pwd2);

	const formValidate = useCallback((activeStep) =>  {
		switch (activeStep) {
			case 0 : {
				const status = !Object.values(valuesAccount).some(item => item === "");
				return status && !passwordValidate ? false : true;
			}
			case 1 : {
				const status = !Object.values(valuesAddress).some(item => (item === "" || item === null));
				if (type === "customer") {
					let status2 = false;
					if (valuesBillingProfile.taxRegimen == "PHYSICAL" && valuesBillingProfile.legalName === "" ) {
						status2 = true;
					}
					if (valuesBillingProfile.taxRegimen == "MORAL" && valuesBillingProfile.legalName !== "" ) {
						status2 = false;
					}
					status2 = !Object.values(valuesBillingProfile).some(item => item === "");
					if (valuesBillingProfile.rfc) {
						status2 = validateRFC(valuesBillingProfile.rfc);
					}
					return status && status2 ? false : true;
				}
				else {
					let status2 = false;
					status2 = !Object.values(valuesProvider).some(item => item === "");
					if (valuesProvider.taxRegimen === "PHYSICAL" && valuesProvider.legalName === "" ) {
						status2 = true;
					}
					if (valuesProvider.rfc) {
						status2 = validateRFC(valuesProvider.rfc);
					}
					return status && status2 ? false : true;
				}
			}
			case 2 : {
				return selectSubs != "" ? false : true;
			}
			case 3 : {
				return false;
			}
			default :
				return false;
		}
	}, [
		valuesAccount,
		passwordValidate,
		valuesAddress,
		type,
		valuesBillingProfile,
		valuesProvider,
		selectSubs,
	]);

	/* LOGIN */
	const login = useCallback(async () => {

		const isStr = value => typeof value === "string";

		const response = await Services.api.login(valuesAccount.username, valuesAccount.pwd, type.toUpperCase());

		if (response && response.token && isStr(response.token)) {
			const { token } = response;
			const { data }  = c(token.split(".")[1], Base64.decode, JSON.parse) || {};

			userActions.updateUser({
				[type.toLowerCase()] : {
					token,
					data,
				},
			});

			alertActions.openAlert({
				message  : "¡Bienvenido!",
				type     : "success",
				duration : 2000,
			});
			// loaderActions.closeLoader();
			return router.push( type === "proveedor" ? "/proveedor/inicio" : "/cliente/inicio");
		}
	}, [
		alertActions,
		router,
		userActions,
		valuesAccount,
		type,
	]);

	/* MESSAGES */
	const message = useCallback((responseData) => {
		responseData = responseData || response;

		if (responseData.status) {
			alertActions.openAlert({
				message  : "Usuario Guardado con éxito",
				type     : "success",
				duration : 4000,
			});
			login();
		}
		else {
			setCoupon("");
			setCouponInfo();
			if (responseData?.body?.search("username_UNIQUE") != -1) {
				alertActions.openAlert({
					message  : "El nombre de usuario ya existe, intente ingresando otro",
					type     : "warning",
					duration : 5000,
				});
				setValuesAccount({ username : "" });
				loaderActions.closeLoader();
			}
			else if (responseData?.body?.search("email_UNIQUE") != -1) {
				alertActions.openAlert({
					message  : "El email ingresado ya existe, intente ingresando otro",
					type     : "warning",
					duration : 5000,
				});
				setValuesAccount({ email : "" });
				loaderActions.closeLoader();
			}
			else {
				alertActions.openAlert({
					message  : "Ups!, hubo un error al tratar de registrarte, inténtalo más tarde",
					type     : "warning",
					duration : 5000,
				});
				loaderActions.closeLoader();
			}
			setResponse(responseData);
		}
		setSubmitBtn(false);
	}, [response, alertActions, login, setValuesAccount]);


	/* SUBMIT REGISTRY */
	const submit = useCallback((setupIntent) => {
		loaderActions.openLoader({
			title    : "Creando cuenta",
			subtitle : "Ponte Comodo",
		});

		alertActions.openAlert({
			message  : "Guardando tu información, espera",
			type     : "info",
			duration : 4000,
		});
		if (type == "customer") {
			const service = Services.api.customer.registry(
				valuesAccount,
				valuesBillingProfile,
				valuesAddress,
				intNumber,
			);
			service.then((value) => {
				setResponse(value);
				message(value);
			});
		} else if (type == "provider") {
			const service = Services.api.provider.registry(
				valuesAccount,
				valuesAddress,
				valuesProvider,
				intNumber,
				selectSubs,
				setupIntent,
				couponInfo
			);
			service.then((value) => {
				setResponse(value);
				message(value);
			}).catch(() => {
				generateNewToken();
			});
		}
	}, [
		alertActions,
		type,
		valuesAccount,
		valuesBillingProfile,
		valuesAddress,
		intNumber,
		selectSubs,
		valuesProvider,
		message,
		couponInfo,
		coupon,
	]);

	const selectSubscription = useCallback(id => () => {
		setSelectSubs(id);
	}, [selectSubs]);

	const generateNewToken = useCallback(async () => {
		let response;
		if (couponInfo) {
			response = await Services.api.provider.generatePaymentToken(coupon);
		} else {
			response = await Services.api.provider.generatePaymentToken();
		}
		setClientSecret(response.body.payload.clientSecret);
	}, [couponInfo]);

	const validateCoupon = useCallback(async () => {
		try {
			const response = await Services.api.provider.validateCoupon(coupon);
			setCouponInfo(response.body.payload);
			if (response.status) {
				alertActions.openAlert({
					message  : "El cupón ha sido aplicado",
					type     : "success",
					duration : 3000,
				});
			} else {
				alertActions.openAlert({
					message  : "El cupón ingresado es invalido",
					type     : "warning",
					duration : 3000,
				});
			}
		} catch (error) {
			alertActions.openAlert({
				message  : "Ocurrio un error al procesar la informacíon",
				type     : "warning",
				duration : 3000,
			});
		}
	});

	useEffect(() => {
		generateNewToken();
	}, [couponInfo]);

	useEffect(() => {
		generateNewToken();
		if (state.length <= 0) {
			Services.api.getState(1, "page_size=50").then(data => setState(data.collection));
			Services.api.getSubscriptions().then(data => setSubscription(data.collection));
		}
		if (valuesAddress.state == null) {
			setValuesAddress({ city : null });
		}
		const id = valuesAddress.state?.id || 0;
		Services.api.getCities(1, `page_size=800&state_id=${id}`)
			.then(data => setCities(data.collection));
		const { suscriptionId } = router.query;
		if (suscriptionId) {
			const resultado = subscription.find( sub => sub.id == suscriptionId );
			setSelectSubs(resultado);
		}
	}, [valuesAddress.state, subscription]);

	return (
		<FormsContext.Provider value={{
			valuesAccount,
			valuesBillingProfile,
			valuesProvider,
			valuesAddress,
			flagsAccount,
			showPassword,
			showPassword2,
			passwordValidate,
			intNumber,
			submitBtn,
			state,
			cities,
			subscription,
			selectSubs,
			clientSecret,
			coupon,
			setIntNumber,
			handleChange,
			handleChangeAddress,
			handleChangeBillingProfile,
			handleChangeProvider,
			handleSelect,
			handleClickShowPassword,
			handleClickShowPassword2,
			validateEmail,
			validateTextEmail,
			handleMouseDownPassword,
			formValidate,
			validate,
			validateText,
			validateCoupon,
			couponInfo,
			selectSubscription,
			handleCouponChange,
			submit,
		}}>
			<StepRegistry
				steps={steps}
				reset={response}
				skip={formData?.skip || false}
				type={type}
			/>
			{/* <style global jsx>{`
				.MuiTypography-body2 {
					// text-transform: initial!important;
				},
				.MuiStepper-horizontal {
					background: transparent!important;
				}
			`}</style> */}
		</FormsContext.Provider>
	);
};

Forms.propTypes = {
	steps         : PropTypes.array.isRequired,
	type          : PropTypes.string.isRequired,
	alertActions  : PropTypes.object.isRequired,
	userActions   : PropTypes.object.isRequired,
	loaderActions : PropTypes.object.isRequired,
	formData      : PropTypes.object,
	clientSecret  : PropTypes.string.isRequired,
};

Forms.defaultProps = {
	formData : {},
};

const mapDispatchToProps = bindAll({
	AlertActions,
	UserActions,
	LoaderActions,
});

export default connect(null, mapDispatchToProps)(Forms);
