import Link      from "next/link";
import PropTypes from "prop-types";
import Flip from "react-reveal/Flip";
import { Paper } from "@material-ui/core";

// Import Own Components
import useStyles from "./styles";

const ConfigurationCard = ({ url, img, title, description }) => {
	const classes = useStyles();

	return (
		<Paper
			variant="outlined"
			className={classes.paperPadding}
		>
			<Link href={url} prefetch>
				<a className={classes.a}>
					<div className={classes.flex}>
						<Flip left duration={1500}>
							<img
								src={img}
								alt={title}
								className={classes.img}
							/>
						</Flip>
						<div className={classes.paperPadding}>
							<b>{title}</b>
							<br />
							<p>{description}</p>
						</div>
					</div>
				</a>
			</Link>
		</Paper>
	);
};

ConfigurationCard.propTypes = {
	url         : PropTypes.string,      // receive an image element type
	img         : PropTypes.elementType, // receives the address to redirect
	title       : PropTypes.string,      // get the title of the address
	description : PropTypes.string,      // receive description the address
};

ConfigurationCard.defaultProps = {
	url         : null,
	img         : <></>,
	title       : "",
	description : "",
};

export default ConfigurationCard;
