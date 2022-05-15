import { Grid }        from "@material-ui/core";
import PropTypes       from "prop-types";
// import { useCallback } from "react";

import { Typography }                     from "~/ToolKit";
import QuantitySpinnerContainer           from "~/ToolKit/QuantitySpinner/QuantitySpinnerContainer";
import { ButtonWithoutStyles as Clicker } from "~/ToolKit";
import toCurrency                         from "~/Util/formatToCurrency";
import useStyles                          from "./styles";

const ShoppingCartItem = ({ edit, delegations:{ item, delProductCart, onChangeQuantity, index } }) => {
	const classes = useStyles();
	// const checkDiscount = useCallback((discounts, dato)=>{
	// 	let discount = 0;
	// 	discounts.forEach(element => {
	// 		if (dato >= element.min_weight && dato <= element.max_weight && dato >= 1  ) {
	// 			discount = element.discount;
	// 		}
	// 	});
	// 	return discount;
	// }, []);

	return (
		<Grid item container className={classes.root}>
			<Grid
				xs={12}
				md={2}
				className={classes.cartImageContainer}
				container
				justify="center"
				alignItems="center"
			>
				<img className={classes.cartImage} src={item.imagePath} alt="Trulli" />
			</Grid>
			<Grid xs={12} md={5} container direction="column">
				<Typography type="header4" fontWeight="bold">{item.name}</Typography>
				<Typography type="header5" fontWeight="700">
					Calidad {item.quality}. Tamaño {item.size}
				</Typography>
				<Typography
					className={classes.textGrey}
					type="header6">Vendido por : {item.seller}
				</Typography>
			</Grid>
			<Grid xs={12} md={2} container>
				<Grid xs={12} style={{ marginTop : "0.5rem" }}>
					{/* <Typography
						className={classes.price}
						type="header4"
						fontWeight="600">{toCurrency(item.price -
							(item.price * checkDiscount(item.discounts, item.quantity) / 100))}
					</Typography> */}
					<Typography
						className={classes.price}
						type="header4"
						fontWeight="600">{toCurrency(item.providerPrice)}
					</Typography>
				</Grid>
				{
					item.p_discount != 0 && (
						<Typography className={classes.discount}>
							<span>{item.p_discount} % descuento</span>
						</Typography>
					)
				}
			</Grid>
			{
				edit && (
					<>
						<Grid xs={12} md={2} container justify="center" alignItems="center">
							<QuantitySpinnerContainer
								max={10000}
								min={1}
								val={item.quantity}
								onChangeValue={onChangeQuantity}
								id={index}
							/>
						</Grid>
						<Grid container xs={12} md={1} justify="center" alignItems="center">
							<Clicker onClick={()=>delProductCart(index)} style={{ padding : "0.5rem" }}>
								<Typography className={classes.textGrey} type="caption">Eliminar</Typography>
							</Clicker>
						</Grid>
					</>
				)
			}
		</Grid>
	);
};

ShoppingCartItem.defaultProps = {
	edit : true,
};

ShoppingCartItem.propTypes = {
	edit        : PropTypes.boolean,
	delegations : PropTypes.object.isRequired,
};

export default ShoppingCartItem;
