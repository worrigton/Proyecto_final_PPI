import PropTypes    from "prop-types";
import TextField    from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

// Import Own Components
import useStyles from "./styles";

const MultiSelect = ({
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
		getOptionLabel : (option) => option?.name,
	};

	return (
		<div className={classes.form}>
			{label}
			<Autocomplete
				multiple
				id={id}
				defaultValue={valueSelect}
				className={classes.select}
				{...defaultProps}
				{...rest}
				renderInput={(params) =>
					<TextField
						className={classes.select}
						{...params}
					/>}
			/>
		</div>
	);
};

MultiSelect.propTypes = {
	id          : PropTypes.string.isRequired,
	className   : PropTypes.object,
	label       : PropTypes.any,
	options     : PropTypes.array,
	valueSelect : PropTypes.any,
};

MultiSelect.defaultProps = {
	label     : null,
	className : {},
	values    : {},
	options   : [],
};

export default MultiSelect;
