// Import dependencies
import { useCallback } from "react";
import { useRouter }   from "next/router";
import {
	Grid,
	Card,
	Button,
	Divider,
} from "@material-ui/core";
import PropTypes from "prop-types";

// Import Own Components
import { Typography } from "~/ToolKit";
import useStyles      from "./styles";

const CardsTable = ({
	title,
	children,
	buttonText,
	route,
}) => {
	const classes = useStyles();
	const router  = useRouter();

	const redirect = useCallback(url => () => router.push(url), [router]);

	return (
		<Card className={classes.cardTable} variant="outlined">
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				className={classes.titleGrid}
			>
				<Typography
					type="header3"
					fontWeight="bold"
				>
					{title}
				</Typography>
				{buttonText &&
					<Button color="primary" variant="outlined" onClick={redirect(route)}>
						{buttonText}
					</Button>}
			</Grid>
			<Divider />
			<div className={classes.content}>
				{children}
			</div>
		</Card>
	);
};


CardsTable.propTypes = {
	title      : PropTypes.string.isRequired,
	children   : PropTypes.any,
	buttonText : PropTypes.string.isRequired,
	route      : PropTypes.string,
};

CardsTable.defaultProps = {
	route : "/",
};


export default CardsTable;
