/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useContext,
	useCallback,
} from "react";

// Import Own Components
import { TableContext } from "~/ToolKit/Table";
import TableSelections  from "./TableSelections.jsx";

const TableSelectionsContainer = () => {
	const {
		selections : {
			actions,
			data,
		},
		setSelections,
	} = useContext(TableContext);

	const handleActionClick = useCallback((handlerAction) => {
		const clonedData = new Map(data);

		setSelections(prevState => ({
			...prevState,
			data : new Map(),
		}));

		if (typeof handlerAction === "function") {
			handlerAction(clonedData);
		}
	}, [data]);

	return (
		<TableSelections
			data={data}
			actions={actions}
			handleActionClick={handleActionClick}
		/>
	);
};

export default TableSelectionsContainer;
