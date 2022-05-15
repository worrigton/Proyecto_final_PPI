import PropTypes from "prop-types";
import {
	CircularProgress,
	Paper,
	Grid,
} from "@material-ui/core";

// Import Own Components
import {
	Button,
	Input,
} from "~/ToolKit";
import useStyles from "./styles";

const Login = ({
	delegations : {
		formData,
		handleChange,
		handleSubmit,
		loading,
	},
}) => {
	const classes = useStyles();

	return (
		<Paper className={classes.root} square>
			<form noValidate autoComplete="off">
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Grid item xs={6} className={classes.dividerR}>
						<Input
							variant="outlined"
							id="Username"
							label="Email"
							name="username"
							value={formData?.username || ""}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={6} className={classes.dividerL}>
						<Input
							variant="outlined"
							id="Password"
							label="Contaseña"
							type="password"
							name="password"
							value={formData?.password || ""}
							onChange={handleChange}
						/>
					</Grid>

					<Button
						type="submit"
						color="primary"
						grow
						className={classes.button}
						onClick={handleSubmit}
					>
						Iniciar sesión
					</Button>
					{ loading && (
						<div className={classes.loading}>
							<CircularProgress />
						</div>
					) }
				</Grid>
			</form>
		</Paper>
	);
};

Login.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default Login;
