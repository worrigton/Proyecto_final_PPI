/* eslint-disable camelcase */
import PropTypes  from "prop-types";
import { Zoom }   from "react-reveal";
import Pagination from "@material-ui/lab/Pagination";
import {
	Grid,
	Paper,
	FormControl,
	Hidden,
	Tab,
	Tabs,
	Divider,
	Avatar,
	MenuItem,
	useTheme,
} from "@material-ui/core";

// Import Own Components
// eslint-disable-next-line no-unused-vars
import {
	ButtonWithoutStyles as Clicker,
	Typography,
	Select2,
	Select,
	NativeInput,
	//CheckBox,
} from "~/ToolKit";
import GeneralAvatar          from "~/Components/UserImage/General";
import ResumeVariantContainer from "~/Components/MobileLayout/ResumeVariant/ResumeVariantContainer";
import VariantsCell           from "~/Components/Products/ProductsOfProvider/VariantsCell/VariantsCellContainer";
import { FaSearch }           from "~/Resources/icons/fas";
import useStyles              from "./styles";

const TableProductsProvider = ({
	delegations : {
		tabs,
		tabValue,
		handleChange,
		page,
		activePage,
		provider_id,
		tableData : {
			collection : data,
			pagination,
			message,
		},
		providerId,
		token,
		handleOrderChange,
		order,
		handleChangeFilter,
		orderBy,
		liked,
		handleLikedOrDisliked,
	},
}) => {
	const classes = useStyles();
	const theme   = useTheme();

	return (
		<div className={classes.container}>
			<Hidden smUp>
				<Grid item xs={12}>
					<FormControl variant="outlined" className={classes.formControl}>
						<Select2
							id="options"
							name="options"
							options={tabs}
							valueSelect={tabs[tabValue]}
							onChange={handleChange}
							className={classes.select2}
						/>
					</FormControl>
				</Grid>
			</Hidden>
			<Paper>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="flex-start"
				>
					<Grid xs={12}>
						<Hidden xsDown>
							<Grid xs={12}>
								<Tabs
									value={tabValue}
									onChange={handleChange}
									indicatorColor={"primary"}
									aria-label="Table tabs"
									className={classes.tabs}
									classes={{
										indicator : classes.indicator,
									}}
								>
									{ tabs.map((item) => (
										<Tab
											key={item.id}
											label={item.label}
											className={classes.tab}
										/>
									)) }
								</Tabs>
								<Divider className={classes.divider} />
							</Grid>
						</Hidden>
						<Grid
							container
							direction="row"
							className={`${classes.paddingY} ${classes.paddingX}`}
						>
							<Grid item>
								<Select
									label="Orden"
									className={classes.input}
									onChange={handleOrderChange}
									value={order}
								>
									<MenuItem value="ASC">Ascendiente</MenuItem>
									<MenuItem value="DESC">Descendiente</MenuItem>
								</Select>
							</Grid>
							<Grid item xs={7} sm={9} className={classes.mr}>
								<NativeInput
									id="admin-products-searchbar"
									placeholder={"Buscar"}
									startAdornment={FaSearch}
									className={classes.searchInput}
									styles={{
										grow     : 1,
										border   : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`,
										height   : theme.spacing(5),
										minWidth : "10%",
									}}
									onChange={handleChangeFilter}
								/>
							</Grid>
							<Grid container item sm={12}>
								<Grid item>
									<span className={classes.orderBy}>Ordenar por</span>
								</Grid>
								<Grid item>
									<Select
										label="Nombre"
										className={classes.input}
										onChange={handleOrderChange}
										value={orderBy}
									>
										<MenuItem value="Nombre">Nombre</MenuItem>
									</Select>
								</Grid>
							</Grid>
						</Grid>
						<Divider />
					</Grid>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="flex-start"
						item xs={12}
						className={classes.paddingY}
					>
						{data && data.map(items =>
							<Grid
								key={items.id}
								container
								direction="row"
								justify="center"
								alignItems="flex-start"
								item xs={12}
								className={`${classes.paddingY} ${classes.paddingX}`}
							>
								<Grid
									container
									alignItems="center"
									className={`${classes.center} ${classes.paddingX}`}
								>
									<Grid item>
										<Zoom>
											{ items.image ? (
												<Avatar
													src={items.image}
													alt="Product image"
													className={classes.avatar}
												/>
											) : (
												<GeneralAvatar />
											) }
										</Zoom>
									</Grid>
									<Grid item>
										<div className={classes.paddingX}>
											<Typography type="header4" fontWeight="600">
												&nbsp;{items.name}
											</Typography>
											<Clicker onClick={handleLikedOrDisliked(items)}>
												<Typography type="caption" color="secondary">
													{ !items.favorite ? (
														"Añadir a destacados"
													) :  (
														"Quitar de destacados"
													)}
												</Typography>
											</Clicker>
										</div>
									</Grid>
									{ tabValue == 2 &&
										<Grid item>
											<ResumeVariantContainer
												product_details_id={items.id}
												token={token}
												provider_id={provider_id}
											/>
										</Grid>}
								</Grid>
								<Grid xs={12} className={classes.paddingY} />
								<Grid
									container
									alignItems="center"
									className={`${classes.center} ${classes.paddingY} ${classes.paddingX}`}
								>
									{ items.products.length > 0 &&
										<VariantsCell
											products={items.products}
											providerId={provider_id}
											token={token}
											className={classes.paddingY}
										/>}
								</Grid>
								<Grid xs={12} className={classes.paddingY}>
									<Divider />
								</Grid>
							</Grid>
						)}
					</Grid>
					{ message &&
					<Grid item className={classes.paddingY}>
						<Typography type="header3">
							{ message }
						</Typography>
					</Grid>}
					{pagination && !message &&
					<Grid item className={classes.padding}>
						<Pagination
							className={classes.pagination}
							color="primary"
							count={pagination.pageCount}
							page={page}
							onChange={activePage}
						/>
					</Grid>}
				</Grid>
			</Paper>
		</div>
	);
};

TableProductsProvider.propTypes = {
	delegations : PropTypes.object,
};

export default TableProductsProvider;
