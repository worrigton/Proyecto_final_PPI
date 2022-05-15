import PropTypes from "prop-types";
import {
	FilledInput,
	IconButton,
	InputAdornment,
	Menu,
	MenuItem,
} from "@material-ui/core";

// Import Own Components
import { FaSnowFlake }            from "~/Resources/icons/far";
import { FaTimes }                from "~/Resources/icons/fal";
import { FaEllipsisV }            from "~/Resources/icons/far";
import { sequence, isValidArray } from "~/Util";
import useStyles                  from "./styles";

const VariantsInput = ({
	delegations : {
		anchorEl,
		handleClose,
		handleOpen,
		handleChange,
		price,
	},
	size,
	value,
	options,
	quality,
	freeze,
	deleteIconFunc,
	className,
	endAdornment : customEndAdornment,
	...rest
}) => {
	const classes     = useStyles();
	return (
		<div className={`${classes.variantInput} ${className}`}>
			<span className="variant-info">
				<div className="info">
					<div>
						<strong>
							{quality}
						</strong>
						{` - Tamaño ${size} `}
					</div>

					{ freeze && (
						<FaSnowFlake
							style={{ height : "1rem", marginLeft : "0.5rem" }}
							className={classes.freeze}
						/>
					) }
				</div>
				{isValidArray(options) && (
					<IconButton onClick={handleOpen}>
						<FaEllipsisV className="icon" />
					</IconButton>
				)}
			</span>

			<div className="inputContainer">
				<FilledInput
					onChange = {handleChange}
					endAdornment={(
						<InputAdornment position="end">
							{customEndAdornment}
						</InputAdornment>
					)}
					value={price}
					{...rest}
				/>

				{ deleteIconFunc && (
					<IconButton onClick={deleteIconFunc}>
						<FaTimes />
					</IconButton>
				) }
			</div>

			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={isValidArray(options) && Boolean(anchorEl)}
				onClose={handleClose}
			>
				{ isValidArray(options) && options.map(({ label, handler }, id) => (
					<MenuItem
						key={id}
						onClick={handler ? sequence(handler, handleClose) : handleClose}
					>
						{label}
					</MenuItem>
				)) }
			</Menu>
		</div>
	);
};

VariantsInput.propTypes = {
	delegations : PropTypes.object.isRequired,
	size        : PropTypes.string.isRequired,
	quality     : PropTypes.string.isRequired,
	value       : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	options     : PropTypes.arrayOf(PropTypes.shape({
		label   : PropTypes.string.isRequired,
		handler : PropTypes.func,
	})),
	endAdornment   : PropTypes.any,
	customOptions  : PropTypes.any,
	deleteIconFunc : PropTypes.func,
	className      : PropTypes.string,
	freeze         : PropTypes.bool,
	productId      : PropTypes.number.isRequired,
	providerId     : PropTypes.number.isRequired,
};

VariantsInput.defaultProps = {
	value          : 0,
	endAdornment   : "Kg",
	customOptions  : null,
	deleteIconFunc : null,
	className      : "",
	freeze         : false,
};

export default VariantsInput;
