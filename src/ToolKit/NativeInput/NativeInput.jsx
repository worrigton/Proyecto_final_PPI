import PropTypes from "prop-types";

// Import Own Components
import useStyles from "./styles";

const NativeInput = ({
	id,
	label,
	styles,
	className,
	startAdornment : StartAdornment,
	endAdornment   : EndAdornment,
	...rest
}) => {
	const classes = useStyles(styles);

	return (
		<div className={`${classes.root} ${className}`}>
			{ label && (
				<label htmlFor={id}>{label}</label>
			) }

			<div className={`${classes.inputContainer} inputContainer`}>
				{ StartAdornment && (
					<div className="adornment">
						<StartAdornment />
					</div>
				) }

				<input
					id={id}
					type="text"
					autoComplete="on"
					{...rest}
				/>

				{ EndAdornment && (
					<div className="adornment">
						<EndAdornment />
					</div>
				) }
			</div>
		</div>
	);
};

NativeInput.propTypes = {
	id     : PropTypes.string,
	label  : PropTypes.string,
	styles : PropTypes.shape({
		grow   : PropTypes.number,
		border : PropTypes.string,
		height : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	}),
	className      : PropTypes.string,
	startAdornment : PropTypes.any,
	endAdornment   : PropTypes.any,
};

NativeInput.defaultProps = {
	label          : null,
	styles         : {},
	className      : "",
	startAdornment : null,
	endAdornment   : null,
};

export default NativeInput;
