import PropTypes from "prop-types";
import {
	useEffect,
	useState,
	useCallback,
} from "react";

// Import Own Compoents
import withStateLoaded from "~/Store/withStateLoaded";
import BillingPage     from "./BillingPage";
import Service         from "~/Service";
import { Typography }  from "~/ToolKit";

const BillingPageContainer = ({ customerId }) => {
	const [data, setData] = useState({
		billingProfiles : [],
		pagination      : {},
	});
	const [page, setPage] = useState(1);

	const activePage = useCallback((event, value) => {
		setPage(value);
	}, []);

	const details = useCallback((value) => {
		const { address } = value;
		return <>
			<Typography type="caption" color="grey">
				{`${address.street} #${address.ext_number},
				${address.int_number ? `interior: ${address.int_number},` : ""}
				${address.neighborhood}, ${address.city}, ${address.state}, ${address.country},
				${address.zip_code}`}
			</Typography>
			<br />
			<Typography type="caption" color="grey">
				{value.rfc}
			</Typography>
		</>;

	}, []);


	useEffect(() => {
		(async () => {
			if (customerId) {
				const { body : response } = await Service.api.customer.getBillingProfiles(
					page,
					`page_size=5&customer_id=${customerId}`
				);
				setData({
					billingProfiles : response.collection,
					pagination      : response.pagination,
				});
			}
		})();
	}, [customerId, page]);

	return (
		<BillingPage
			delegations={{
				activePage,
				details,
				pagination      : data.pagination,
				billingProfiles : data.billingProfiles,
				page,
			}}
		/>
	);
};

BillingPageContainer.propTypes = {
	customerId : PropTypes.any,
};

const mapStateToProps = ({ userReducer : { customer } }) => ({
	customerId : customer?.data?.customer.id,
});

export default withStateLoaded(mapStateToProps, null)(BillingPageContainer);
