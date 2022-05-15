import PropTypes from "prop-types";
import Zoom      from "react-reveal/Zoom";
import Bounce    from "react-reveal/Bounce";
import {
	Container,
	Grid,
	Hidden,
} from "@material-ui/core";

// Import Own Components
import Typography       from "~/ToolKit/Typography";
import MultipleCarousel from "~/Components/MultipleCarousel";
import CardMedia        from "~/Components/CardMedia";
import Number1          from "~/Resources/img/Proveedor/1.png";
import Number2          from "~/Resources/img/Proveedor/2.png";
import Number3          from "~/Resources/img/Proveedor/3.png";
import {
	FaAppleCrate,
	FaEdit,
	FaInbox,
} from "~/Resources/icons/fal";
import useStyles        from "./styles";

const Affiliate = ({ loggedIn }) => {
	const classes = useStyles();

	const otherClass = true;
	const info = [
		{
			icon  : <FaEdit className={classes.iconClass} />,
			image : Number1,
			title : !loggedIn ? "Regístrate" : "Agrega tus productos",
			body  : !loggedIn ?
				"Al completar tus datos y hacer clic en \"Siguiente\", inicia el proceso para abrir tu cuenta." :
				"Añade la variedad de productos que deseas vender",
		},
		{
			icon  : <FaAppleCrate className={classes.iconClass} />,
			image : Number2,
			title : "Oferta tus productos",
			body  : "Muéstrale al mundo tus mejores productos, ponle precio y déjanos a nosotros lo demás.",
		},
		{
			icon  : <FaInbox className={classes.iconClass} />,
			image : Number3,
			title : "Recibe pedidos",
			body  : "¡Listo! Comienza a ganar. Ya puedes recibir pedidos rápido y fácil.",
		}];

	return (
		<div className={classes.container}>
			<Container fixed>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					id="affiliate"
				>
					<Hidden xsDown>
						<Grid
							item
							xs={12}
							className={classes.titlePadding}
						>
							<Bounce bottom delay={100} duration={1500}>
								<Typography
									type="header1"
									fontWeight="700"
								>
									{!loggedIn ? "Afiliarte es simple" : "Vender es simple"}
								</Typography>
								<Typography
									fontWeight="400"
								>
									¡Mucha gente podrá conocerte y comprarte!
								</Typography>
							</Bounce>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<MultipleCarousel settingsProps={null}>
								{info.map((item, id) => (
									<Bounce bottom delay={100} duration={1500} key={id}>
										<CardMedia
											icon={item.icon}
											image={item.image}
											title={item.title}
											body={item.body}
											height={220}
											key={id}
											otherClass={otherClass}
										/>
									</Bounce>
								))}
							</MultipleCarousel>
						</Grid>
					</Hidden>

					<Hidden smUp>
						<Grid
							item
							xs={12}
							className={classes.titlePadding}
						>
							<Zoom bottom delay={100} duration={1500}>
								<Typography
									type="header1"
									fontWeight="700"
								>
									{!loggedIn ? "Afiliarte es simple" : "Vender es simple"}
								</Typography>
								<Typography
									fontWeight="400"
								>
									¡Mucha gente podrá conocerte y comprarte!
								</Typography>
							</Zoom>
						</Grid>
						<Grid
							item
							xs={12}
						>
							{info.map((item, id) => (
								<Zoom clear delay={100} duration={1500} key={id}>
									<CardMedia
										icon={item.icon}
										image={item.image}
										title={item.title}
										body={item.body}
										height={120}
										key={id}
										otherClass={otherClass}
									/>
								</Zoom>
							))}
						</Grid>
					</Hidden>
				</Grid>
			</Container>
		</div>
	);
};

Affiliate.propTypes = {
	loggedIn : PropTypes.bool,
};

export default Affiliate;
