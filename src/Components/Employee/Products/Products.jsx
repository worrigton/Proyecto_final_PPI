/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo }           from "react";
import PropTypes             from "prop-types";
import { useRouter }         from "next/router";
import { Avatar, Container } from "@material-ui/core";
import { Zoom }              from "react-reveal";

// Import Own Components
import TitlePage      from "~/Components/TitlePage";
import EmployeeLayout from "~/Components/Employee/EmployeeLayout";
import GeneralAvatar  from "~/Components/UserImage/General";
import { Table }      from "~/ToolKit";
import useStyles      from "./styles";

const ProductsOfProvider = () => {
	const router  = useRouter();
	const classes = useStyles();

	const columns = useMemo(() => [
		{
			id    : "image",
			style : {
				width : "20%",
			},
			format : image => (
				<div className={classes.center}>
					<Zoom>
						{ image ? (
							<Avatar
								src={image}
								alt="Product image"
								className={classes.avatar}
							/>
						) : (
							<GeneralAvatar />
						) }
					</Zoom>
				</div>
			),
		},
		{
			orderBy : "Nombre",
			id      : "name",
			label   : "Nombre del Producto",
			align   : "left",
			style   : {
				width      : "80%",
				fontWeight : "bold",
				fontSize   : "1.1em",
				color      : "#5c5c5c",
			},
		},
	], []);

	const tabs = useMemo(() => [
		{
			label : "Todos",
		},
	], []);

	const providerId = useMemo(() => router?.query?.providerId, [router]);

	return (
		<EmployeeLayout>
			<Container>
				<TitlePage
					title={"Productos"}
					url="/employee"
					nameUrl="Proveedores"
				/>
				<Table
					url={"/api/products/page"}
					tabs={tabs}
					columns={columns}
					handleRowSelection={({ id }) => router.push(`/employee/products/${providerId}/details/${id}`)}
					searchbarPlaceHolder="Buscar productos"
				/>
			</Container>
		</EmployeeLayout>
	);
};

ProductsOfProvider.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default ProductsOfProvider;
