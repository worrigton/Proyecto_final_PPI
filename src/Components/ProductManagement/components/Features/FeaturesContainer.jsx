/* eslint-disable react-hooks/exhaustive-deps */
import {
	useMemo,
	useContext,
	useCallback,
} from "react";
import PropTypes     from "prop-types";
import { connect }   from "react-redux";
import { useTheme }  from "@material-ui/core";
import { useRouter } from "next/router";

// Import Own Components
import ProductManagementContext from "~/Components/ProductManagement/context";
import DialogActions            from "~/Components/Dialog/store/actions";
import CreateFeature            from "~/Components/ProductManagement/components/CreateFeature";
import { bindAll }              from "~/Util";
import Features                 from "./Features.jsx";

const handleDelete = (position, setData) => {
	setData(({ features = [], ...prevState }) => {
		const newFeatures = [...features];

		newFeatures.splice(position, 1);

		return {
			...prevState,
			features : newFeatures,
		};
	});
};

const handleSelection = (selectedOption, setData, features = []) => {
	if (selectedOption && typeof selectedOption.id !== "undefined") {
		const alreadyDefined = features.filter(({ id }) => id === selectedOption.id).length > 0;

		if (!alreadyDefined) {
			setData(({ features, ...prevState }) => {
				const newFeatures = [
					...features,
					{
						id    : selectedOption.id || null,
						name  : selectedOption.name || "",
						label : "",
					},
				];

				return {
					...prevState,
					features : newFeatures,
				};
			});
		}
	}
};

const handleLabelChange = (position, value = "", setData) => {
	setData(({ features = [], ...prevState }) => {
		const newFeatures = [...features];

		newFeatures.splice(position, 1, {
			...(features[position] || {}),
			label : value,
		});

		return {
			...prevState,
			features : newFeatures,
		};
	});
};

const handleCreateNewFeature = (dialogActions, theme) => {
	dialogActions.openDialog({
		title   : "Crear rasgo nuevo",
		size    : "xs",
		content : CreateFeature,
		cancel  : true,
		ok      : {
			text  : "Aceptar",
			color : theme.palette.primary.main,
		},
	});
};

const FeaturesContainer = ({ dialogActions }) => {
	const theme  = useTheme();
	const router = useRouter();

	const isAdmin = useMemo(() => router.pathname.includes("/admin"), [router.pathname]);

	const {
		data : {
			features,
		},
		setData,
	} = useContext(ProductManagementContext);

	const handleDeleteMethod = useCallback(position => handleDelete(position, setData), []);

	const handleSelectionMethod = useCallback(option => handleSelection(option, setData, features), [features]);

	const handleLabelChangeMethod = useCallback((position, value) => handleLabelChange(position, value, setData), []);

	const handleCreateNewFeatureMethod = useCallback(() => handleCreateNewFeature(dialogActions, theme), [theme]);

	return (
		<Features
			delegations={{
				features,
				handleDelete           : handleDeleteMethod,
				handleSelection        : handleSelectionMethod,
				handleLabelChange      : handleLabelChangeMethod,
				handleCreateNewFeature : handleCreateNewFeatureMethod,
				isAdmin,
			}}
		/>
	);
};

FeaturesContainer.propTypes = {
	dialogActions : PropTypes.object.isRequired,
};

const mapDispatchToProps = bindAll({ DialogActions });

export default connect(null, mapDispatchToProps)(FeaturesContainer);
