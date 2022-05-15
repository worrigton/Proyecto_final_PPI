/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import {
	useState,
	useCallback,
	useMemo,
	useContext,
} from "react";
import PropTypes   from "prop-types";
import { connect } from "react-redux";

// Import Own Components
import AlertActions                 from "~/Components/Alert/store/actions";
import { ProductDetailsContext }    from "~/Components/Provider/ProductDetails";
import {
	capitalize,
	isValidArray,
	bindAll,
} from "~/Util";
import QualityAndSize from "./QualityAndSize.jsx";

const newVariantInitialState = {
	quality : null,
	size    : null,
	price   : 0,
	freeze  : false,
};

const handleChange = (prop, setNewVariant, newValue = null) => {
	if (prop === "price") {
		// Remove all the occurrences of a dot except for the first one
		newValue = newValue.replace(/\./g, (val, index, str) => index === str.indexOf(".") ? val : "");

		// Accept just dots and numbers
		if (newValue.match(/[^0-9.]/gi)) {
			return;
		}

		const dotPosition = newValue.indexOf(".");

		if (dotPosition !== -1) {
			const decimals = newValue.substr(dotPosition + 1);

			if (decimals.length > 2) {
				return;
			}
		}
	}

	setNewVariant(prevState => {
		if (prop === "freeze") {
			return {
				...prevState,
				freeze : !prevState.freeze,
			};
		}

		return {
			...prevState,
			size   : prop === "quality" ? null : prevState.size,
			[prop] : newValue,
		};
	});
};

const handleAddVariant = (setData, newVariant, setNewVariant, alertActions) => {
	for (const [key, value] of Object.entries(newVariant)) {
		switch (key) {
			case "price" : {
				if (parseFloat(value) <= 0) {
					alertActions.openAlert({
						message  : "Tienes que agregar un precio para la variedad.",
						type     : "warning",
						duration : 4e3,
					});
					return;
				}
				break;
			}
			case "size":
			case "quality": {
				if (!value || !("name" in value)) {
					alertActions.openAlert({
						message  : "Tienes que agregar la calidad y el tamaño.",
						type     : "warning",
						duration : 4e3,
					});
					return;
				}
				break;
			}
			default:
				break;
		}
	}

	setNewVariant(newVariantInitialState);

	setData(({ variants = [], ...prevState }) => {
		const variantsCopy = [...variants];

		variantsCopy.push({
			...newVariant,
			quality : newVariant?.quality?.name,
			size    : newVariant?.size?.name,
		});

		return {
			...prevState,
			variants : variantsCopy,
		};
	});
};

const calculateQualityOptions = (varieties = {}) => {
	return Object.keys(varieties).map((quality, id) => ({
		id,
		name : capitalize(quality),
	}));
};

const calculateSizeOptions = (varieties, quality) => {
	const selectedOptions = varieties[(quality || "")];

	return !quality || !isValidArray(selectedOptions)
		? []
		: selectedOptions.map((size, id) => ({
			id,
			name : capitalize(size),
		}));
};

const handleDeleteVariant = (position, setData) => {
	setData(({ variants, ...prevState }) => {
		const clonedVariants = [...variants];

		clonedVariants.splice(position, 1);

		return {
			...prevState,
			variants : clonedVariants,
		};
	});
};

const QualityAndSizeContainer = ({ alertActions }) => {
	const {
		data : {
			variants,
			remaining_varieties,
		},
		setData,
	} = useContext(ProductDetailsContext);

	const [newVariant, setNewVariant] = useState(newVariantInitialState);

	const qualityOptions = useMemo(() => calculateQualityOptions(remaining_varieties), [remaining_varieties]);
	const sizeOptions    = useMemo(() => calculateSizeOptions(remaining_varieties, newVariant?.quality?.name), [remaining_varieties, newVariant]);

	const handleChangeMethod = useCallback((prop, newValue) => handleChange(prop, setNewVariant, newValue), []);

	const handleAddVariantMethod = useCallback(() => handleAddVariant(setData, newVariant, setNewVariant, alertActions), [newVariant, alertActions]);

	const handleDeleteVariantMethod = useCallback(position => handleDeleteVariant(position, setData), []);

	return (
		Object.keys(remaining_varieties || {}).length > 0 ? (
			<QualityAndSize
				delegations={{
					variants,
					newVariant,
					qualityOptions,
					sizeOptions,
					handleChange        : handleChangeMethod,
					handleAddVariant    : handleAddVariantMethod,
					handleDeleteVariant : handleDeleteVariantMethod,
				}}
			/>
		) : null
	);
};

QualityAndSizeContainer.propTypes = {
	alertActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ AlertActions });

export default connect(null, mapDispatchToProps)(QualityAndSizeContainer);
