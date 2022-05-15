import PropTypes from "prop-types";
import {
	MenuItem,
	CircularProgress,
	FormControl,
	useTheme,
	Grid,
} from "@material-ui/core";

// Import Own Components
import { FaSearch }     from "~/Resources/icons/fas";
import { useSearchbar } from "~/Util/Hooks";
import {
	NativeInput,
	Select,
} from "~/ToolKit";
import useStyles from "./styles";

const SearchbarAndFilters = ({
	label,
	placeholder,
	searchQuery,
	orderByOptions,
	handleOrderChange,
	handleOrderByChange,
}) => {
	const theme   = useTheme();
	const classes = useStyles();

	const { loading, inputProps } = useSearchbar(searchQuery);

	return (
		<Grid container className={classes.searchBar}>
			<Grid item>
				<Select
					label="Orden"
					onChange={handleOrderChange}
				>
					<MenuItem>Ascendiente</MenuItem>
					<MenuItem>Descendiente</MenuItem>
				</Select>
			</Grid>

			<Grid item xs={8} md={7} className={classes.mr}>
				<NativeInput
					id="admin-products-searchbar"
					placeholder={placeholder || ""}
					startAdornment={FaSearch}
					styles={{
						grow   : 1,
						border : `${theme.spacing(1 / 8)}px solid ${theme.palette.grey[300]}`,
						height : theme.spacing(5),
					}}
					endAdornment={() => (
						loading ? (
							<div>
								<CircularProgress
									size={20}
									thickness={3.7}
									className={classes.loading}
								/>
							</div>
						) : <div />
					)}
					{...inputProps}
				/>
			</Grid>
			<Grid item>
				<span className={classes.orderBy}>Ordenar por</span>
			</Grid>

			{ orderByOptions?.length ? (
				<Grid item>
					<FormControl>
						<Select
							label={label || ""}
							onChange={handleOrderByChange}
						>
							{ orderByOptions.map(([orderByOption, id]) => (
								<MenuItem key={id}>{orderByOption}</MenuItem>
							)) }
						</Select>
					</FormControl>
				</Grid>
			) : (
				<div className={classes.spacer} />
			) }
		</Grid>
	);
};

SearchbarAndFilters.propTypes = {
	label               : PropTypes.string,
	placeholder         : PropTypes.string,
	searchQuery         : PropTypes.func.isRequired,
	orderByOptions      : PropTypes.array.isRequired,
	handleOrderChange   : PropTypes.func.isRequired,
	handleOrderByChange : PropTypes.func.isRequired,
};

SearchbarAndFilters.defaultProps = {
	label          : "",
	placeholder    : "",
	orderByOptions : [],
};

export default SearchbarAndFilters;
