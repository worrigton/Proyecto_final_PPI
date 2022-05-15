/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
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
	uiType,
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

	const redirectToRecovery = (e) => {
		e.preventDefault();
		router.push("/recuperar-contrasena");
	};

	const handleSubmit = useCallback(async (e) => {
		e.preventDefault();

		const isStr = value => typeof value === "string";

		const { username, password } = formData;

		if (username && isStr(username) && password && isStr(password)) {
			setLoading(true);

			const response = await Service.api.login(username, password);

			if (response && response.token && isStr(response.token)) {
				const { token } = response;
				const { data }  = c(token.split(".")[1], Base64.decode, JSON.parse) || {};
				let redirectUrl;

				userActions.updateUser({
					[data.type.toLowerCase()] : {
						token,
						data,
					},
				});

				alertActions.openAlert({
					message  : "Has ingresado correctamente ¡Bienvenido!",
					type     : "success",
					duration : 2000,
				});

				if (data.type === "CUSTOMER") {
					redirectUrl = "/cliente/inicio";
				}
				else if (data.type === "PROVIDER") {
					redirectUrl = "/proveedor/inicio";
				}
				else if (data.type === "EMPLOYEE") {
					redirectUrl = "/employee/home";
				}
				else if (data.type === "ADMIN") {
					redirectUrl = "/admin";
				}

				return router.push(redirectUrl);
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

	return (
		<Login
			delegations={{
				formData,
				handleChange,
				handleSubmit,
				loading,
				redirectToRecovery,
				uiType,
			}}
		/>
	);
};

LoginContainer.propTypes = {
	alertActions : PropTypes.object.isRequired,
	userActions  : PropTypes.object.isRequired,
	uiType       : PropTypes.string,
};

const mapDispatchToProps = bindAll({
	AlertActions,
	UserActions,
});

export default connect(null, mapDispatchToProps)(LoginContainer);
