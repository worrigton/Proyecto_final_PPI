import PropTypes          from "prop-types";
import { Grid, Divider }  from "@material-ui/core";
import Link               from "next/link";

// Import Own Components
import {
	Button,
	Typography,
} from "~/ToolKit";
import { FaChevronLeft } from "~/Resources/icons/fal";
import useStyles         from "./styles";

const TitlePage = ({ title, btnTitle, url, nameUrl, btnUrl, divider }) => {
	const classes = useStyles();

	return (
		<Grid
			container
			direction="row"
			justify="space-between"
			alignItems="center"
		>
			<Grid
				item
				xs={12}
				className={classes.gridPadding}
			>
				{url ? (
					<Link href={url} prefetch>
						<a className={classes.a}>
							<FaChevronLeft />
							<Typography type="body2" fontWeight="600">
								{nameUrl}
							</Typography>
						</a>
					</Link>
				) : (
					<Typography type="body2" fontWeight="600">
						{nameUrl}
					</Typography>
				)}
			</Grid>
			{
				title && (
					<Grid
						item
						xs={12}
						md={6}
						className={classes.gridPadding}
					>
						<Typography
							type="header2"
							fontWeight="bold">
							{title}
						</Typography>
					</Grid>
				)
			}
			{ btnTitle != null ? (
				<Grid
					item
					xs={12}
					md={6}
					className={classes.gridPadding}
				>
					<Link href={btnUrl} prefetch>
						<a>
							<Button className={classes.buttom} color="primary">
								{btnTitle}
							</Button>
						</a>
					</Link>
				</Grid>
			) : (
				<></>
			)}
			{ divider &&
				<Divider className={classes.hr} />}
		</Grid>
	);
};

TitlePage.propTypes = {
	btnTitle : PropTypes.string,			// receives the address to redirect
	title    : PropTypes.string,			// receives the name of address to redirect
	url      : PropTypes.string.isRequired,	// get the title of the page
	nameUrl  : PropTypes.string.isRequired,	// receive the text to the buttom
	btnUrl   : PropTypes.string,
	divider  : PropTypes.bool,
};

TitlePage.defaultProps = {
	btnTitle : null,
	title    : "",
	btnUrl   : "",
	url      : "",
	divider  : false,
};

export default TitlePage;
