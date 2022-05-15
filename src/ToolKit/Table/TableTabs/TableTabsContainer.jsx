/* eslint-disable react-hooks/exhaustive-deps */
import {
	useContext,
	useCallback,
} from "react";

// Import Own Components
import { TableContext }          from "~/ToolKit/Table";
import { useQueryStringUpdater } from "~/Util/Hooks";
import TableTabs                 from "./TableTabs.jsx";

const TableTabsContainer = () => {
	const qsUpdater = useQueryStringUpdater();

	const {
		tabs,
		tabIndex,
		setTabIndex,
		indicatorColor,
		queryStringState,
	} = useContext(TableContext);

	const handleTabChange = useCallback((evnt, newTabIndex) => {
		setTabIndex(newTabIndex);

		qsUpdater.setParams({
			...queryStringState,
			page : 1,
			...(tabs[newTabIndex]?.filter || {}),
		}, true);
	}, [queryStringState, qsUpdater, tabs]);

	return (
		<TableTabs
			tabs={tabs}
			value={tabIndex}
			handleTabChange={handleTabChange}
			indicatorColor={indicatorColor}
		/>
	);
};

export default TableTabsContainer;
