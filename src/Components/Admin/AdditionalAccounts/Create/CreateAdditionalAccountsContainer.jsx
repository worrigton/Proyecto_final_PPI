/* eslint-disable camelcase */
import { useState, useCallback } from "react";
import PropTypes                 from "prop-types";
import { useRouter }             from "next/router";

// Import own Components
import {
	bindAll,
	Base64,
} from "~/Util";
import withStateLoaded           from "~/Store/withStateLoaded";
import Service                   from "~/Service";
import AlertActions              from "~/Components/Alert/store/actions";
import CreateAdditionalAccounts  from "./CreateAdditionalAccounts.jsx";

const EditAdditionalAccountsContainer = ({ alertActions }) => {
	const router  = useRouter();

	const [submitBtn, setSubmitBtn]       = useState(false);
	const [initial, setInitial]           = useState(false);
	const [open, setOpen]                 = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [userData, setUserData]         = useState({
		first_name : "",
		last_name  : "",
		email      : "",
		password   : "",
		image      : "",
		username   : "",

	});
	const [flagUserData, setFlagUserData] = useState({
		first_name : false,
		last_name  : false,
		email      : false,
		password   : false,
		image      : false,
		username   : false,
	});

	const handleClose = useCallback(() => {
		setOpen(false);
	}, []);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleChange = useCallback(name => ({ target : { value } }) => {
		setUserData({
			...userData,
			[name] : value,
		});
		setFlagUserData({
			...flagUserData,
			[name] : true,
		});
		if (!initial) {
			setInitial(true);
		}
	}, [initial, userData, flagUserData]);


	const formValidate = useCallback(() => {
		const status = Object.values(userData).some(item => (item === "" )) || validateEmail() || !initial;
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
		const response = await Service.api.employee.registry(userData);

		if (response.status) {
			alertActions.openAlert({
				message  : "Registro exitoso",
				type     : "success",
				duration : 3000,
			});
			reload = true;
		} else {
			alertActions.openAlert({
				message  : "Ups! hubo un error al registrar la información, inténtalo más tarde",
				type     : "warning",
				duration : 3000,
			});
			reload = true;
		}
		handleClose();
		if (reload) {
			router.reload();
		}
	}, [alertActions, handleClose, router, userData]);

	/* VALID IF EM INPUT HAS BEEN TOUCHED AND IS EMPTY, return an error message */
	const validate = useCallback((input) => {
		if (userData) {
			return !userData[input] && initial && flagUserData[input];
		}
		else
			return false;
	}, [initial, userData, flagUserData]);

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
		<CreateAdditionalAccounts delegations={{
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
		}} />
	);
};

EditAdditionalAccountsContainer.propTypes = {
	alertActions : PropTypes.object,
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(null, mapDispatchToProps)(EditAdditionalAccountsContainer);
