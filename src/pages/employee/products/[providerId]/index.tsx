import { connect } from "react-redux";

import EmployeeLayout     from "~/Components/Employee/EmployeeLayout";
import ProductsOfProvider from "~/Components/Products/ProductsOfProvider";

interface Props {
	token : string;
};

const EmployeeProviderProductsPage: React.FC<Props> = ({ token }) => (
	<EmployeeLayout>
		<ProductsOfProvider showProviderData token={token} />
	</EmployeeLayout>
);

const mapStateToProps    = ({ userReducer }) => ({
	token : userReducer?.employee?.token,
});

export default connect(mapStateToProps, null)(EmployeeProviderProductsPage);
