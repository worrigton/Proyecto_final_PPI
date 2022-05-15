import { useContext } from "react";
import PropTypes      from "prop-types";
import { Divider }    from "@material-ui/core";

// Import Own Components
import BackButton               from "~/Components/BackButton";
import ContentLayoutWithPadding from "./components/ContentLayoutWithPadding";
import AddImage                 from "./components/AddImage";
import Features                 from "./components/Features";
import ProductImage             from "./components/ProductImage";
import SelectCategory           from "./components/SelectCategory";
import ProductManagementContext from "./context";
import {
	Input,
	Button,
} from "~/ToolKit";
import useStyles from "./styles";

const ProductManagement = ({ backButton, mode }) => {
	const classes = useStyles();
	const {
		data,
		changed,
		desactivated,
		handleSubmit,
		handleChange,
		handleReject,
		handleApprove,
	} = useContext(ProductManagementContext);
	return (
		<div className={classes.limitContent}>
			<BackButton {...backButton} />

			<ContentLayoutWithPadding
				title="Detalles del producto"
				description={`
					Asegúrate de utilizar un nombre lo suficientemente descriptivo que
					hable de las características más relevantes de tu producto. Utiliza
					la descripción para añadir detalles de carácter específico.
				`}
			>
				<Input
					id="name"
					label="Nombre"
					variant="outlined"
					value={data.name}
					onChange={e => handleChange("name", e?.target?.value)}
				/>

				<label htmlFor="admin-product-description">Descripción</label>
				<textarea
					id="admin-product-description"
					className={classes.textarea}
					value={data.description}
					onChange={e => handleChange("description", e?.target?.value)}
				/>
			</ContentLayoutWithPadding>

			<Divider />

			<ContentLayoutWithPadding
				title="Categoría"
				description={`
					La categoría del producto ayuda a organizar mejor tu producto para
					presentarlo a los clientes correctos en el momento preciso.
				`}
			>
				<SelectCategory />
			</ContentLayoutWithPadding>

			<Divider />

			<ContentLayoutWithPadding
				title="Características"
				description={`
					Los rasgos forman parte de la ficha técnica del producto.
					Describe de manera directa las características cualitativas y cuantitativas
					de un producto.
				`}
			>
				<Features />
			</ContentLayoutWithPadding>

			<Divider />

			<ContentLayoutWithPadding
				title="Imágenes"
				description={`
					Utiliza imágenes con fondo blanco que permitan apreciar las careacterísticas del
					producto. Asegúrate de que las imágenes pertenezcan específicamente a la variedad
					quer quieres publicar.
				`}
			>
				<div className={classes.images}>
					{ data?.images?.length < 5 && (
						<AddImage />
					)}

					{ data?.images?.map(({ src }, id) => (
						<ProductImage
							src={src}
							key={id}
							position={id}
						/>
					)) }
				</div>
			</ContentLayoutWithPadding>

			<Divider />

			<div className={classes.actions}>
				<div className="spacer" />
				{
					mode == "edit" && data.status == "REVIEW" && (
						<Button
							color="warning"
							disabled={desactivated}
							onClick={handleReject}
							className={classes.btnMargin}
						>
							Rechazar
						</Button>
					)
				}
				{
					mode === "edit" && !changed && (
						<Button
							color="primary"
							disabled={desactivated}
							onClick={handleApprove}
							className={classes.btnMargin}
						>
							Aprobar
						</Button>
					)
				}
				{
					mode === "edit" && changed && (
						<Button
							color="primary"
							disabled={desactivated}
							onClick={handleSubmit}
							className={classes.btnMargin}
						>
							Editar y aprobar
						</Button>
					)
				}
				{
					mode === "create"  && (
						<Button
							color="primary"
							disabled={desactivated}
							onClick={handleSubmit}
							className={classes.btnMargin}
						>
							Guardar
						</Button>
					)
				}
			</div>
		</div>
	);
};

ProductManagement.propTypes = {
	backButton : PropTypes.shape({
		prefetch   : PropTypes.bool,
		redirectTo : PropTypes.string.isRequired,
		text       : PropTypes.string.isRequired,
		title      : PropTypes.string.isRequired,
	}).isRequired,
	mode : PropTypes.oneOf(["edit", "create"]),
};

ProductManagement.defaultProps = {
	mode : "add",
};

export default ProductManagement;
