import PropTypes from "prop-types";

// Import Own Components
import { Input } from "~/ToolKit";

const CreateFeature = ({ inputData, handleChange }) => (
	<div>
		<Input
			variant="outlined"
			label="Nombre"
			value={inputData}
			onChange={handleChange}
		/>
	</div>
);

CreateFeature.propTypes = {
	inputData    : PropTypes.string,
	handleChange : PropTypes.func.isRequired,
};

CreateFeature.defaultProps = {
	inputData : "",
};

export default CreateFeature;
