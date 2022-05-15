/* eslint-disable camelcase */
import PropTypes  from "prop-types";
import {
	IconButton,
	Grid,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Divider,
	Switch,
	FormControlLabel,
} from "@material-ui/core";

import { useTheme }  from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// Import Own Components
// eslint-disable-next-line no-unused-vars
import {
	Typography,
	Select2,
	Button,
	Input,
} from "~/ToolKit";

import { FaPlusCircle } from "~/Resources/icons/fal";
import { FaSnowFlake }  from "~/Resources/icons/far";
import useStyles        from "./styles";


export interface Props {
	delegations ?: any;
	productId   ?: any;
	textBnt     ?: boolean;
};

const AddVariant : React.FC<Props> = ({
	delegations : {
		handleAddVariant,
		handleClickOpen,
		handleClickClose,
		handleChangeQuality,
		handleChangeSize,
		handleChangePrice,
		handleFrezee,
		productData,
		newVariant,
		open,
		textBnt,
	},
}) => {
	const classes    = useStyles();
	const theme      = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
			>
				<Grid item xs={12}>
					<IconButton
						className={classes.icon}
						onClick={handleClickOpen}
					>
						<FaPlusCircle className="" style={{}} />
					</IconButton>
				</Grid>
				<Grid item xs={12}>
					<Typography className={classes.addVarietiesLabel}>
						Agregar variedad
					</Typography>
				</Grid>
			</Grid>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClickClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					Nueva variante del producto
				</DialogTitle>
				<Divider />
				<DialogContent className={classes.minDialog}>
					<DialogContentText>
						<Grid container alignContent="center" alignItems="center">
							<Grid
								item
								xs={12}
								sm={6}
								className={classes.padding}
							>
								<img src={productData?.images[0].sm} />
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								className={classes.padding}
							>
								<Typography type="header3">{productData?.name}</Typography>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								className={classes.padding}
							>
								<Select2
									className=""
									label="Calidad"
									id="quality"
									name="quality"
									options={newVariant.qualityOptions}
									onChange={handleChangeQuality}
									valueSelect={newVariant.quality}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								className={classes.padding}
							>
								<Select2
									className=""
									label="Tamaño"
									id="size"
									name="size"
									options={newVariant.sizeOptions}
									disable={!newVariant.quality}
									onChange={handleChangeSize}
									valueSelect={newVariant.size}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								className={classes.padding}
							>
								<Input
									id="price"
									label="Precio"
									type="number"
									value={newVariant.price}
									variant="outlined"
									onChange={handleChangePrice}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
								lg={4}
								className={classes.needsRefrigeration}
							>
								<div className={classes.padding} onClick={handleFrezee}>
								<FormControlLabel
									control={
									<Switch
										checked={newVariant.freeze}
										onChange={handleFrezee}
										name="checkedB"
										color="primary"
									/>
									}
									label="Requiere refrigeración"
								/>
									{/* <Typography>
										Requiere refrigeración
									</Typography>
									<FaSnowFlake
										className=""
										style={{ 
											height : "1.5rem",
											color : newVariant.freeze ? "#3fb6ef" : theme.palette.grey[500] }}
									/> */}
								</div>
							</Grid>
						</Grid>
					</DialogContentText>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button
						onClick={handleClickClose}
						variant="outlined"
						color="white"
						grow=""
						className=""
						textColor=""
					>
						Cancelar
					</Button>
					<Button
						onClick={handleAddVariant}
						color="primary"
						grow=""
						className=""
						textColor=""
					>
						Agregar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default AddVariant;
