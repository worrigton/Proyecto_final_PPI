/* eslint-disable max-len */
import PropTypes from "prop-types";
import {
	AppBar,
	Toolbar,
	Grid,
	Hidden,
	Container,
	Popper,
	Fade,
	Paper,
	ClickAwayListener,
} from "@material-ui/core";

import {
	Button,
} from "~/ToolKit";
// Import Own Components
import logo            from "~/Resources/img/logo_colorful.png";
import { NavLink }     from "~/ToolKit";
import withStateLoaded from "~/Store/withStateLoaded";
import Login           from "~/Components/Login";
import { FaUser }      from "~/Resources/icons/far";
import useStyles       from "./styles";

const Header = ({
	delegations : {
		anchorEl,
		handleOpen,
		handleClose,
		toRouter,
	},
	loggedIn,
}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Container maxWidth="lg">
						<Grid
							container
							direction="row"
							justify="center"
							alignItems="center"
						>
							<Grid
								container
								item
								xs={4}
								className={classes.divContainerdisplay}
							>
								<Hidden smDown>
									<NavLink
										href="#inicio"
										name="Inicio"
										className={classes.nav}
									/>
									<NavLink
										href="#por-que-zoko"
										name="¿Por qué Zoko?"
										className={classes.nav}
									/>
									<NavLink
										href="#como-funciona"
										name="¿Cómo funciona?"
										className={classes.nav}
									/>
								</Hidden>
							</Grid>
							<Grid
								container
								item
								xs={4}
								className={classes.divContainerdisplay}
							>
								<img
									src={logo}
									alt="zoko's logo"
									className={classes.img}
								/>
							</Grid>
							<Grid
								container
								item
								xs={4}
							>
								<Grid
									container
									item
									xs={12}
									className={classes.divContainerButtons}
								>
									{ !loggedIn ? (
										<ClickAwayListener
											onClickAway={handleClose}
										>
											<div>
												<Button variant="outlined" color="white" className={classes.sessionButton} onClick={handleOpen}>
													Iniciar sesión
												</Button>
												<Button variant="contained" color="primary" onClick={toRouter("/cliente/registro")} disableElevation>
													Registrarme
												</Button>
												<Popper
													open={Boolean(anchorEl)}
													anchorEl={anchorEl}
													placement="bottom"
													transition
												>
													{({ TransitionProps }) => (
														<Fade {...TransitionProps} timeout={350}>
															<Paper
																elevation={3}
																className={classes.papperContainer}
															>
																<Login uiType="popper" />
															</Paper>
														</Fade>
													)}
												</Popper>
											</div>
										</ClickAwayListener>
									) : (
										<Button variant="contained" color="primary" onClick={toRouter("/cliente/inicio")} disableElevation>
											<FaUser />
											Mi cuenta
										</Button>
									)}
									{/* <Hidden smDown>
										{ !loggedIn ? (
											<>
												<NavLink
													href="/cliente/login"
													name="Inicia sesión"
												/>
												<p>/</p>
												<b>
													<NavLink
														href="/cliente/registro"
														name="Regístrate"
														hover="primary"
													/>
												</b>
											</>
										) : (
											<>
												<MenuItem onClick={logOut}>Cerrar Sesión </MenuItem>
												<p>/</p>
												<b>
													<NavLink
														href="/cliente"
														name="Perfil"
														hover="primary"
													/>
												</b>
											</>
										) }
									</Hidden> */}
								</Grid>
								<Grid
									container
									item
									xs={12}
								>
									{/* <Hidden mdUp>
										{ !loggedIn  ? (
											<>
												<div className={classes.divContainerdisplayMenu}>
													<Typography type="paragraph" onClick={handleOpen}>
														<FaUserLock className="fa-lg" />
													</Typography>
													<Menu
														id="simple-menu"
														anchorEl={anchorEl}
														keepMounted
														open={Boolean(anchorEl)}
														onClose={handleClose}
														disableScrollLock={true}
														anchorOrigin={{ vertical : "bottom", horizontal : "center" }}
														transformOrigin={{ vertical : "top", horizontal : "center" }}
													>
														<MenuItem onClick={toRouter("/cliente/registro")}>Regístrate</MenuItem>
														<MenuItem onClick={toRouter("/cliente/login")}>Inicia sesión</MenuItem>
													</Menu>
												</div>
											</>
										) : (
											<>
												<div className={classes.divContainerdisplayMenu}>
													<Typography type="paragraph" onClick={handleOpen}>
														<FaUserLock className="fa-lg" />
													</Typography>
													<Menu
														id="simple-menu"
														anchorEl={anchorEl}
														keepMounted
														open={Boolean(anchorEl)}
														onClose={handleClose}
														disableScrollLock={true}
														anchorOrigin={{ vertical : "bottom", horizontal : "center" }}
														transformOrigin={{ vertical : "top", horizontal : "center" }}
													>
														<MenuItem onClick={toRouter("/cliente")}>Perfil</MenuItem>
														<MenuItem onClick={logOut}>Cerrar sesión</MenuItem>
													</Menu>
												</div>
											</>
										) }
									</Hidden> */}
								</Grid>
							</Grid>
						</Grid>
					</Container>
				</Toolbar>
			</AppBar>
		</div>
	);
};

Header.propTypes = {
	delegations : PropTypes.shape({
		anchorEl    : PropTypes.any,
		handleOpen  : PropTypes.func,
		handleClose : PropTypes.func,
		logOut      : PropTypes.func,
		toRouter    : PropTypes.func,
	}).isRequired,
	loggedIn : PropTypes.bool,
};

Header.defaultProps = {
	loggedIn : false,
};

const mapStateToProps = ({ userReducer : { customer } }) => ({ loggedIn : Boolean(customer) });

export default withStateLoaded(mapStateToProps, null)(Header);
