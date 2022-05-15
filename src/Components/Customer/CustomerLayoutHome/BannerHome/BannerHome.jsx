/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter }    from "next/router";
import PropTypes        from "prop-types";
import { connect }      from "react-redux";
import {
	useCallback,
	useState,
}  from "react";
import Swing            from "react-reveal/Swing";
import {
	Grid,
	Hidden,
	Container,
	Fade,
	Modal,
	Backdrop,
} from "@material-ui/core";

// Import Own Components
import { Button, Typography } from "~/ToolKit";
import mainArt                from "~/Resources/img/Cliente/main-art-full.png";
import mainArtCrop            from "~/Resources/img/Cliente/main-art_crop.png";
import Login                  from "~/Components/Login";
import logo                   from "~/Resources/img/logo_colorful.png";
import { FaLocation }         from "~/Resources/icons/fal";
import useStyles              from "./styles";
import { FaUser }             from "~/Resources/icons/far";

const BannerHome = ({ state, loggedIn }) => {
	const router  = useRouter();
	const classes = useStyles({ mainArt, mainArtCrop });

	const [anchorEl, setAnchorEl] = useState(null);

	const handleOpen  = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose = useCallback(() => setAnchorEl(null), []);
	const toProducts  = useCallback(() => router.push("/productos"), [state]);
	const toRouter    = useCallback(url =>() => {
		router.push(url);
		setAnchorEl(null);
	}, [router]);

	return (
		<Container minWidth="sm" id="inicio">
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="space-between"
				className={classes.background}
			>
				<Grid
					container
					item
					xs={12}
					className={classes.backgroundImage}
				>
					<div className={classes.container}>
						<Hidden mdUp>
							<Grid
								container
								justify="space-between"
								direction="row"
							>
								<img
									src={logo}
									alt="zoko's logo"
									className={classes.logoImage}
								/>
								{ !loggedIn ? (
									<>
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
									</>
								) : (
									<Button
										variant="contained"
										color="primary"
										onClick={toRouter("/cliente/inicio")}
										className={classes.accountButton}
										disableElevation
									>
										<FaUser />
										Mi cuenta
									</Button>
								)}
							</Grid>
						</Hidden>
						<div>
							<Typography
								type="title"
								fontWeight="600"
								className={classes.title}
							>
								Los mejores
							</Typography>
							<Typography
								type="title"
								fontWeight="600"
								className={classes.title}
							>
								insumos a un
							</Typography>
							<Typography
								type="title"
								fontWeight="600"
								className={classes.title}
							>
								clic de distancia
							</Typography>
							<br /><br />
							<Typography
								type="header2"
								fontWeight="400"
								className={`${classes.textPadding} ${classes.title}`}
							>
								Encuentra proveedores en tu región
							</Typography>
						</div>
						<div className={classes.fitContent}>
							<Swing>
								<Button
									color={"primary"}
									className={classes.button}
									startIcon={
										<FaLocation className={classes.icon} />
									}
									onClick={toProducts}
								>
									Buscar productos
								</Button>
							</Swing>
						</div>
					</div>
				</Grid>
				<Hidden smDown>
					<Grid
						container
						item
						md={6}
						sm={8}
						justify="center"
					/>
				</Hidden>
			</Grid>
		</Container>
	);
};

BannerHome.propTypes = {
	state    : PropTypes.string.isRequired,
	loggedIn : PropTypes.bool,
};

BannerHome.defaultProps = {
	loggedIn : false,
};

const mapStateToProps = ({ productsReducer, userReducer : { customer } }) => ({
	state    : productsReducer?.state || "jalisco",
	loggedIn : Boolean(customer),
});

export default connect(mapStateToProps, null)(BannerHome);
