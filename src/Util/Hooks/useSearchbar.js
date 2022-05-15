/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useCallback,
	useEffect,
} from "react";

const useSearchbar = (debouncedFn) => {
	const [selected, setSelected] = useState(false);
	const [loading, setLoading]   = useState(false);

	const [inputData, pureSetInputData] = useState("");

	const handleInputDataChange = useCallback(({ target : { value } }) => {
		setSelected(false);

		pureSetInputData(value);
	}, []);

	const setInputData = useCallback((value) => {
		setSelected(true);

		pureSetInputData(value);
	}, []);

	useEffect(() => {
		if (!selected) {
			executeDebounce();
		} else {
			debouncedFn.cancel();
		}
	}, [inputData, selected]);

	const executeDebounce = useCallback(() => {
		setLoading(true);

		const done = () => setLoading(false);

		debouncedFn(done, inputData || "");
	}, [inputData]);

	return {
		inputProps : {
			value    : inputData,
			onChange : handleInputDataChange,
			onClick  : executeDebounce,
		},
		loading : Boolean(loading && inputData),
		setInputData,
		selected,
	};
};

export default useSearchbar;
