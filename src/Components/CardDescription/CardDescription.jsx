import PropTypes from "prop-types";
// Import Own Components
import { Span, Typography }  from "~/ToolKit";
import { Grid }              from "@material-ui/core";
import useStyles             from "./styles";

const CardAddress = ({
	title,
	customerName,
	description,
	predeterminado,
	icon,
}) => {
	const classes = useStyles();

	return (
		<Grid container direction="row" justify="center">
			<Grid item xs={12}>
				<Typography
					type="header4"
					fontWeight="700"
					style={{ textAlign : "left" }}
				>
					{customerName}
				</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				container
				justify="flex-start"
				className={classes.directionContainer}
			>
				<div className={classes.img}>
					{icon}
				</div>
				<div className={`${classes.paperPadding}`}>
					<Typography
						fontWeight={600}
						type="body2"
						style={{ display : "flex" }}
					>
						{title}
						{ predeterminado === "PREDETERMINED" &&
							<Span text="predeterminado" className={classes.spam} />}
					</Typography>
					{description}
				</div>
			</Grid>
		</Grid>
	);
};

CardAddress.propTypes = {
	url            : PropTypes.string,
	title          : PropTypes.string,
	customerName   : PropTypes.string,
	description    : PropTypes.any,
	predeterminado : PropTypes.string,
	icon           : PropTypes.any,
};

CardAddress.defaultProps = {
	url            : "",
	title          : "",
	customerName   : "",
	description    : "",
	predeterminado : "",
	icon           : <></>,
};

export default CardAddress;
