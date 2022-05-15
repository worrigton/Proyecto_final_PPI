import PropTypes                from "prop-types";
import { useDebounce }   from "~/Util/Hooks";
import {
	useState,
	useCallback,
	useMemo,
} from "react";

// Import Own Components
import { bindAll }     from "~/Util";
import VariantsInput   from "./VariantsInput.jsx";
import AlertActions    from "~/Components/Alert/store/actions";
import Service         from "~/Service";
import withStateLoaded from "~/Store/withStateLoaded";

const VariantsInputContainer = (props) => {
	const { value, productId, alertActions, providerId  } = props;
	const [anchorEl, setAnchorEl] = useState();
	const [price, setPrice] = useState( value );
	const handleOpen  = useCallback(({ currentTarget }) => setAnchorEl(currentTarget), []);
	const handleClose = useCallback(() => setAnchorEl(null), []);

	// const debounced = useDebouncedCallback(async (value) => {
	// 	const success = await Service.api.provider.editProductPrice(productId, providerId, "provider", value);
	// 	if (success) {
	// 		alertActions.openAlert({
	// 			message  : "Precio actualizado correctamente",
	// 			type     : "success",
	// 			duration : 3000,
	// 		});
	// 	}
	// },
	// // delay in ms
	// 1000
	// );

	const formatter = useMemo(() => new Intl.NumberFormat("en-US", {
		style                 : "currency",
		currency              : "USD",
		minimumFractionDigits : 2,
	}), []);

	const handleChange = useDebounce( async (value) => {
		const success = await Service.api.provider.editProductPrice(productId, providerId, "provider", value);
		if (success) {
			alertActions.openAlert({
				message  : "Precio actualizado correctamente",
				type     : "success",
				duration : 3000,
			});
		}
		setPrice(value);
	}, 1000, []);

	return (
		<VariantsInput
			delegations={{
				formatter,
				anchorEl,
				handleOpen,
				handleClose,
				handleChange,
				value,
				price,
			}}
			{...props}
		/>
	);
};

VariantsInputContainer.propTypes = {
	delegations : PropTypes.object.isRequired,
	size        : PropTypes.string.isRequired,
	quality     : PropTypes.string.isRequired,
	value       : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	options     : PropTypes.arrayOf(PropTypes.shape({
		label   : PropTypes.string.isRequired,
		handler : PropTypes.func,
	})),
	endAdornment   : PropTypes.any,
	customOptions  : PropTypes.any,
	deleteIconFunc : PropTypes.func,
	className      : PropTypes.string,
	freeze         : PropTypes.bool,
	productId      : PropTypes.number.isRequired,
	providerId     : PropTypes.number.isRequired,
	alertActions   : PropTypes.object.isRequired,
};


const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(null, mapDispatchToProps)(VariantsInputContainer);
