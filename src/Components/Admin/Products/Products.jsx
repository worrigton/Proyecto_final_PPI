/* eslint-disable camelcase */
import { useMemo }   from "react";
import PropTypes     from "prop-types";
import { Avatar }    from "@material-ui/core";
import { useRouter } from "next/router";

// Import Own Compoents
import AdminLayout    from "~/Components/Admin/AdminLayout";
import AdminPageTitle from "~/Components/Admin/AdminPageTitle";
import { formatDate } from "~/Util";
import {
	Button,
	Table,
	StateIndicator,
} from "~/ToolKit";
import useStyles from "./styles";

const Products = ({
	delegations : {
		goToAddProduct,
		handleDelete,
		handlePause,
		handleLike,
	},
	pagination,
	collection,
}) => {
	const classes = useStyles();
	const router  = useRouter();

	const columns = useMemo(() => [
		{
			id    : "image",
			style : {
				width : "10%",
			},
			format : image => (
				<div className={classes.center}>
					<Avatar
						src={image}
						alt="Product image"
						className={classes.avatar}
					/>
				</div>
			),
		},
		{
			orderBy : "Nombre",
			id      : "name",
			label   : "Nombre del Producto",
			align   : "left",
			style   : {
				width      : "40%",
				fontWeight : "bold",
				fontSize   : "1.1em",
				color      : "#5c5c5c",
			},
		},
		{
			id    : "pending_changes",
			label : "Estado",
			align : "center",
			style : {
				width : "25%",
			},
			format : data => (
				typeof data === "number" && data > 0 && (
					<StateIndicator type="suggestedChange" />
				)
			),
		},
		{
			id    : "total_offers",
			label : "Cantidad de Ofertadores",
			align : "center",
			style : {
				width : "25%",
			},
			format : data => `Ofertado por ${data}`,
		},
	], [classes]);

	const tabs = useMemo(() => {
		const prevDate     = new Date();
		const currentMonth = prevDate.getMonth();

		prevDate.setMonth(prevDate.getMonth() - 1);

		// If still in same month, set date to last day of
		// previous month
		if (prevDate.getMonth == currentMonth) {
			prevDate.setDate(0);
		}
		prevDate.setHours(0);
		prevDate.setMilliseconds(0);

		return [
			{
				label : "Todos",
			},
			{
				label  : "Nuevos",
				filter : {
					// A month ago
					start_date : formatDate(prevDate),
					end_date   : formatDate(new Date),
				},
			},
		];
	}, []);
	return (
		<AdminLayout withLeftMargin>
			<AdminPageTitle
				title="Productos"
				button={(
					<Button
						onClick={goToAddProduct}
						className={classes.btn}
						color="primary"
					>
						{"Agregar producto"}
					</Button>
				)}
			/>

			<Table
				ssr
				searchUrl="/api/products/page/1"
				handleRowSelection={({ id = 0 }) => router.push(`/admin/products/details/${id}`)}
				filters={{
					total_offers    : true,
					pending_changes : true,
				}}
				url="/api/products/page"
				pagination={pagination}
				collection={collection}
				searchbarPlaceHolder="Buscar productos"
				columns={columns}
				tabs={tabs}
			/>
		</AdminLayout>
	);
};

Products.propTypes = {
	delegations : PropTypes.shape({
		goToAddProduct : PropTypes.func.isRequired,
		handleLike     : PropTypes.func.isRequired,
		handlePause    : PropTypes.func.isRequired,
		handleDelete   : PropTypes.func.isRequired,
	}).isRequired,
	collection : PropTypes.array,
	pagination : PropTypes.object,
};

Products.defaultProps = {
	collection : [],
	pagination : {},
};

export default Products;
