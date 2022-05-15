/** Unique key to clear a native debounce */
const CLEAR_DEBOUNCE_NATIVE: string = "<<<CLEAR_DEBOUNCE_NATIVE>>>";

interface DebouncedEntity {
	(clearDebounce?: string): void;
	cancel: () => void;
};

/**
 * Creates a debouncedEntity function wich, when ever is called, it's going to
 * delay the callback to control its execution rate
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param callback callback function that will be controlled by the debounce
 * @param delay time to delay the callback each time the debouncedEntity is called
 * @returns debouncedEntity
 */
const debounce = (callback: (...args: any[]) => void, delay: number): DebouncedEntity => {
	let timeoutId: NodeJS.Timeout;

	const debouncedEntity: DebouncedEntity = (...argsForCallback) => {
		clearTimeout(timeoutId);

		if (argsForCallback[0] === CLEAR_DEBOUNCE_NATIVE) {
			return;
		}

		timeoutId = setTimeout(() => {
			callback(...argsForCallback);
		}, delay);
	};

	debouncedEntity.cancel = () => debouncedEntity(CLEAR_DEBOUNCE_NATIVE);

	return debouncedEntity;
};

export default debounce;
