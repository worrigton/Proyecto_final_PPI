/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import PropTypes    from "prop-types";
import {
	Fade,
} from "react-reveal";
import {
	Container,
	Grid,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Hidden,
} from "@material-ui/core";

import {
	FaChevronDown,
	FaQuestionCircle,
} from "~/Resources/icons/fal";

// Import Own Components
import Typography from "~/ToolKit/Typography";
import useStyles  from "./styles";

const Doubts = () => {
	const classes = useStyles();

	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={classes.container} id="preguntas-frecuentes">
			<Container fixed>
				<Grid
					container
					direction="row"
					justify="space-between"
					alignItems="stretch"
					alignContent="center"
					id="Doubts"
				>
					<Grid
						item
						xs={12}
						className={classes.titlePadding}
					>
						<Grid
							item
							xs={12}
						>
							<Fade bottom delay={50} duration={1500}>
								<Typography
									type="title"
									fontWeight="700"
									className={classes.title}
								>
									Dudas
								</Typography>
							</Fade>
						</Grid>
					</Grid>
					<Grid
						container
					>
						<Grid
							item
							xs={12}
							md={6}
							Container
							justify="center"
							direction="row"
						>
							<Grid item className={classes.infoContainer}>
								<Typography
									type="header3"
									fontWeight="400"
									color="grey"
								>
									Si deseas más información, puedes resolver tus dudas aquí.
								</Typography>
							</Grid>
							<Hidden smDown>
								<Grid item className={classes.questionContainer}>
									<FaQuestionCircle className={classes.questionIcon} />
								</Grid>
							</Hidden>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
						>
							<Accordion elevation={0} expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
								<AccordionSummary
									expandIcon={<FaChevronDown className={classes.downCaretIcon} />}
									aria-controls="panel1bh-content"
									id="panel1bh-header"
								>
									<Typography
										type="header4"
										fontWeight="500"
										color="grey"
										fullWidth
										className={classes.heading}>
										¿Qué incluye mi suscripción con Zoko?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Puedes publicar todos los productos que incluya tu suscripción y
										hasta 9 variedades de cada producto en tu catálogo.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion elevation={0} expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
								<AccordionSummary
									expandIcon={<FaChevronDown className={classes.downCaretIcon} />}
									aria-controls="panel2bh-content"
									id="panel2bh-header"
								>
									<Typography
										type="header4"
										fontWeight="500"
										color="grey"
										fullWidth
										className={classes.heading}>
										¿Qué necesito para entrar a Zoko?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Para afiliarte a Zoko, es necesario tener el RFC de tu empresa.
										Además, necesitarás una tarjeta de crédito para cubrir
										el costo de tu suscripción.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion elevation={0} expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
								<AccordionSummary
									expandIcon={<FaChevronDown className={classes.downCaretIcon} />}
									aria-controls="panel3bh-content"
									id="panel3bh-header"
								>
									<Typography
										type="header4"
										fontWeight="500"
										color="grey"
										fullWidth
										className={classes.heading}>
										¿Cómo puedo pagar mi suscripción?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										El cobro se realiza mensualmente y de manera automática a tu tarjeta de crédito.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion elevation={0} expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
								<AccordionSummary
									expandIcon={<FaChevronDown className={classes.downCaretIcon} />}
									aria-controls="panel4bh-content"
									id="panel4bh-header"
								>
									<Typography
										type="header4"
										fontWeight="500"
										color="grey"
										fullWidth
										className={classes.heading}>
										¿Cómo funciona el registro?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Al hacer clic en "Registrarme" inicias tu registro,
										informando datos básicos para generar tu cuenta.

										Después de crear tu cuenta, configuras la información de tu
										empresa en nuestra plataforma,
										para que puedas empezar a ofrecer tus productos.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion elevation={0} expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
								<AccordionSummary
									expandIcon={<FaChevronDown className={classes.downCaretIcon} />}
									aria-controls="panel5bh-content"
									id="panel5bh-header"
								>
									<Typography
										type="header4"
										fontWeight="500"
										color="grey"
										fullWidth
										className={classes.heading}>
										¿Existe penalización por cancelar mi suscripción?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Puedes cancelar tu suscripción en el momento que lo desees y sin penalización.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion elevation={0} expanded={expanded === "panel6"} onChange={handleChange("panel6")}>
								<AccordionSummary
									expandIcon={<FaChevronDown className={classes.downCaretIcon} />}
									aria-controls="panel6bh-content"
									id="panel6bh-header"
								>
									<Typography
										type="header4"
										fontWeight="500"
										color="grey"
										fullWidth
										className={classes.heading}>
										¿Cómo me paga Zoko?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Son los compradores los encargados de pagar por tus productos.
										Zoko pone a disposición de los compradores tu información,
										incluyendo tu número de cuenta,
										de manera que puedas aplicar el esquema de cobro que creas conveniente.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion elevation={0} expanded={expanded === "panel7"} onChange={handleChange("panel7")}>
								<AccordionSummary
									expandIcon={<FaChevronDown className={classes.downCaretIcon} />}
									aria-controls="panel7bh-content"
									id="panel7bh-header"
								>
									<Typography
										type="header4"
										fontWeight="500"
										color="grey"
										fullWidth
										className={classes.heading}>
										¿Quién es responsable de las entregas?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Tú eres responsable de todas las entregas y de la gestión de los envíos.
									</Typography>
								</AccordionDetails>
							</Accordion>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

Doubts.propTypes = {
	doubts : PropTypes.array.isRequired,
};

Doubts.defaultProps = {
	doubts : [],
};

export default Doubts;
