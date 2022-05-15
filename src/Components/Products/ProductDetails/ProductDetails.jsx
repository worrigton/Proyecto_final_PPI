/* eslint-disable max-len */
/* eslint-disable camelcase */
import PropTypes         from "prop-types";
import { useMemo }       from "react";
import {
	Paper,
	Grid,
	Divider,
	Tabs,
	Tab,
	Grow,
	IconButton,
	InputAdornment,
	FormControl,
	Select,
	MenuItem,
	InputLabel,
} from "@material-ui/core";

// Import Own Components
import {
	FaInfoCircle,
	FaChevronDown,
	FaChevronUp,
} from "~/Resources/icons/fal";
import { FaSnowFlake }              from "~/Resources/icons/far";
import { FaHeart as FullHeart }     from "~/Resources/icons/fas";
import { FaHeart as OutlinedHeart } from "~/Resources/icons/fal";
import StarRating                   from "~/Components/StarRating";
import GridContainer                from "~/Components/GridContainer/GridContainer";
import TitlePage                    from "~/Components/TitlePage/TitlePage";
import OtherSellers                 from "~/Components/Products/OtherSellers/OtherSellers";
import {
	Typography,
	Button,
	GalleryCarousel,
	ButtonWithoutStyles as Clicker,
	Input,
} from "~/ToolKit";
import useStyles from "./styles";

