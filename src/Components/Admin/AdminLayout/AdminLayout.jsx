import PropTypes from "prop-types";
import {
	Drawer,
	List,
	ListItem,
	Hidden,
	Container,
} from "@material-ui/core";

// Import Own Components
import Header         from "~/Components/Admin/Header";
import useAdminRoutes from "~/Components/Admin/useAdminRoutes";
import useStyles      from "./styles";

const AdminLayout = ({ children, withLeftMargin }) => {
	const classes = useStyles(withLeftMargin);
	const routes  = useAdminRoutes();

	return (
		<>
			<Header />
			<Hidden smDown>
				<Drawer
					className={classes.drawer}
					variant="permanent"
					classes={{
						paper : classes.drawerPaper,
					}}
					anchor="left"
				>
					<div className={classes.toolbar} />
					<List />
					<List>
						{ routes.map(({ redirectFn, components }, index) => (
							<ListItem
								key={index}
								button
								onClick={redirectFn()}
							>
								{ components }
							</ListItem>
						)) }
					</List>
				</Drawer>

				<div className={`${classes.adminPagesContent} adminPagesContent`}>
					{ children }
				</div>
			</Hidden>
			<Hidden mdUp>
				<Container maxWidth="lg">
					{ children }
				</Container>
			</Hidden>
		</>
	);
};

AdminLayout.propTypes = {
	children       : PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.node]),
	withLeftMargin : PropTypes.bool,
};

AdminLayout.defaultProps = {
	children       : <></>,
	withLeftMargin : false,
};

export default AdminLayout;
