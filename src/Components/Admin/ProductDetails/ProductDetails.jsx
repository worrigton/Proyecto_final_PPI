/* eslint-disable camelcase */
import PropTypes         from "prop-types";
import { memo, useMemo } from "react";
import { Autocomplete }  from "@material-ui/lab";
import {
	Paper,
	Grid,
	Divider,
	Tabs,
	Tab,
	TextField,
} from "@material-ui/core";

// Import Own Components
import GridContainer           from "~/Components/GridContainer/GridContainer";
//import StarRating              from "~/Components/StarRating";
import { FaSnowFlake }         from "~/Resources/icons/far";
import { FaExclamationCircle } from "~/Resources/icons/fas";
import {
	Typography,
	QuantitySpinner,
	ButtonWithoutStyles as Clicker,
	GalleryCarousel,
} from "~/ToolKit";
import useStyles from "./styles";
import ProductDetailsWhithoutOffer from "./ProductDetailsWithoutOffer";

const ProductDetails = ({
	delegations : {
		handleVariantChange,
		handleProvider,
		quantity,
		changeQuantityWith,
		handleTabChange,
		tabIndex,
		redirect,
		data,
		filter,
		product,
		total,
		providers,
	},
}) => {
	const classes = useStyles();

	const tabs = useMemo(() => [
		{
			label : "Descripción",
		},
		{
			label : "Características",
		},
	], []);

	const qualities = useMemo(() => [
		"Primera",
		"Segunda",
		"Económica",
	], []);

	// const qualities = useMemo(() => [
	// 	"PREMIUM",
	// 	"SEGUNDA",
	// 	"PRIMERA",
	// ], []);

	const sizes = useMemo(() => [
		"Chico",
		"Mediano",
		"Grande",
	], []);

	const getStepContent = (index) => {
		switch (index) {
			case 0:
				return (
					<Grid item>
						<Typography type="header4" fontWeight="600">
							{data.description}
						</Typography>
					</Grid>
				);
			case 1:
				return (
					data.features.map((feature, item) => (
						<Grid
							item
							key={feature.name}
							className={item % 2 == 0 ? `${classes.dark}` : `${classes.light}`}
						>
							<Typography type="header4">
								{`${feature.name}: ${feature.label}`}
							</Typography>
						</Grid>
					))
				);
		}
	};

	const ProductInfo = memo(() => (
		<Paper className={classes.paddingGrid}>
			<Grid container>
				<Grid item xs={12} container align="center" justify="space-between">
					<Typography type="header2" fontWeight="bold">
						{data.name}
					</Typography>
					{
						product?.providers[0].flags && (
							<Grid>
								<Typography align="right" className={classes.margin} type="header4" fontWeight="bold">
									<FaSnowFlake style={{ height : "1.5rem" }} /> Producto congelado
								</Typography>
							</Grid>
						)
					}
				</Grid>
				<Grid>
					<Clicker onClick={redirect}>
						<Typography fontWeight="bold">
							<span className={classes.vendor}>Editar producto</span>
						</Typography>
					</Clicker>
				</Grid>
				<GalleryCarousel images={data.images} />
				<Grid container direction="column">
					<Grid item>
						<Tabs
							value={tabIndex}
							onChange={handleTabChange}
							indicatorColor="primary"
							aria-label="Table tabs"
							className={classes.tabs}
							classes={{
								indicator : classes.indicator,
							}}
						>
							{ tabs.map(({ label }, index) => (
								<Tab
									key={index}
									label={label}
									className={classes.tab}
								/>
							)) }
						</Tabs>
						<Divider />
					</Grid>
					<Grid item className={classes.tabContainer}>
						{ getStepContent(tabIndex) }
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	));

	const OtherSellers = memo(() =>(
		<Paper className={classes.paddingGrid}>
			<Grid item xs={12}>
				<Typography type="header3" fontWeight="bold">
					Otros vendedores
				</Typography>
			</Grid>
			<Grid container>
				{
					product.providers.map(product => (
						<Grid key={product.id} className={classes.OtherSellers} item xs={12} md={4}>
							<div className={classes.OtherSellersContainer}>
								<Typography type="body2" fontWeight={900}>{data.category}</Typography>
								<Typography type="body2">{product?.trade_name}</Typography>
								<Typography
									fontWeight={900}
									className={classes.price}
									type="header4">${product?.price} / Kg
								</Typography>
							</div>
						</Grid>
					))
				}
			</Grid>
		</Paper>
	));

	const General = memo(() => (
		<Paper className={classes.paddingGrid}>
			<Grid item>
				<Typography className={classes.margin} type="header5" fontWeight="bold">
					Vendedores que ofertan este producto
				</Typography>
				<Autocomplete
					inputValue = {providers[0].name}
					options = {providers.map(provider => provider.name)}
					id="providers"
					selectOnFocus
					onChange={(event, newValue) => handleProvider(event, newValue, "quality")}
					renderInput={(params) =>
						<TextField {...params} variant="outlined" />}
				/>
				<Typography className={classes.price} type="header2" fontWeight="bold">
					${product && product?.providers[0].price} / kg
				</Typography>
				<Typography className={classes.margin} type="header4" fontWeight="bold">
					Vendido por <span className={classes.vendor}>{product?.providers[0]?.trade_name}</span>
				</Typography>
				{/*<Grid container className={classes.ratingContainer}>
					<Grid item container>
						<StarRating rank={2} />
						<Typography type="header4" fontWeight="bold">
							4.6 (256)
						</Typography>
					</Grid>
					<Grid>
						<Typography type="header4">
							Guadalajara, Puerto Vallarta, Fresnillo, CDMX
						</Typography>
					</Grid>
				</Grid>*/}
				<Grid className={classes.margin} container justify="space-between" alignItems="center">
					<Grid item xs={11}>
						<Typography type="header4" fontWeight="bold">
							Este proveedor ofrece un descuento por volumen
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<FaExclamationCircle />
					</Grid>
				</Grid>
				<Grid className={classes.outlineContainer} align="center" justify="space-between">
					<Grid item xs={12} lg={6}>
						<QuantitySpinner
							value={quantity}
							changeQuantityWith={changeQuantityWith}
						/>
					</Grid>
				</Grid>
				<Grid direction="column" item xs={12} container alignItems="center">
					<Typography type="header3">
						descuento 10%
					</Typography>
					<Typography type="header2">
						Total ${total}
					</Typography>
				</Grid>
				<Grid className={classes.outlineContainer}>
					<Grid item>
						<Autocomplete
							options = {qualities}
							id="qualities"
							selectOnFocus
							inputValue={filter.quality}
							value={filter.quality}
							onChange={(event, newValue) => handleVariantChange(event, newValue, "quality")}
							renderInput={(params) =>
								<TextField disabled {...params} label="Calidad " variant="outlined" />}
						/>
					</Grid>
				</Grid>
				<Grid className={classes.outlineContainer}>
					<Grid item>
						<Autocomplete
							options = {sizes}
							id="sizes"
							selectOnFocus
							inputValue={filter.size}
							value={filter.size}
							onChange={(event, newValue) => handleVariantChange(event, newValue, "size")}
							renderInput={(params) => <TextField {...params} label="Tamaño " variant="outlined" />}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Paper>
	));
	return (
		<>
			{
				product ? (
					<GridContainer
						leftItems={[
							<ProductInfo key="productsInfo" />,
							<OtherSellers key="otherSellers" />,
						]}
						rightItems={[
							<General key="productsInfo" />,
						]}
					/>
				) : (
					<ProductDetailsWhithoutOffer delegations={{
						data,
						handleTabChange,
						tabIndex }} />
				)
			}
		</>
	);
};

ProductDetails.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default ProductDetails;
