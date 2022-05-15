/* eslint-disable camelcase */
import { Fragment } from "react";
import PropTypes    from "prop-types";
import {
	Grid,
	Divider,
	useTheme,
	CircularProgress,
	useMediaQuery,
} from "@material-ui/core";

// Import Own Components
import { FaSearch } from "~/Resources/icons/fas";
import {
	Button,
	Input,
	Searchbar,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import useStyles from "./styles";

const Features = ({
	delegations : {
		features,
		handleDelete,
		handleSelection,
		handleLabelChange,
		handleCreateNewFeature,
		isAdmin,
	},
}) => {
	const classes     = useStyles();
	const theme       = useTheme();
	const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<div className={classes.features}>
			<Grid container spacing={3} alignItems="center">
				<Grid item xs={8}>
					<Searchbar
						debounce
						url="/api/products/features/page/1"
						identifier="name"
						onSelect={handleSelection}
						formatFn={({ name }) => name}
						normalizationFn={({ collection }) => collection}
						inputProps={{
							placeholder    : "Buscar rasgo",
							className      : classes.input,
							startAdornment : FaSearch,
							endAdornment   : (loading) => (
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
							color="white"
							variant="outlined"
							onClick={handleCreateNewFeature}
							className="add-feature-button"
						>
							{ smallScreen ? "Agregar" : "Agregar rasgo nuevo" }
						</Button>
					) }
				</Grid>
			</Grid>

			<Divider />

			{ features.map(({ id, name, label }, position) => (
				<Fragment key={id}>
					<Grid container spacing={3}>
						<Grid
							item
							xs={6}
						>
							<span className="feat-title">{`Rasgo ${position + 1}`}</span>
						</Grid>
						<Grid
							item
							xs={6}
							className="delete-feat"
						>
							<Clicker onClick={() => handleDelete(position)}>
								Eliminar
							</Clicker>
						</Grid>

						<Grid item xs={4}>
							<Input
								variant="outlined"
								disabled
								value={name}
							/>
						</Grid>
						<Grid item xs={8}>
							<Input
								variant="outlined"
								value={label}
								onChange={e => handleLabelChange(position, e?.target?.value)}
							/>
						</Grid>
					</Grid>

					{ position + 1 !== features?.length && (
						<Divider />
					) }
				</Fragment>
			)) }
		</div>
	);
};

Features.propTypes = {
	delegations : PropTypes.shape({
		features               : PropTypes.array.isRequired,
		handleDelete           : PropTypes.func.isRequired,
		handleSelection        : PropTypes.func.isRequired,
		handleLabelChange      : PropTypes.func.isRequired,
		handleCreateNewFeature : PropTypes.func.isRequired,
		isAdmin                : PropTypes.bool.isRequired,
	}).isRequired,
};

export default Features;
