/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	useCallback,
} from "react";
import PropTypes   from "prop-types";
import { connect } from "react-redux";

// Import Own Components
import Service       from "~/Service";
import { bindAll }   from "~/Util";
import AlertActions  from "~/Components/Alert/store/actions";
import CreateFeature from "./CreateFeature.jsx";

const CreateFeatureContainer = ({
	setActions,
	done,
	disable,
	alertActions,
}) => {
	const [inputData, setInputData] = useState("");

	const handleChange = useCallback(({ target : { value } }) => setInputData(value), []);

	const handleSubmit = useCallback(() => {
		if (inputData) {
			disable(true);

			(async () => {
				const success = await Service.api.createFeature(inputData);

				if (success) {
					alertActions.openAlert({
						message  : `¡Se agregó el rasgo "${inputData}"!`,
						type     : "success",
						duration : 4e3,
					});
				} else {
					alertActions.openAlert({
						message  : "No se ha podido agregar el rasgo, verifica que en verdad no existe.",
						type     : "error",
						duration : 4e3,
					});
				}

				done();
			})();
		}
	}, [inputData, disable, done]);

	useEffect(() => {
		setActions({
			okClick : handleSubmit,
		});
	}, [handleSubmit]);

	return (
		<CreateFeature
			inputData={inputData}
			handleChange={handleChange}
		/>
	);
};

CreateFeatureContainer.propTypes = {
	setActions   : PropTypes.func.isRequired,
	done         : PropTypes.func.isRequired,
	disable      : PropTypes.func.isRequired,
	alertActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions });

export default connect(null, mapDispatchToProps)(CreateFeatureContainer);
