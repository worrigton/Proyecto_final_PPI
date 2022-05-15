import { useState, useCallback } from "react";

type UpdateStateFn = (newState: object) => void;

/**
 * Creates an object state for Function Components
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @param defaultValue Initial value for the object state
 */
const useObjState = (defaultValue: object = {}): [object, UpdateStateFn] => {
	const [state, setState] = useState<{}>(defaultValue);

	const updateState: UpdateStateFn = useCallback(newState => {
		setState(prevState => ({
			...prevState,
			...newState,
		}));
	}, []);

	return [state, updateState];
};

export default useObjState;
