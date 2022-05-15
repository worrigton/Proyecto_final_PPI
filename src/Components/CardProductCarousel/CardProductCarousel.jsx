// Import dependencies
import { useMemo } from "react";
import { Grid }    from "@material-ui/core";
import PropTypes   from "prop-types";

// Import Own Components
import { Typography }   from "~/ToolKit";
import CardProduct      from "~/Components/CardProduct";
import MultipleCarousel from "~/Components/MultipleCarousel";
import useStyles        from "./styles";

const CardProductCarousel = ({
	objetos,
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
							<CardProduct
								nameProduct={item.name}
								price={item.cheaper_product}
								image={item.image}
								id={item.id}
								variant=""
								elevation={0}
								imageBorder
								label={item.label}
								otherClass={item.otherClass}
							/>
						</Grid>)}
				</MultipleCarousel>
			)}
		</div>
	);
};

CardProductCarousel.propTypes = {
	objetos : PropTypes.array,
	message : PropTypes.string.isRequired,
};

CardProductCarousel.defaultProps = {
	objetos : [],
	message : "No hay objetos para mostrar en esta categoría",
};

export default CardProductCarousel;
