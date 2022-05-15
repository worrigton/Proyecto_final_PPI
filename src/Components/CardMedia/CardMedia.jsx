import PropTypes from "prop-types";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
} from "@material-ui/core";

// Import Own Components
import Typography from "~/ToolKit/Typography";
import useStyles  from "./styles";

/** Component to find an image with title and information */
const CardMediaContainer = ({
	icon,
	image,
	title,
	body,
	height,
	cardActions,
	otherClass,
	classesProps,
	typeTitle,
}) => {
	const classes = useStyles();

	return (
		<Card
			className={`
				${classes.root}
				${otherClass ? classes.AffiliateClasses : ""}
				${classesProps}
			`}>
			<CardMedia
				component="img"
				image={image}
				height={height}
				title={title}
				className={classes.media}
			/>
			<CardContent className={classes.cardContent}>
				{icon &&
					icon}
				{typeof title === "string" ? (
					<Typography
						type={typeTitle || "header2"}
						fontWeight="600"
						className={`
						${ otherClass ? classes.TitleClasses : ""}
					`}>
						{title}
					</Typography>
				) : (<>
					{ title }
				</>)}
				<br />
				{typeof body === "string" ? (
					<Typography className={`
						${ otherClass ? classes.BodyClasses : ""}
					`}>
						{body}
					</Typography>
				) : (<>
					{body}
				</>)}
			</CardContent>
			{cardActions && (
				<CardActions className={classes.cardActions}>
					{cardActions}
				</CardActions>
			)}
		</Card>
	);
};

CardMediaContainer.propTypes = {
	icon         : PropTypes.any,         // receive an icon from parent component
	image        : PropTypes.elementType, // receive an image element type
	title        : PropTypes.any,         // get the title for the card, it is mandatory
	body         : PropTypes.any,         // the text content of the card
	height       : PropTypes.number,      // set image card size
	cardActions  : PropTypes.any,         // receive items to perform an action
	otherClass   : PropTypes.bool,        // receive other class from parent component
	classesProps : PropTypes.any,
	typeTitle    : PropTypes.string,
};

CardMediaContainer.defaultProps = {
	cardActions : <></>,
	height      : 250,
	body        : "",
	otherClass  : false,
};

export default CardMediaContainer;
