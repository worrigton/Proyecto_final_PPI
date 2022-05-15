import { useState, useCallback } from "react";

// Import Own Components
import AdminPendingApprovals from "./AdminPendingApprovals";

const AdminPendingApprovalsContainer = () => {
	const [page, setPage] = useState(1);

	const activePage = useCallback((event, value) => {
		setPage(value);
	}, []);

	return (
		<AdminPendingApprovals
			delegations={{
				activePage,
				page,
			}}
		/>
	);
};

export default AdminPendingApprovalsContainer;
