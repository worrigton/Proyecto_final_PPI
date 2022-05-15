import React, { useRef, useImperativeHandle } from "react";
import PropTypes                              from "prop-types";

const StripeInput = ({ component: Component, inputRef, options, ...other }) => {
	const elementRef = useRef();

	useImperativeHandle(inputRef, () => ({
		focus : () => elementRef.current.focus,
	}));

	return (
		<Component
			onReady={element => (elementRef.current = element)}
			{...other}
		/>
	);
};

StripeInput.propTypes = {
	component : PropTypes.func.isRequired,
	inputRef  : PropTypes.func.isRequired,
	options   : PropTypes.func.isRequired,
};

export default StripeInput;
