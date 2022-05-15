
import { capitalize }    from "~/Util";
import { VariantsInput } from "~/ToolKit";
import AddVariant        from "~/Components/MobileLayout/AddVariant"
import useStyles         from "./styles";

import {
	Grid,
	Hidden,
} from "@material-ui/core";

export interface Props {
	delegations ?: any;
	products    ?: Array<any>;
	token       ?: string;
	providerId  ?: number;
	productId   ?: number;
};

const VariantsCell: React.FC<Props> = ({
	delegations : {
		handleStatus,
		handleDelete
	},
	productId,
	products = [],
	providerId,
}) => {
	const classes = useStyles();
	
	return (
		<Grid
			container
			justify="space-between"
			alignItems="flex-end"
			alignContent="flex-start"
			className={classes.root}
		>
			{ products.map(product => (
				<Grid item>
					<VariantsInput
						providerId  = {providerId}
						productId   = {product.id}
						key         = {product.id}
						freeze      = {product?.flags === "FREZEE"}
						className   = "input"
						quality     = {capitalize(product.quality)}
						size        = {capitalize(product.size)}
						value       = {product.price}
						disabled    = {product?.status === "INACTIVE"}
						options ={[
							{
								label : product.status === "ACTIVE" ? "Pausar" : "Activar",
								handler : () => handleStatus(product) 
							},
							{
								label : "Eliminar variedad",
								handler : () => handleDelete(product)
							},
						]}
					/>
				</Grid>
			)) }
			<Hidden smDown>
				<Grid item className={classes.flexGrow} />
			</Hidden>
			<Hidden mdUp>
				<Grid container alignContent="center" alignItems="center" item className={classes.flexGrow}>
					{ products.length < 9 &&
						<AddVariant productId={productId} textBnt={true} />
					}
				</Grid>
			</Hidden>
			<style global jsx>
				{`
					.MuiFilledInput-root {
						position: relative;
						transition: background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
						background-color: #00000000;
						border-top-left-radius: 4px;
						border-top-right-radius: 4px;
						border: 1px solid #e6e6e6;
						border-bottom: solid #22B573;
					}
					.MuiFilledInput-root.Mui-disabled {
						background-color: #9898981f!important;
						border-bottom: none;
					}
					.MuiFilledInput-input {
						padding: 10px;
					}
				`}
			</style>
		</Grid>
	);
};

export default VariantsCell;
