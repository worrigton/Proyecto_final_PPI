/* eslint-disable max-len */
import {
	useMemo,
	useContext,
} from "react";
import {
	Card,
	Divider,
	Typography,
} from "@material-ui/core";

// Import Own Components
import {
	Button,
} from "~/ToolKit";
import { ProductDetailsContext } from "~/Components/Provider/ProductDetails";
import useStyles from "./styles";

const Summary = () => {
	const classes = useStyles();

	const {
		data : {
			variants,
			products,
			profilesQuantity,
		},
		toggleDrawer,
	} = useContext(ProductDetailsContext);

	const total = useMemo(() => {
		const productsQuantity = products?.length || 0;
		const variantsQuantity = variants?.length || 0;

		return productsQuantity + variantsQuantity;
	}, [products, variants]);

	return (
		<div className={classes.root}>
			<Card>
				<Typography variant="h6" className="padding">
					Resumen
				</Typography>

				<Divider />

				<Typography className="padding">
					{`${total || 0} variedad${(total || 0) !== 1 ? "es" : ""} ofertada${(total || 0) !== 1 ? "s" : ""} `}
					{ total >= 9 && (
						<span className="max">
							¡Máximo!
						</span>
					) }
				</Typography>
				<Typography className="padding">
					{`${profilesQuantity} esquema${profilesQuantity > 1 ? "s" : ""} de descuento por volumen`}
				</Typography>

				<Divider />

				<div className="buttonContainer">
					<Button color="primary" onClick={toggleDrawer(true)} className="padding">
						Continuar
					</Button>
				</div>
			</Card>
		</div>
	);
};

export default Summary;
