import {
	useEffect,
	useState,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";

// Import Own Compoents
import { bindAll }               from "~/Util";
import AdditionalAccountsDetails from "./AdditionalAccountsDetails";
import Service                   from "~/Service";
import withStateLoaded           from "~/Store/withStateLoaded";
import AlertActions              from "~/Components/Alert/store/actions";

const AdditionalAccountsDetailsContainer = ({ alertActions }) => {
	const router  = useRouter();

	const [userData, setUserData] = useState([]);
	const [message, setMessage]   = useState("");

	const handleDelete = useCallback(async (data) => {
		let type    = "success";
		let message = "Tu cuenta se ha eliminado correctamente";
		try {
			await Service.api.user.delete(data, "admin");
		} catch (error) {
			type = "error";
			message = "No se ha podido eliminar tu cuenta, intentalo más tarde.";
		}

		alertActions.openAlert({
			message,
			type,
			duration : 3000,
		});
	}, [alertActions]);

	const registryData = useCallback((param) => {
		const date = new Date(param);
		const options = {
			year  : "numeric",
			month : "long",
			day   : "numeric",
		};
		return date.toLocaleDateString("es-ES", options);
	}, []);

	useEffect(() => {
		(async () => {
			const { id } = router.query;
			if (id) {
				const { body : response } = await Service.api.employee.userDetails(id);
				if (response.user)
					setUserData(response);
				else
					setMessage("No se encontro este empleado");
			}
		})();
	}, [router]);

	return (
		<AdditionalAccountsDetails
			delegations={{
				userData,
				message,
				registryData,
				handleDelete,
				id : router.query.id,
			}}
		/>
	);
};

AdditionalAccountsDetailsContainer.propTypes = {
	alertActions : PropTypes.object,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

const mapStateToProps = ({ userReducer : { provider } }) => ({
	providerId : provider?.data?.provider.id,
	userId     : provider?.data?.id,
	token      : provider?.token,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(AdditionalAccountsDetailsContainer);

