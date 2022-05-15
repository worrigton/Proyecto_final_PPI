import PropTypes from "prop-types";
import {
	AppBar,
	Toolbar,
	Menu,
	MenuItem,
	Divider,
} from "@material-ui/core";

// Import Own Components
import logo            from "~/Resources/logo_black_bg.png";
import UserImage       from "~/Components/UserImage";
import withStateLoaded from "~/Store/withStateLoaded";
import useStyles       from "./styles";
import {
	Typography,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";

const Header = ({
	delegations : {
		anchorEl,
		handleOpen,
		handleClose,
		routes,
		toAdminHome,
		logOut,
	},
	username,
	userId,
}) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Clicker onClick={toAdminHome}>
						<img src={logo} alt="zoko's logo" />
					</Clicker>

					<div className={classes.spacer} />

					<UserImage userId={userId}>
						<Clicker onClick={handleOpen}>
							<Typography
								type="header4"
								className={classes.userName}
							>
								{username || ""}
							</Typography>
						</Clicker>

						<Menu
							disableScrollLock={true}
							id="admin-user-routing-options"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
							getContentAnchorEl={null}
							anchorOrigin={{ vertical : "bottom", horizontal : "center" }}
							transformOrigin={{ vertical : "top", horizontal : "center" }}
						>
							{ routes.map(({ redirectFn, components }, index) => (
								<MenuItem
									onClick={redirectFn(handleClose)}
									key={index}
								>
									{ components }
								</MenuItem>
							)) }
							<Divider />

							<MenuItem onClick={logOut}>Cerrar Sesión</MenuItem>
						</Menu>
					</UserImage>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<br />
		</div>
	);
};

Header.propTypes = {
	delegations : PropTypes.object.isRequired,
	username    : PropTypes.string,
	userId      : PropTypes.number,
};

Header.defaultProps = {
	username : "",
};

const mapStateToProps = ({ userReducer : { admin } }) => ({
	username : admin?.data?.username,
	userId   : admin?.data?.id,
});

export default withStateLoaded(mapStateToProps)(Header);
