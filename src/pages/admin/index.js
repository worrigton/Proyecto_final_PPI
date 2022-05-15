import AdminLayout               from "~/Components/Admin/AdminLayout";
import AdminPageTitle            from "~/Components/Admin/AdminPageTitle";
import { AdminPendingApprovals } from "~/Components/Products";

const AdminIndex = () => (
	<AdminLayout>
		<AdminPageTitle title="Aprobaciones Pendientes" />
		<AdminPendingApprovals />
	</AdminLayout>
);

export default AdminIndex;
