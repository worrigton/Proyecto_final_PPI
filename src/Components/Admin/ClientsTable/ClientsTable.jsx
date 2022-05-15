/* eslint-disable camelcase */
import { useMemo }   from "react";
import PropTypes     from "prop-types";
import { Avatar }    from "@material-ui/core";
import { useRouter } from "next/router";

// Import Own Components
import { formatDate }   from "~/Util";
import { Table }        from "~/ToolKit";
import GeneralUserImage from "~/Components/UserImage/General";
import useStyles        from "./styles";

const ClientsTable = ({
	pagination,
	collection,
}) => {
	const router  = useRouter();
	const classes = useStyles();

	const columns = useMemo(() => [
		{
			id    : "user_id",
			style : {
				width : "10%",
			},
			format : userId => (
				<div className={classes.center}>
					{ typeof userId === "number" ? (
						<Avatar
							src={`/api/images/users/xs/${userId}`}
							alt="client image"
						/>
					) : (
						<GeneralUserImage />
					) }
				</div>
			),
		},
		{
			orderBy : "Correo",
			id      : "email",
			align   : "left",
			style   : {
				width      : "65%",
				fontWeight : "bold",
				fontSize   : "1.1em",
				color      : "#5c5c5c",
			},
		},
		{
			id    : "total_orders",
			align : "center",
			style : {
				width : "20%",
			},
			format : data => `${data || 0} pedidos`,
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
			handleRowSelection={({ id = 0 }) => router.push(`/admin/clients/${id}`)}
			pagination={pagination}
			collection={collection}
			searchbarPlaceHolder="Buscar clientes"
			columns={columns}
			tabs={tabs}
		/>
	);
};

ClientsTable.propTypes = {
	collection : PropTypes.array,
	pagination : PropTypes.object,
};

ClientsTable.defaultProps = {
	collection : [],
	pagination : {},
};

export default ClientsTable;
