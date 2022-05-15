import PropTypes from "prop-types";

// Import Own Components
import { FaPlus }                         from "~/Resources/icons/fal";
import { ButtonWithoutStyles as Clicker } from "~/ToolKit";
import useStyles                          from "./styles";

const AddImage = ({ uploadFile, size, text }) => {
	const classes = useStyles(size);

	return (
		<Clicker onClick={uploadFile}>
			<div className={classes.root}>
				<FaPlus
					style={{
						height : "1.5em",
						width  : "1.5em",
					}}
				/>

				{ text && (
					<span>
						{text}
					</span>
				) }
			</div>
		</Clicker>
	);
};

AddImage.propTypes = {
	uploadFile : PropTypes.func.isRequired,
	size       : PropTypes.number,
	text       : PropTypes.string,
};

AddImage.defaultProps = {
	size : 1,
	text : "Agregar imagen",
};

export default AddImage;
