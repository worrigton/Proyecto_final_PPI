import {
	Typography,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import { useRedirectTo } from "~/Util/Hooks";
import { FaAngleLeft }   from "~/Resources/icons/fas";
import useStyles         from "./styles";

interface Props {
	redirectTo ?: string;
	text       ?: string;
	title      ?: string;
	className  ?: string;
};

const BackButton: React.FC<Props> = ({
	redirectTo = "",
	text       = "",
	title      = "",
	className  = "",
}) => {
	const classes      = useStyles();
	const redirectToFn = useRedirectTo();

	return (
		<div className={`${classes.root} ${className}`}>
			<Clicker
				onClick={redirectToFn(redirectTo)}
				className={classes.backButton}
			>
				<FaAngleLeft style={{
					height : "1em",
					width  : "1em",
				}} />
				<span>
					{text}
				</span>
			</Clicker>

			{ title && (
				<Typography
					type="body2"
					fontWeight="600"
					className={classes.title}
				>
					{title}
				</Typography>
			) }
		</div>
	);
};

export default BackButton;
