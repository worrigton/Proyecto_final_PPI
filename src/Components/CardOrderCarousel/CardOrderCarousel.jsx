// Import dependencies
import { useMemo } from "react";
import { Grid }    from "@material-ui/core";
import PropTypes   from "prop-types";

// Import Own Components
import { Typography }   from "~/ToolKit";
import CardOrder        from "~/Components/CardOrder";
import MultipleCarousel from "~/Components/MultipleCarousel";
import useStyles        from "./styles";

const CardOrderCarousel = ({
	objetos,
	message,
}) => {
	const classes = useStyles();

	const responsivePropsOrders = useMemo(() => ({
		superLargeDesktop : {
			breakpoint : { max : 4000, min : 3000 },
			items      : 3,
		},
		desktop : {
			breakpoint : { max : 3000, min : 960 },
			items      : 3,
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
		<div className={classes.content}>
			{ message ? (
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
					{ objetos != [] && objetos.map((item) =>
						<Grid
							item
							key={item.id}
						>
							<CardOrder
								id={item.id}
								ago={item.timestamp}
								amount={item.amount}
								product={item.products[0]}
								customerName={item.customer}
								numberOfProducts={item.products.length}
								code={item.code}
							/>
						</Grid>)}
				</MultipleCarousel>
			)}
		</div>
	);
};

CardOrderCarousel.propTypes = {
	objetos : PropTypes.array,
	message : PropTypes.string.isRequired,
};

CardOrderCarousel.defaultProps = {
	objetos : [],
	message : "",
};

export default CardOrderCarousel;
