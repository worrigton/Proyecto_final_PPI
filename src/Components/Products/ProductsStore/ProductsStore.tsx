/* eslint-disable camelcase */
import {
	Grid,
	TablePagination,
	Container,
} from "@material-ui/core";

// Import Own Components
import CustomerLayout           from "~/Components/Customer/CustomerLayout";
import CardProduct              from "~/Components/CardProduct";
import withStateLoaded          from "~/Store/withStateLoaded";
import { isValidArray }         from "~/Util";
import Filters                  from "./Filters";
import ProductsEmpty            from "./ProductsEmpty";
import { Products, Pagination } from "./store/types";
import {
	PageChangeEvent,
	RowsPerPageChangeEvent
} from "./types";
import useStyles from "./styles";

interface Delegations {
	rowsPerPageOptions      : number[];
	handleChangePage        : PageChangeEvent;
	handleChangeRowsPerPage : RowsPerPageChangeEvent;
};

interface Props {
	products    : Products;
	pagination  : Pagination;
	delegations : Delegations;
};

const ProductsStore: React.FC<Props> = ({
	products,
	pagination,
	delegations : {
		rowsPerPageOptions,
		handleChangePage,
		handleChangeRowsPerPage,
	}
}) => {
	const classes = useStyles();

	return (
		<CustomerLayout>
			<div className={classes.productStoreContainer}>
				<Grid
					container
					direction="row"
					justify="center"
				>
					<Grid
						item xs={12}
						md={3}
						container
						direction="row"
						justify="flex-start"
					>
						<Filters />
					</Grid>
					<Grid
						container
						item
						justify="center"
						xs={12}
						md={9}
						spacing={1}
					>
						{ isValidArray(products) ? (
							products.map(product => (
								<Grid
									item
									xs={6}
									sm={6}
									md={4}
									key={product.id}
								>
									<CardProduct
										id={product.id}
										nameProduct={product.name}
										price={product.cheaper_product}
										image={product.image}
									/>
								</Grid>
							))
						) : (
							<ProductsEmpty />
						) }
						<Grid item container justify="center">
							{ isValidArray(products) && (
								<TablePagination
									className={classes.pagination}
									component="div"
									count={pagination.rowCount}
									page={pagination.page - 1}
									rowsPerPage={pagination.pageSize}
									rowsPerPageOptions={rowsPerPageOptions}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							) }
						</Grid>
					</Grid>
				</Grid>
			</div>
		</CustomerLayout>
	);
};

const mapStateToProps = ({ productsReducer : { products, pagination } }) => ({ products, pagination });

export default withStateLoaded<{ delegations : Delegations }>(mapStateToProps, null)(ProductsStore);
