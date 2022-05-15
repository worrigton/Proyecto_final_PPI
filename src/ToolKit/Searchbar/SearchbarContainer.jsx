/* eslint-disable max-len */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
} from "react";
import PropTypes from "prop-types";
import fetch     from "isomorphic-unfetch";
import qs        from "qs";

// Import Own Components
import { useDebounce } from "~/Util/Hooks";
import Searchbar       from "./Searchbar.jsx";

const SearchbarContainer = ({
	url,
	normalizationFn,
	onSelect,
	debounce,
	...rest
}) => {
	const [open, setOpen]       = useState(false);
	const [options, setOptions] = useState([]);
	const loading               = open && options.length === 0;

	const requestDataDebounce = useDebounce((searchQuery) => {
		if (typeof searchQuery === "string") {
			(async () => {
				const queryStringInitializer = url.includes("?") ? "&" : "?";

				const response = await fetch(url + queryStringInitializer + qs.stringify({ "search_query" : searchQuery }));

				if (response.ok) {
					const data = await response.json();

					setOptions(normalizationFn(data));
				}
			})();
		}
	}, 700, []);

	useEffect(() => {
		let active = true;

		(async () => {
			if (!loading) {
				return;
			}
			const response = await fetch(url);
			const data     = await response.json();
			if (active) {
				setOptions(normalizationFn(data));
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	useEffect(() => {
		if (!open) {
			// setOptions([]);
		}
	}, [open]);

	const changePrueba = ((event, data, reason) => {
		if (reason == "select-option") {
			onSelect(data);
		}
	});

	return (
		<Searchbar
			delegations={{
				open,
				setOpen,
				options,
				loading,
				requestDataDebounce,
				changePrueba,
			}}
			{...rest}
		/>
	);
};

SearchbarContainer.propTypes = {
	url             : PropTypes.string.isRequired,
	normalizationFn : PropTypes.func.isRequired,
	debounce        : PropTypes.bool,
	onSelect        : PropTypes.func,
};

SearchbarContainer.defaultProps = {
	debounce : false,
	onSelect : () => {},
};

export default SearchbarContainer;
