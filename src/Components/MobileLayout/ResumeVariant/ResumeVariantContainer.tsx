/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import {
	useState,
	useCallback,
} from "react";
import { useRouter } from "next/router";

// Import Own Compoents
import { bindAll }     from "~/Util";
import withStateLoaded from "~/Store/withStateLoaded";
import AlertActions    from "~/Components/Alert/store/actions";
import Service         from "~/Service";
import Omit            from "~/Util/types/Omit";

import AddVariant, {
	Props as PropsAddVariant
} from "./ResumeVariant";

interface Props {
	token        ?: string;
	alertActions ?: any;
	productId    ?: any;
	provider_id  ?: number;
	textBnt      ?: boolean;
	product_details_id ?: number;
};	

const AddVariantContainer : React.FC<Props> =({
	alertActions,
	provider_id = useRouter().query?.providerId,
	product_details_id,
	token,
}) => {
	const router = useRouter();
	const [activeChange, setActiveChange] = useState(false);


	const activeProduct = useCallback(async () => {
		const activeProd = await Service.api.provider.activeProduct({
			product_details_id,
			provider_id,
			"admin" : "admin",
			token,
		});
		if (!activeProd) {
			alertActions.openAlert({
				message  : "Ups!, hubo un error al tratar de activar el producto, inténtalo más tarde",
				type     : "warning",
				duration : 3000,
			});
			router.reload();
		}
		else {
			setActiveChange(!activeChange);
			alertActions.openAlert({
				message  : "Producto activado",
				type     : "success",
				duration : 3000,
			});
		}
	}, [activeChange, alertActions]);

	return (<>
		<AddVariant
			delegations={{
				activeChange,
				activeProduct,
			}}
		/>
	</>
	);
};

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded<Omit<PropsAddVariant, "delegations">>(null, mapDispatchToProps)(AddVariantContainer);


