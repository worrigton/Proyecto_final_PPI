import PropTypes from "prop-types";
import {
	Checkbox,
	TableRow,
	TableHead,
	TableCell,
	TableBody,
	TableContainer,
	Table as MuiTable,
} from "@material-ui/core";

// Import Own Components
import {
	isValidArray,
	getSubObjWithKeys,
} from "~/Util";
import useStyles from "./styles";

const TableContent = ({
	rows,
	columns,
	onSelect,
	onCheckboxChange,
	selections,
	tableHeaders,
}) => {
	const classes = useStyles();

	return (
		<TableContainer className={classes.container}>
			<MuiTable stickyHeader>
				{ isValidArray(tableHeaders) && (
					<TableHead>
						<TableRow>
							{ tableHeaders.map((head, key) => (
								<TableCell align="center" key={key}>
									{ head }
								</TableCell>
							)) }
						</TableRow>
					</TableHead>
				) }
				<TableBody>
					{ isValidArray(rows) && (
						rows.map((row, rowIndex) => (
							<TableRow
								key={rowIndex}
								hover
								role="checkbox"
								className={(onSelect || onCheckboxChange) ? classes.cursorPointer : ""}
								onClick={() => onSelect(row)}
							>
								{ selections && onCheckboxChange && (
									<TableCell
										align="center"
										style={{
											width : "2rem",
										}}
									>
										<Checkbox
											checked={selections.data.has(row[selections.identifyBy])}
											onChange={(e, activated) => onCheckboxChange(row, activated)}
											color="primary"
										/>
									</TableCell>
								) }
								{ columns.map((column) => {
									let value;

									if (isValidArray(column.id)) {
										value = getSubObjWithKeys(row, column.id);
									} else {
										value = row[column.id];
									}

									return (
										<TableCell
											key={column.id}
											align={column.align || "inherit"}
											style={column.style || {}}
											className={classes.tableCell}
										>
											{ column.format ? column.format(value) : value }
										</TableCell>
									);
								}) }
							</TableRow>
						))
					) }
				</TableBody>
			</MuiTable>
		</TableContainer>
	);
};

TableContent.propTypes = {
	rows             : PropTypes.array,
	columns          : PropTypes.array.isRequired,
	onSelect         : PropTypes.func.isRequired,
	onCheckboxChange : PropTypes.func,
	selections       : PropTypes.object,
	tableHeaders     : PropTypes.array.isRequired,
};

TableContent.defaultProps = {
	rows             : [],
	columns          : [],
	onCheckboxChange : null,
	tableHeaders     : null,
	selections       : null,
};

export default TableContent;
