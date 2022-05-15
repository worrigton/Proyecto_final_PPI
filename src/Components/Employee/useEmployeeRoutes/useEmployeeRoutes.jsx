import { useCallback, useMemo } from "react";
import { useRouter }            from "next/router";
import {
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";

// Import Own Components
import { FaHome } from "~/Resources/icons/far";

const useEmployeeRoutes = () => {
	const router = useRouter();

	const makeRedirectFn = useCallback(url => unMountComponent => () => {
		if (url === router.pathname) {
			return unMountComponent ? unMountComponent() : undefined;
		}

		router.push(url);
	}, [router]);

	const routes = useMemo(() => [
		[makeRedirectFn("/employee"), "Inicio", FaHome],
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

export default useEmployeeRoutes;
