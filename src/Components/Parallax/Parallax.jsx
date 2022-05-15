import PropTypes from "prop-types";
import { Grid }  from "@material-ui/core";

// Import Own Components
import {
	Button,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import useStyles from "./styles";

const ParallaxBanner = ({
	delegations : {
		handle,
	},
	title,
	subtitle,
	background,
	alignment,
	backgroundSize,
	paradax,
	shadow,
	height,
	color,
	btnContainer,
	btnColor,
	btn,
	textColor,
}) => {
	const classes = useStyles({
		color,
		shadow,
		height,
		background,
		alignment,
		backgroundSize,
		paradax,
		btnColor,
	});

	return (
		<div className={classes.parallaxContainer}>
			<div className={classes.parallaxContainerFlex}>
				<Grid container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
					>
						<div
							className={classes.title}
							dangerouslySetInnerHTML={{ __html : title }}
						/>
						<div
							className={classes.subTitle}
							dangerouslySetInnerHTML={{ __html : subtitle }}
						/>
						{ btnContainer && (
							btn ? (
								<div>
									<Button
										color={btnColor}
										onClick={handle}
										textColor={textColor}
										className={classes.button}
									>
										{btnContainer}
									</Button>
								</div>
							) : (
								<div>
									<Clicker onClick={handle}>
										{btnContainer}
									</Clicker>
								</div>
							)
						) }
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

ParallaxBanner.propTypes = {
	delegations    : PropTypes.object.isRequired,
	title          : PropTypes.string.isRequired,
	subtitle       : PropTypes.string,
	alignment      : PropTypes.string,
	backgroundSize : PropTypes.string,
	paradax        : PropTypes.string,
	height         : PropTypes.string,
	btnContainer   : PropTypes.any,
	btnColor       : PropTypes.string,
	btnTextColor   : PropTypes.string,
	boxShadow      : PropTypes.string,
	btnFontSize    : PropTypes.string,
	background     : PropTypes.elementType,
	shadow         : PropTypes.bool,
	color          : PropTypes.bool,
	btn            : PropTypes.bool,
	url            : PropTypes.string,
	textColor      : PropTypes.bool,
};

ParallaxBanner.defaultProps = {
	title          : undefined,
	subtitle       : undefined,
	background     : undefined,
	btnContainer   : undefined,
	alignment      : "center",
	backgroundSize : "cover",
	paradax        : "initial",
	height         : "350px",
	btnColor       : "primary",
	boxShadow      : "",
	btnTextColor   : "",
	btnFontSize    : "",
	shadow         : false,
	color          : true,
	btn            : true,
	url            : "/",
	textColor      : false,
};

export default ParallaxBanner;
