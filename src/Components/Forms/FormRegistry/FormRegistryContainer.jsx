import qs            from "qs";
import { useRouter } from "next/router";
import {
	useState,
	useCallback,
} from "react";

// Import Own Components
import {
	useObjState,
} from "~/Util/Hooks";
import FormRegistry from "./FormRegistry";

const FormRegistryContainer = ()  => {
	const router = useRouter();

	const [showPassword, setShowPassword]   = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);

	const [valuesAccount, setValuesAccount] = useObjState({
		firstName    : "",
		lastName     : "",
		username     : "",
		pwd          : "",
		pwd2         : "",
		email        : "",
		skip         : true,
		notification : true,
	});

	const [flagsAccount, setFlagsAccount] = useObjState({
		firstName : false,
		lastName  : false,
		username  : false,
		pwd       : false,
		pwd2      : false,
		email     : false,
	});

	const handleChange = useCallback(prop => ({ target : { checked, value } }) => {
		if (prop === "notification") {
			setValuesAccount({ [prop] : checked });
		}
		else {
			setValuesAccount({ [prop] : value });

			if (!flagsAccount[prop]) {
				setFlagsAccount({ [prop] : true });
			}
		}
	}, [setValuesAccount, flagsAccount, setFlagsAccount]);

	/* VALID IF EM INPUT HAS BEEN TOUCHED AND IS EMPTY, return an error event */
	const validate = useCallback((input) =>{
		valuesAccount[input] === "" && flagsAccount[input];
	}, [valuesAccount, flagsAccount]);

	/* VALID IF EM INPUT HAS BEEN TOUCHED AND IS EMPTY, return an error message */
	const validateText = useCallback((input) =>
		validate(input) ? "Se requiere este campo" : "", [validate]
	);

	/* FUNCTIONS TO DISPLAY OR HIDE THE PASSWORD */
	const handleClickShowPassword = useCallback(() => setShowPassword(prevState => !prevState), []);

	const handleClickShowPassword2 = useCallback(() => setShowPassword2(prevState => !prevState), []);

	const handleMouseDownPassword = useCallback((e) => {
		e.preventDefault();
	}, []);

	/* VALID IF BOTH PASSWORDS MATCH */
	const passwordValidate = !(valuesAccount.pwd === valuesAccount.pwd2);

	const formValidate = useCallback(() =>  {
		const status = !Object.values(valuesAccount).some(item => item === "");
		return status && !passwordValidate ? false : true;
	}, [valuesAccount, passwordValidate]);

	/* SUBMIT REGISTRY */
	const submit = useCallback(() => {
		router.push(`/proveedor/registro?${qs.stringify(valuesAccount)}`, "/proveedor/registro");
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [valuesAccount]);

	return (
		<FormRegistry
			delegations={{
				valuesAccount,
				flagsAccount,
				showPassword,
				showPassword2,
				passwordValidate,
				handleChange,
				handleClickShowPassword,
				handleClickShowPassword2,
				handleMouseDownPassword,
				formValidate,
				validate,
				validateText,
				submit,
			}}
		/>
	);
};

export default FormRegistryContainer;
