import { useMemo }   from "react";
import PropTypes     from "prop-types";
import { Avatar }    from "@material-ui/core";
import { useRouter } from "next/router";

// Import Own Compoents
import AdminLayout               from "~/Components/Admin/AdminLayout";
import AdminPageTitle            from "~/Components/Admin/AdminPageTitle";
import GeneralUserImage          from "~/Components/UserImage/General";
import { Table }                 from "~/ToolKit";
import CreateAdditionalAccounts  from "./Create";
import useStyles                 from "./styles";

const AdditionalAccounts = ({
	pagination,
	collection,
}) => {
	const router     = useRouter();
	const classes    = useStyles();

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
							alt="user image"
							className={classes.avatar}
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
			label   : "Correo",
			align   : "left",
			style   : {
				width      : "65%",
				fontWeight : "bold",
				fontSize   : "1.1em",
				color      : "#5c5c5c",
			},
		},
		{
			orderBy : "Estatus",
			id      : "status",
			label   : "Estatus",
			align   : "left",
		},
		{
			id    : "total_providers",
			label : "Proveedores",
			align : "center",
			style : {
				width : "25%",
			},
			format : totalProviders => `${totalProviders || 0} proveedores`,
		},
	], [classes]);

	const tabs = useMemo(() => [
		{
			label : "Todos",
		},
	], []);

	return (
		<AdminLayout withLeftMargin>
			<AdminPageTitle
				title="Cuentas Adicionales"
				button={(
					<CreateAdditionalAccounts />
				)}
			/>

			<Table
				ssr
				handleRowSelection={({ id = 0 }) => router.push(`/admin/additional_accounts/${id}`)}
				pagination={pagination}
				collection={collection}
				searchbarPlaceHolder="Buscar empleados"
				columns={columns}
				tabs={tabs}
			/>
		</AdminLayout>
	);
};

AdditionalAccounts.propTypes = {
	collection : PropTypes.array,
	pagination : PropTypes.object,
};

AdditionalAccounts.defaultProps = {
	collection : [],
	pagination : {},
};

export default AdditionalAccounts;
