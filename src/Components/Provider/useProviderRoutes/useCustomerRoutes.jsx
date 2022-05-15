import { useCallback, useMemo } from "react";
import { useRouter }            from "next/router";
import {
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";

// Import Own Components
import { FaHome } from "~/Resources/icons/far";
import {
	FaTruck,
	FaCog,
	FaAppleCrate,
} from "~/Resources/icons/fal";

const useProviderRoutes = () => {
	const router = useRouter();
	const makeRedirectFn = useCallback(url => unMountComponent => () => {
		if (url === router.pathname) {
			return unMountComponent ? unMountComponent() : undefined;
		}

		router.push(url);
	}, [router]);

	const routes = useMemo(() => [
		[makeRedirectFn("/proveedor/inicio"), "Inicio", FaHome],
		[makeRedirectFn("/proveedor/ordenes"), "Pedidos", FaTruck],
		[makeRedirectFn("/proveedor/productos"), "Mis productos", FaAppleCrate],
		[makeRedirectFn("/proveedor/cuenta"), "Ajustes", FaCog],
	], [makeRedirectFn]);

	const mapedRoutesForUsage = useMemo(() => routes.map(([redirectFn, label, Icon]) => ({
		redirectFn,
		components : (
			<>
				<ListItemIcon>
					<Icon />
				</ListItemIcon>

				<ListItemText primary={label} />
			</>
		),
	})), [routes]);

	return mapedRoutesForUsage;
};

export default useProviderRoutes;
