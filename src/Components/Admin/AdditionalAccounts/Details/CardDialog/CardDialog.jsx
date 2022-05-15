
import PropTypes from "prop-types";
import { Zoom }  from "react-reveal";
import {
	Avatar,
	Typography,
} from "@material-ui/core";

// Import Own Components
import StarRating from "~/Components/StarRating";
import useStyles  from "./styles";

const CardDialog = ({
	delegations : {
		handleSubmit,
		registryData,
		data,
	},
}) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Zoom>
				<Avatar
					className={classes.avatar}
					src={`/api/images/users/md/${data.user_id}`}
				/>
			</Zoom>
			<h3>{data.trade_name}</h3>
			<Typography paragraph className={classes.data}>
				{registryData(data.created_at)} <br /> {data.total_active_products} productos en oferta
			</Typography>
			<StarRating rank={data.rating} size={2} />
		</div>
	);
};

CardDialog.propTypes = {
	delegations : PropTypes.object,
};

export default CardDialog;
