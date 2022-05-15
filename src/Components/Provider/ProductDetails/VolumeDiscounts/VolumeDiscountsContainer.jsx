/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useCallback }  from "react";

// Import Own Components
import { ProductDetailsContext } from "~/Components/Provider/ProductDetails";
import VolumeDiscounts           from "./VolumeDiscounts.jsx";

const updateProfilesData = (prop, position, value = "", setData) => {
	// Remove all the occurrences of a dot except for the first one
	value = value.replace(/\./g, (val, index, str) => index === str.indexOf(".") ? val : "");

	// Accept just dots and numbers
	if (value.match(/[^0-9.]/gi)) {
		return;
	}

	const dotPosition = value.indexOf(".");

	if (dotPosition !== -1) {
		const decimals = value.substr(dotPosition + 1);

		if (decimals.length > 2) {
			return;
		}
	}

	setData(({ profilesData, ...prevState }) => {
		const profiles = [...profilesData];

		// Validate value based on previous data and its type
		// Defining min and max values for each inpu type
		const controlledValue = ((previous, current) => {
			switch (prop) {
				case "discount": {
					const intValue = parseInt(value || 0);

					if (intValue > 100) return "100";
					if (intValue <= 0) return "0";

					return intValue.toString();
				}
				case "minWeight" : {
					const minWeight = parseFloat(value || 0);

					return minWeight >= current.maxWeight
						? (current.maxWeight - 0.01).toFixed(2)
						: value;
				}
				// Validation onBlur because if we do it here, it prevents the user to correct themselves
				// If we have minWeight = 20 and maxWeight = 10, that's a mistake, and if the user
				// tries to erase that 10, it would be 1 wich is even worse, that's why validation is onblur
				case "maxWeight":
				default:
					return value;
			}
		})(profilesData[position - 1], profilesData[position]);

		profiles.splice(position, 1, {
			...(profilesData[position] || {}),
			[prop] : controlledValue,
		});

		return {
			...prevState,
			profilesData : profiles,
		};
	});
};

const handleBlur = (position = 0, setData) => {
	setData(prevData => {
		const profiles = [...prevData.profilesData];

		const currentMinWeight = parseFloat(profiles[position].minWeight || 0);
		const currentMaxWeight = parseFloat(profiles[position].maxWeight || 0);

		if (currentMaxWeight <= currentMinWeight) {
			profiles.splice(position, 1, {
				...(profiles[position] || {}),
				maxWeight : (currentMinWeight + 20).toFixed(2),
			});

			return {
				...prevData,
				profilesData : profiles,
			};
		}

		return prevData;
	});
};

const addProfile = (setData) => {
	setData(({ profilesData, profilesQuantity, ...prevState }) => {
		const profiles = [...profilesData];

		const newMinWeight = (parseFloat(profiles[profiles.length - 1]?.maxWeight || 0) + 0.01).toFixed(2);

		profiles.push({
			minWeight : newMinWeight,
			maxWeight : (parseInt(newMinWeight) + 20).toFixed(2),
			discount  : 0,
		});

		return {
			...prevState,
			profilesData     : profiles,
			profilesQuantity : profiles.length,
		};
	});
};

const removeProfile = (setData, position) => {
	if (position !== 0) {
		setData(({ profilesData, profilesQuantity, ...prevState }) => {
			const profiles = [...profilesData];

			profiles.splice(position, 1);

			// Re-calculate minWeight
			if (position !== profiles.length) {
				profiles.splice(position, 1, {
					...(profiles[position] || {}),
					minWeight : (parseFloat(profiles[position - 1].maxWeight) + 0.01).toFixed(2),
				});
			}

			return {
				...prevState,
				profilesData     : profiles,
				profilesQuantity : profiles.length,
			};
		});
	}
};

const VolumeDiscountsContainer = () => {
	const {
		data : {
			profilesData,
			profilesQuantity,
		},
		setData,
	} = useContext(ProductDetailsContext);

	const addProfileMethod    = useCallback(() => addProfile(setData), []);
	const removeProfileMethod = useCallback(position => removeProfile(setData, position), []);

	const updateProfilesDataMethod = useCallback((prop, position) => ({ target : { value } }) => {
		updateProfilesData(prop, position, value, setData);
	}, []);

	const handleBlurMethod = useCallback(position => handleBlur(position, setData), []);

	return (
		<VolumeDiscounts
			delegations={{
				profilesData,
				profilesQuantity,
				handleBlur         : handleBlurMethod,
				removeProfile      : removeProfileMethod,
				addProfile         : addProfileMethod,
				updateProfilesData : updateProfilesDataMethod,
			}}
		/>
	);
};

export default VolumeDiscountsContainer;
