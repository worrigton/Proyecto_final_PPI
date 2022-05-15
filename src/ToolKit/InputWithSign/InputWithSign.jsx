import PropTypes from "prop-types";

// Import Own Components
import { selectAllIfTextIsZero } from "~/Util";
import useStyles                 from "./styles";

const InputWithSign = ({
	value,
	className,
	sign,
	...rest
}) => {
	const classes = useStyles();

	return (
		<div className={`${classes.root} ${className}`}>
			<div className="inputWithSignContainer">
				<input
					value={value}
					onFocus={selectAllIfTextIsZero}
					{...rest}
				/>

				<span>
					{sign}
				</span>
			</div>
		</div>
	);
};

InputWithSign.propTypes = {
	value     : PropTypes.any,
	className : PropTypes.string,
	sign      : PropTypes.any.isRequired,
};

InputWithSign.defaultProps = {
	value     : "",
	className : "",
};

export default InputWithSign;
