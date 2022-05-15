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

export interface Props {
	delegations    ?: any,
	size           ?: string,
	quality        ?: string,
	value          ?: any,
	options        ?: Array<any>,
	endAdornment   ?: any,
	customOptions  ?: any,
	deleteIconFunc ?: Function,
	className      ?: String,
	freeze         ?: Boolean,
	productId      ?: Number,
	providerId     ?: Number,
	alertActions   ?: any,
}

const VariantsInput : React.FC<Props> = ({
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
	const classes = useStyles();
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
						<FaEllipsisV style className="icon" />
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
					// @ts-ignore
					<IconButton onClick={deleteIconFunc}>
						<div>
							<FaTimes style className />
						</div>
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
