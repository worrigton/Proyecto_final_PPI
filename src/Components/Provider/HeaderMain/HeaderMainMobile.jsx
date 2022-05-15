import PropTypes from "prop-types";
import {
	AppBar,
	Toolbar,
	MenuItem,
	Divider,
	Grid,
	Drawer,
} from "@material-ui/core";

// Import Own Components
import logo            from "~/Resources/img/logo_colorful.png";
import UserImage       from "~/Components/UserImage";
import withStateLoaded from "~/Store/withStateLoaded";
import useStyles       from "./styles";

import {
	FaBars,
	FaTimes,
} from "~/Resources/icons/far";

import {
	NavLink,
	ButtonWithoutStyles as Clicker,
	Button,
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
	},
	loggedIn,
	username,
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

	const list = <div
		className={classes.drawerList}
	>
		{ loggedIn && <>
			<UserImage onClick={toggleDrawer(false)}>
				<NavLink
					href="/proveedor/inicio"
					name={`Hola ${username}`}
					color="default"
					hover="primary"
				/>
			</UserImage>
			<Divider />
			<div className={classes.button}>
				<Button color="primary">
					Nuevo producto
				</Button>
			</div>
			<Divider />
			<div onClick={toggleDrawer(false)}>
				{menu}
			</div>
		</>}
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
						<Grid
							container
							justify="center"
							alignItems="center"
							item
							md={10}
						>
							{ loggedIn  && <>
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
							</>}
							<Clicker onClick={toCustomerHome}>
								<img
									src={logo}
									className={classes.imgLogoXs}
									alt="zoko's logo"
								/>
							</Clicker>
							<div className={classes.spacer} />
							{ !loggedIn  && <>
								<NavLink
									href="/proveedor/login"
									name="Inicia sesión"
									hover="primary"
								/>
								<NavLink
									href="/proveedor/registro"
									name="Regístrate"
									hover="primary"
								/>
							</>}
						</Grid>
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
		handleClose    : PropTypes.func,
		routes         : PropTypes.array,
		toCustomerHome : PropTypes.func,
		logOut         : PropTypes.func,
		drawer         : PropTypes.any,
		toggleDrawer   : PropTypes.func,
		handleClick    : PropTypes.func,
		openCtg        : PropTypes.any,
		openLct        : PropTypes.any,
		category       : PropTypes.array,
		location       : PropTypes.array,
	}).isRequired,
	loggedIn : PropTypes.bool,
	username : PropTypes.string,
};

HeaderMainMobile.defaultProps = {
	loggedIn : false,
	username : "",
};

const mapStateToProps = ({ userReducer : { provider } }) => ({
	loggedIn : Boolean(provider),
	username : provider?.data?.username,
});

export default withStateLoaded(mapStateToProps, null)(HeaderMainMobile);
