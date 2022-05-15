/* eslint-disable camelcase */
import PropTypes  from "prop-types";
import {
	IconButton,
	Grid,
} from "@material-ui/core";

// Import Own Components
// eslint-disable-next-line no-unused-vars
import {
	Typography,
} from "~/ToolKit";

import { FaPlayCircle } from "~/Resources/icons/fal";
import useStyles        from "./styles";


export interface Props {
	delegations ?: any;
	productId   ?: any;
	textBnt     ?: boolean;
};

const AddVariant : React.FC<Props> = ({
	delegations : {
		activeProduct,
		textBnt,
	},
}) => {
	const classes    = useStyles();

	return (
		<>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
			>
				<Grid item>
					<IconButton
						className={classes.icon}
						onClick={activeProduct}
					>
						<FaPlayCircle className="" style={{ height : "1.5rem", width: "1.5rem", color: "#f7931e" }} />
					</IconButton>
				</Grid>
				{ !textBnt  &&
					<Grid item>
						<Typography type="caption" color="secondary">
							Reanudar variedad
						</Typography>
					</Grid>
				}
			</Grid>
		</>
	);
};

export default AddVariant;
