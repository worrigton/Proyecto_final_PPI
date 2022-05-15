/* eslint-disable react-hooks/exhaustive-deps */
import {
	useEffect,
	useState,
	useCallback,
} from "react";
import { useRouter } from "next/router";
import PropTypes     from "prop-types";

// Import Own Compoents
import {
	bindAll,
} from "~/Util";
import withStateLoaded from "~/Store/withStateLoaded";
import Service         from "~/Service";
import { Typography }  from "~/ToolKit";
import AlertActions    from "~/Components/Alert/store/actions";
import SupliersDetails from "./SupliersDetails";
import DialogDelete    from "./components/DialogDelete";

const SupliersDetailsContainer = ({ token, alertActions }) => {
	// Despues mover esto a componente simple
	const router  = useRouter();

	const [open, setOpen]       = useState(false);
	const [message, setMessage] = useState("");
	const [userData, setUserData] = useState({
		data : [],
	});
	const [providerId, setProviderId] = useState(null);

	const openDialog = useCallback(() => {
		setOpen(true);
	});

	const closeDialog = useCallback(() => {
		setOpen(false);
	});

	const handleChange = useCallback(name => ({ target : { value } }) => {
		setUserData({
			...userData,
			data : {
				[name] : value,
			},
		});
	});

	const registryData = useCallback((param) => {
		const date = new Date(param);
		const options = {
			year  : "numeric",
			month : "long",
			day   : "numeric",
		};
		return date.toLocaleDateString("es-ES", options);
	}, []);

	const addressDetails = useCallback((address) => {
		if (address?.id) {
			return <Typography type="caption" color="grey">
				{`${address.street} #${address.ext_number},
					${address.int_number ? `interior: ${address.int_number},` : ""}
					${address.neighborhood}, ${address.city}, ${address.state}, ${address.country},
					${address.zip_code}`}
			</Typography>;
		} else {
			return "";
		}
	}, []);

	const deleteProvider = useCallback(async () => {
		let type    = "success";
		let message = "Se ha eliminado de forma temporal este proveedor";
		try {
			await Service.api.user.delete(userData.data.user.id, "provider", token);
		} catch (error) {
			type = "error";
			// message = _.get(error, "message") ||
			// (typeof error === "object" ? JSON.stringify(error, null, 2) : error);
			message = "No se ha podido eliminar este proveedor";
		}

		alertActions.openAlert({
			message,
			type,
			duration : 3000,
		});

		setOpen(false);
	});

	const addNote = useCallback(async () => {
		const { providerId } = router.query;
		const response = await Service.api.provider.addNote(providerId, userData.data.notes, "admin", token);
		if (response.status) {
			alertActions.openAlert({
				message  : "Registro exitoso",
				type     : "success",
				duration : 3000,
			});
		}
	});

	useEffect(() => {
		(async () => {
			if (token) {
				const { providerId } = router.query;
				if (providerId) {
					setProviderId(providerId);
					const response = await Service.api.provider.userDetails(providerId, "admin", token);
					if (response.status) {
						setUserData({
							data : response.body,
						});
					} else {
						setMessage("No se encontró este Proveedor");
					}
				}
			}
		})();
	}, [router, setUserData]);

	return (
		<>
			<SupliersDetails
				delegations={{
					token,
					message,
					userData,
					addNote,
					registryData,
					addressDetails,
					handleChange,
					id             : providerId,
					deleteProvider : openDialog,
				}}
			/>
			<DialogDelete
				open={open}
				closeDialog={closeDialog}
				deleteProvider={deleteProvider}
			/>
		</>
	);
};

SupliersDetailsContainer.propTypes = {
	token        : PropTypes.any,
	alertActions : PropTypes.object,
};

const mapStateToProps = ({ userReducer : { admin } }) => ({
	token : admin?.token || null,
});

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(SupliersDetailsContainer);
