import Store from "~/Store";

type UserType = "admin" | "customer" | "provider" | "employee";

/** 
 * Creates an Authorization header for http request with a user specif token
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param type UserType
*/
const authHeader = (type: UserType) => {
	try {
		const token = Store.getState()?.userReducer[type].token;
		return token
			? {
				Authorization  : `Bearer ${token}`,
				"Content-Type" : "application/json",
			}
			: {
				"Content-Type" : "application/json",
			};
	} catch (err) {
		console.error("[authHeader] An exception has occurred. ", err);
	}
	
	return {};
};

export default authHeader;
