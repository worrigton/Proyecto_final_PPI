import { FaCheckCircle } from "~/Resources/icons/fas";
import { useRedirectTo } from "~/Util/Hooks";
import {
	Button,
	Typography,
} from "~/ToolKit";
import useStyles from "./styles";

const PendingRevision = () => {
	const classes    = useStyles();
	const redirectTo = useRedirectTo();

	return (
		<div className={classes.pendingRevisionContainer}>
			<Typography
				type="header1"
				className="in-revision-title"
			>
				<FaCheckCircle className="check-circle" />
				&nbsp;
				<span className="text">
					{"Producto en revisión"}
				</span>
			</Typography>

			<Typography className="info">
				{"Te avisaremos una vez que tu producto haya sido publicado."}
			</Typography>

			<Button
				color="primary"
				onClick={redirectTo("/proveedor/inicio")}
			>
				Continuar
			</Button>
		</div>
	);
};

export default PendingRevision;
