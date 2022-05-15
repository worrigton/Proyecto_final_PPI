import {
	TextField,
	InputAdornment,
	TextFieldProps,
} from "@material-ui/core";

// Import Own Components
import useStyles from "./styles";

interface Props {
	id      : string;
	label  ?: any;
	styles ?: {
		grow   ?: number;
		border ?: string;
		height ?: string | number;
	};
	className ?: object;
	icon      ?: any;
	position  ?: string;
};

const Input: React.FC<TextFieldProps & React.InputHTMLAttributes<any> & Props> = ({
	id,
	label     = null,
	styles    = {},
	className = "",
	position  = "start",
	icon : Icon,
	...rest
}) => {
	const classes = useStyles(styles);

	return (
		<div className={`${classes.root} ${className}`}>
			{ label && (
				<label htmlFor={id}>{ label }</label>
			) }

			<TextField
				id={id}
				{...rest}
				autoComplete="false"
				className={classes.textField}
				InputProps={
					Icon && (
						position === "end" ? {
							endAdornment : (
								<InputAdornment position="end">
									{Icon}
								</InputAdornment>
							),
						} : {
							startAdornment : (
								<InputAdornment position="start">
									{Icon}
								</InputAdornment>
							),
						})
				}
			/>
			<style global jsx>{`
				.MuiFormHelperText-contained {
					margin-left  : 0px!important;
					margin-right : 0px!important;
					font-size    : 0.75rem;
				}
			`}</style>
		</div>
	);
};

export default Input;
