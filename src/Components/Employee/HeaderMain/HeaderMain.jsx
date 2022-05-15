import PropTypes from "prop-types";
import {
	AppBar,
	Toolbar,
	Menu,
	MenuItem,
	Grid,
} from "@material-ui/core";

// Import Own Components
import logo              from "~/Resources/img/logo_colorful.png";
import UserImage         from "~/Components/UserImage";
import withStateLoaded   from "~/Store/withStateLoaded";
import { FaChevronDown } from "~/Resources/icons/far";
import useStyles         from "./styles";

import {
	NavLink,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";

const HeaderMain = ({
	delegations : {
		anchorEl,
		routes,
		handleOpen,
		handleClose,
		toEmployeeHome,
		logOut,
	},
	loggedIn,
	username,
	userId,
}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar
				position="fixed"
				className={classes.appBar}
				elevation={1}
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
							<Clicker onClick={toEmployeeHome}>
								<img
									src={logo}
									className={classes.imgLogo}
									alt="zoko's logo"
								/>
							</Clicker>
							<div className={classes.spacer} />

							<NavLink
								href="/employee"
								name="Mis proveedores"
								hover="secondary"
							/>

							<UserImage userId={userId} className={classes.alignCenter}>
								<NavLink
									href="/employee/"
									name={`Hola ${username}`}
									hover="dark"
								/>
								<div
									onClick={handleOpen}
									className={classes.alignCenter}
								>
									<FaChevronDown className={classes.root} />
								</div>
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
									<MenuItem onClick={logOut}>Cerrar Sesión</MenuItem>
								</Menu>
							</UserImage>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<style global jsx>{`
				body {
					padding : 0!important;
					overflow: auto!important;
				}
			`}</style>
		</div>
	);
};

HeaderMain.propTypes = {
	delegations : PropTypes.shape({
		anchorEl       : PropTypes.any,
		handleOpen     : PropTypes.func,
		handleClose    : PropTypes.func,
		routes         : PropTypes.array,
		toEmployeeHome : PropTypes.func,
		logOut         : PropTypes.func,
	}).isRequired,
	loggedIn : PropTypes.bool,
	username : PropTypes.string,
	userId   : PropTypes.number,
};

HeaderMain.defaultProps = {
	loggedIn : false,
	username : "",
};

const mapStateToProps = ({ userReducer : { employee } }) => ({
	loggedIn : Boolean(employee),
	username : employee?.data?.username,
	userId   : employee?.data?.id,
});

export default withStateLoaded(mapStateToProps, null)(HeaderMain);
