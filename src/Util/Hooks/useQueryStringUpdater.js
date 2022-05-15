/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
	useRef,
	useCallback,
} from "react";
import { useRouter } from "next/router";
import qs            from "qs";

// Import Own Components
import { isValidArray, getParamsFromWindow } from "~/Util";

const useQueryStringUpdater = (defaultRouter) => {
	const router         = defaultRouter || useRouter();
	const updateCallback = useRef();

	const setUpdateCallback = useCallback(callback => updateCallback.current = callback, []);

	const setParams = useCallback((qsParams, reset = false) => {
		const prevParams = getParamsFromWindow();

		const newParams = reset
			? qsParams
			: Object.assign({}, prevParams, qsParams);

		// Remove the queryString if they want a reset without new params
		// or update the url with the new params
		const updatedUrl = (reset && JSON.stringify(newParams) === "{}")
			? router.pathname
			: `${ router.pathname }?${ qs.stringify(newParams) }`;

		const updatedUrlAs = (reset && JSON.stringify(newParams) === "{}")
			? window.location.pathname
			: `${ window.location.pathname }?${ qs.stringify(newParams) }`;

		if (typeof updateCallback.current === "function") {
			updateCallback.current(newParams);
		}

		router.push(updatedUrl, updatedUrlAs);
	}, [updateCallback.current]);

	const removeAllParams = useCallback(() => setParams({}, true), [setParams]);

	const removeSpecificParams = useCallback(arrOfParamsToRemove => {
		if (isValidArray(arrOfParamsToRemove)) {
			// Get current params object as an array of entries
			// filter unwanted params from arrOfParamsToRemove
			// Reduce back to an object
			const updatedParams = Object
				.entries(getParamsFromWindow())
				.filter(([paramName]) => arrOfParamsToRemove.indexOf(paramName) < 0)
				.reduce((acc, [paramName, paramValue]) => ({
					...acc,
					[paramName] : paramValue,
				}), {});

			setParams(updatedParams, true);
		}
	}, [setParams]);

	return {
		setUpdateCallback,
		getParamsFromWindow,
		setParams,
		removeAllParams,
		removeSpecificParams,
	};
};

export default useQueryStringUpdater;
