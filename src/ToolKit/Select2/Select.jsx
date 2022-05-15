import PropTypes    from "prop-types";
import { TextField }    from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import useStyles   from "./styles";

const Select2 = ({
	label,
	options,
	valueSelect,
	className,
	id,
	...rest
}) => {
	const classes = useStyles();

	const defaultProps = {
		options,
		getOptionLabel : (option) => {
			if ( option ) {
				return option.name || option.label;
			} else {
				return "";
			}
		},
	};

	return (
		<div className={classes.form}>
			<label htmlFor={id}>{ label }</label>
			<Autocomplete
				{...rest}
				className={`${classes.select} ${className}`}
				{...defaultProps}
				id={id}
				selectOnFocus
				value={valueSelect}
				renderInput={(params) =>
					<TextField
						autoComplete="false"
						className={`${classes.select} ${className}`}
						{...params}
						placeholder="Selecciona una opción"
					/>}
			/>
		</div>
	);
};

Select2.propTypes = {
	id          : PropTypes.string.isRequired,
	className   : PropTypes.object,
	label       : PropTypes.any,
	options     : PropTypes.array,
	valueSelect : PropTypes.any,
};

Select2.defaultProps = {
	label     : null,
	className : {},
	values    : {},
	options   : [],
};

export default Select2;
