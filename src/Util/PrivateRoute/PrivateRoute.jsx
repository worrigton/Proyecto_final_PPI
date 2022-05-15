/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";

// Import Own Components
// import UserActions       from "~/Store/UserStore/actions";
import withStateLoaded   from "~/Store/withStateLoaded";

const PrivateRoute = ({
	redirectTo,
	type,
	children,
	customer,
	admin,
	employee,
	provider,
}) => {
	const router = useRouter();

	const checkToken = (type, info) => {
		if (info) {
			if (Date.now() >= info.data.expiration) {
				localStorage.removeItem(type);
			}
		}
	};

	useEffect(() => {
		const loggedInForType = (() => {
			switch (type.toLowerCase()) {
				case "customer":
					checkToken("customer", customer);
					return customer;
				case "provider":
					checkToken("provider", provider);
					return provider;
				case "employee":
					checkToken("employee", employee);
					return employee;
				case "admin":
					checkToken("admin", admin);
					return admin;
				default:
					checkToken("admin", admin);
					return admin;
			}
		})();

		if (!loggedInForType) {
			router.push(redirectTo);
		}
	}, [
		admin,
		customer,
		provider,
		employee,
		redirectTo,
		type,
	]);

	return children;
};

PrivateRoute.propTypes = {
	redirectTo  : PropTypes.string,
	loggedIn    : PropTypes.bool,
	children    : PropTypes.node.isRequired,
	type        : PropTypes.string,
	userActions : PropTypes.object.isRequired,
};

PrivateRoute.defaultProps = {
	redirectTo : "/",
	loggedIn   : false,
	typeUser   : "",
};


const mapStateToProps = ({ userReducer : {
	customer,
	admin,
	provider,
	employee,
} }) => ({
	customer,
	admin,
	provider,
	employee,
});

export default withStateLoaded(mapStateToProps, null)(PrivateRoute);
