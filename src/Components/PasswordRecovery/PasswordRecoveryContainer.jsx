import PropTypes   from "prop-types";
import { connect } from "react-redux";
import {
	useCallback,
	useState,
} from "react";

// Import own components
import PasswordRecovery from "./PasswordRecovery";
import AlertActions     from "~/Components/Alert/store/actions";
import Services         from "~/Service";
import { bindAll }      from "~/Util";

const PasswordRecoveryContainer = ({ alertActions }) => {
	const [formData, setFormData] = useState({
		email : null,
	});

	const updateFormData = useCallback(newData => setFormData(prevData => ({ ...prevData, ...newData })), []);

	const handleChange = useCallback(({ target : { name, value } }) => updateFormData({
		[name] : value,
	}), [updateFormData]);

	const handleSubmit = useCallback(async () => {
		const success = await Services.api.changePasswordRequest({ email : formData.email });
		if (success) {
			alertActions.openAlert({
				message  : "¡Te hemos enviado un correo, revisalo!",
				type     : "success",
				duration : 3e3,
			});
		} else {
			alertActions.openAlert({
				message  : "La cuenta de email no existe",
				type     : "error",
				duration : 3e3,
			});
		}
	}, [formData, alertActions]);

	return (
		<PasswordRecovery delegations={{
			formData,
			handleChange,
			handleSubmit,
		}} />
	);
};

PasswordRecoveryContainer.propTypes = {
	alertActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions });

export default connect(null, mapDispatchToProps)(PasswordRecoveryContainer);
