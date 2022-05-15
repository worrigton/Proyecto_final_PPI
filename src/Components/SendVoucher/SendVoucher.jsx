/* eslint-disable camelcase */
import { PropTypes } from "prop-types";
import {
	Grid,
} from "@material-ui/core";

import useStyles            from "./styles";
import { Button }           from "~/ToolKit";

const SendVoucher = ({ preview, changeFile }) => {
	const classes = useStyles();
	return (
		<Grid container direction="column" justify="center">
			{
				preview && (
					<Grid item xs={12} container justify="center">
						<img className={classes.imgPreview} src={preview}
							alt="comprobante de pago"
						/>
					</Grid>
				)
			}
			<Grid item xs={12} container justify="center">
				<label htmlFor="upload-photo">
					<input
						style={{ display : "none" }}
						id="upload-photo"
						name="upload-photo"
						type="file"
						onChange={(event) => changeFile(event)}
					/>
					{
						<Button
							className={classes.margin2}
							color="warning"
							variant="contained"
							component="span">
							Seleccionar Archivo
						</Button>
					}
				</label>
			</Grid>
		</Grid>
	);
};

SendVoucher.propTypes = {
	changeFile : PropTypes.func.isRequired,
	preview    : PropTypes.object.isRequired,
};

export default SendVoucher;
