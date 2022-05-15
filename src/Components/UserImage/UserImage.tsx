import { Avatar } from "@material-ui/core";

// Import Own Components
// @ts-ignore
import useStyles from "./styles";

interface Props {
	src       ?: string | any;
	className ?: string,
	userId     : number,
};

const UserImage: React.FC<Props> = ({
	className = "",
	children,
	userId,
}) => {
	const classes = useStyles();

	return (
		<div className={`${classes.root} ${className}`}>
			<Avatar
				alt="User image"
				src={`/api/images/users/xs/${userId}`}
				className={classes.img}
			/>

			{ children }
		</div>
	);
};

export default UserImage;
