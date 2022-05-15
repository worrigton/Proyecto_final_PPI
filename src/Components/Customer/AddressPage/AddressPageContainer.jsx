import PropTypes           from "prop-types";
import {
	useEffect,
	useState,
	useCallback,
} from "react";

// Import Own Compoents
import withStateLoaded from "~/Store/withStateLoaded";
import Service         from "~/Service";
import { Typography }  from "~/ToolKit";
import AddressPage     from "./AddressPage";

const AddressPageContainer = ({ customerId }) => {
	const [data, setData] = useState({
		address    : [],
		pagination : {},
	});
	const [page, setPage]       = useState(1);
	const [message, setMessage] = useState("");

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
		</>;
	}, []);

	useEffect(() => {
		(async () => {
			if (customerId) {
				const { body : response } = await Service.api.customer.getCustomerAddress(
					page,
					`per_page=5&customer_id=${customerId}`
				);
				if (response?.collection.length > 0)
					setData({
						address    : response.collection,
						pagination : response.pagination,
					});
				else
					setMessage("Aún no has registrado direcciones de envío");
			}
		})();
	}, [customerId, page, message]);

	return (
		<AddressPage
			delegations={{
				activePage,
				details,
				pagination      : data.pagination,
				addressProfiles : data.address,
				page,
				message,
			}}
		/>
	);
};

AddressPageContainer.propTypes = {
	customerId : PropTypes.any,
};

const mapStateToProps = ({ userReducer : { customer } }) => ({
	customerId : customer?.data?.customer.id,
});

export default withStateLoaded(mapStateToProps, null)(AddressPageContainer);
