// Import dependencies
import { useMemo } from "react";
import { Grid }    from "@material-ui/core";
import PropTypes   from "prop-types";

// Import Own Components
import { Typography }    from "~/ToolKit";
import CardPausedProduct from "~/Components/CardPausedProduct";
import MultipleCarousel  from "~/Components/MultipleCarousel";
import useStyles         from "./styles";

const CardPausedProductCarousel = ({
	delegations : {
		objetos,
		setOpen,
		setProductAct,
		open,
	},
	message,
}) => {
	const classes = useStyles();

	const responsivePropsOrders = useMemo(() => ({
		superLargeDesktop : {
			breakpoint : { max : 4000, min : 3000 },
			items      : 4,
		},
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
			items      : 2,
		},
	}), []);

	return (
		<div className={classes.content}>
			{message ? (
				<div className={classes.message}>
					<Typography
						type="header5"
						fontWeight="bold"
					>
						{message}
					</Typography>
				</div>
			) : (
				<MultipleCarousel
					settingsProps={{
						infinite      : true,
						autoPlaySpeed : "3000",
					}}
					responsiveProps={responsivePropsOrders}
				>
					{objetos && objetos != [] && objetos.map((item) =>
						<Grid
							item
							key={item.id}
						>
							<CardPausedProduct
								nameProduct={item.name}
								image={item.image}
								id={item.id}
								delegations = {{
									setOpen,
									setProductAct,
									open,
								}}
							/>
						</Grid>)}
				</MultipleCarousel>
			)}
		</div>
	);
};

CardPausedProductCarousel.propTypes = {
	delegations : PropTypes.object,
	message     : PropTypes.string,
};

CardPausedProductCarousel.defaultProps = {
	message : "",
};

export default CardPausedProductCarousel;
