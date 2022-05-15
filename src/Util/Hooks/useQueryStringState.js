/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-len */
/* eslint-disable no-fallthrough */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	useCallback,
} from "react";
import { useRouter } from "next/router";

// Import Own Components
import {
	areObjsEqual,
	getSubObjWithKeys,
} from "~/Util";

import { useQueryStringUpdater } from "~/Util/Hooks";

const throwException = message => {
	throw `[useQueryStringState] ${message}`;
};

const useQueryStringState = (params, defaultQsUpdater) => {
	if (!params)
		return;
	const qsUpdater = defaultQsUpdater || useQueryStringUpdater(useRouter());

	const [state, pureSetState] = useState(params);

	useEffect(() => {
		// Verify params' type
		if (typeof params !== "object" || Array.isArray(params)) {
			throwException("\"params\" must be an object.");
		}
		const paramsEntries = Object.entries(params);

		if (paramsEntries.length <= 0) {
			throwException("\"params\" must have at least one key.");
		}

		// Evaluate param's property types and get an object with type converters
		const withTypes = (() => {
			const invalidType = key => throwException(`${key} has an invalid type. Expecting one of the following: [Number, String, Boolean, array[String]`);

			const typeConvertionFn = (key, value) => {
				switch (typeof value) {
					case "number": return Number;
					case "boolean": return param => param === "true";
					case "bigint":
					case "symbol":
					case "undefined":
					case "function":
						invalidType(key);
					case "object": {
						if (Array.isArray(value)) {
							// We don't need to do any type transformation if value is an array
							// That is already being done with qs
							return a => a;
						}

						// If it's an object, throw an exception
						invalidType(key);
					}
					default:
						return String;
				}
			};

			const objectWithMappedTypes = paramsEntries.reduce((acc, [key, value]) => ({
				...acc,
				[key] : typeConvertionFn(key, value),
			}), {});

			return (key, value) => objectWithMappedTypes[key](value);
		})();

		// Get queryString params also defiend in "params"
		const currentParams       = qsUpdater.getParamsFromWindow();
		const targetParamsFromUrl = getSubObjWithKeys(currentParams, paramsEntries.map(([key]) => key));

		// map targetParamsFromUrl to withTypes cause all queryString params are "Strings" by default
		const initialStateWithParams = {
			...params,
			...Object
				.entries(targetParamsFromUrl)
				.reduce((acc, [key, value]) => ({
					...acc,
					[key] : withTypes(key, value),
				}), {}),
		};

		pureSetState(initialStateWithParams);
		qsUpdater.setParams(initialStateWithParams);
	}, []);

	const setState = useCallback(newStateOrFunc => {
		const newState = typeof newStateOrFunc === "function"
			? newStateOrFunc(state)
			: newStateOrFunc;

		// Verify the new state is valid and has the same types of the previous state
		for (const [key, value] of Object.entries(newState)) {
			if (!(key in state)) {
				throwException("You can only update values already defined.");
			}

			if (typeof value === "object" && !Array.isArray(value)) {
				throwException("Values of the state can't be objects");
			}

			if (typeof value !== typeof state[key]) {
				throwException(`Trying to change type of ${key}`);
			}
		}

		const updatedState = Object.assign({}, state, newState);

		if (!areObjsEqual(state, updatedState)) {
			// Update the component's state ansd the queryString params
			pureSetState(updatedState);
			qsUpdater.setParams(updatedState);
		}
	}, [state]);

	return [
		state,
		setState,
	];
};

export default useQueryStringState;
