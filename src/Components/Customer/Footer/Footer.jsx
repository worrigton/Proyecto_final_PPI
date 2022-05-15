import { Container, Grid } from "@material-ui/core";

// Import Own Components
import { Typography }     from "~/ToolKit/";
import logoSegureSSL      from "~/Resources/img/ssl.png";
import useStyles          from "./styles";
import NoticeOfPrivacy    from "~/Components/Docs/NoticeOfPrivacy";
import TermsAndConditions from "~/Components/Docs/TermsAndConditions";

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>

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
						sm={4}
						className={classes.divCenter}
					>
						<img
							src={logoSegureSSL}
							alt="zoko's logo"
						/>
					</Grid>
					<Grid
						container
						item
						sm={4}
						className={classes.divCenter}
						direction="column"
					>
						<Typography type="header4" fontWeight="bold">Zoko, Justo lo que buscabas. </Typography>
						<Typography type="body2">
							Todos los derechos reservados.
						</Typography>
						<Typography type="body2">
						&nbsp; Zoko Abastos Online® 2020.
						</Typography>
					</Grid>
					<Grid
						container
						item
						sm={4}
						className={classes.divCenter}
					>
						<Typography
							type="body2"
						>
							<TermsAndConditions />
						</Typography>
						<Typography
							type="body2"
						>
							|
						</Typography>
						<Typography
							type="body2"
						>
							<NoticeOfPrivacy />
						</Typography>
					</Grid>
				</Grid>
			</Container>
		</footer>

	);
};

export default Footer;
