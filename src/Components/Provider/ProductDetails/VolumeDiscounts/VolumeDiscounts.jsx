import PropTypes from "prop-types";
import {
	Paper,
	Divider,
} from "@material-ui/core";

// Import Own Components
import VolumeProfile from "~/Components/Provider/ProductDetails/VolumeProfile";
import {
	Button,
	Typography,
} from "~/ToolKit";
import useStyles from "./styles";

const VolumeDiscounts = ({
	delegations : {
		addProfile,
		handleBlur,
		profilesData,
		removeProfile,
		profilesQuantity,
		updateProfilesData,
	},
}) => {
	const classes = useStyles();
	return (
		<Paper className={classes.root}>
			<Typography
				type="header3"
				className="title"
			>
				Descuentos por volumen
			</Typography>

			<Divider />

			<div>
				<div className="headers">
					<span className={classes.grow}>Rango de volumen</span>
					<span>Descuento</span>
				</div>
			</div>

			{ Array.from({ length : profilesQuantity }).map((value, index) => (
				<VolumeProfile
					key={index}
					values={profilesData[index] || {}}
					position={index}
					isLastOne={index + 1 === profilesQuantity}
					handleBlur={handleBlur}
					removeProfile={() => removeProfile(index)}
					updateProfilesData={updateProfilesData}
				/>
			)) }

			<div className="actionsContainer">
				<div className="spacer" />
				<Button
					color="white"
					className="addProfile"
					onClick={addProfile}
				>
					Agregar perfil
				</Button>
			</div>
		</Paper>
	);
};

VolumeDiscounts.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default VolumeDiscounts;
