import PropTypes from "prop-types";
import {
	AppBar,
	Toolbar,
	MenuItem,
	Divider,
	Grid,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Collapse,
	ListItemIcon,
} from "@material-ui/core";

// Import Own Components
import logo                from "~/Resources/img/alt-logo.png";
import Notifications       from "~/Components/Notifications";
import UserImage           from "~/Components/UserImage";
import withStateLoaded     from "~/Store/withStateLoaded";
import useStyles           from "./styles";
import {
	FaLocation,
	FaShoppingCart,
} from "~/Resources/icons/fal";
import {
	FaSearch,
} from "~/Resources/icons/fad";
import {
	FaBars,
	FaTimes,
} from "~/Resources/icons/far";

import {
	NavLink,
	ButtonWithoutStyles as Clicker,
	Typography,
	Badge,
} from "~/ToolKit";

const HeaderMainMobile = ({
	delegations : {
		routes,
		handleClose,
		toggleDrawer,
		handleClick,
		toCustomerHome,
		logOut,
		drawer,
		openCtg,
		openLct,
		category,
		location,
		handleProductCategory,
		handleInputChange,
		handleSearch,
		openSearch,
	},
	loggedIn,
	username,
	cartQuantity,
	stateLocation,
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

		<MenuItem onClick={logOut}> Cerrar Sesión </MenuItem>
	</div>;

	const list = <div
		className={classes.drawerList}
	>
		{ loggedIn && (
			<>
				<UserImage onClick={toggleDrawer(false)}>
					<NavLink
						href="/cliente/inicio"
						name={`Hola ${username}`}
						color="default"
						hover="primary"
					/>
				</UserImage>
				<Divider />
			</>
		) }
		<ListItem button onClick={handleClick()}>
			<ListItemIcon>
				<FaLocation />
			</ListItemIcon>
			<ListItemText primary={(
				<Typography type="header4" fontWeight="600">
					{ stateLocation }
				</Typography>
			)} />
			{ openLct ? "▴" : "▾" }
		</ListItem>
		<Collapse in={openLct} timeout="auto" unmountOnExit>
			<List component="div" disablePadding>
				{ location.map((lct) => (
					<ListItem button key={lct.name}>
						<ListItemText primary={
							<Typography type="body2">
								{lct.name}
							</Typography>
						} />
					</ListItem>
				))}
			</List>
		</Collapse>
		<Divider />
		<ListItem button onClick={handleClick("category")}>
			<ListItemText primary={
				<Typography type="header4" fontWeight="600">
					CATEGORÍAS
				</Typography>
			} />
			{openCtg ? "▴" : "▾"}
		</ListItem>
		<Collapse in={openCtg} timeout="auto" unmountOnExit>
			<List component="div" disablePadding>
				<ListItem button key={0}>
					<ListItemText
						onClick={()=>handleProductCategory({ id : 0, name : "todas" })}
						primary={
							<Typography type="body2">
								Todas
							</Typography>
						}
					/>
				</ListItem>
				{ category.map((ctg) => (
					<ListItem button key={ctg.name}>
						<ListItemText onClick={()=>handleProductCategory(ctg)} primary={
							<Typography type="body2">
								{ctg.name}
							</Typography>
						} />
					</ListItem>
				))}
			</List>
		</Collapse>
		<Divider />
		{ loggedIn && (
			<div onClick={toggleDrawer(false)}>
				{menu}
			</div>
		) }
	</div>;

	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
					>
						{!openSearch ? (
							<Grid
								container
								justify="center"
								alignItems="center"
								item
								md={10}
							>
								{ !drawer ?
									<Clicker onClick={toggleDrawer(true)}>
										<FaBars className={classes.Icon} />
									</Clicker>
									:
									<Clicker onClick={toggleDrawer(false)}>
										<FaTimes className={classes.Icon} />
									</Clicker>}
								<div className={classes.spacer} />
								<Drawer
									anchor="left"
									open={drawer}
									onClose={toggleDrawer(false)}
								>
									{list}
								</Drawer>
								<Clicker onClick={toCustomerHome}>
									<img
										src={logo}
										className={classes.imgLogoXs}
										alt="zoko's logo"
									/>
								</Clicker>
								<div className={classes.spacer} />
								{ loggedIn ? (
									<>
										<Clicker onClick={e => handleSearch(true)}>
											<Badge
												max={99}
												icon={
													<FaSearch className={classes.Icon} />
												}
											/>
										</Clicker>
										<Notifications />
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
										<Clicker onClick={e => handleSearch(true)}>
											<Badge
												max={99}
												icon={
													<FaSearch className={classes.Icon} />
												}
											/>
										</Clicker>
										<NavLink
											href="/cliente/login"
											name="Inicia sesión"
											color="white"
											hover="white"
										/>
									</>
								) }
							</Grid>
						) : (
							<Grid
								container
								justify="center"
								alignItems="center"
								item
							>
								<input
									name="search"
									placeholder="Buscar"
									className={classes.search}
									onChange={({ target : { value } }) => handleInputChange(value)}
								/>
								<Clicker onClick={e => handleSearch(false)}>
									<FaTimes className={classes.Icon} />
								</Clicker>
							</Grid>
						)}
					</Grid>
				</Toolbar>
			</AppBar>
			<style jsx>{`
				.MuiBackdrop-root, .MuiDrawer-modal {
					top: 59px!important;
				}
				.MuiDrawer-paper{
					top: 60px!important;
				}
				@media (min-width: 600px) {
					.MuiBackdrop-root, .MuiDrawer-modal {
						top: 64px!important;
					}
					.MuiDrawer-paper {
						top: 65px!important;
					}
				}
				body {
					padding : 0!important;
					overflow: auto!important;
				}
			`}</style>
		</div>
	);
};

HeaderMainMobile.propTypes = {
	delegations : PropTypes.shape({
		handleClose           : PropTypes.func,
		routes                : PropTypes.array,
		toCustomerHome        : PropTypes.func,
		logOut                : PropTypes.func,
		drawer                : PropTypes.any,
		toggleDrawer          : PropTypes.func,
		handleClick           : PropTypes.func,
		openCtg               : PropTypes.any,
		openLct               : PropTypes.any,
		category              : PropTypes.array,
		location              : PropTypes.array,
		handleProductCategory : PropTypes.func,
		openSearch            : PropTypes.bool,
		handleSearch          : PropTypes.func,
		handleInputChange     : PropTypes.func,
	}).isRequired,
	loggedIn      : PropTypes.bool,
	username      : PropTypes.string,
	cartQuantity  : PropTypes.number,
	stateLocation : PropTypes.any,
};

HeaderMainMobile.defaultProps = {
	loggedIn : false,
	username : "",
};

const mapStateToProps = ({
	userReducer     : { customer },
	productsReducer : { filters, quantity } }) => ({
	loggedIn      : Boolean(customer),
	username      : customer?.data?.username,
	stateLocation : filters?.stateLocation?.name,
	cartQuantity  : quantity,
});


export default withStateLoaded(mapStateToProps, null)(HeaderMainMobile);
