import React from "react";
import {
	Grid,
	Checkbox,
	MenuItem,
	IconButton,
	Select,
	Hidden,
	Link,
} from "@material-ui/core";


// Import Own Components
import { FaSnowFlake, FaChevronDown } from "~/Resources/icons/far";
import { Typography, Input }          from "~/ToolKit";
import { FaEraser }                   from "~/Resources/icons/fad";
import withStateLoaded                from "~/Store/withStateLoaded";
import {
    capitalize,
    selectAllIfTextIsZero
} from "~/Util";
import {
    Filters as FiltersType,
    Pagination,
} from "~/Components/Products/ProductsStore/store/types";
// import { Button } from "~/ToolKit";
import useStyles from "./styles";

interface Delegations {
	handleChange : (...args: any[]) => void;
	handleCleanFiltersMethod : (...ags: any[]) => void
};

interface Props {
    filters     : FiltersType;
    pagination  : Pagination;
    delegations : Delegations;
};

const Filters: React.FC<Props> = ({
    filters,
    pagination,
    delegations : {
		handleChange,
		handleCleanFiltersMethod,
    },
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
			<Hidden smDown>
				<Grid container direction="column">
					<Grid item>
						<Typography
							type="caption"
							className="caption"
						>
							<b>Categoría</b>
						</Typography>
					</Grid>
					<Grid item>
						<Typography type="header1" className="categoryTitle">
							{ capitalize(filters?.category?.name || "") }
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							type="caption"
							className="caption"
						>
							{`${pagination?.rowCount || 0} resultado${(pagination?.rowCount || 0) === 1 ? "" : "s"}`}
						</Typography>
					</Grid>
					<Grid item>
						{/* @ts-ignore */}
						<Link href="#" 
							className={classes.resetButton}
							onClick={handleCleanFiltersMethod}>
							{/* @ts-ignore */}
							<FaEraser className={classes.resetButtonIcon} />
							<span className={classes.resetButtonText}>Limpiar filtros</span>
						</Link>
					</Grid>
				</Grid>
				<Grid className={classes.gridMargin} container direction="column">
					<Grid item>
						<Typography
							type="header3"
							className="subTitle"
						>
							<b>Ordenar resultados</b>
						</Typography>
					</Grid>
					<Grid
						item
						container
						justify="center"
						alignItems="center"
						className="selectContainer"
					>
						<Grid item xs={10}>
							<Select
								labelId="select-order-by-pagination-products-label"
								id="select-order-by-pagination-products"
								onChange={handleChange}
								name="order_by"
								variant="outlined"
								value={filters.order_by || "name"}
								className="select"
							>
								<MenuItem value="name">Nombre</MenuItem>
								<MenuItem value="category">Categoría</MenuItem>
								<MenuItem value="description">Descripción</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={2}>
							<Checkbox
								onChange={handleChange}
								checked={Boolean(filters.order === "DESC")}
								icon={<FaChevronDown className="orderIcon" />}
								checkedIcon={<FaChevronDown className="orderIcon down" />}
								name="order"
								className="orderIconContainer"
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid className={classes.gridMargin} container direction="column">
					<Grid item>
						<Typography
							type="header3"
							className="subTitle"
						>
							<b>Tipo de Almacenamiento</b>
						</Typography>
					</Grid>
					<Grid item>
						<div className="labelAndController">
							<label>
								Producto Refrigerado
							</label>

							<IconButton
								className="resize"
								onClick={() => handleChange({
									target : {
										name  : "frezee",
										value : filters.frezee,
									},
								})}
							>
								{/* @ts-ignore */}
								<FaSnowFlake
									style={{ height : "1.5rem" }}
									className={filters.frezee ? "blueLike" : ""}
								/>
							</IconButton>
						</div>
					</Grid>
				</Grid>
				<Grid className={classes.gridMargin} container direction="column">
					<Grid item>
						<Typography
							type="header3"
							className="subTitle"
						>
							<b>Descuentos</b>
						</Typography>
					</Grid>
					<Grid item>
						<div className="labelAndController">
							<label>
								Descuento por volumen
							</label>
							<Checkbox
								color="primary"
								name={"volume_discount"}
								onChange={handleChange}
							/>
						</div>
					</Grid>
				</Grid>
				<Grid className={classes.gridMargin} container direction="column">
					<Grid item>
						<Typography
							type="header3"
							className="subTitle"
						>
							<b>Precio</b>
						</Typography>
					</Grid>
					<Grid item container>
						<Grid item xs={4}>
							<Input
								label="* Mínimo"
								id="min"
								variant="outlined"
								name="min_price"
								max={filters.max_price}
								value={filters.min_price}
								onChange={handleChange}
								onFocus={selectAllIfTextIsZero}
							/>
						</Grid>
						<Grid container justify="center" alignItems="center" item xs={2}>
							-
						</Grid>
						<Grid item xs={4}>
							<Input
								label="* Máximo"
								id="max"
								min={filters.min_price}
								variant="outlined"
								name="max_price"
								value={filters.max_price}
								onChange={handleChange}
								onFocus={selectAllIfTextIsZero}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Hidden>
			<Hidden mdUp>
				<Grid container className={classes.filtersMobileContainer}>
					<Grid item xs={12}>
						<Typography
							type="caption"
							className="caption"
						>
							<b>Categoría</b>
						</Typography>
					</Grid>
					<Grid item container justify="space-between" xs={12}>
						<Grid item xs={7}>
							<Typography type="header1" className="categoryTitle">
								{ capitalize(filters?.category?.name || "") }
							</Typography>
						</Grid>
						<Grid item xs={5} container direction="row" justify="flex-end">
							<Typography
								type="caption"
								className={`caption ${classes.resultsLabel}`}
							>
								{`${pagination?.rowCount || 0} resultado${(pagination?.rowCount || 0) === 1 ? "" : "s"}`}
							</Typography>
						</Grid>
					</Grid>
					<Grid className={classes.gridMargin} container direction="column">
					<Grid item>
						<Typography
							type="header3"
							className="subTitle"
						>
							<b>Ordenar resultados</b>
						</Typography>
					</Grid>
					<Grid
						item
						container
						justify="center"
						alignItems="center"
						className="selectContainerMobile"
					>
						<Grid item xs={10}>
							<Select
								labelId="select-order-by-pagination-products-label"
								id="select-order-by-pagination-products"
								onChange={handleChange}
								name="order_by"
								variant="outlined"
								value={filters.order_by || "name"}
								className="select"
							>
								<MenuItem value="name">Nombre</MenuItem>
								<MenuItem value="category">Categoría</MenuItem>
								<MenuItem value="description">Descripción</MenuItem>
							</Select>
						</Grid>
						<Grid item xs={2}>
							<Checkbox
								onChange={handleChange}
								checked={Boolean(filters.order === "DESC")}
								icon={<FaChevronDown className="orderIcon" />}
								checkedIcon={<FaChevronDown className="orderIcon down" />}
								name="order"
								className="orderIconContainer"
							/>
						</Grid>
					</Grid>
				</Grid>
				</Grid>
			</Hidden>
        </div>
    );
};

const mapStateToProps = ({
    productsReducer : {
        filters,
        pagination,
    },
}) => ({
    filters,
    pagination,
});

export default withStateLoaded<{ delegations : Delegations }>(mapStateToProps, null)(Filters);
