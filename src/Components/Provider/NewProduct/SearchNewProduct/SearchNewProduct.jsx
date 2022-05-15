/* eslint-disable camelcase */
import PropTypes     from "prop-types";
import { Zoom }      from "react-reveal";
import { Avatar }    from "@material-ui/core";
import { useRouter } from "next/router";

// Import Own Components
import SearchAndLoadingIcon from "~/Components/Provider/NewProduct/SearchAndLoadingIcon";
import { useRedirectTo }    from "~/Util/Hooks";
import GeneralUserImage     from "~/Components/UserImage/General";
import {
	Typography,
	Searchbar,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import defaultImage from "~/Resources/image_default.png";
import useStyles from "./styles";

const SearchNewProduct = ({ type, providerId }) => {
	const classes    = useStyles();
	const redirectTo = useRedirectTo();
	const router     = useRouter();

	return (
		<div className={classes.searchNewProductContainer}>
			<Typography type="header1">
				Ofertar producto
			</Typography>
			<Searchbar
				url="/api/products/page/1"
				identifier="name"
				onSelect={({ id }) => {
					if (type == "provider") {
						router.push(`/proveedor/productos/detalles/${id}`);
					} else {
						router.prefetch(`/cliente/productos/${providerId}/detalles/${id}`);
					}
				}}
				formatFn={({ name, image }) => (
					<div className={classes.dataDisplay}>
						{ image ? (
							<Zoom>
								<Avatar
									src={image}
								>
									<img className={classes.errorImage} src={defaultImage} alt="Image error" />
								</Avatar>
							</Zoom>
						) : (
							<GeneralUserImage />
						) }
						<span className="name">
							{name}
						</span>
					</div>
				)}
				normalizationFn={({ collection }) => collection}
				inputProps={{
					placeholder  : "Nombre del Producto",
					className    : classes.input,
					endAdornment : loading => <SearchAndLoadingIcon loading={loading} />,
				}}
			/>

			<Typography
				type="header3"
				className="subtitle"
			>
				Sugerir nuevo producto
			</Typography>

			<Typography className="info">
				{"Si no encuentras lo que estás buscando"}
				<br />
				{"Puedes añadirlo desde"}
				{
					type == "employee" ? (
						<Clicker onClick={redirectTo("/employee/add_product")}>
							{"Aquí"}
						</Clicker>
					) : (
						<Clicker onClick={redirectTo("/proveedor/nuevo-producto")}>
							{"Aquí"}
						</Clicker>
					)
				}
			</Typography>
		</div>
	);
};

SearchNewProduct.propTypes = {
	type       : PropTypes.string.isRequired,
	providerId : PropTypes.number.isRequired,
};

export default SearchNewProduct;
