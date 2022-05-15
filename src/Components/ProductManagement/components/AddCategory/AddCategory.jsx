import PropTypes from "prop-types";

// Import Own Components
import { Input } from "~/ToolKit";

const AddCategory = ({ inputData, handleChange }) => (
	<div>
		<Input
			variant="outlined"
			label="Nombre de la categoría"
			value={inputData}
			onChange={handleChange}
		/>
	</div>
);

AddCategory.propTypes = {
	inputData    : PropTypes.string,
	handleChange : PropTypes.func.isRequired,
};

AddCategory.defaultProps = {
	inputData : "",
};

export default AddCategory;
