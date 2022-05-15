/* eslint-disable camelcase */
import {
	Grid,
	CircularProgress,
	Divider,
} from "@material-ui/core";
import PropTypes   from "prop-types";
import { connect } from "react-redux";

// Import Own Components
import { FaSearch } from "~/Resources/icons/fas";
import {
	Button,
	Input,
	Searchbar,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import useStyles from "./styles";

const SelectCategory = ({
	delegations : {
		handleDelete,
		handleSelection,
		selectedCategory,
		handleAddCategoryClick,
	},
	isAdmin,
}) => {
	const classes = useStyles();

	return (
		<div>
			<Grid container spacing={3} alignItems="center">
				<Grid item xs={8}>
					<Searchbar
						debounce
						url="/api/products/categories/page/1"
						identifier="name"
						onSelect={handleSelection}
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
				<Grid item xs={4}>
					{ isAdmin && (
						<Button
							color="primary"
							onClick={handleAddCategoryClick}
						>
							Agregar Categoría
						</Button>
					) }
				</Grid>
			</Grid>

			<Divider className={classes.divider} />

			<Grid container spacing={3}>
				<Grid item xs={12}>
					<div className={classes.showCategory}>
						<div className="categoryLabelAndAction">
							<span>Categoría</span>

							<div className="spacer" />

							{ selectedCategory && (
								<Clicker onClick={handleDelete}>
									Eliminar
								</Clicker>
							) }
						</div>
						<Input
							disabled
							variant="outlined"
							value={selectedCategory || ""}
						/>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

SelectCategory.propTypes = {
	delegations : PropTypes.shape({
		isAdmin                : PropTypes.bool,
		handleDelete           : PropTypes.func.isRequired,
		handleSelection        : PropTypes.func.isRequired,
		selectedCategory       : PropTypes.string,
		handleAddCategoryClick : PropTypes.func.isRequired,
	}),
	isAdmin : PropTypes.bool,
};

SelectCategory.defaultProps = {
	isAdmin : false,
};

const mapStateToProps = ({
	userReducer     : { admin },
	categoryReducer : { category } }) => ({ isAdmin : Boolean(admin), category });

export default connect(mapStateToProps, null)(SelectCategory);
