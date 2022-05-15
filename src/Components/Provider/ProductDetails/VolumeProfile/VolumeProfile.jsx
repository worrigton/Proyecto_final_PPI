import PropTypes   from "prop-types";
import { Divider } from "@material-ui/core";

// Import Own Components
import {
	InputWithSign,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import useStyles from "./styles";

const VolumeProfile = ({
	values : {
		minWeight = "",
		maxWeight = "",
		discount  = "",
	},
	position,
	isLastOne,
	handleBlur,
	removeProfile,
	updateProfilesData,
}) => {
	const classes = useStyles(position);

	return (
		<>
			<div className={classes.root}>
				{ position !== 0 && (
					<div className={classes.deleteContainer}>
						<div className={classes.grow} />
						<Clicker onClick={removeProfile}>
							Eliminar
						</Clicker>
					</div>
				) }
				<div className={classes.volumeProfile}>
					<InputWithSign
						sign="Kg"
						value={minWeight}
						disabled={position > 0}
						className={classes.weight}
						onChange={updateProfilesData("minWeight", position)}
					/>
					<span className="weightsSeparator">
						{" - "}
					</span>
					<InputWithSign
						sign="Kg"
						value={maxWeight}
						disabled={!isLastOne}
						className={classes.weight}
						onChange={updateProfilesData("maxWeight", position)}
						onBlur={() => handleBlur(position)}
					/>

					<div className={classes.grow} />

					<InputWithSign
						sign="%"
						value={discount}
						onClick={e => e?.target?.select()}
						className={classes.discount}
						onChange={updateProfilesData("discount", position)}
					/>
				</div>
			</div>

			<Divider />
		</>
	);
};

VolumeProfile.propTypes = {
	values             : PropTypes.object.isRequired,
	position           : PropTypes.number.isRequired,
	isLastOne          : PropTypes.bool.isRequired,
	handleBlur         : PropTypes.func.isRequired,
	removeProfile      : PropTypes.func.isRequired,
	updateProfilesData : PropTypes.func.isRequired,
};

export default VolumeProfile;
