/**
 * Use as action type, to never match up with any case
 * and get the initial state of every reducer this way
*/
export const UNIQUE_ACTION_TYPE: string = "<<<UNIQUE_ACTION_TYPE>>>";

/** Use to express that redux have been loaded in the client-side */
export const STATE_LOADED: string = "STATE_LOADED";

export interface ReduxAction<T extends {}> {
	type: string;
	payload?: T;
};
