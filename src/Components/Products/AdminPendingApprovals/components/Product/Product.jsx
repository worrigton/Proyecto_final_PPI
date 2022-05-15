import PropTypes from "prop-types";
import { Zoom }  from "react-reveal";

// Import Own Components
import useStyles from "./styles";
import {
	Typography,
	Button,
	StateIndicator,
} from "~/ToolKit";

const Product = ({
	delegations : {
		identifier,
		withColumnStyles,
		approveProduct,
	},
	data : {
		image,
		type,
		name,
		username,
	},
}) => {
	const classes = useStyles(withColumnStyles);
	let typevalue = "";

	switch (type) {
		case "CREATE":
			typevalue = "new_product";
			break;
		case "EDIT":
			typevalue = "suggested_change";
			break;
		default:
			break;
	}

	return (
		<div
			id={identifier}
			className={`${classes.product} ${withColumnStyles ? classes.withColumnStyles : ""}`}
		>
			<div className={classes.imageContainer}>
				<Zoom>
					<img src={image} alt="ProductImage" />
				</Zoom>
			</div>
			<div className={classes.dataContainer}>
				<div className={classes.spacer} />

				<div className={classes.data}>
					<StateIndicator
						type={typevalue}
						className={classes.flag}
					/>

					<Typography type="header2" className={classes.productName}>
						{ name }
					</Typography>

					<Typography type="paragraph">
						{ "Agregado por " } <br />
						{ username }
					</Typography>

					<Button
						onClick={approveProduct}
						color="primary"
					>
						REVISAR
					</Button>
				</div>
			</div>
		</div>
	);
};

Product.propTypes = {
	delegations : PropTypes.object.isRequired,
	data        : PropTypes.object.isRequired,
};

export default Product;
