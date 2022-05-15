import NewProduct           from "~/Components/Provider/NewProduct";
import PrivateProviderRoute from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout       from "~/Components/Provider/ProviderLayout";

const NewProductPage = props => (
	<PrivateProviderRoute>
		<ProviderLayout>
			<NewProduct {...props} />
		</ProviderLayout>
	</PrivateProviderRoute>
);

export const getServerSideProps = ({ query }) => {
	const inRevision = query?.status === "pending_revision";

	return {
		props : {
			inRevision,
		},
	};
};

export default NewProductPage;
