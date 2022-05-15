import {
	useCallback,
	useState }       from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";
import { useRouter } from "next/router";

// Import own components
import AlertActions     from "~/Components/Alert/store/actions";
import Services         from "~/Service";
import ChangePassword 	from "./ChangePassword";
import { bindAll,
	getTokenFromQueryString,
} from "~/Util";

import {
	useObjState,
} from "~/Util/Hooks";

const ChangePasswordContainer = ({ alertActions }) => {
	const router = useRouter();
	const token = getTokenFromQueryString();
	const [showPassword, setShowPassword]   = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const [valuesAccount, setValuesAccount] = useObjState({
		pwd  : "",
		pwd2 : "",
		token,
	});

	const handleChange = useCallback(prop => ({ target : { value } }) => {
		setValuesAccount({ [prop] : value });
	}, [setValuesAccount]);

	const handleClickShowPassword = useCallback(() => setShowPassword(prevState => !prevState), []);

	const handleClickShowPassword2 = useCallback(() => setShowPassword2(prevState => !prevState), []);

	const handleSubmit = useCallback(async () => {
		const body = {
			token    : token,
			password : valuesAccount.pwd,
		};
		const success = await Services.api.changePasswordConfirm(body);
		router.push("/");
		if (success) {
			alertActions.openAlert({
				message  : "Tu contraseña ha sido reestablecida",
				type     : "success",
				duration : 3e3,
			});
		} else {
			alertActions.openAlert({
				message  : "El token es invalido",
				type     : "error",
				duration : 3e3,
			});
		}
	}, [alertActions, router, token, valuesAccount.pwd]);

	const validate = useCallback((input) => {
		if (input == "pwd" && valuesAccount[input].length <= 6) {
			return true;
		}
	}, [valuesAccount]);

	const validateText = useCallback((input) => {
		if (input == "pwd" && valuesAccount[input].length < 6) {
			return "Debe tener al menos 6 letras.";
		}
		return validate(input) ? "Se requiere este campo" : "";
	}, [validate, valuesAccount]);

	return (
		<ChangePassword delegations={{
			valuesAccount,
			handleChange,
			handleSubmit,
			showPassword,
			showPassword2,
			handleClickShowPassword,
			handleClickShowPassword2,
			validateText,
			validate,
		}} />
	);

};

ChangePasswordContainer.propTypes = {
	alertActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions });

export default connect(null, mapDispatchToProps)(ChangePasswordContainer);
