/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import {
	useState,
	useCallback,
	useEffect,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";

// Import own Components
import {
	bindAll,
	Base64,
} from "~/Util";
import withStateLoaded from "~/Store/withStateLoaded";
import Service         from "~/Service";
import AlertActions    from "~/Components/Alert/store/actions";
import UserActions     from "~/Store/UserStore/actions";
import ProfilePage     from "./ProfilePage.jsx";

const ProfilePageContainer = ({ alertActions, providerId, token, userActions, userId }) => {
	const router = useRouter();

	const [submitBtn, setSubmitBtn]         = useState(false);
	const [initial, setInitial]             = useState(false);
	const [showInput, setShowInput]         = useState(false);
	const [open, setOpen]                   = useState(false);
	const [open2, setOpen2]                 = useState(false);
	const [showPassword, setShowPassword]   = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [userData, setUserData]           = useState({
		id           : "",
		user_id      : "",
		first_name   : "",
		last_name    : "",
		email        : "",
		old_email    : "",
		password     : "",
		old_password : "",
		image        : "",
		images       : "",
	});

	const logOut = useCallback(() => {
		userActions.logoutUserOfType("provider");
	}, [userActions]);

	useEffect(() => {
		(async () => {
			const { body : data } = await Service.api.provider.userDetails(providerId);
			setUserData({
				...userData,
				id         : data.id,
				user_id    : data.user_id,
				first_name : data.first_name,
				last_name  : data.last_name,
				old_email  : data.user?.email,
				images     : data.images,
			});
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleClickOpen = useCallback((event) => {
		setOpen(true);
	}, []);

	const handleOpenDelate = useCallback((event) => {
		setOpen2(true);
	}, []);

	const handleDelateAccount = useCallback(() => {
		(async () => {
			let type    = "success";
			let message = "Tu cuenta se ha eliminado correctamente";
			try {
				await Service.api.user.delete(userId, "provider", token);
				logOut();
			} catch (error) {
				type = "error";
				message = "No se ha podido eliminar tu cuenta, intentalo más tarde.";
			}

			alertActions.openAlert({
				message,
				type,
				duration : 3000,
			});
		})();
	}, []);

	const handleCloseDelate = useCallback((event) => {
		setOpen2(false);
	}, []);

	const handleClose = useCallback( () => {
		setUserData({
			...userData,
			password     : "",
			old_password : "",
		});
		setOpen(false);
	}, [userData]);

	const submitPassword = useCallback( async () => {
		let reload = false;
		alertActions.openAlert({
			message  : "Cambiando tu contraseña, espera",
			type     : "info",
			duration : 3000,
		});
		const response = await Service.api.customer.userUpdatePassword(userData, token, "customer");
		if (response.status) {
			alertActions.openAlert({
				message  : "Se cambió tu contraseña éxito",
				type     : "success",
				duration : 3000,
			});
			reload = true;
		}
		else if (response.body.status == 401) {
			alertActions.openAlert({
				message  : "Ups! No se puede cambiar la contraseña,  tu contraseña actual no coincide",
				type     : "warning",
				duration : 3000,
			});
			reload = true;
		}
		else {
			alertActions.openAlert({
				message  : "Ups! hubo un error al editar tu información, inténtalo más tarde",
				type     : "warning",
				duration : 3000,
			});
		}
		setOpen(false);
		if (reload) {
			router.reload();
		}
	}, [alertActions, userData]);

	const handleChange = useCallback(name => ({ target : { value } }) => {
		setUserData({
			...userData,
			[name] : value,
		});
		if (!initial) {
			setInitial(true);
		}
	}, [initial, userData]);

	const handle = useCallback(()=> {
		setShowInput(!showInput);
		setUserData({
			...userData,
			email : "",
		});
	}, [showInput, userData]);

	const formValidate = useCallback(() => {
		const status = userData.first_name === "" || userData.last_name === "" || validateEmail() || !initial;
		return status;
	}, [userData, validateEmail, initial]);

	const submit = useCallback( async () => {
		let reload = false;
		setSubmitBtn(true);
		alertActions.openAlert({
			message  : "Guardando tu información, espera",
			type     : "info",
			duration : 3000,
		});
		const response = await Service.api.provider.userUpdate(userData);
		if (response.status) {
			alertActions.openAlert({
				message  : "Tu información fue editada con éxito",
				type     : "success",
				duration : 3000,
			});
			reload = true;
		} else {
			alertActions.openAlert({
				message  : "Ups! hubo un error al editar tu información, inténtalo más tarde",
				type     : "warning",
				duration : 3000,
			});
			reload = true;
		}
		if (reload) {
			router.reload();
		}

	}, [alertActions, userData]);

	/* VALID IF EM INPUT HAS BEEN TOUCHED AND IS EMPTY, return an error message */
	const validate = useCallback((input) => {
		if (userData) {
			return !userData[input] && initial;
		}
		else
			return false;
	}, [initial, userData]);

	const validateText = useCallback((input) => validate(input)
		? "Se requiere este campo"
		: "",
	[validate]);

	/* FUNCTIONS TO DISPLAY OR HIDE THE PASSWORD */
	const handleClickShowPassword = useCallback(() => setShowPassword(prevState => !prevState), []);

	const handleClickShowPassword2 = useCallback(() => setShowPassword2(prevState => !prevState), []);

	const handleMouseDownPassword = useCallback((e) => {
		e.preventDefault();
	}, []);

	const validateEmail = useCallback(() => {
		const { email } = userData;
		// eslint-disable-next-line no-useless-escape
		return (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email) && initial) && email != "";
	}, [initial, userData]);

	const validateTextEmail = useCallback(() => validateEmail()
		? "El email que ingresó no es válido"
		: "",
	[validateEmail]);

	const detaleFile = useCallback(() => {
		setUserData(prevState => ({
			...prevState,
			image : "",
		}));
	}, [userData.image]);

	const uploadFile = useCallback(() => {
		const uploader = document?.createElement("input");

		uploader.setAttribute("type", "file");
		uploader.setAttribute("accept", "image/*");

		uploader.addEventListener("change", async (e) => {
			const selectedFile = uploader.files[0];

			if (!selectedFile.type.includes("image")) {
				return;
			}

			const tempFilePath = URL.createObjectURL(selectedFile);
			if (!initial) {
				setInitial(true);
			}

			Base64.imageToBase64(selectedFile, imageInBase64 => {
				setUserData(prevState => ({
					...prevState,
					image : [tempFilePath, imageInBase64],
				}));
			});
		});
		uploader.click();
	}, [userData.image]);

	return (
		<ProfilePage delegations={{
			handleChange,
			validateText,
			validate,
			formValidate,
			submit,
			handle,
			handleClickOpen,
			handleClose,
			handleClickShowPassword,
			handleClickShowPassword2,
			handleMouseDownPassword,
			validateTextEmail,
			validateEmail,
			uploadFile,
			detaleFile,
			handleOpenDelate,
			handleCloseDelate,
			handleDelateAccount,
			submitPassword,
			submitBtn,
			userData,
			initial,
			showInput,
			open,
			open2,
			showPassword,
			showPassword2,
		}} />

	);
};

ProfilePageContainer.propTypes = {
	alertActions : PropTypes.object,
	providerId   : PropTypes.any,
	token        : PropTypes.string,
	userActions  : PropTypes.object,
	userId       : PropTypes.any,
};

const mapDispatchToProps = bindAll({
	AlertActions,
	UserActions,
});

const mapStateToProps = ({ userReducer : { provider } }) => ({
	providerId : provider?.data?.provider.id,
	userId     : provider?.data?.id,
	token      : provider?.token,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(ProfilePageContainer);
