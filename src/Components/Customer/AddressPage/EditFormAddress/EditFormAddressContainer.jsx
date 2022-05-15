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
import EditFormAddress from "./EditFormAddress.jsx";


const EditFormAddressContainer = ({ alertActions, userId }) => {
	const router = useRouter();

	const [editAddressGeneral, setEditAddressGeneral] = useState({
		states    : [],
		cities    : [],
		addresses : [],
		actState  : null,
		actCity   : null,
		checked   : false,
	});
	const updateCustomerAddress = useCallback(newState => setEditAddressGeneral(prevState => ({
		...prevState,
		...newState,
	})), []);

	const {
		states,
		cities,
		addresses,
		actState,
		actCity,
		checked,
	} = editAddressGeneral;

	const [submitBtn, setSubmitBtn] = useState(false);
	const [initial, setInitial]     = useState(false);

	useEffect(() => {
		(async () => {
			if (router.query) {
				const  { body : addresses }   = await Service.api.customer.detailsCustomerAddress(router.query.id);
				const { collection : states } = await Service.api.getState(1, "page_size=50");

				const filterState  = states.filter(({ name }) => name == addresses.address?.state);
				const id           = filterState[0]?.id;

				const { collection : cities } = await Service.api.getCities(1, `page_size=800&state_id=${id}`);
				const filterCity              = cities.filter(item => item.name == addresses.address?.city);

				updateCustomerAddress({
					states,
					cities,
					addresses,
					actState : filterState[0],
					actCity  : filterCity[0],
					checked  : addresses.flags === "PREDETERMINED" ? true : false,
				});
			}
		})();
	}, [updateCustomerAddress, router.query]);

	const handleSelect = useCallback((name) => (evnt, newInputValue) => {
		const value = newInputValue != null ? newInputValue.name : null;
		if (name === "state") {
			updateCustomerAddress({
				actCity   : null,
				actState  : newInputValue,
				addresses : {
					...addresses,
					address : {
						...addresses.address,
						state : value,
						city  : null,
					},
				},
			});
		} else if (name === "city") {
			updateCustomerAddress({
				actCity   : newInputValue,
				addresses : {
					...addresses,
					address : {
						...addresses.address,
						city : value,
					},
				},
			});
		} else {
			updateCustomerAddress({
				actRegimen : newInputValue,
				addresses  : {
					...addresses,
					tax_regime : newInputValue != null ? newInputValue.id : null,
				},
			});
		}
		if (!initial) {
			setInitial(true);
		}

	}, [initial, updateCustomerAddress, addresses]);

	const hadleChecked = useCallback(({ target : { checked } }) => {
		updateCustomerAddress({
			checked   : checked,
			addresses : {
				...addresses,
				flags : checked ? "PREDETERMINED" : null,
			},
		});
		if (!initial) {
			setInitial(true);
		}
	}, [addresses, initial, updateCustomerAddress]);

	const handleChange = useCallback(name => ({ target : { value } }) => {
		updateCustomerAddress({
			addresses : {
				...addresses,
				[name] : value,
			},
		});
		if (!initial) {
			setInitial(true);
		}
	}, [initial, updateCustomerAddress, addresses]);

	const handleChangeAddress = useCallback(name => ({ target : { value } }) => {
		updateCustomerAddress({
			addresses : {
				...addresses,
				address : {
					...addresses.address,
					[name] : value,
				},
			},
		});
		if (!initial) {
			setInitial(true);
		}
	}, [initial, updateCustomerAddress, addresses]);

	const formValidate = useCallback(() => {
		const status = Object.values(addresses).some(item => (item === ""));

		let statusAddress = false;

		if (addresses.address) {
			const { address } = addresses;

			statusAddress = Object.entries(address).some(item => {
				if (item[0] != "int_number") {
					if (item[0] != "references") {
						return (item[1] === "" || item[1] == null);
					}
				}
			});
		}
		return (status || statusAddress) || !initial;
	}, [addresses, initial]);

	const submit = useCallback( async () => {
		setSubmitBtn(true);
		alertActions.openAlert({
			message  : "Guardando tu información, espera",
			type     : "info",
			duration : 4000,
		});
		const response = await Service.api.customer.updateAddress(addresses);

		if (response.status) {
			alertActions.openAlert({
				message  : "Se guardo correctamenta la información",
				type     : "success",
				duration : 3000,
			});
			router.push("/cliente/direcciones");
		} else {
			alertActions.openAlert({
				message  : "Ups! hubo un error al editar tu información",
				type     : "warning",
				duration : 3000,
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [alertActions, addresses]);

	/* VALID IF EM INPUT HAS BEEN TOUCHED AND IS EMPTY, return an error message */
	const validate = useCallback((input) => {
		if (addresses) {
			return !addresses[input] && initial;
		}
		else
			return false;
	}, [initial, addresses]);

	const validateAddress = useCallback((input) => {
		const { address } = addresses;
		if (address) {
			return !address[input] && initial;
		}
		else
			return false;
	}, [initial, addresses]);

	const validateText = useCallback((input) => validate(input)
		? "Se requiere este campo"
		: "",
	[validate]);

	const validateAddressText = useCallback((input) => validateAddress(input)
		? "Se requiere este campo"
		: "",
	[validateAddress]);

	useEffect(() => {
		(async () => {
			if (actState == null) {
				updateCustomerAddress({ actState : null });
			}
			const id = actState?.id || 0;

			const { collection : cities } = await Service.api.getCities(1, `page_size=800&state_id=${id}`);

			updateCustomerAddress({ cities });
		})();
	}, [addresses.state, actState, updateCustomerAddress]);

	return ( <>
		<EditFormAddress delegations={{
			handleSelect,
			handleChange,
			handleChangeAddress,
			validateAddressText,
			validateAddress,
			validateText,
			validate,
			formValidate,
			submit,
			hadleChecked,
			actState,
			actCity,
			states,
			cities,
			submitBtn,
			initial,
			checked,
			addresses,
		}} />
		<p> hola </p>
	</>
	);
};

EditFormAddressContainer.propTypes = {
	alertActions : PropTypes.object,
	userId       : PropTypes.any,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

const mapStateToProps = ({ userReducer : { customer } }) => ({ userId : customer?.data?.customer.id });

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(EditFormAddressContainer);
