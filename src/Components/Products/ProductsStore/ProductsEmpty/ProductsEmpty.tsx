import { Grid } from "@material-ui/core";

import { Typography, Button } from "~/ToolKit";
import { FaExclamation }      from "~/Resources/icons/fas";
import { FaEraser }           from "~/Resources/icons/fad";
import useStyles              from "./styles";

export type MouseClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

interface Props {
    handleCleanFilters : MouseClick;
};

const ProductsEmpty: React.FC<Props> = ({ handleCleanFilters }) => {
    const classes = useStyles();

	return (
		<Grid
			container
			alignItems="center"
			justify="center"
			direction="column"
        >
			<Grid item>
				<FaExclamation className={classes.warningIcon} />
			</Grid>
			<Grid item className={classes.center}>
                {/* @ts-ignore */}
				<Typography
					type="header1"
					className={classes.message}
				>
					No se han encontrado productos
				</Typography>
                {/* @ts-ignore */}
				<Typography type="header3">
					Intenta con otros filtros
				</Typography>
                {/* @ts-ignore */}
				<Button
					type="submit"
					color="primary"
					grow
					className={classes.resetButton}
					onClick={handleCleanFilters}
				>
                    {/* @ts-ignore */}
					<FaEraser className={classes.resetButtonIcon} /> Limpiar filtros
				</Button>
			</Grid>
		</Grid>
	);
};

export default ProductsEmpty;
