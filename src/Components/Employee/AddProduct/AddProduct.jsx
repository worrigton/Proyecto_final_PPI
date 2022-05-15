// Import Own Components
import PrivateEmployeeRoute from "~/Components/Employee/PrivateEmployeeRoute";
import EmployeeLayout       from "~/Components/Employee/EmployeeLayout";
import ProductManagement    from "~/Components/ProductManagement";
import { useRedirectTo }    from "~/Util/Hooks";
import useStyles            from "./styles";

const AddProduct = () => {
	const classes    = useStyles();
	const redirectTo = useRedirectTo();

	return (
		<PrivateEmployeeRoute>
			<EmployeeLayout>
				<div className={classes.root}>
					<ProductManagement
						type="employee"
						mode="create"
						onSuccess={redirectTo("/employee")}
						onFail={redirectTo("/employee")}
						backButton={{
							prefetch   : true,
							redirectTo : "/employee",
							text       : "Buscar producto",
							title      : "Agregar producto",
						}}
					/>
				</div>
			</EmployeeLayout>
		</PrivateEmployeeRoute>
	);
};

export default AddProduct;
