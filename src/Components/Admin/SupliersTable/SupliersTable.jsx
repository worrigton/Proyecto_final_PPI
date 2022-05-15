/* eslint-disable */
import { useMemo }   from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";
import { Avatar }    from "@material-ui/core";

// Import Own Components
import { Table }        from "~/ToolKit";
import { formatDate }   from "~/Util";
import StarRating       from "~/Components/StarRating";
import GeneralUserImage from "~/Components/UserImage/General";
import useStyles        from "./styles";

const SupliersTable = ({
	pagination,
	collection,
}) => {
	console.log(collection);
	const router  = useRouter();
	const classes = useStyles();

	const columns = useMemo(() => [
		{
			id    : "user_id",
			align : "center",
			style : {
				width : "5%",
			},
			format : userId => (
				<div className={classes.center}>
					{ typeof userId === "number" ? (
						<Avatar
							src={`/api/images/users/xs/${userId}`}
							alt="provider image"
						/>
					) : (
						<GeneralUserImage />
					) }
				</div>
			),
		},
		{
			orderBy : "Nombre",
			id      : "trade_name",
			align   : "left",
			style   : {
				width      : "25%",
				fontWeight : "bold",
				fontSize   : "1.1em",
				color      : "#5c5c5c",
			},
		},
		{
			id    : "rating",
			align : "center",
			style : {
				width : "15%",
			},
			format : data => <StarRating rank={data} size={1.3} />,
		},
		{
			id    : "created_at",
			align : "center",
			style : {
				width : "20%",
			},
			format : data => {
				const constructedData = new Date(data);

				const months = [
					"Enero",
					"Febrero",
					"Marzo",
					"Abril",
					"Mayo",
					"Junio",
					"Julio",
					"Agosto",
					"Septiembre",
					"Octubre",
					"Noviembre",
					"Diciembre",
				];

				return data
					? `Miembro desde ${months[constructedData.getMonth()]} del ${constructedData.getFullYear()}`
					: "";
			},
		},
		{
			id    : "total_active_products",
			align : "center",
			style : {
				width : "15%",
			},
			format : data => `${data || 0} productos`,
		},
		{
			id    : "total_products",
			align : "center",
			style : {
				width : "20%",
			},
			format : data => `${data || 0} productos en oferta`,
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
		<Table
			ssr
			handleRowSelection={({ id }) => router.push(`/admin/suppliers/${id}`)}
			pagination={pagination}
			collection={collection}
			searchbarPlaceHolder="Buscar proveedores"
			columns={columns}
			tabs={tabs}
		/>
	);
};

SupliersTable.propTypes = {
	collection : PropTypes.array,
	pagination : PropTypes.object,
};

SupliersTable.defaultProps = {
	collection : [],
	pagination : {},
};

export default SupliersTable;

