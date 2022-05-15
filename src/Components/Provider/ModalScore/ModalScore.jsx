/* eslint-disable camelcase */
import { Grid, Avatar }   from "@material-ui/core";
import Rating             from "@material-ui/lab/Rating";
import { PropTypes }      from "prop-types";

//Import own components
import useStyles          from "./styles";
import { Typography }     from "~/ToolKit";
import { longFormatDate } from "~/Util/formatDate";

const ModalScore = ({ delegations: { rating, handleChangeValue, orderData, customer } }) => {
	const classes = useStyles();
	return (
		<Grid container>
			<Grid
				item xs={12}
				className={classes.root}
				container
				justify="center"
				alignItems="center"
				direction="column">
				<Grid>
					<Avatar alt="Remy Sharp" src={`${customer?.images?.md}`} />
				</Grid>
				<Typography type="header2" className={classes.textCenter}>
					{
						`${customer?.trade_name}`
					}
				</Typography>
				<Typography type="subtitle">{`${customer.total_active_products} productos ofertados`}</Typography>
				<Typography type="subtitle">{`Miembro desde ${longFormatDate(customer?.user?.created_at)}`}</Typography>
				<Rating
					name="simple-controlled"
					value={rating}
					onChange={handleChangeValue}
					size="large"
				/>
			</Grid>
		</Grid>
	);
};

ModalScore.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default ModalScore;
