import { Avatar } from "@material-ui/core";

// Import Own Components
import useStyles from "./styles";

interface Props {
	className ?: string;
}

const General: React.FC<Props> = ({ className = "", ...rest }) => {
	const classes = useStyles();

	return (
		<Avatar
			className={`${classes.primary} ${className}`}
			{...rest}
		>
			<div className={classes.secondary} />
		</Avatar>
	);
};

export default General;
