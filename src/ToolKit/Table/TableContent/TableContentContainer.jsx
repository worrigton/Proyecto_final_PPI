/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useContext,
	useCallback,
} from "react";

// Import Own Components
import { TableContext } from "~/ToolKit/Table";
import TableContent     from "./TableContent.jsx";

const TableContentContainer = () => {
	const {
		tableData : {
			rows,
		},
		columns,
		selections,
		tableHeaders,
		setSelections,
		handleRowSelection,
	} = useContext(TableContext);

	const handleSelectedDataChange = useCallback((incomingData, isAdding) => {
		const {
			identifyBy,
			data,
		} = selections;

		const newData = new Map(data);

		if (isAdding) {
			newData.set(incomingData[identifyBy], incomingData);
		} else {
			newData.delete(incomingData[identifyBy]);
		}

		setSelections(prevState => ({
			...prevState,
			data : newData,
		}));
	}, [selections]);

	return (
		<TableContent
			rows={rows}
			columns={columns}
			onSelect={handleRowSelection}
			onCheckboxChange={handleSelectedDataChange}
			selections={selections}
			tableHeaders={tableHeaders}
		/>
	);
};

export default TableContentContainer;
