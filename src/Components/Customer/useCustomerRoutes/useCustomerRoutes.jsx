import { useCallback, useMemo } from "react";
import { useRouter }            from "next/router";
import {
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";

// Import Own Components
import { FaUser, FaHome } from "~/Resources/icons/far";
import {
	FaTruck,
	FaMapMarkerAlt,
	FaFileInvoiceDollar,
} from "~/Resources/icons/fal";

const useCustomerRoutes = () => {
	const router = useRouter();
	const makeRedirectFn = useCallback(url => unMountComponent => () => {
		if (url === router.pathname) {
			return unMountComponent ? unMountComponent() : undefined;
		}

		router.push(url);
	}, [router]);

	const routes = useMemo(() => [
		[makeRedirectFn("/cliente/inicio"), "Inicio", FaHome],
		[makeRedirectFn("/cliente/ordenes"), "Mis pedidos", FaTruck],
		[makeRedirectFn("/cliente/direcciones"), "Direcciones", FaMapMarkerAlt],
		[makeRedirectFn("/cliente/perfiles-de-facturacion"), "Facturación", FaFileInvoiceDollar],
		[makeRedirectFn("/cliente/cuenta"), "Mi Cuenta", FaUser],
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

export default useCustomerRoutes;
