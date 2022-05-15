import PropTypes from "prop-types";
import {
	useEffect,
	useState,
	useCallback,
} from "react";

// Import Own Components
import Service         from "~/Service";
import withStateLoaded from "~/Store/withStateLoaded";
import Home            from "./Home";

const HomeContainer = ({ userId }) => {
	const [data, setData] = useState({
		providers  : [],
		pagination : {},
	});
	const [page, setPage] = useState(1);

	const activePage = useCallback((event, value) => {
		setPage(value);
	}, []);

	const registryData = useCallback((param) => {
		const date = new Date(param);
		const options = {
			year  : "numeric",
			month : "long",
			day   : "numeric",
		};
		return date.toLocaleDateString("es-ES", options);
	}, []);

	useEffect(() => {
		( async () => {
			const { body } = await Service.api.provider.getProviders(page, `per_page=10&include_employee_id=${userId}`);
			setData({
				providers  : body.collection,
				pagination : body.pagination,
			});
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<Home
			delegations={{
				activePage,
				registryData,
				pagination : data.pagination,
				providers  : data.providers,
				page,
			}}
		/>
	);
};

HomeContainer.propTypes = {
	userId : PropTypes.any,
};

const mapStateToProps = ({ userReducer : { employee } }) => ({ userId : employee?.data?.employee.id });

export default withStateLoaded(mapStateToProps, null)(HomeContainer);
