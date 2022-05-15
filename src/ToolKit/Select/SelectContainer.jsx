import {
	useState,
	useCallback,
} from "react";
import PropTypes from "prop-types";

// Import Own Components
import Select from "./Select.jsx";

const SelectContainer = ({
	onChange,
	children,
	...rest
}) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick     = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose     = useCallback(() => setAnchorEl(null), []);
	const handleSelection = useCallback(index => () => {
		onChange(index);

		handleClose();
	}, [onChange, handleClose]);

	return (
		<Select
			delegations={{
				anchorEl,
				handleClick,
				handleClose,
				handleSelection,
			}}
			options={children}
			{...rest}
			autoComplete="off"
		/>
	);
};

SelectContainer.propTypes = {
	onChange : PropTypes.func.isRequired,
	children : PropTypes.node.isRequired,
};

export default SelectContainer;
