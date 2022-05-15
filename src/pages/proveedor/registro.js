import PropTypes from "prop-types";

// import own components
import Registry            from "~/Components/Provider/Registry";
import { getClientSecret } from "~/Server/controllers/info/payment_controller";

const RegistryPage = ({ data }) => (
	<Registry {...{ data }} />
);

export const getServerSideProps = async () => {
	const { clientSecret } = await getClientSecret();
	return {
		props : {
			data : clientSecret,
		},
	};
};

RegistryPage.propTypes = {
	data : PropTypes.object.isRequired,
};

export default RegistryPage;
