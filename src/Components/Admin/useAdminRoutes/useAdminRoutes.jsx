import { useCallback, useMemo } from "react";
import { useRouter }            from "next/router";
import {
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";

// Import Own Components
import {
	FaHome,
	FaSignInAlt,
	FaLemon,
	FaUserFriends,
	FaUserLock,
} from "~/Resources/icons/far";
import { FaTruckLoading } from "~/Resources/icons/fal";
import useStyles          from "./styles";

const useAdminRoutes = () => {
	const router  = useRouter();
	const classes = useStyles();

	const makeRedirectFn = useCallback(url => unMountComponent => () => {
		if (url === router.pathname) {
			return unMountComponent ? unMountComponent() : undefined;
		}

		router.push(url);
	}, [router]);

	const routes = useMemo(() => [
		[makeRedirectFn("/admin"), "Inicio", FaHome],
		[makeRedirectFn("/admin/orders"), "Pedidos", FaSignInAlt],
		[makeRedirectFn("/admin/products"), "Productos", FaLemon],
		[makeRedirectFn("/admin/suppliers"), "Proveedores", FaTruckLoading],
		[makeRedirectFn("/admin/clients"), "Clientes", FaUserFriends],
		[makeRedirectFn("/admin/additional_accounts"), "Cuentas adicionales", FaUserLock],
	], [makeRedirectFn]);

	const mapedRoutesForUsage = useMemo(() => routes.map(([redirectFn, label, Icon]) => ({
		redirectFn,
		components : (
			<>
				<ListItemIcon className={classes.icon}>
					<Icon />
				</ListItemIcon>

				<ListItemText primary={label} className={classes.label} />
			</>
		),
	})), [routes, classes.icon, classes.label]);

	return mapedRoutesForUsage;
};

export default useAdminRoutes;
