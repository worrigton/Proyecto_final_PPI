/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import {
	useState,
	useEffect,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";
import { useRouter } from "next/router";

// Import own Components
import {
	bindAll,
	Base64,
} from "~/Util";
import Service                from "~/Service";
import AlertActions           from "~/Components/Alert/store/actions";
import EditAdditionalAccounts from "./EditAdditionalAccounts.jsx";

const EditAdditionalAccountsContainer = ({ alertActions, data }) => {
	const router  = useRouter();

	const [submitBtn, setSubmitBtn]       = useState(false);
	const [initial, setInitial]           = useState(false);
	const [open, setOpen]                 = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showInput, setShowInput]       = useState(false);
	const [userData, setUserData]         = useState({
		first_name : "",
		last_name  : "",
		email      : "",
		password   : "",
		image      : "",
		images     : "",
		username   : "",
	});

	useEffect(() => {
		(async () => {
			setUserData({
				...userData,
				id         : data.id,
				user_id    : data.user_id,
				first_name : data.first_name,
				last_name  : data.last_name,
				email      : data.user.email,
				username   : data.user.username,
				images     : data.images,
			});
		})();
	}, [open]);

	const handleClose = useCallback(() => {
		setOpen(false);
		setInitial(false);
		setSubmitBtn(false);
	}, []);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleChange = useCallback(name => ({ target : { value } }) => {
		setUserData({
			...userData,
			[name] : value,
		});
		if (!initial) {
			setInitial(true);
		}
	}, [initial, userData]);


	const formValidate = useCallback(() => {
		const status = (
			validateEmail() ||
			!initial ||
			validate("first_name") ||
			validate("last_name") ||
			validate("username") ||
			validate("email") ||
			(showInput && validate("password")
			));

		return status;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [validateEmail, validate, initial, userData, showInput]);

	const submit = useCallback( async () => {
		setSubmitBtn(true);
		alertActions.openAlert({
			message  : "Guardando tu información, espera",
			type     : "info",
			duration : 3000,
		});
		const response = await Service.api.employee.userUpdate(userData);

		if (response.status) {
			alertActions.openAlert({
				message  : "Se modificó correctamente la información",
				type     : "success",
				duration : 3000,
			});
			router.reload();
		} else {
			alertActions.openAlert({
				message  : "Ups! hubo un error al editar la información, inténtalo más tarde",
				type     : "warning",
				duration : 3000,
			});
		}
		handleClose();

	}, [alertActions, handleClose, userData]);

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
	}, []);

	const handle = useCallback(()=> {
		setShowInput(!showInput);
		setUserData({
			...userData,
			password : "",
		});
	}, [showInput, userData]);

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
	}, [initial]);

	return (
		<EditAdditionalAccounts delegations={{
			handleChange,
			validateText,
			validate,
			formValidate,
			submit,
			handleClickOpen,
			handleClose,
			handleClickShowPassword,
			handleMouseDownPassword,
			validateTextEmail,
			validateEmail,
			uploadFile,
			detaleFile,
			submitBtn,
			userData,
			initial,
			open,
			showPassword,
			showInput,
			handle,
		}} />
	);
};

EditAdditionalAccountsContainer.propTypes = {
	alertActions : PropTypes.object,
	data         : PropTypes.any,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default connect(null, mapDispatchToProps)(EditAdditionalAccountsContainer);
