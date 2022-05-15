/* eslint-disable camelcase */
import PropTypes         from "prop-types";
import { memo, useMemo } from "react";
import {
	Paper,
	Grid,
	Divider,
	Tabs,
	Tab,
} from "@material-ui/core";

// Import Own Components
import GridContainer           from "~/Components/GridContainer/GridContainer";
import { FaExclamationCircle } from "~/Resources/icons/fas";
import {
	Typography,
	GalleryCarousel,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import useStyles from "./styles";

const ProductDetailsWhithoutOffer = ({
	delegations : {
		data,
		handleTabChange,
		redirectEditProduct,
		tabIndex,
	},
}) => {
	const classes = useStyles();

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

	const tabs = useMemo(() => [
		{
			label : "Descripción",
		},
		{
			label : "Características",
		},
	], []);

	const ProductInfo = memo(() => (
		<Paper className={classes.paddingGrid}>
			<Grid container>
				<Grid item xs={12} container align="center" justify="space-between">
					<Typography type="header2" fontWeight="bold">
						{data.name}
					</Typography>
				</Grid>
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
				<GalleryCarousel images={data.images} />
			</Grid>
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
			<Typography
				align="center"
				type="header2"
				style={{
					display    : "flex",
					alignItems : "center",
					fontSize   : "1.2rem",
					color      : "#fb8c3d",
				}}
			>
				<FaExclamationCircle />
				Este producto no ha sido ofertado por ningún proveedor
			</Typography>
		</Paper>
	));

	return (
		<>
			<GridContainer
				leftItems={[
					<ProductInfo key="productsInfo" />,
					// <OtherSellers key="otherSellers" />,
				]}
				rightItems={[
					// <General key="productsInfo" />,
				]}
			/>
		</>
	);
};

ProductDetailsWhithoutOffer.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default ProductDetailsWhithoutOffer;
