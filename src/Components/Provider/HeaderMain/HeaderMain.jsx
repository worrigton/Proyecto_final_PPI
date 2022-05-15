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
import logo              from "~/Resources/img/logo_colorful.png";
import UserImage         from "~/Components/UserImage";
import { FaChevronDown } from "~/Resources/icons/fal";
import withStateLoaded   from "~/Store/withStateLoaded";
import { useRedirectTo } from "~/Util/Hooks";
import {
	NavLink,
	Button,
	ButtonWithoutStyles as Clicker,
	Typography,
} from "~/ToolKit";
import useStyles from "./styles";
import { useRouter } from "next/router";

const HeaderMain = ({
	delegations : {
		routes,
		handleOpen,
		handleClose,
		toProviderHome,
		logOut,
		anchorEl,
	},
	loggedIn,
	username,
	imageId,
}) => {
	const classes    = useStyles();
	const redirectTo = useRedirectTo();
	const router     = useRouter();


	const menu = (
		<div>
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
		</div>
	);

	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={classes.appBar}
				elevation={1}
			>
				<Toolbar className={classes.toolbar}>
					<Container fixed maxWidth="lg">
						<Grid
							container
							justify="center"
							alignItems="center"
							item
							md={12}
						>
							<Clicker onClick={toProviderHome}>
								<img
									src={logo}
									className={classes.imgLogo}
									alt="zoko's logo"
								/>
							</Clicker>
							{ loggedIn ? (<>
								<div className={classes.spacer} />
								<NavLink
									className={
										router.pathname == "/proveedor/ordenes"
											? `${classes.active} ${classes.headerLink}`
											: `${classes.headerLink}`
									}
									href="/proveedor/ordenes"
									name="Pedidos"
									hover="primary"
								/>
								<NavLink
									className={
										router.pathname === "/proveedor/productos"
											? `${classes.active} ${classes.headerLink}`
											: `${classes.headerLink}`
									}
									href="/proveedor/productos"
									name="Mis productos"
									hover="primary"
								/>
								<Button
									color="primary"
									onClick={redirectTo("/proveedor/nuevo-producto")}
								>
									Nuevo producto
								</Button>
								<div className={classes.spacer} />
								<Clicker onClick={handleOpen}>
									<UserImage userId={imageId} className={classes.alignCenter}>
										<Typography type="caption" fontWeight="bold">
											{username}
										</Typography>
										<div
											className={classes.alignCenter}
										>
											<FaChevronDown className={classes.root} />
										</div>
									</UserImage>
								</Clicker>
								<Menu
									id="simple-menu"
									anchorEl={anchorEl}
									keepMounted
									open={Boolean(anchorEl)}
									onClose={handleClose}
									disableScrollLock={true}
									getContentAnchorEl={null}
									anchorOrigin={{ vertical : "bottom", horizontal : "center" }}
									transformOrigin={{ vertical : "top", horizontal : "center" }}
								>
									{menu}
								</Menu>
							</>) : (<>
								<div className={classes.spacer} />
								<NavLink
									className={
										router.pathname == "/proveedor/login"
											? `${classes.active} ${classes.headerLink}`
											: `${classes.headerLink}`
									}
									href="/proveedor/login"
									name="Inicia sesión"
									hover="primary"
								/>
								<NavLink
									className={
										router.pathname == "/proveedor/registro"
											? `${classes.active} ${classes.headerLink}`
											: `${classes.headerLink}`
									}
									href="/proveedor/registro"
									name="Regístrate"
									hover="primary"
								/>
							</> )}
						</Grid>
					</Container>
				</Toolbar>
			</AppBar>
		</div>
	);
};

HeaderMain.propTypes = {
	delegations : PropTypes.shape({
		anchorEl       : PropTypes.any,
		handleOpen     : PropTypes.func,
		handleClose    : PropTypes.func,
		routes         : PropTypes.array,
		toProviderHome : PropTypes.func,
		logOut         : PropTypes.func,
		category       : PropTypes.array,
		handleOpenCtg  : PropTypes.func,
		handleCloseCtg : PropTypes.func,
		handleOpenLct  : PropTypes.func,
		handleCloseLct : PropTypes.func,
		anchorElCtg    : PropTypes.any,
		anchorElLct    : PropTypes.any,
		location       : PropTypes.array,
	}).isRequired,
	loggedIn : PropTypes.bool,
	username : PropTypes.string,
	imageId  : PropTypes.number.isRequired,
};

HeaderMain.defaultProps = {
	loggedIn : false,
	username : "",
};

const mapStateToProps = ({ userReducer : { provider } }) => ({
	loggedIn : Boolean(provider),
	username : provider?.data?.username,
	imageId  : provider?.data?.fileId,
});

export default withStateLoaded(mapStateToProps, null)(HeaderMain);
