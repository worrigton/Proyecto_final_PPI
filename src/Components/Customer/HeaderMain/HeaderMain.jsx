import PropTypes from "prop-types";
import {
	AppBar,
	Toolbar,
	Menu,
	MenuItem,
	Divider,
	Grid,
	Container,
} from "@material-ui/core";

// Import Own Components
import logo            from "~/Resources/img/alt-logo.png";
import UserImage       from "~/Components/UserImage";
import Notifications   from "~/Components/Notifications";
import withStateLoaded from "~/Store/withStateLoaded";
import {
	FaLocation,
	FaShoppingCart,
} from "~/Resources/icons/fal";
import { FaChevronDown } from "~/Resources/icons/far";
import {
	NavLink,
	ButtonWithoutStyles as Clicker,
	Typography,
	Badge,
} from "~/ToolKit";

import useStyles from "./styles";

const HeaderMain = ({
	delegations : {
		routes,
		handleOpen,
		handleClose,
		handleOpenCtg,
		handleCloseCtg,
		handleOpenLct,
		handleCloseLct,
		toCustomerHome,
		logOut,
		anchorEl,
		anchorElCtg,
		anchorElLct,
		category,
		location,
		handleLocationState,
		handleProductCategory,
		handleInputChange,
		customer,
	},
	loggedIn,
	username,
	userId,
	stateLocation,
	cartQuantity,
}) => {
	const classes = useStyles();

	const menu = <div>
		{ routes.map(({ redirectFn, components }, index) => (
			<MenuItem
				onClick={redirectFn(handleClose)}
				key={index}
			>
				{ components }
			</MenuItem>
		)) }
		<Divider />

		<MenuItem onClick={logOut}>Cerrar Sesión </MenuItem>
	</div>;

	return (
		<div>
			<AppBar
				position="fixed"
				elevation={1}
			>
				<Toolbar className={classes.toolbar}>
					<Container maxWidth="lg">
						<Grid
							container
							direction="row"
						>
							<Grid
								container
								justify="center"
								alignItems="center"
								item
								md={12}
							>
								<Clicker onClick={toCustomerHome}>
									<img
										src={logo}
										className={classes.imgLogo}
										alt="zoko's logo"
									/>
								</Clicker>
								<input
									name="search"
									placeholder="Buscar"
									className={classes.search}
									onChange={({ target : { value } }) => handleInputChange(value)}
								/>
								{ loggedIn  ? (
									<>
										<UserImage userId={userId} className={classes.alignCenter}>
											<div onClick={handleOpen}>
												<Typography color="white" type="body2">
													<span>
														{`Hola ${username} `}
													</span>
													<FaChevronDown style={{ height : ".8rem" }} />
												</Typography>
											</div>
											<Menu
												disableScrollLock={true}
												id="simple-menu"
												anchorEl={anchorEl}
												keepMounted
												open={Boolean(anchorEl)}
												onClose={handleClose}
												getContentAnchorEl={null}
												anchorOrigin={{ vertical : "bottom", horizontal : "center" }}
												transformOrigin={{ vertical : "top", horizontal : "center" }}
											>
												{menu}
											</Menu>
										</UserImage>
										<Grid className={classes.padding}>
											<NavLink
												href="/cliente/ordenes"
												name="Mis pedidos"
												hover="white"
												color="white"
											/>
										</Grid>
										<Notifications customer={customer} />
										<NavLink
											href="/cart"
											name={
												<Badge
													numNotification={cartQuantity}
													icon={<FaShoppingCart className={classes.Icon} />}
												/>
											}
											hover="white"
											color="white"
										/>
									</>
								) : (
									<>
										<div className={classes.spacer} />
										<NavLink
											href="/cliente/login"
											name="Inicia sesión"
											color="white"
											hover="white"
										/>
									</>
								)}
							</Grid>
						</Grid>
					</Container>
				</Toolbar>
				<Toolbar className={classes.secondaryToolbar} elevation={1}>
					<Container maxWidth="lg">
						<Grid
							container
							direction="row"
						>
							<Grid
								container
								justify="flex-start"
								alignItems="center"
								item
								md={10}
							>
								<Grid className={classes.padding}>
									<Clicker onClick={handleOpenCtg}>
										<Typography
											type="body2"
											color="primary"
											className={classes.alignCenter}
										>
											Categorías
											<FaChevronDown className={classes.Icon2} />
										</Typography>
									</Clicker>
									<Menu
										disableScrollLock={true}
										id="category"
										anchorEl={anchorElCtg}
										keepMounted
										open={Boolean(anchorElCtg)}
										onClose={handleCloseCtg}
										getContentAnchorEl={null}
										anchorOrigin={{ vertical : "bottom", horizontal : "center" }}
										transformOrigin={{ vertical : "top", horizontal : "center" }}
									>
										<MenuItem
											button onClick={()=>handleProductCategory({ id : 0, name : "todas" })}>
											<Typography type="body2">
												Todas
											</Typography>
										</MenuItem>
										{ category.map((ctg) => (
											<MenuItem button key={ctg.name} onClick={()=>handleProductCategory(ctg)}>
												<Typography type="body2">
													{ctg.name}
												</Typography>
											</MenuItem>
										))}
									</Menu>
								</Grid>
								<Grid className={classes.padding}>
									<Clicker onClick={handleOpenLct}>
										<Typography
											type="body2"
											className={classes.alignCenter}
										>
											<FaLocation className={classes.Icon2} />
											{stateLocation}
											<FaChevronDown className={classes.Icon2} />
										</Typography>
									</Clicker>
									<Menu
										disableScrollLock={true}
										id="location"
										anchorEl={anchorElLct}
										keepMounted
										open={Boolean(anchorElLct)}
										onClose={handleCloseLct}
										className={classes.menu}
										getContentAnchorEl={null}
										anchorOrigin={{ vertical : "bottom", horizontal : "center" }}
										transformOrigin={{ vertical : "top", horizontal : "center" }}
									>
										{ location.length > 0 &&
											location.map((Lct) => (
												<MenuItem button key={Lct.name} onClick={()=>handleLocationState(Lct)}>
													<Typography type="body2">
														{Lct.name}
													</Typography>
												</MenuItem>
											))}
									</Menu>
								</Grid>
							</Grid>
						</Grid>
					</Container>
				</Toolbar>
			</AppBar>
		</div>
	);
};

