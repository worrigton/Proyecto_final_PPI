import PropTypes       from "prop-types";
import { useMemo }     from "react";
import { Paper, Grid } from "@material-ui/core";

import {
	Typography,
	ButtonWithoutStyles as FlatButton,
} from "~/ToolKit";
import MultipleCarousel from "~/Components/MultipleCarousel";
import useStyles        from "./styles";

const OtherSellers = ({ delegations : { data, selectedProvider, providerChange } }) => {
	const classes = useStyles();
	const responsiveProps = useMemo(() => ({
		desktop : {
			breakpoint : { max : 3000, min : 960 },
			items      : 4,
		},
		tablet : {
			breakpoint : { max : 960, min : 600 },
			items      : 2,
		},
		mobile : {
			breakpoint : { max : 600, min : 0 },
			items      : 1,
		},
	}), []);

	return (
		<Paper elevation={0} className={classes.paddingGrid}>
			<Grid item xs={12}>
				<Typography className={classes.OtherSellers} type="header4" fontWeight="bold">
					Otros vendedores
				</Typography>
			</Grid>
			{
				<MultipleCarousel
					settingsProps={{
						showDots   : false,
						arrows     : true,
						infinite   : true,
						centerMode : false,
					}}
					responsiveProps={responsiveProps}
					className={classes.carousel}
				>
					{
						Object.keys(data.providers).map(providerId => (
							<FlatButton key={providerId} onClick={() => providerChange(providerId)}>
								<div className={
									`${classes.OtherSellersContainer}
									${selectedProvider.provider_id == providerId ? classes.SelectedProvider : ""}`
								}>
									<Typography
										type="body2"
										fontWeight={700}
									>
										{data.providers[providerId].provider_info.name}
									</Typography>
									<Typography type="body2">Desde</Typography>
									<Typography
										type="header3"
										className={classes.price}
									>
										${data.providers[providerId].provider_info.cheaper_product} / Kg
									</Typography>
								</div>
							</FlatButton>
						))
					}
				</MultipleCarousel>
			}
			<style jsx global>{`
				li {
					text-align: center
				}
				.react-multiple-carousel__arrow--left {
					left : 1px;
				}
				.react-multiple-carousel__arrow--right {
					right : 1px;
				}
			`} </style>
		</Paper>
	);
};

OtherSellers.propTypes = {
	delegations : PropTypes.object.isRequired,
};

export default OtherSellers;
