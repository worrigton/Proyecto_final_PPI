import PropTypes from "prop-types";
import {
	Paper,
	IconButton,
} from "@material-ui/core";

// Import Own Components
import TableTabs                  from "~/ToolKit/Table/TableTabs/TableTabs.jsx";
import { FaStar as FullStar }     from "~/Resources/icons/fas";
import { FaStar as OutlinedStar } from "~/Resources/icons/far";
import { isValidArray }           from "~/Util";
import {
	Typography,
	GalleryCarousel,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";
import useStyles from "./styles";

const ProductInfo = ({
	tabs,
	value,
	handleTabChange,
	productName,
	images,
	handleLikedOrDisliked,
	liked,
	description,
	features,
	handleOpenNewSuggestion,
}) => {
	const classes = useStyles();

	return (
		<Paper className={classes.productInfo}>
			<div className="productTitle">
				<div className="nameAndSuggestion">
					<Typography
						type="header1"
						className="productName"
					>
						{productName}
					</Typography>

					<Clicker className={classes.suggestButton} onClick={handleOpenNewSuggestion}>
						Sugerir cambio
					</Clicker>
				</div>

				<IconButton
					className= {classes.favoriteButton}
					onClick={handleLikedOrDisliked}
				>
					<div>
						{ liked ? (
							<FullStar size={2} />
						) : (
							<OutlinedStar size={2} />
						) }
					</div>
				</IconButton>
			</div>

			<div className="imagesContainer">
				{ isValidArray(images) && (
					<GalleryCarousel images={images} />
				) }
			</div>
			<div className="productDataInTabs">
				<TableTabs
					tabs={tabs}
					value={value}
					handleTabChange={handleTabChange}
				/>

				<Typography className="productData">
					{ value === 0 && description }

					{ value === 1 && (
						isValidArray(features) && features.map(({ name, label }) => (
							<>
								<Typography type="Header3" className={classes.bold}>
									{name}
								</Typography>
								<Typography type="Header4">
									{label}
								</Typography>
								<br />
							</>
						))
					) }
				</Typography>
			</div>
		</Paper>
	);
};

ProductInfo.propTypes = {
	tabs                    : PropTypes.array.isRequired,
	value                   : PropTypes.number.isRequired,
	handleTabChange         : PropTypes.func.isRequired,
	productName             : PropTypes.string.isRequired,
	images                  : PropTypes.array.isRequired,
	handleLikedOrDisliked   : PropTypes.func.isRequired,
	liked                   : PropTypes.bool.isRequired,
	description             : PropTypes.string.isRequired,
	features                : PropTypes.array.isRequired,
	handleOpenNewSuggestion : PropTypes.func.isRequired,
};

export default ProductInfo;