HeaderMain.propTypes = {
	delegations : PropTypes.shape({
		anchorEl              : PropTypes.any,
		handleOpen            : PropTypes.func,
		handleClose           : PropTypes.func,
		routes                : PropTypes.array,
		toCustomerHome        : PropTypes.func,
		logOut                : PropTypes.func,
		category              : PropTypes.array,
		handleOpenCtg         : PropTypes.func,
		handleCloseCtg        : PropTypes.func,
		handleOpenLct         : PropTypes.func,
		handleCloseLct        : PropTypes.func,
		anchorElCtg           : PropTypes.any,
		anchorElLct           : PropTypes.any,
		location              : PropTypes.array,
		handleLocationState   : PropTypes.func,
		handleProductCategory : PropTypes.func,
		setSearchTerm         : PropTypes.func,
		handleInputChange     : PropTypes.func,
		searchInput           : PropTypes.string,
		customer              : PropTypes.any,
	}).isRequired,
	loggedIn      : PropTypes.bool,
	username      : PropTypes.string,
	stateLocation : PropTypes.string,
	cartQuantity  : PropTypes.number,
	userId        : PropTypes.number,
};

HeaderMain.defaultProps = {
	loggedIn : false,
	username : "",
};

const mapStateToProps = ({
	userReducer     : { customer },
	productsReducer : { filters, quantity },
}) => ({
	loggedIn      : Boolean(customer),
	username      : customer?.data?.username,
	userId        : customer?.data?.id,
	stateLocation : filters?.stateLocation?.name,
	cartQuantity  : quantity,
});

export default withStateLoaded(mapStateToProps, null)(HeaderMain);
