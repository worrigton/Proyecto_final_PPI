/* eslint-disable camelcase */
import PropTypes from "prop-types";
import { Grid }  from "@material-ui/core";

// Import Own Components
import SearchImg        from "~/Resources/provider/search.png";
import SearchNewProduct from "./SearchNewProduct";
import PendingRevision  from "./PendingRevision";
import useStyles        from "./styles";

const NewProduct = ({ inRevision, type, providerId }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid container>
				<Grid
					item
					xs={12}
					md={6}
					className={classes.dataContainer}
				>
					<div className="mainDiv">
						{ inRevision ? (
							<PendingRevision />
						) : (
							<SearchNewProduct {...{ type, providerId }} />
						) }
					</div>
				</Grid>
				<Grid
					item
					md={6}
					className={classes.imageContainer}
				>
					<img src={SearchImg} alt="someone with a tomato" />
				</Grid>
			</Grid>
		</div>
	);
};

NewProduct.propTypes = {
	inRevision : PropTypes.bool,
	type       : PropTypes.string,
	providerId : PropTypes.number,
};

NewProduct.defaultProps = {
	inRevision : false,
	type       : "provider",
	providerId : undefined,
};

export default NewProduct;
