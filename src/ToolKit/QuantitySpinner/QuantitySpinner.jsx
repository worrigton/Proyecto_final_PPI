import PropTypes          from "prop-types";

import {
	Input,
} from "~/ToolKit";
import useStyles from "./styles";

const QuantitySpinner = ({ value, handleDecrement, handleIncrement, handleChange }) => {
	const classes = useStyles();
	return (
		<div className={classes.inputNumber}>
			<button
				className={classes.btnMinus}
				type="button"
				onClick={handleDecrement}
			>
				&minus;
			</button>
			<Input
				id="Quantity"
				className={classes.inputNumberValue}
				value={value}
				onChange={({ target : { value } }) => handleChange(value)}
				type="number"
				autoFocus={false}
				inputProps={{
					min          : "1",
					max          : "99999",
					"aria-label" : "naked",
					style        : {
						textAlign  : "center",
						appearance : "none",
						width      : "100%",
						border     : "0",
						height     : "2em",
						margin     : "0",
						fontSize   : "0.9rem",
						display    : "block",
					},
				}}
				position="end"
			/>
			<button
				className={classes.btnPlus}
				onClick={handleIncrement}
			>
				&#43;
			</button>
		</div>
	);
};

QuantitySpinner.propTypes = {
	value           : PropTypes.string.isRequired,
	handleIncrement : PropTypes.func.isRequired,
	handleDecrement : PropTypes.func.isRequired,
	handleChange    : PropTypes.func.isRequired,
};

export default QuantitySpinner;

