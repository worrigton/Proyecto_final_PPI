import NewProduct                 from "~/Components/Provider/NewProduct";
import EmployeeLayout             from "~/Components/Employee/EmployeeLayout";

const NewProductPage = props => (
	<EmployeeLayout>
		<NewProduct {...props} />
	</EmployeeLayout>
);

export const getServerSideProps = ({
	query : {
		providerId,
		status,
	},
}) => {
	const inRevision = status === "pending_revision";

	return {
		props : {
			providerId : Number(providerId),
			type       : "employee",
			inRevision,
		},
	};
};

export default NewProductPage;
