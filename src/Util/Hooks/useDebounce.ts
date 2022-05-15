import {
	useEffect,
	useMemo,
} from "react";

// Import Own Components
import { debounce } from "~/Util";

interface DebouncedEntity {
	(clearDebounce?: string): void;
	cancel: () => void;
};

type DebounceHook = (callback: (...args: any[]) => void, delay: number, deps: any[]) => DebouncedEntity;

/**
 * Creates a debouncedEntity function mapped to an array of dependencies and a debounce
 * cancelation controlled by react
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param callback callback function that will be controlled by the debounce
 * @param delay time to delay the callback each time the debouncedEntity is called
 * @param deps array of dependencies
 */
const useDebounce: DebounceHook = (callback, delay, deps = []) => {
	const debouncedFn = useMemo(() => debounce(callback, delay), deps);

	// Clear Debounce when unmountnig
	useEffect(() => () => {
		debouncedFn.cancel();
	}, [debouncedFn]);

	return debouncedFn;
};

export default useDebounce;
