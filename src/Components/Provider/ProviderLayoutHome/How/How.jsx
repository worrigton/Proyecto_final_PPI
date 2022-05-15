import {
	Container,
	Grid,
} from "@material-ui/core";

// Import Own Components
import Typography       from "~/ToolKit/Typography";
import MultipleCarousel from "~/Components/MultipleCarousel";
import CardMedia        from "~/Components/CardMedia";
import imgRegistrate    from "~/Resources/img/Cliente/registrate.png";
import imgEncuentra     from "~/Resources/img/Cliente/encuentra.png";
import imgPedido        from "~/Resources/img/Cliente/levanta-pedido.png";
import useStyles        from "./styles";

const How = () => {
	const classes = useStyles();

	return (
		<div className={classes.container} id="como-funciona">
			<Container fixed>
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<Grid
						item
						xs={12}
						className={classes.titlePadding}
					>
						<Typography
							type="header1"
							fontWeight="400"
						>
							Fácil y Sencillo
						</Typography>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<MultipleCarousel settingsProps={null}>
							<CardMedia
								image={imgRegistrate}
								title={"1 Regístrate"}
								height={186}
								typeTitle={"header3"}

							/>
							<CardMedia
								image={imgEncuentra}
								title={"2 Encuentra tus productos"}
								height={186}
								typeTitle={"header3"}
							/>
							<CardMedia
								image={imgPedido}
								title={"3 Levanta tu pedido"}
								height={186}
								typeTitle={"header3"}
							/>
						</MultipleCarousel>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default How;