const ProductDetails = ({
	delegations : {
		handleVariantChange,
		quantity,
		tabIndex,
		discount,
		data,
		filter,
		product,
		total,
		addToCart,
		providerInfo,
		handleClickOpen,
		changeQuantityWith,
		handleTabChange,
		redirectEditProduct,
		providerChange,
		providerInfoAll,
		selectedProvider,
		sizes,
		changeQuantity,
		setShow,
		show,
		handleLikedOrDisliked,
		liked,
		varieties,
		adminLayout,
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

	const getStepContent = (index) => {
		switch (index) {
			case 0:
				return (
					<Grid item>
						<Typography type="body2">
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
	return (
		<>
			{
				product && (
					<div>
						{
							!adminLayout ? (
								<TitlePage
									url="/productos"
									nameUrl="Productos"
								/>
							) : (
								<TitlePage
									title={data.name}
								/>
							)
						}
						<GridContainer
							className={classes.root}
							leftItems={[
								<Paper elevation={0} className={classes.paddingGrid} key="productinfo">
									<Grid container>
										{adminLayout && (
											<Grid item>
												<Clicker onClick={redirectEditProduct}>
													<Typography
														fontWeight="500"
														type="header4"
													>
														<span className={classes.vendor}>Editar producto</span>
													</Typography>
												</Clicker>
											</Grid>
										)}
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
								</Paper>,
								<OtherSellers delegations={{ product, data, providerChange, selectedProvider }} key="otherSellers" />,
							]}
							rightItems={[
								<Paper elevation={0} className={classes.paddingGrid} key="GeneralInfo">
									<Grid item>
										<Grid container>
											<Grid item xs={9} md={10}>
												<Typography type="header2" fontWeight="700">
													{data.name}
												</Typography>
											</Grid>
											{!adminLayout && (
												<Grid item xs={3} md={2}>
													<IconButton
														onClick={handleLikedOrDisliked}
														className={classes.favoriteButton}
													>
														<div>
															{ liked ? (
																<FullHeart size={2} />
															) : (
																<OutlinedHeart size={2} />
															) }
														</div>
													</IconButton>
												</Grid>

											)}
										</Grid>
										<Typography
											className={classes.price}
											type="header2"
											fontWeight="600"
										>
											${product && selectedProvider?.price}/kg
										</Typography>
										{
											product.providers[0].flags === "frezee" && (
												<Grid>
													<Typography
														className={classes.frezeeActive}
														type="header4"
														fontWeight="600">
														<FaSnowFlake /> Producto congelado
													</Typography>
												</Grid>
											)
										}
										<Clicker onClick={()=>setShow(!show)} style={{ height : 0, padding : "0px" }}>
											<Typography
												className={classes.margin}
												type="header4"
												fontWeight="400"
											>
												Vendido por <span className={classes.vendor}>
													{selectedProvider.trade_name}
													{ !show ? (
														<FaChevronDown className={classes.icon} />
													) : (
														<FaChevronUp className={classes.icon} />
													)}
												</span>
											</Typography>
										</Clicker>
										{show && (
											<Grow
												in={show}
												{...(show ? { timeout : 1000 } : {})}
											>
												<Grid container className={classes.ratingContainer}>
													<Grid item container>
														<StarRating
															rank={providerInfoAll[selectedProvider.provider_id]?.rating}
														/>&nbsp;
														<Typography type="header4">
															{providerInfoAll[selectedProvider.provider_id]?.rating}
															&nbsp;
															({providerInfoAll[selectedProvider.provider_id]?.total_products} productos)
														</Typography>
													</Grid>
													<Grid>
														<Typography
															type="body2"
															fontWeight="600">
															{`${providerInfoAll[selectedProvider.provider_id]?.finish_orders} Ventas concretadas`}
														</Typography>
														<Typography type="header4">
															{providerInfoAll[selectedProvider.provider_id]?.regions.map((item, i) =>
																`${item.state}${
																	i < providerInfoAll[selectedProvider.provider_id].regions.length - 1
																		? ", " : "." }`,
															)}
														</Typography>
													</Grid>
												</Grid>
											</Grow>
										)}
										<Grid />
										{
											providerInfo.discounts.length > 0 && (
												<Clicker onClick={handleClickOpen} style={{ marginTop : ".5rem", padding : "0px" }}>
													<Grid
														container
														direction="row"
														justify="center"
														alignItems="center"
														xs={12}
													>
														<Typography
															type="body2"
															fontWeight="700"
														>
															Este proveedor ofrece descuento por volumen
														</Typography>
														<FaInfoCircle />
													</Grid>
												</Clicker>
											)
										}
										<Grid className={classes.controlsQuantityContainer} align="center" justify="space-between">
											<Grid item xs={12}>
												<div className={classes.inputNumber}>
													<button
														className={classes.btnMinus}
														type="button"
														onClick={changeQuantityWith(value => parseInt(value) - 10)}
													>
														&minus;
													</button>
													<Input
														id="Quantity"
														className={classes.inputNumberValue}
														value={quantity}
														onChange={changeQuantity}
														type="number"
														autoFocus={false}
														inputProps={{
															min          : "0",
															max          : "99999",
															"aria-label" : "naked",
															style        : {
																textAlign  : "center",
																appearance : "none",
																width      : "100%",
																border     : "0",
																height     : "2em",
																margin     : "0",
																fontSize   : "1.2rem",
																display    : "block",
															},
														}}
														icon={<InputAdornment position="end">Kg</InputAdornment>}
														position="end"
													/>
													<button
														className={classes.btnPlus}
														onClick={changeQuantityWith(value => parseInt(value) + 10)}
													>
														&#43;
													</button>
												</div>
											</Grid>
										</Grid>
										<Grid direction="column" item xs={12} container alignItems="center">
											{
												discount &&  discount > 0 && (
													<Typography type="header4">
														descuento {discount}%
													</Typography>
												)
											}
											<Typography type="header3" fontWeight="700">
												Total {total.toLocaleString("en-US", { style : "currency", currency : "USD" })}
											</Typography>
										</Grid>
										<Grid className={classes.outlineContainer}>
											<Grid item>
												<FormControl variant="outlined" className = {classes.selectVariantQuality}>
													<InputLabel id="quality">Calidad</InputLabel>
													<Select
														labelId   = "quality"
														id        = "quality"
														value     = {filter.quality}
														onChange  = {handleVariantChange("quality")}
														label     = "Calidad"
													>
														{
															varieties && Object.keys(varieties).map(item => (<MenuItem key={item.id} value={item}>{item}</MenuItem>))
														}
													</Select>
												</FormControl>
												{/* <Autocomplete
													options = {Object.keys(varieties)}
													id="qualities"
													selectOnFocus
													inputValue={filter.quality}
													value={filter.quality}
													onChange={handleVariantChange("quality")}
													renderInput={(params) => <TextField {...params} label="Calidad " variant="outlined" />}
												/> */}
											</Grid>
										</Grid>
										<Grid className={classes.outlineContainer}>
											<Grid item>
												<FormControl variant="outlined" className = {classes.selectVariantQuality}>
													<InputLabel id="sizes">Tamaño</InputLabel>
													<Select
														labelId   = "sizes"
														id        = "sizes"
														value     = {filter.size}
														onChange  = {handleVariantChange("size")}
														label="Tamaño"
													>
														{
															sizes && sizes.map(item => (<MenuItem key={item.id} value={item}>{item}</MenuItem>))
														}
													</Select>
												</FormControl>
												{/* <Autocomplete
													options={sizes}
													id="sizes"
													selectOnFocus
													inputValue={filter.size}
													value={filter.size}
													onChange={handleVariantChange("size")}
													renderInput={(params) => <TextField {...params} label="Tamaño " variant="outlined" />}
												/> */}
											</Grid>
										</Grid>
										<Grid className={classes.padding} />
										{!adminLayout && (
											<Grid>
												<Button
													grow
													color="primary"
													onClick={addToCart}
													disabled={total == 0}
												>
													Agregar a mi lista
												</Button>
											</Grid>
										)}
									</Grid>
								</Paper>,
							]}
						/>
						<style jsx global>{`
							.MuiAutocomplete-endAdornment {
								top: 5px!important;
								right: 0;
								position: absolute;
							}
							.MuiAutocomplete-clearIndicator {
								display : none;
							}
							 
						`}</style>
					</div>
				)
			}
		</>
	);
};

ProductDetails.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default ProductDetails;
