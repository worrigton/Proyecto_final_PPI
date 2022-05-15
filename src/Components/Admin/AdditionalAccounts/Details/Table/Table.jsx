import PropTypes  from "prop-types";
import {
	Grid,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Tabs,
	Tab,
	Divider,
	TablePagination,
} from "@material-ui/core";
import { useMemo } from "react";

// Import Own Components
import { ButtonWithoutStyles as Clicker, Typography } from "~/ToolKit";
import useStyles                                      from "./styles";

const AddressPage = ({
	delegations : {
		pagination,
		rows,
		page,
		tabValue,
		handleChange,
		handleChangePage,
		rowsPerPage,
		handleChangeRowsPerPage,
		addProvider,
		deleteProvider,
	},
}) => {

	const classes = useStyles();

	const data = [
		...rows,
	];
	const tabs = useMemo(() => [
		{
			label : "Asociados",
		},
		{
			label : "Todos",
		},
	], []);

	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="flex-start"
		>
			<TableContainer component={Paper}>
				<Table size="small" aria-label="a dense table">
					<Tabs
						value={tabValue}
						onChange={handleChange}
						indicatorColor={"primary"}
						aria-label="Table tabs"
						className={classes.tabs}
						classes={{
							indicator : classes.indicator,
						}}
					>
						{ tabs.map(({ label }, index) => (
							<Tab
								key={index}
								label={label}
								className={classes.tab}
							/>
						)) }
					</Tabs>
					<Divider />
					<TableHead>
						<TableRow>
							<TableCell align="left" className={classes.padding}>
								Provedores asociados
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.length > 0 ? ( <>
							{ data.map((row) => ( <>
								<TableRow key={row.trade_name}>
									<TableCell className={classes.padding}>
										<img src={`/api/images/users/xs/${row.user_id}`} />
										{row.trade_name}
										<div className={classes.spacer} />
										{tabValue == 1 ? (
											<Clicker onClick={addProvider(row)}>
												<Typography color="secondary" type="caption">
													Agregar
												</Typography>
											</Clicker>
										) : (
											<Clicker onClick={deleteProvider(row)}>
												<Typography color="secondary" type="caption">
													Quitar
												</Typography>
											</Clicker>
										)}
									</TableCell>
								</TableRow>
							</>))}
						</>
						) : (
							tabValue == 0 && (
								<TableRow key={1}>
									<TableCell component="th" scope="row" className={classes.padding}>
										No hay proveedores asociados
									</TableCell>
								</TableRow>
							))}
						<TablePagination
							component="div"
							count={pagination.rowCount}
							page={page}
							onChangePage={handleChangePage}
							rowsPerPage={rowsPerPage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};

AddressPage.propTypes = {
	delegations : PropTypes.object,
};

export default AddressPage;
