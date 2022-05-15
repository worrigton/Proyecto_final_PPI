import PropTypes  from "prop-types";
import {
	Card,
	Divider,
	Drawer,
	Grid,
} from "@material-ui/core";

// Import own components
import { Typography, Button } from "~/ToolKit";
import GridContainer          from "~/Components/GridContainer/GridContainer";
import useStyles              from "./styles";

const PublishProduct = ({ delegations : {
	toggleDrawer,
	handleSubmitProduct,
	name,
	images,
	open,
	variants,
	provider,
} }) => {
	const status = {
		ACTIVE   : "ACTIVO",
		INACTIVE : "INACTIVO",
	};

	const classes = useStyles();

	const Left = () => (
		<Card className = {classes.root}>
			<Grid container>
				<Grid item xs={12} md={3} container justify="center">
					{
						images && images.length > 0 && (
							<img
								className={classes.img}
								src={images[0].sm}
								alt="profile" />
						)
					}
				</Grid>
				<Grid item xs={12} md={9} container direction="column">
					<Typography variant="h6" type="header3" className="padding">
						{name}
					</Typography>
					<Typography type="header4" className="padding">
						Variedades del producto
					</Typography>
					<Grid container>
						<Grid item xs={12} className={classes.qualitySizeLabel}>
							Calidad / Tamaño
						</Grid>
						{
							variants && variants.length > 0 && (
								variants.map(variant => (
									<Grid key={variant} item xs={3}>
										<div className={classes.qualitySizeContainer}>
											{`${variant.quality} / ${variant.size}`}
										</div>
									</Grid>
								))
							)
						}
					</Grid>
				</Grid>
			</Grid>
		</Card>
	);

	const Rigth = () => (
		<Card className = {classes.root}>
			<Typography variant="h6" className="padding">
				Resumen
			</Typography>
			<Grid container>
				<Grid item xs={6}>
					Productos Restantes
				</Grid>
				<Grid item xs={6}>
					{provider.membership.quantity_product - provider.total_active_products} Productos
				</Grid>
			</Grid>
			<Button
				disabled = {provider.membership.quantity_product - provider.total_active_products == 0 ? true : false}
				className= {classes.publishButton}
				color="primary"
				onClick={handleSubmitProduct}
			>
				Publicar
			</Button>
			<Divider />
			<Typography align="center" type="caption" className="padding">
				{`Suscripción ${provider.total_active_products} - ${provider.membership.quantity_product} Productos `}
				<strong>{status[provider.membership.status]}</strong>
			</Typography>
		</Card>
	);

	return (
		<div>
			<Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
				<div
					className={classes.publishPreviewContainer}
					role="presentation"
					onClick={toggleDrawer(open, false)}
					onKeyDown={toggleDrawer(open, false)}
				>
					<Typography variant="h6" type="header3">Publicar producto</Typography>
					<GridContainer
						leftItems = {[<Left
							key = "left-item"
						/>]}
						rightItems = {
							[<Rigth
								key="rigth-item"
							/>]
						}
						key="publish product"
					/>
					<Typography type="subtitle">{`Pódras publicar las variedades que desees 
					una vez que ${name} forme parte de tus productos.`}</Typography>
				</div>
			</Drawer>
		</div>
	);
};

PublishProduct.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default PublishProduct;
