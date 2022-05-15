import PropTypes from "prop-types";
import {
	Stepper,
	Step,
	StepLabel,
	Container,
	Grid,
} from "@material-ui/core";

// Import Own Components
import { Typography, Button } from "~/ToolKit";
import FormsContext           from "~/Components/Forms/context";
import useStyles              from "./styles";

const StepRegistry = ({
	delegations : {
		activeStep,
		getStepText,
		getStepContent,
		handleBack,
		handleNext,
	},
	steps,
	type,
}) => {
	const classes = useStyles();

	return (
		<FormsContext.Consumer>
			{ ({ submit, formValidate, submitBtn }) => (
				<Container fixed>
					<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
					>
						{ activeStep < 2 ? (
							<Grid
								item
								xs={12}
								md={6}
								container
								direction="row"
								justify="space-between"
								alignItems="center"
							>
								<Grid item>
									<Typography
										type="header2"
										fontWeight="600"
									>
										{getStepText(activeStep, type)}
									</Typography>
								</Grid>
								<Grid item>
									<Stepper
										activeStep={activeStep}
										alternativeLabel
										className={classes.stepper}
									>
										{steps.map((label) => (
											<Step key={label} className={classes.stepText}>
												<StepLabel />
											</Step>
										))}
									</Stepper>
								</Grid>
								<Grid xs={12}>
									<hr className={classes.hr} />
									<Typography
										type="caption"
										fontWeight="600"
									>
										Paso {activeStep + 1} de {steps.length}
										{ activeStep == 2 &&
											<Typography>Elige el plan adecuado para ti</Typography>}
									</Typography>
								</Grid>
							</Grid>
						) : (
							<Grid
								container
								item
								xs={12}
								direction="row"
								justify="space-between"
								alignItems="center"
								style={{ paddingTop : "3rem" }}
							>
								<Grid item>
									<Typography
										type="header2"
										fontWeight="600"
									>
										{getStepText(activeStep, type)}
									</Typography>
								</Grid>
								<Grid item>
									<Stepper
										activeStep={activeStep}
									>
										{steps.map((label) => (
											<Step key={label} className={classes.stepText}><StepLabel /></Step>
										))}
									</Stepper>
								</Grid>
								<Grid xs={12}>
									<hr className={classes.hr} />
									<Typography
										type="caption"
										fontWeight="600"
									>
										Paso {activeStep + 1} de {steps.length}
										{ activeStep == 2 &&
											<Typography>Elige el plan adecuado para ti</Typography>}
									</Typography>
								</Grid>
							</Grid>
						)}
						<Grid item xs={12} />
						{getStepContent(activeStep, type)}
						<Grid item xs={12} />
						{ activeStep < 2 ? (
							<Grid item xs={12} md={6}>
								<Button
									disabled={activeStep === 0}
									onClick={handleBack}
									color="white"
									className={classes.button}
								>
									Atrás
								</Button>
								{ activeStep === steps.length - 1 ? (<>
									{type === "customer" &&
										<Button
											variant="contained"
											color="primary"
											className={classes.button}
											onClick={submit}
											disabled={formValidate(activeStep) || submitBtn}
										>
											Registrarme
										</Button> } </>
								) : (
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
										disabled={formValidate(activeStep)}
									>
										Siguiente
									</Button>
								)}
							</Grid>
						) : (
							<Grid item xs={12} md={12}>
								<Button
									disabled={activeStep === 0}
									onClick={handleBack}
									color="white"
									className={classes.button}
								>
									Atrás
								</Button>
								{ activeStep !== steps.length - 1 &&  (
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
										disabled={formValidate(activeStep)}
									>
										Siguiente
									</Button>
								)}
							</Grid>
						)}
					</Grid>
					<style global jsx>{`
						.MuiStepConnector-root {
							display: none!important;
						}
					`}
					</style>
				</Container>
			) }
		</FormsContext.Consumer>
	);
};

StepRegistry.propTypes = {
	delegations : PropTypes.object,
	steps       : PropTypes.array,
	reset       : PropTypes.bool,
	type        : PropTypes.string,
};

export default StepRegistry;
