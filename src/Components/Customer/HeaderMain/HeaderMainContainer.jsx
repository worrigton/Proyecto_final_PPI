import {
	useState,
	useCallback,
	useEffect,
} from "react";
import PropTypes     from "prop-types";
import { useRouter } from "next/router";
import { connect }   from "react-redux";
import { Hidden }    from "@material-ui/core";

// Import own Components
import UserActions       from "~/Store/UserStore/actions";
import ProductActions    from "~/Components/Products/ProductsStore/store/actions";
import { bindAll }       from "~/Util";
import { useDebounce }   from "~/Util/Hooks";
import useCustomerRoutes from "~/Components/Customer/useCustomerRoutes";
import Service           from "~/Service";
import HeaderMain        from "./HeaderMain.jsx";
import HeaderMainMobile  from "./HeaderMainMobile.jsx";

const HeaderMainContainer = ({ userActions, productActions, search }) => {
	// Handle toggling the user menu
	const [anchorEl, setAnchorEl]       = useState(null);
	const [anchorElCtg, setAnchorElCtg] = useState(null);
	const [anchorElLct, setAnchorElLct] = useState(null);
	const [drawer, setDrawer]           = useState(false);
	const [openCtg, setOpenCtg]         = useState(false);
	const [openLct, setOpenLct]         = useState(false);
	const [openSearch, setOpenSearch]   = useState(false);
	const [location, setLocation]       = useState([]);
	const [category, setCategory]       = useState([]);
	const [searchInput, setSearchInput] = useState(search);

	const handleOpen     = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose    = useCallback(() => setAnchorEl(null), []);

	const handleOpenCtg  = useCallback(({ currentTarget }) => setAnchorElCtg(currentTarget), []);
	const handleCloseCtg = useCallback(() => setAnchorElCtg(null), []);

	const handleOpenLct  = useCallback(({ currentTarget }) => setAnchorElLct(currentTarget), []);
	const handleCloseLct = useCallback(() => setAnchorElLct(null), []);

	const toggleDrawer = (open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
		  return;
		}
		setDrawer(open);
	};

	const handleClick = (type) => (event) => {
		type == "category" ? setOpenCtg(!openCtg) : setOpenLct(!openLct);
	};

	const handleSearch = (value) => setOpenSearch(value);

	// Handle Routes
	const router = useRouter();
	const routes = useCustomerRoutes();

	const toCustomerHome = useCallback(() => router.push("/"), [router]);
	const logOut         = useCallback(() => userActions.logoutUserOfType("customer"), [userActions]);

	const handleProductCategory = useCallback(({ id, name })=> {
		router.replace("/productos");
		handleCloseCtg();
		handleClose();
		productActions.setProductsCategory({
			id,
			name,
		});
	}, [productActions, handleCloseCtg, handleClose, router]);

	const handleLocationState = useCallback(({ id, name })=> {
		handleCloseLct();
		router.replace("/productos");
		productActions.setProductsState({
			id,
			name,
		});
	}, [productActions, handleCloseLct, router]);

	useEffect(() => {
		Service.api.getState(1, "page_size=50").then(data=>setLocation(data.collection || []));
		Service.api.getCategories(1, "page_size=100").then(data=>setCategory(data.collection || []));
	}, []);

	useEffect(() => {
		setSearchInput(search);
	}, [search]);

	const handleInputChange = useDebounce((value) => {
		setSearchInput(value);

		productActions.setFilter({ filter : value });
		router.replace("/productos");
	}, 500, [productActions]);

	return (
		<>
			<Hidden smDown>
				<HeaderMain
					delegations={{
						routes,
						handleOpen,
						handleClose,
						handleOpenCtg,
						handleCloseCtg,
						handleOpenLct,
						handleCloseLct,
						handleLocationState,
						handleProductCategory,
						toCustomerHome,
						logOut,
						anchorEl,
						anchorElCtg,
						anchorElLct,
						category,
						location,
						handleInputChange,
						searchInput,
					}}
				/>
			</Hidden>
			<Hidden mdUp>
				<HeaderMainMobile
					delegations={{
						routes,
						handleClose,
						toggleDrawer,
						handleClick,
						toCustomerHome,
						handleLocationState,
						handleProductCategory,
						handleSearch,
						logOut,
						drawer,
						openCtg,
						openLct,
						category,
						location,
						handleInputChange,
						openSearch,
					}}
				/>
			</Hidden>
		</>
	);
};

HeaderMainContainer.propTypes = {
	userActions    : PropTypes.object.isRequired,
	productActions : PropTypes.object.isRequired,
	search         : PropTypes.string.isRequired,
};

const mapDispatchToProps = bindAll({ UserActions, ProductActions });

const mapStateToProps = (
	{ productsReducer : { filters: { search } } },
) => ({
	search : search || "",
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMainContainer);
