import { Children, cloneElement } from "react";
import PropTypes                  from "prop-types";
import { Menu }                   from "@material-ui/core";

// Import Own Components
import { ButtonWithoutStyles } from "~/ToolKit";
import { FaSortDown }          from "~/Resources/icons/fas";
import useStyles               from "./styles";

const Select = ({
	delegations : {
		anchorEl,
		handleClick,
		handleClose,
		handleSelection,
	},
	options,
	label,
}) => {
	const classes = useStyles();

	return (
		<>
			<ButtonWithoutStyles
				onClick={handleClick}
				className={classes.root}
			>
				{label}
				&nbsp;
				<FaSortDown />
			</ButtonWithoutStyles>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{ Children.map(options, (child, index) => (
					cloneElement(child, {
						onClick : handleSelection(index),
					})
				)) }
			</Menu>
		</>
	);
};

Select.propTypes = {
	delegations : PropTypes.shape({
		anchorEl        : PropTypes.any,
		handleClick     : PropTypes.func.isRequired,
		handleClose     : PropTypes.func.isRequired,
		handleSelection : PropTypes.func.isRequired,
	}).isRequired,
	options : PropTypes.node.isRequired,
	label   : PropTypes.string.isRequired,
};

export default Select;
