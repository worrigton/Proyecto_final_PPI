/* eslint-disable camelcase */
import {
	useState,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";

// Import own Components
import { bindAll }            from "~/Util";
import withStateLoaded        from "~/Store/withStateLoaded";
import Service                from "~/Service";
import AlertActions           from "~/Components/Alert/store/actions";
import EditFormBillingProfile from "./EditFormBillingProfile.jsx";


const EditFormBillingProfileContainer = ({ alertActions, userId }) => {
	const router = useRouter();

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

	const [billingProfileGeneral, setBillingProfile] = useState({
		states         : [],
		cities         : [],
		billingProfile : [],
		actState       : null,
		actCity        : null,
		actRegimen     : null,
		checked        : false,
	});
	const updateBillingProfile = useCallback(newState => setBillingProfile(prevState => ({
		...prevState,
		...newState,
	})), []);

	const {
		states,
		cities,
		billingProfile,
		actState,
		actCity,
		actRegimen,
		checked,
	} = billingProfileGeneral;

	const [submitBtn, setSubmitBtn] = useState(false);
	const [initial, setInitial]     = useState(false);

	useEffect(() => {
		(async () => {
			if (router.query) {
				const { body : billingProfile } = await Service.api.customer.detailsBillingProfiles(router.query.id);
				const { collection : states }   = await Service.api.getState(1, "page_size=50");

				const filterState  = states.filter(({ name }) => name == billingProfile.address?.state);
				const id           = filterState[0]?.id;

				const { collection : cities } = await Service.api.getCities(1, `page_size=800&state_id=${id}`);
				const filterCity              = cities.filter(item => item.name == billingProfile.address?.city);

				updateBillingProfile({
					states,
					cities,
					billingProfile,
					actState   : filterState[0],
					actCity    : filterCity[0],
					checked    : billingProfile.flags === "PREDETERMINED" ? true : false,
					actRegimen : taxReg.filter((item) => item.id == billingProfile.tax_regime)[0],
				});
			}
		})();
	}, [updateBillingProfile, router.query, taxReg]);

	const handleSelect = useCallback((name) => (evnt, newInputValue) => {
		const value = newInputValue != null ? newInputValue.name : null;
		if (name === "state") {
			updateBillingProfile({
				actCity        : null,
				actState       : newInputValue,
				billingProfile : {
					...billingProfile,
					address : {
						...billingProfile.address,
						state : value,
						city  : null,
					},
				},
			});
		} else if (name === "city") {
			updateBillingProfile({
				actCity        : newInputValue,
				billingProfile : {
					...billingProfile,
					address : {
						...billingProfile.address,
						city : value,
					},
				},
			});
		} else {
			updateBillingProfile({
				actRegimen     : newInputValue,
				billingProfile : {
					...billingProfile,
					tax_regime : newInputValue != null ? newInputValue.id : null,
				},
			});
		}
		if (!initial) {
			setInitial(true);
		}

	}, [initial, updateBillingProfile, billingProfile]);

	const hadleChecked = useCallback(({ target : { checked } }) => {
		updateBillingProfile({
			checked        : checked,
			billingProfile : {
				...billingProfile,
				flags : checked ? "PREDETERMINED" : null,
			},
		});
		if (!initial) {
			setInitial(true);
		}
	}, [billingProfile, initial, updateBillingProfile]);

	const handleChange = useCallback(name => ({ target : { value } }) => {
		updateBillingProfile({
			billingProfile : {
				...billingProfile,
				[name] : value,
			},
		});
		if (!initial) {
			setInitial(true);
		}
	}, [initial, updateBillingProfile, billingProfile]);

	const handleChangeAddress = useCallback(name => ({ target : { value } }) => {
		updateBillingProfile({
			billingProfile : {
				...billingProfile,
				address : {
					...billingProfile.address,
					[name] : value,
				},
			},
		});
		if (!initial) {
			setInitial(true);
		}
	}, [initial, updateBillingProfile, billingProfile]);

	const formValidate = useCallback(() => {
		const status = Object.values(billingProfile).some(item => (item === ""));

		let statusAddress = false;

		if (billingProfile.address) {
			const { address } = billingProfile;

			statusAddress = Object.entries(address).some(item => {
				if (item[0] != "int_number") {
					if (item[0] != "references") {
						return (item[1] === "" || item[1] == null);
					}
				}
			});
		}
		return (status || statusAddress) || !initial || validateEmail();
	}, [billingProfile, initial, validateEmail]);

	const submit = useCallback( async () => {
		setSubmitBtn(true);
		alertActions.openAlert({
			message  : "Guardando tu información, espera",
			type     : "info",
			duration : 4000,
		});
		const response = await Service.api.customer.updateBillingProfiles(billingProfile);

		if (response.status) {
			alertActions.openAlert({
				message  : "Se añadió correctamente el perfil de facturación",
				type     : "success",
				duration : 3000,
			});
		} else {
			alertActions.openAlert({
				message  : "Ups! hubo un error al editar tu información",
				type     : "warning",
				duration : 3000,
			});
		}
		router.push("/cliente/perfiles-de-facturacion");
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [alertActions, billingProfile]);

	/* VALID IF EM INPUT HAS BEEN TOUCHED AND IS EMPTY, return an error message */
	const validate = useCallback((input) => {
		if (billingProfile) {
			return !billingProfile[input] && initial;
		}
		else
			return false;
	}, [initial, billingProfile]);

	const validateAddress = useCallback((input) => {
		const { address } = billingProfile;
		if (address) {
			return !address[input] && initial;
		}
		else
			return false;
	}, [initial, billingProfile]);

	const validateText = useCallback((input) => validate(input)
		? "Se requiere este campo"
		: "",
	[validate]);

	const validateAddressText = useCallback((input) => validateAddress(input)
		? "Se requiere este campo"
		: "",
	[validateAddress]);

	const validateEmail = useCallback(() => {
		const { email } = billingProfile;
		// eslint-disable-next-line no-useless-escape
		return (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email) && initial) && email != "";
	}, [initial, billingProfile]);

	const validateTextEmail = useCallback(() => validateEmail()
		? "El email que ingresó no es válido"
		: "",
	[validateEmail]);

	useEffect(() => {
		(async () => {
			if (actState == null) {
				updateBillingProfile({ actState : null });
			}
			const id = actState?.id || 0;

			const { collection : cities } = await Service.api.getCities(1, `page_size=800&state_id=${id}`);

			updateBillingProfile({ cities });
		})();
	}, [billingProfile.state, actState, updateBillingProfile]);

	return (
		<EditFormBillingProfile delegations={{
			handleSelect,
			handleChange,
			handleChangeAddress,
			validateAddressText,
			validateAddress,
			validateEmail,
			validateText,
			validateTextEmail,
			validate,
			formValidate,
			submit,
			hadleChecked,
			actState,
			actCity,
			states,
			cities,
			submitBtn,
			billingProfile,
			initial,
			taxReg,
			actRegimen,
			checked,
		}} />

	);
};

EditFormBillingProfileContainer.propTypes = {
	alertActions : PropTypes.object,
	userId       : PropTypes.any,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

const mapStateToProps = ({ userReducer : { customer } }) => ({ userId : customer?.data?.customer.id });

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(EditFormBillingProfileContainer);
