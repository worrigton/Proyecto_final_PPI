/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";
import { connect }   from "react-redux";

// Import Own Components
import AlertActions from "~/Components/Alert/store/actions";
import UserActions  from "~/Store/UserStore/actions";
import Service      from "~/Service";
import {
	bindAll,
	Base64,
	reverseCompose as c,
} from "~/Util";
import Login from "./Login.jsx";

const LoginContainer = ({
	alertActions,
	userActions,
	redirectTo,
	type,
}) => {
	const router = useRouter();

	const [loading, setLoading]   = useState(false);
	const [formData, setFormData] = useState({
		username : null,
		password : null,
	});
	const updateFormData = useCallback(newData => setFormData(prevData => ({ ...prevData, ...newData })), []);

	const handleChange = useCallback(({ target : { name, value } }) => updateFormData({
		[name] : value,
	}), [updateFormData]);

	const handleSubmit = useCallback(async (e) => {
		e.preventDefault();

		const isStr = value => typeof value === "string";

		const { username, password } = formData;

		if (username && isStr(username) && password && isStr(password)) {
			setLoading(true);

			const response = await Service.api.login(username, password, type.toUpperCase());

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
					message  : "Has ingresado correctamente ¡Bienvenido!",
					type     : "success",
					duration : 2000,
				});

				return router.push(redirectTo);
			} else {
				alertActions.openAlert({
					message  : "El usuario o la contraseña son incorrectos",
					type     : "error",
					duration : 2000,
				});
			}

			setLoading(false);
		}
	}, [formData, alertActions, router, userActions]);

	useEffect(() => {
		router.prefetch(redirectTo);
	}, []);

	const goBack = useCallback(() => router.push(
		type === "provider" ? "/provider" : "/"
	), [router]);

	return (
		<Login
			delegations={{
				formData,
				handleChange,
				handleSubmit,
				loading,
				goBack,
				type,
			}}
		/>
	);
};

LoginContainer.propTypes = {
	alertActions : PropTypes.object.isRequired,
	userActions  : PropTypes.object.isRequired,
	redirectTo   : PropTypes.string.isRequired,
	type         : PropTypes.oneOf([
		"admin",
		"ADMIN",
		"provider",
		"PROVIDER",
		"customer",
		"CUSTOMER",
		"employee",
		"EMPLOYEE",
	]),
};

const mapDispatchToProps = bindAll({
	AlertActions,
	UserActions,
});

export default connect(null, mapDispatchToProps)(LoginContainer);
