import PropTypes  from "prop-types";
import { Grid, Typography }   from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

// Import Own Components
import { SWR }   from "~/Util";
import Product   from "./components/Product";
import useStyles from "./styles";

const AdminPendingApprovals = ({
	delegations : {
		activePage,
		page,
	},
}) => {
	const classes = useStyles();

	const query =  `
		page_size=16
		&status=REVIEW
		&image_size=md`;

	return (
		<Grid
			className={classes.root}
			container
			spacing={2}
		>
			<SWR
				url={`api/products/change_history/page/${page}?${query}`}
			>
				{ ({ collection : pendings, pagination }) => (
					<>
						<Grid
							className={classes.root}
							container
						>
							{ pendings.length > 0 ? pendings.map((pending, index) => (
								<Grid
									item
									xs={12}
									md={6}
									lg={4}
									key={index}
									className={classes.padding}
								>
									<Product data={pending} />
								</Grid>
							)) : (
								<Typography type="header2" fontWeight="700">No hay pendientes</Typography>
							)}
						</Grid>
						<Grid item>
							{ pendings.length > 0 && (
								<Pagination
									color="primary"
									count={pagination.pageCount}
									page={page}
									onChange={activePage}
								/>
							)}
						</Grid>
					</>
				) }
			</SWR>
		</Grid>
	);
};


AdminPendingApprovals.propTypes = {
	delegations : PropTypes.any,
};

AdminPendingApprovals.defaultProps = {
	delegations : {},
};

export default AdminPendingApprovals;
