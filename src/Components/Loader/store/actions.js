import {
	OPEN_LOADER,
	CLOSE_LOADER,
} from "./actionTypes";

const openLoader = payload => ({ type : OPEN_LOADER, payload });
const closeLoader = payload => ({ type : CLOSE_LOADER, payload });

const LoaderActions = {
	openLoader,
	closeLoader,
};

export default LoaderActions;
