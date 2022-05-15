/** Logs an error to the console */
const logError: (err: Error) => void = err => console.error("[persistor.js] An exception has occurred. ", err);

/**
 * Loads the global redux state from the localStorage
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 */
export const loadState = (): string | undefined => {
	try {
		const data: string = localStorage.getItem("state");

		return data
			? JSON.parse(data)
			: undefined;
	} catch (err) {
		logError(err);
	}
};

/**
 * Saves the state in the localStorage to persis through all user activity.
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @param state State to be saved in the localStorage
 */
export const saveState = <T>(state: T): void => {
	try {
		const data: string = JSON.stringify(state);

		localStorage.setItem("state", data);
	} catch (err) {
		logError(err);
	}
};
