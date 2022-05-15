/* eslint-disable camelcase */
import {
	useState,
	useCallback,
	useEffect,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";

// Import own Components
import { bindAll }     from "~/Util";
import withStateLoaded from "~/Store/withStateLoaded";
import Service         from "~/Service";
import AlertActions    from "~/Components/Alert/store/actions";
import GeneralPage     from "./GeneralPage.jsx";


const GeneralPageContainer = ({ alertActions, providerId }) => {
	const router = useRouter();

	const [generalState, setGeneralState] = useState({
		states   : [],
		cities   : [],
		userData : [],
		regions  : [],
		actState : null,
		actCity  : null,
	});
	const updateGeneralState = useCallback(newState => setGeneralState(prevState => ({
		...prevState,
		...newState,
	})), []);

	const {
		states,
		cities,
		userData,
		regions,
		actState,
		actCity,
	} = generalState;

	const [submitBtn, setSubmitBtn]         = useState(false);
	const [initial, setInitial]             = useState(false);
	const [regionPrevent, setRegionPrevent] = useState(false);

	useEffect(() => {
		(async () => {
			const { body : userData }     = await Service.api.provider.userDetails(providerId);
			const { collection : states } = await Service.api.getState(1, "page_size=50");

			const filterState  = states.filter(({ name }) => name == userData.address?.state);
			const id           = filterState[0]?.id;

			const arrayRegions = userData.regions?.reduce((acc, { state_id }) => [ ...acc, state_id ], []);
			const regionsProps = states.filter(({ id }) => arrayRegions && arrayRegions.indexOf(id) !== -1);

			const { collection : cities } = await Service.api.getCities(1, `page_size=800&state_id=${id}`);

			const filterCity = cities.filter(item => item.name == userData.address?.city);

			updateGeneralState({
				states,
				cities,
				userData,
				regions  : regionsProps,
				actState : filterState[0],
				actCity  : filterCity[0],
			});
		})();
	}, [updateGeneralState, providerId]);

	const handleSelect = useCallback((name) => (evnt, newInputValue) => {
		const value = newInputValue != null ? newInputValue.name : null;
		if (name === "state") {
			updateGeneralState({
				actCity  : null,
				actState : newInputValue,
				userData : {
					...userData,
					address : {
						...userData.address,
						state : value,
						city  : null,
					},
				},
			});
		} else {
			updateGeneralState({
				actCity  : newInputValue,
				userData : {
					...userData,
					address : {
						...userData.address,
						city : value,
					},
				},
			});
		}
		if (!initial) {
			setInitial(true);
		}

	}, [initial, updateGeneralState, userData]);

	const handleMultiSelect = useCallback((evnt, newInputValue) => {
		if (!initial) {
			setInitial(true);
			setRegionPrevent(true);
		}
		updateGeneralState({
			regions : [
				...newInputValue,
			],
		});
	}, [initial, updateGeneralState]);

	const handleChange = useCallback(name => ({ target : { value } }) => {
		updateGeneralState({
			userData : {
				...userData,
				[name] : value,
			},
		});
		if (!initial) {
			setInitial(true);
		}
	}, [initial, updateGeneralState, userData]);

	const handleChangeAddress = useCallback(name => ({ target : { value } }) => {
		updateGeneralState({
			userData : {
				...userData,
				address : {
					...userData.address,
					[name] : value,
				},
			},
		});
		if (!initial) {
			setInitial(true);
		}
	}, [initial, updateGeneralState, userData]);

	const formValidate = useCallback(() => {
		const status = Object.values(userData).some(item => (item === ""));

		let statusAddress = false;

		if (userData.address) {
			const { address } = userData;

			statusAddress = Object.entries(address).some(item => {
				if (item[0] != "int_number") {
					if (item[0] != "references") {
						return (item[1] === "" || item[1] == null);
					}
				}
			});
		}
		return (status || regions.length <= 0 || statusAddress) || !initial || validateEmail();
	}, [userData, regions.length, initial, validateEmail]);

	const submit = useCallback( async () => {
		setSubmitBtn(true);
		alertActions.openAlert({
			message  : "Guardando tu información, espera",
			type     : "info",
			duration : 4000,
		});
		const response = await Service.api.provider.providerUpdate(providerId, userData, regions, regionPrevent);

		if (response.status) {
			alertActions.openAlert({
				message  : "Tu información fue editada con éxito",
				type     : "success",
				duration : 4000,
			});
		} else {
			alertActions.openAlert({
				message  : "Ups! hubo un error al editar tu información",
				type     : "warning",
				duration : 4000,
			});
		}
		router.push("/proveedor/cuenta");
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [alertActions, providerId, userData, regions, regionPrevent]);

	/* VALID IF EM INPUT HAS BEEN TOUCHED AND IS EMPTY, return an error message */
	const validate = useCallback((input) => {
		if (userData) {
			return !userData[input] && initial;
		}
		else
			return false;
	}, [initial, userData]);

	const validateAddress = useCallback((input) => {
		const { address } = userData;
		if (address) {
			return !address[input] && initial;
		}
		else
			return false;
	}, [initial, userData]);

	const validateText = useCallback((input) => validate(input)
		? "Se requiere este campo"
		: "",
	[validate]);

	const validateAddressText = useCallback((input) => validateAddress(input)
		? "Se requiere este campo"
		: "",
	[validateAddress]);

	const validateEmail = useCallback(() => {
		const { store_email } = userData;
		// eslint-disable-next-line no-useless-escape
		return (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(store_email) && initial);
	}, [initial, userData]);

	const validateTextEmail = useCallback(() => validateEmail()
		? "El email que ingresó no es válido"
		: "",
	[validateEmail]);

	useEffect(() => {
		(async () => {
			if (actState == null) {
				updateGeneralState({ actState : null });
			}
			const id = actState?.id || 0;

			const { collection : cities } = await Service.api.getCities(1, `page_size=800&state_id=${id}`);

			updateGeneralState({ cities });
		})();
	}, [userData.state, actState, updateGeneralState]);

	return (
		<GeneralPage delegations={{
			handleSelect,
			handleChange,
			handleChangeAddress,
			handleMultiSelect,
			validateAddressText,
			validateAddress,
			validateEmail,
			validateText,
			validateTextEmail,
			validate,
			formValidate,
			submit,
			regionPrevent,
			actState,
			actCity,
			states,
			cities,
			submitBtn,
			userData,
			regions,
			initial,
		}} />

	);
};

GeneralPageContainer.propTypes = {
	alertActions : PropTypes.object,
	providerId   : PropTypes.any,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

const mapStateToProps = ({ userReducer : { provider } }) => ({ providerId : provider?.data?.provider.id });

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(GeneralPageContainer);
