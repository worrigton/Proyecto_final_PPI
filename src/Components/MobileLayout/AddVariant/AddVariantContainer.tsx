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
} from "./AddVariant";

interface Props {
	token        : string;
	alertActions : any;
	productId    ?: any;
	provider_id  ?: number;
	textBnt      ?: boolean;
};	

const AddVariantContainer : React.FC<Props> =({
	alertActions,
	token,
	provider_id = useRouter().query?.providerId,
	productId,
	textBnt,
}) => {
	const router = useRouter();

	const [open, setOpen]                 = useState(false);
	const [productData, setProductData]   = useState(null);
	const [newVariant, setNewVariant]     = useState({
		qualityOptions : [],
		sizeOptions    : [],
		freeze         : false,
		quality        : null,
		size           : null,
		price          : 0,
	});

	const calculateQualityOptions =  useCallback((varieties = {}) => {
		let options = [];
		options = Object.keys(varieties).map((quality, id) => ({
			id,
			name : quality,
		}));
		setNewVariant({
			...newVariant,
			qualityOptions : options,
		});
	}, [newVariant]);

	const calculateSizeOptions = useCallback((quality) => {
		if (quality) {
			let selectedOptions = productData.remaining_varieties;
			selectedOptions = selectedOptions[quality?.name];
			let options = [];
			if (selectedOptions.length > 0) {
				options = selectedOptions.map((size, id) => ({
					id,
					name : size,
				}));
			}
			setNewVariant({
				...newVariant,
				size        : null,
				sizeOptions : options,
				quality,
			});
		}
	}, [newVariant, productData]);

	const handleChangeQuality = useCallback((e, newValue) => {
		calculateSizeOptions(newValue);
	}, [newVariant, setNewVariant]);

	const handleChangeSize = useCallback((e, newValue) => {
		setNewVariant({
			...newVariant,
			size : newValue,
		});
	}, [newVariant]);

	const handleChangePrice = useCallback((e) => {
		setNewVariant({
			...newVariant,
			price : e.target.value,
		});
	}, [newVariant]);

	const handleClickOpen = useCallback(() => {
		(async () => {
			let response = null;
			response = await Service.api.provider.getProductDetails((provider_id), productId);
			setProductData(response);
			calculateQualityOptions(response.remaining_varieties);
		})();
		setOpen(true);
	}, [productData, setProductData]);

	const handleClickClose = () => {
		setOpen(false);
		setProductData(null);
	};

	const handleFrezee = useCallback(() => {
		setNewVariant({
			...newVariant,
			freeze : !newVariant.freeze,
		});
	}, [newVariant]);

	const handleAddVariant = useCallback(() => {
		(async () => {
			const variants = {
				price   : newVariant.price,
				quality : (newVariant.quality.name || ""),
				status  : "ACTIVE",
				size    : (newVariant.size.name || ""),
				...(newVariant.freeze && {
					flags : "frezee",
				} || {}),
			};

			const response = await Service.api.provider.configProduct({
				token              : token,
				product_details_id : productData.id,
				provider_id        : provider_id,
				products           : [variants],
			});
			handleClickClose();

			if (response) {
				alertActions.openAlert({
					message  : "¡Se actualizó la información correctamente!",
					type     : "success",
					duration : 4e3,
				});
				router.reload();

			} else {
				alertActions.openAlert({
					message  : "Hubo un error actualizando la información.",
					type     : "error",
					duration : 4e3,
				});
			}
		})();
	}, [alertActions, newVariant, router, token]);

	return (<>
		<AddVariant
			delegations={{
				handleAddVariant,
				handleClickOpen,
				handleClickClose,
				handleChangeQuality,
				handleChangeSize,
				handleChangePrice,
				handleFrezee,
				productData,
				newVariant,
				open,
				textBnt,
			}}
		/>
	</>
	);
};

const mapStateToProps = ({ userReducer : { provider } }) => ({
	token       : provider?.token || null,
	user_id     : provider?.data?.id,
	provider_id : provider?.data?.provider?.id,
});

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded<Omit<PropsAddVariant, "delegations">>(mapStateToProps, mapDispatchToProps)(AddVariantContainer);


