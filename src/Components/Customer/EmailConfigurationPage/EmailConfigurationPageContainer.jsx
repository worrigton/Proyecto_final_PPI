/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useEffect,
	useState,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";

// Import Own Compoents
import { bindAll }            from "~/Util";
import withStateLoaded        from "~/Store/withStateLoaded";
import Service                from "~/Service";
import AlertActions           from "~/Components/Alert/store/actions";
import EmailConfigurationPage from "./EmailConfigurationPage";

const EmailConfigurationPageContainer = ({ alertActions, token, customer_id }) => {
	const router = useRouter();

	const [checked, setChecked] = useState({
		1 : false,
		2 : false,
		3 : false,
		4 : false,
		5 : false,
	});
	const [submit, setSubmit] = useState(true);

	const handleChange = useCallback(({ target }) => {
		setChecked({
			...checked,
			[target.name] : target.checked,
		});
		if (submit) {
			setSubmit(false);
		}
	}, [checked, submit]);

	const handleSubmit = useCallback(async () => {
		const data = {
			1 : checked[1] ? "ACTIVE" : "INACTIVE",
			2 : checked[2] ? "ACTIVE" : "INACTIVE",
			3 : checked[3] ? "ACTIVE" : "INACTIVE",
			4 : checked[4] ? "ACTIVE" : "INACTIVE",
			5 : checked[5] ? "ACTIVE" : "INACTIVE",
		};
		const response = await Service.api.customer.updateEmails(customer_id, data, token);
		if (response.status) {
			alertActions.openAlert({
				message  : "Se guardo correctamenta la información",
				type     : "success",
				duration : 3000,
			});
			router.push("/cliente/cuenta");
		} else {
			alertActions.openAlert({
				message  : "Ups! hubo un error al editar tu información",
				type     : "warning",
				duration : 3000,
			});
		}
	}, [checked]);

	useEffect(() => {
		(async () => {
			if (customer_id) {
				const response = await Service.api.customer.getEmails(customer_id, token);
				if (response.status) {
					const { body : check } = response;
					setChecked({
						1 : check[1] === "INACTIVE" ? false : true,
						2 : check[2] === "INACTIVE" ? false : true,
						3 : check[3] === "INACTIVE" ? false : true,
						4 : check[4] === "INACTIVE" ? false : true,
						5 : check[5] === "INACTIVE" ? false : true,
					});
				}
			}
		})();
	}, []);

	return (<>
		<EmailConfigurationPage
			delegations={{
				handleChange,
				handleSubmit,
				checked,
				submit,
			}}
		/>
	</>
	);
};

EmailConfigurationPageContainer.propTypes = {
	alertActions : PropTypes.object,
	token        : PropTypes.any,
	customer_id  : PropTypes.any,
};

const mapStateToProps = ({ userReducer : { customer } }) => ({
	token       : customer?.token || null,
	customer_id : customer?.data?.customer?.id,
});

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(EmailConfigurationPageContainer);


