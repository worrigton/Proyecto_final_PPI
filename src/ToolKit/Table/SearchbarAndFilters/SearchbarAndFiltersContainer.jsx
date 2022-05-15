/* eslint-disable camelcase */
/* eslint-disable max-len */
import {
	useCallback,
	useContext,
} from "react";

// import Own Components
import { TableContext }    from "~/ToolKit/Table";
import { useDebounce }     from "~/Util/Hooks";
import SearchbarAndFilters from "./SearchbarAndFilters.jsx";

const SearchbarAndFiltersContainer = () => {
	const {
		searchbarPlaceHolder,
		orderByOptions,
		setQueryStringState,
		queryStringState : {
			order_by,
		},
	} = useContext(TableContext);

	// Order
	const handleOrderChange = useCallback(index => setQueryStringState({ order : index ? "DESC" : "ASC" }), [setQueryStringState]);

	// Searchbar
	const setSearchQueryAndMakePetition = useDebounce((done, newInputData) => {
		if (typeof newInputData === "string") {
			setQueryStringState({ "filter" : newInputData });
		}

		if (done) {
			done();
		}
	}, 700, [setQueryStringState]);

	// Order by
	const label = orderByOptions.reduce((acc, [orderByOption, id]) => id === order_by ? orderByOption : acc, "");

	const handleOrderByChange = useCallback((orderByIndex) => {
		setQueryStringState({
			order_by : orderByOptions[orderByIndex][1],
		});
	}, [setQueryStringState, orderByOptions]);

	return (
		<SearchbarAndFilters
			label={label}
			placeholder={searchbarPlaceHolder}
			orderByOptions={orderByOptions}
			handleOrderChange={handleOrderChange}
			handleOrderByChange={handleOrderByChange}
			searchQuery={setSearchQueryAndMakePetition}
		/>
	);
};

export default SearchbarAndFiltersContainer;
