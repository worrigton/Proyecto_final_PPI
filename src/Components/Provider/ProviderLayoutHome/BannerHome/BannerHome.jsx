import PropTypes from "prop-types";
import Flip      from "react-reveal/Flip";
// import Fade      from "react-reveal/Fade";
import {
	ClickAwayListener,
	Container,
	Grid,
	Hidden,
	Paper,
	Fade,
	Popper,
	Modal,
	Backdrop,
} from "@material-ui/core";

// Import Own Components
import FormResgistry from "~/Components/Forms/FormRegistry";
import Login         from "~/Components/Login";
import mainArt       from "~/Resources/img/Proveedor/banner-main.jpg";
import mainArtMovile from "~/Resources/img/Proveedor/banner-main_opt.jpg";
import logo          from "~/Resources/img/alt-logo.png";
import isotipo       from "~/Resources/img/isotipo.png";
import {
	Typography,
	ButtonWithoutStyles as Clicker,
	Button,
	NavLink,
} from "~/ToolKit";

import useStyles from "./styles";

const BannerHome = ({
	delegations : {
		login,
		toRouter,
		anchorEl,
		handleOpen,
		handleClose,
	},
	loggedIn,
}) => {
	const classes = useStyles({ mainArt, mainArtMovile, loggedIn });

	return (
		<Grid
			container
			justify="flex-start"
			alignItems="flex-start"
			className={classes.background}
		>
			{login && (
				<Login redirectTo="/proveedor/inicio" type="provider" />
			)}
			<Grid item xs={12} container className={classes.header}>
				<Container maxWidth="lg">
					<Grid direction="row" justify="center" alignItems="center" container>
						<Grid
							container
							item
							xs={6}
							md={2}
							className={classes.divContainerdisplay}
						>
							<Clicker>
								<img src={logo} alt="zoko's logo" className={classes.logo} />
							</Clicker>
						</Grid>
						<Hidden smDown>
							<Grid
								container
								item
								xs={7}
								justify="center"
								alignItems="space-between"
							>
								<NavLink
									href="#como-funciona"
									name="¿Cómo funciona?"
									className={classes.nav}
								/>
								<NavLink
									href="#planes"
									name="Planes"
									className={classes.nav}
								/>
								<NavLink
									href="#preguntas-frecuentes"
									name="Preguntas frecuentes"
									className={classes.nav}
								/>
							</Grid>
						</Hidden>
						<Grid
							container
							item
							xs={6}
							md={3}
							justify="flex-end"
							alignItems="flex-end"
						>
							{ !loggedIn ? (<>
								<Hidden smDown>
									<ClickAwayListener
										onClickAway={handleClose}
									>
										<div>
											<Button
												variant="outlined"
												color="white"
												className={classes.sessionButton}
												onClick={handleOpen}
											>
												Iniciar sesión
											</Button>
											<Button
												variant="contained"
												color="primary"
												onClick={toRouter("/proveedor/registro")}
												disableElevation
											>
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
								</Hidden>
								<Hidden mdUp>
									<Button
										variant="outlined"
										color="white"
										className={classes.sessionButton}
										onClick={handleOpen}
									>
										Iniciar sesión
									</Button>
									<Modal
										aria-labelledby="transition-modal-title"
										aria-describedby="transition-modal-description"
										className={classes.modal}
										open={Boolean(anchorEl)}
										onClose={handleClose}
										closeAfterTransition
										BackdropComponent={Backdrop}
										BackdropProps={{
											timeout : 500,
										}}
									>
										<Fade in={Boolean(anchorEl)}>
											<div className={classes.paper}>
												<Login uiType="modal" />
											</div>
										</Fade>
									</Modal>
								</Hidden>
							</>) : (<>
								<Button variant="contained" color="primary" onClick={toRouter("/proveedor/inicio")}>
									Mi Cuenta
								</Button>
							</>) }
						</Grid>
					</Grid>
				</Container>
			</Grid>
			<Grid item xs={12} container className={classes.bodyContainer}>
				<Container maxWidth="lg">
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<Grid
							item
							xs={12}
							md={7}
							lg={6}
						>
							<Flip top cascade delay={50}>
								<div>
									<Typography
										color="white"
										type="header2"
										fontWeight="100"
										className={classes.titleMain}
									>
										VENDE
									</Typography>
									<Typography
										color="white"
										type="header1"
										fontWeight="400"
										className={classes.titleMain}
									>
										TUS PRODUCTOS
									</Typography>
									<Typography
										color="white"
										type="title"
										fontWeight="600"
										className={classes.titleMain}
									>
										SIN FRONTERAS
									</Typography>
									<br />
									<Grid
										container
										direction="row"
										justify="center"
										alignContent="center"
										alignItems="stretch"
									>
										<div className={classes.subtitleMain}>
											<img src={isotipo} alt="zoko's logo" className={classes.logo} />
											<Typography
												color="white"
												type="paragraph"
												fontWeight="400"
											>
												Somos la <b>plataforma online</b> más grande de
												comercio de <b>materia prima</b> y <b>abastos</b> con
												mayor presencia en México.
											</Typography>
										</div>
									</Grid>
								</div>
							</Flip>
						</Grid>
						<Grid
							item
							xs={12}
							sm={8}
							md={5}
							lg={6}
						>
							{ !loggedIn && (<>
								<Hidden mdUp>
									<Button
										color="primary"
										className={classes.btn}
										textColor
										onClick={toRouter("/proveedor/registro")}
										disableElevation
									>
										Regístrate
									</Button>
								</Hidden>

								<Hidden smDown>
									<Fade right delay={100} duration={1500}>
										<div>
											<FormResgistry />
										</div>
									</Fade>
								</Hidden>
							</>)}
						</Grid>
					</Grid>
				</Container>
			</Grid>
		</Grid>
	);
};

BannerHome.propTypes = {
	delegations : PropTypes.object,
	loggedIn    : PropTypes.bool,
};

export default BannerHome;
