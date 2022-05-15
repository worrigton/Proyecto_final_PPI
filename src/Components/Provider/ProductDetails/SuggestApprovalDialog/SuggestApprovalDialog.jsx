import PropTypes from "prop-types";
import {
	Grid,
	CircularProgress,
} from "@material-ui/core";

// Import Own Components
import { FaSearch } from "~/Resources/icons/fas";
import AddImage     from "~/Components/ProductManagement/components/AddImage/AddImage.jsx";
import ProductImage from "~/Components/ProductManagement/components/ProductImage/ProductImage.jsx";
import {
	Input,
	Searchbar,
} from "~/ToolKit";
import useStyles from "./styles";

const SuggestApprovalDialog = ({
	delegations : {
		name,
		handleNameChange,

		description,
		handleDescriptionChange,

		selectedCategory,
		handleSelection,

		images,
		uploadFile,
		deleteImage,
	},
}) => {
	const classes = useStyles();

	return (
		<div>
			<Input
				id="name"
				label="Nombre"
				variant="outlined"
				value={name}
				onChange={handleNameChange}
			/>

			<label htmlFor="admin-product-description">Descripción</label>
			<textarea
				id="provider-product-description"
				className={classes.textarea}
				value={description}
				onChange={handleDescriptionChange}
			/>

			<Grid
				container
				spacing={2}
				className={classes.categories}
			>
				<Grid item xs={6}>
					<Searchbar
						url="/api/products/categories/page/1"
						identifier="name"
						onSelect={handleSelection}
						debounce
						normalizationFn={({ collection }) => collection}
						formatFn={({ name }) => name}
						inputProps={{
							placeholder    : "Buscar categoría",
							className      : classes.input,
							startAdornment : FaSearch,
							endAdornment   : loading => (
								loading ? (
									<div>
										<CircularProgress
											size={16}
											thickness={3.7}
											className={classes.loading}
										/>
									</div>
								) : <div />
							),
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<Input
						disabled
						variant="outlined"
						value={selectedCategory || ""}
					/>
				</Grid>
			</Grid>

			<div className={classes.images}>
				{ images.length < 5 && (
					<AddImage
						size={0.55}
						text=""
						uploadFile={uploadFile}
					/>
				) }

				{ images.map(({ xs }, position) => (
					<ProductImage
						className={classes.productImage}
						size={0.55}
						src={xs}
						key={position}
						deleteImage={() => deleteImage(position)}
					/>
				)) }
			</div>
		</div>
	);
};

SuggestApprovalDialog.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default SuggestApprovalDialog;
