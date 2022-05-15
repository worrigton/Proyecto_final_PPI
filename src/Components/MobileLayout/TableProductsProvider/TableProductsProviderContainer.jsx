/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useEffect,
	useState,
	useCallback,
	useMemo,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";

// Import Own Compoents
import { bindAll, fetcher }  from "~/Util";
import withStateLoaded       from "~/Store/withStateLoaded";
import AlertActions          from "~/Components/Alert/store/actions";
import DialogActions         from "~/Components/Dialog/store/actions";
import ProviderId            from "~/pages/employee/products/[providerId]";
import TableProductsProvider from "./TableProductsProvider";
import Service               from "~/Service";

const TableProductsProviderContainer = ({
	token,
	user_id,
	// provider_id = useRouter().query?.providerId,
	alertActions,
}) => {
	const router = useRouter();
	const providerId = useRouter().query?.provider_id;
	const [page, setPage]                 = useState(1);
	const [order, setOrder]               = useState("ASC");
	const [filter, setFilter]             = useState("");
	const [orderBy, setOrderBy]           = useState("name");
	const [pageSize, setpageSize]         = useState(5);
	const [tabValue, setTabValue]         = useState(0);
	const [tableData, setTableData ]      = useState({});
	const [providerData, setProviderData] = useState({});

	const activePage = useCallback((event, value) => {
		setPage(value);
	}, []);

	const handleChange =  useCallback((event, newValue) => {
		let value = newValue?.id || newValue;
		if (newValue == null) {
			value = 0;
		}
		setTabValue(value);
		setPage(1);
	}, []);

	const handleOrderChange = useCallback((event) => {
		setOrder(event === 0 ? "ASC" : "DESC");
	}, [setOrder]);

	const handleChangePage = useCallback((event, newPage) => {
		setPage(newPage);
	}, []);

	const handleChangeFilter = useCallback(({ target : { value } }) => {
		setFilter(value);
	}, []);

	const handleLikedOrDisliked = useCallback((product) => () => {
		let response = null;
		let type     = "provider";

		if (router.route === "/admin/suppliers/[providerId]")
			type = "admin";

		if (product.favorite) {
			response = Service.api.product.dislikeProduct(product.id, providerData.user_id, type);
		} else {
			response = Service.api.product.likeProduct(product.id, providerData.user_id, type);
		}

		if (response) {

			alertActions.openAlert({
				message : product.favorite ?
					`¡Se quito ${product.name} de productos destacados!` :
					`¡Se agrego ${product.name} a productos destacados!`,
				type     : "success",
				duration : 4e3,
			});
			router.reload();

		} else {
			alertActions.openAlert({
				message  : "Hubo un error actualizando la información.",
				type     : "error",
				duration : 4e3,
			});
		}
	}, [providerData]);

	useEffect(() => {
		(async () => {
			if (providerId) {
				const response = await fetcher(`/api/providers/details/${providerId}`);
				setProviderData(response);
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			let response = {};
			let url = `/api/products/page/${page}
			?filter=${filter}
			&page_size=${pageSize}
			&order=${order}
			&order_by=${orderBy}
			&provider_id=${providerId}`;

			switch (tabValue) {
				case 1 :
					url = `${url}&user_liked_product=${providerData.user_id}`;
					break;
				case 2 :
					url = `${url}&product_provider_status=INACTIVE`;
					break;
			}
			response = await fetch(url);
			response = await response.json();
			setTableData(response);
			window.scrollTo(0, 0);
		})();
	}, [
		tabValue,
		page,
		filter,
		pageSize,
		order,
		orderBy,
		providerData,
	]);

	const tabs = useMemo(() => [
		{
			id    : 0,
			label : "Todos",
		},
		{
			id    : 1,
			label : "Destacados",
		},
		{
			id    : 2,
			label : "Pausados",
		},
	], []);

	return (<>
		<TableProductsProvider
			delegations={{
				tabs,
				tabValue,
				tableData,
				page,
				token,
				ProviderId,
				order,
				activePage,
				handleChange,
				handleChangePage,
				handleOrderChange,
				handleChangeFilter,
				handleLikedOrDisliked,
			}}
		/>
	</>
	);
};

TableProductsProviderContainer.propTypes = {
	alertActions    : PropTypes.object,
	providerData    : PropTypes.any,
	token           : PropTypes.any,
	user_id         : PropTypes.any,
	provider_id     : PropTypes.any,
	dialogActions   : PropTypes.any,
	handleClickOpen : PropTypes.func,
};
TableProductsProviderContainer.defaultProps = {
	handleClickOpen : () => {},
};

const mapStateToProps = ({ userReducer : { provider, admin } }) => ({
	token       : provider?.token || admin?.token || null,
	user_id     : provider?.data?.id,
	provider_id : provider?.data?.provider?.id,
});

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(TableProductsProviderContainer);


