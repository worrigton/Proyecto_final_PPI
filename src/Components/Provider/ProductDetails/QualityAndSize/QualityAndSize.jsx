import PropTypes from "prop-types";
import {
	Paper,
	Grid,
	Divider,
	FormControlLabel,
	Switch,
	IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
// Import Own Components
import {
	Input,
	Select2,
	Typography,
	VariantsInput,
} from "~/ToolKit";
import { FaSnowFlake }  from "~/Resources/icons/far";
import { FaPlusCircle } from "~/Resources/icons/fas";
import {
	isValidArray,
	selectAllIfTextIsZero,
} from "~/Util";
import useStyles from "./styles";

const QualityAndSize = ({
	delegations : {
		newVariant : {
			quality,
			size,
			price,
			freeze,
		},
		variants,
		qualityOptions,
		sizeOptions,
		handleChange,
		handleAddVariant,
		handleDeleteVariant,
	},
}) => {
	const classes = useStyles({ freeze });
	return (
		<>
			<Paper className={classes.root}>
				<Typography
					type="header3"
					className="title"
				>
					Variedad (Calidad y tamaño)
				</Typography>

				<Divider />

				<Grid container className={classes.actionsContainer}>
					<Grid item xs={12} md={11} lg={12}>
						<Grid container spacing={3}>
							<Grid
								item
								xs={12}
								sm={4}
								lg={3}
							>
								<Select2
									disableClearable
									label="Calidad"
									id="quality"
									name="quality"
									options={qualityOptions}
									onChange={(evnt, newValue) => handleChange("quality", newValue)}
									valueSelect={quality}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								lg={3}
							>
								<Select2
									disableClearable
									label="Tamaño"
									id="size"
									name="size"
									options={sizeOptions}
									onChange={(evnt, newValue) => handleChange("size", newValue)}
									disabled={!isValidArray(sizeOptions)}
									valueSelect={size}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								lg={3}
							>
								<Input
									label="Precio"
									value={price}
									variant="outlined"
									onFocus={selectAllIfTextIsZero}
									onChange={evnt => handleChange("price", evnt?.target?.value)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								md={1}
								lg={3}
								className={classes.addVariantIcon}
								alignItems="flex-end"
							>
								<Grid
									container
									direction="column"
									justify="center"
									alignItems="center"
								>
									<Grid item xs={12}>
										<IconButton
											className={classes.icon}
											onClick={handleAddVariant}
										>
											<FaPlusCircle className="" style={{}} />
										</IconButton>
									</Grid>
									<Grid item xs={12}>
										<Typography className={classes.addVarietiesLabel}>
											Agregar
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								lg={4}
								className={classes.needsRefrigeration}
							>
								<FormControlLabel
									control={
										<Switch
											onChange={() => handleChange("freeze")}
											name="checkedB"
											color="primary"
										/>
									}
									label="Requiere refrigeración"
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				{ isValidArray(variants) && (
					<>
						<Divider />

						<Alert
							className={classes.alert}
							severity="info"
						>
							{"Las variedades con el símbolo "}
							<FaSnowFlake style={{ height : "0.7rem" }} />
							{", requieren refrigeración."}
						</Alert>
					</>
				) }

				<Grid
					container
					spacing={3}
					className={classes.variantsContainer}
				>
					{ variants.map(({
						size,
						quality,
						price,
						freeze,
					}, position) => (
						<Grid
							item
							key={position}
							xs={12}
							md={6}
						>
							<VariantsInput
								quality={quality}
								size={size}
								value={price}
								disabled
								freeze={freeze}
								deleteIconFunc={() => handleDeleteVariant(position)}
							/>
						</Grid>
					)) }
				</Grid>
			</Paper>
		</>
	);
};

QualityAndSize.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default QualityAndSize;
