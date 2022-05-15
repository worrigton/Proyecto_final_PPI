/* eslint-disable camelcase */
import PropTypes from "prop-types";
import { Divider, Grid, Paper } from "@material-ui/core";
import { useMemo } from "react";

// Import Own Compoents
import AdminLayout            from "~/Components/Admin/AdminLayout";
import CardMedia              from "~/Components/CardMedia";
import GridContainer          from "~/Components/GridContainer";
import TitlePage              from "~/Components/TitlePage";
import EditAdditionalAccounts from "~/Components/Admin/AdditionalAccounts/Edit";
import { Typography, Button } from "~/ToolKit";
import useStyles              from "./styles";
import Table                  from "./Table";

const AdditionalAccountsDetails = ({
	delegations : {
		userData,
		message,
		registryData,
		id,
		handleDelete,
	},
}) => {
	const classes = useStyles();

	const columns = useMemo(() => [
		{
			id : "user_id",
		},
		{
			id    : "legal_name",
			label : "Proveedor",
		},
	], []);

	const tabs = useMemo(() => [
		{
			label : "Asociados",
		},
		{
			label : "Todos",
		},
	], []);

	return (
		<AdminLayout withLeftMargin>
			<TitlePage
				url="/admin/additional_accounts"
				nameUrl="Cuentas adicionales"
			/>
			{userData.user && (
				<GridContainer
					leftItems={[
						<Paper key={1} className={classes.paper}>
							<CardMedia
								classesProps={classes.img}
								image={`/api/images/users/lg/${userData.user_id}`}
								title={(
									<Typography type="header4" fontWeight="700">
										{userData.user?.username}
									</Typography>)}
								body={<>
									<Typography type="body2">
										Miembro desde {registryData(userData.user?.created_at)}
									</Typography>
									<Typography type="caption" color="grey">
										{userData.total_providers}  Proveedores asociados
									</Typography>
								</>}
								height={120}
								otherClass
							/>
						</Paper>,
						<Table
							key={2}
							columns={columns}
							tabs={tabs}
							id={id}
						/>,
					]}
					rightItems={[
						<Paper key={3} className={classes.paper}>
							<EditAdditionalAccounts data={userData} />
							<Typography type="header4" fontWeight="700">
								Detalles de la cuenta
							</Typography>
							<br />
							<Typography type="body2">
								{`${userData.first_name} ${userData.last_name}`}
							</Typography>
							<Typography type="body2">
								{`${userData.user?.email}`}
							</Typography>
						</Paper>,
					]}
				/>
			)}
			{message && (
				<Typography type="header3" color="grey">
					{message}
				</Typography>
			)}
			<Divider />
			<Grid className={classes.separator} container justify="flex-end">
				<Button
					type="button"
					onClick={() => handleDelete(userData.user_id)}
					color="warning">Eliminar cuenta
				</Button>
			</Grid>
		</AdminLayout>
	);
};

AdditionalAccountsDetails.propTypes = {
	delegations : PropTypes.object,
};

export default AdditionalAccountsDetails;
