import React, {
	useState,
	useCallback,
} from "react";
import PropTypes 	   from "prop-types";
import QuantitySpinner from "./QuantitySpinner";
import { useDebounce } from "~/Util/Hooks";


const QuantitySpinnerContainer = ({ max, min, val, onChangeValue, id }) => {
	const [value, setValue] = useState(val);

	const handleChange = useCallback(value => {
		setValue(value);
		changeDebounced(value);
	}, [changeDebounced]);

	const changeDebounced = useDebounce(value => {
		onChangeValue(id, value);
	}, 700, []);

	const handleIncrement = useCallback(() => {
		setValue(+value + 10);
		onChangeValue(id, +value + 10);
	}, [value, id, onChangeValue]);

	const handleDecrement = useCallback(() => {
		const newValue = value - 10;
		if (newValue < 1) {
			setValue(1);
		} else {
			setValue(newValue);
			onChangeValue(id, newValue);
		}
	}, [value, id, onChangeValue]);

	return (
		<QuantitySpinner {...{ value, max, min, handleChange, handleIncrement, handleDecrement }} />
	);
};

QuantitySpinnerContainer.propTypes = {
	max           : PropTypes.number.isRequired,
	min           : PropTypes.number.isRequired,
	val           : PropTypes.number.isRequired,
	onChangeValue : PropTypes.func,
	id            : PropTypes.number,
};

QuantitySpinner.defaultProps = {
	onChangeValue : ()=>{},
	id            : 0,
};

export default QuantitySpinnerContainer;
