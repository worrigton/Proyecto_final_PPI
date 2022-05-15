import { ReduxAction } from "~/Store/actionTypes";
import {
	UPDATE_USER_DATA,
	LOG_OUT_USER_OF_TYPE,
} from "./actionTypes";

interface UserData {
	[userType: string] : {
		token: string;
		data: {};
	};
}

const updateUser: (payload: UserData) => ReduxAction<UserData> = payload => ({ type : UPDATE_USER_DATA, payload });

const logoutUserOfType: (type: string) => ReduxAction<{ type: string }> = type => ({
	type    : LOG_OUT_USER_OF_TYPE,
	payload : {
		type,
	},
});

const UserActions = {
	updateUser,
	logoutUserOfType,
};

export default UserActions;
