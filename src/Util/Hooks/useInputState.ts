import {
	useState,
	useCallback,
} from "react";

type InputChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

/**
 * Creates a state for a controlled input.
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param initialValue Initial value for the input state
 */
const useInputState = (initialValue: string = ""): [string, InputChange] => {
	const [state, setState] = useState<string>(initialValue);

	const handleStateChane: InputChange = useCallback(({ target : { value } }) => setState(value), []);

	return [state, handleStateChane];
};

export default useInputState;
