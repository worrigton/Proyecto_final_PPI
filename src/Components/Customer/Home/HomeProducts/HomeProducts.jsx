// Import dependencies
import { useMemo }     from "react";
import { Grid, Hidden } from "@material-ui/core";
import PropTypes       from "prop-types";

// Import Own Components
import { Typography }   from "~/ToolKit";
import CardProduct      from "~/Components/CardProduct";
import MultipleCarousel from "~/Components/MultipleCarousel";
import useStyles        from "./styles";

const HomeProducts = ({
	productos,
	title,
	message,
}) => {
	const classes = useStyles();

	const responsiveProps = useMemo(() => ({
		superLargeDesktop : {
			breakpoint : { max : 4000, min : 3000 },
			items      : 6,
		},
		desktop : {
			breakpoint : { max : 3000, min : 960 },
			items      : 5,
		},
		tablet : {
			breakpoint : { max : 960, min : 600 },
			items      : 3,
		},
		mobile : {
			breakpoint : { max : 600, min : 0 },
			items      : 2,
		},
	}), []);

	return (
		<div>
			<Hidden smDown>
				<Typography
					type="header3"
					fontWeight="600"
				>
					{title}
				</Typography>
			</Hidden>
			<Hidden mdUp>
				<Typography
					type="header2"
					fontWeight="600"
				>
					{title}
				</Typography>
			</Hidden>
			<div className={classes.products}>
				{
					productos.length === 0 ? (
						<div className={classes.message}>
							<Typography
								type="header4"
								fontWeight="400"
							>
								{message}
							</Typography>
						</div>
					) : (
						<MultipleCarousel
							settingsProps={{
								infinite      : true,
								autoPlaySpeed : "3000",
							}}
							responsiveProps={responsiveProps}
						>
							{ productos != [] && productos.map((product) =>
								<Grid
									item
									key={product.id}
									className={classes.product}
								>
									<CardProduct
										nameProduct={product.name}
										price={product.cheaper_product}
										height={150}
										image={product.image}
										id={product.id}
									/>
								</Grid>
							) }
						</MultipleCarousel>
					)
				}
			</div>
		</div>
	);
};


HomeProducts.propTypes = {
	productos : PropTypes.array,
	title     : PropTypes.string.isRequired,
	message   : PropTypes.string.isRequired,
};

HomeProducts.defaultProps = {
	productos : [],
	message   : "No hay productos para mostrar en esta categoría",
};

export default HomeProducts;
