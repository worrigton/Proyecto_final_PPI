import {
	Container,
	FormControl,
	AppBar,
	Toolbar,
	Grid,
} from "@material-ui/core";
import { useRouter } from "next/router";

// Import Own Components
import {
	ButtonWithoutStyles as Clicker,
	NavLink,
} from "~/ToolKit";
import Forms     from "~/Components/Forms";
import Footer    from "~/Components/Customer/Footer";
import logo      from "~/Resources/img/alt-logo.png";
import useStyles from "./styles";



const Registry = (props) => {
	const classes = useStyles();
	const router = useRouter();

	return (
		<>
			<AppBar
				position="fixed"
				className={classes.appBar}
			>
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
								justify="center"
								alignItems="center"
								item
								md={12}
							>
								<Clicker onClick={() => router.push("/")}>
									<img
										src={logo}
										className={classes.imgLogo}
										alt="zoko's logo"
									/>
								</Clicker>

								<div className={classes.spacer} />
								<NavLink
									href="/cliente/login"
									name="Inicia sesión"
									color="white"
									hover="white"
								/>
							</Grid>
						</Grid>
					</Container>
				</Toolbar>
			</AppBar>
			<Container maxWidth="lg" fixed className={classes.container}>
				<FormControl className={classes.formControl}>
					<Forms
						steps={["Crear cuenta", "Facturación"]}
						type="customer"
					/>
				</FormControl>
			</Container>
			<Footer />
		</>
	);
};

export default Registry;
