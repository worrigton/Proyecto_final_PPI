import { bindActionCreators, Dispatch } from "redux";

/**
 * Binds all actions to the dispatch and uncapitalize them to use in the component props
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param actions 
 * @example
 * // Returns dispatch => ({ alertActions : bindActionCreators(AlertActions, dispatch) });
 * const mapDispatchToProps = bindAll({ AlertActions });
 */
const bindAll = (actions: object) => (dispatch: Dispatch): object => {
	const uncapitalize = (str: string) => str.charAt(0).toLowerCase() + str.slice(1);

	return Object.keys(actions).reduce((acc, actionName) => ({
		...acc,
		[uncapitalize(actionName)] : bindActionCreators(actions[actionName], dispatch),
	}), {});
};

export default bindAll;
