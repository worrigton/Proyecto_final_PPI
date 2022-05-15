import { FormControl, MenuItem, Select } from "@material-ui/core";
import PropTypes from "prop-types";

import useStyles   from "./styles";

const SelectOptionContainer = ({
	options,
	onChange,
	children,
	valueSelect,
	label,
	id,
}) => {
	const classes = useStyles();
	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<label htmlFor={"demo-simple-select-helper"}>{ label }</label>
			<Select
				MenuProps = {{ disableScrollLock : true }}
				id={`select${id}`}
				value={valueSelect}
				onChange={onChange}
			>
				{
					options && options.map(item =>
						<MenuItem key={item.id} value={item}>{item.label ? item.label : item.name}</MenuItem>
					)
				}
			</Select>
		</FormControl>
	);
};

SelectOptionContainer.propTypes = {
	onChange    : PropTypes.func.isRequired,
	children    : PropTypes.node.isRequired,
	options     : PropTypes.any,
	valueSelect : PropTypes.any,
	label       : PropTypes.string,
	id          : PropTypes.string,
};

export default SelectOptionContainer;
