// Import dependencies
import { useMemo } from "react";
import Fade        from "react-reveal/Fade";

// Import Own Components
import Parallax         from "~/Components/Parallax";
import banner1          from "~/Resources/banners/banner1.jpg";
import banner2          from "~/Resources/banners/banner2.jpg";
import banner3          from "~/Resources/banners/banner3.jpg";
import banner4          from "~/Resources/banners/banner4.jpg";
import banner5          from "~/Resources/banners/banner5.jpg";
import banner6          from "~/Resources/banners/banner6.jpg";
import MultipleCarousel from "~/Components/MultipleCarousel";
import useStyles        from "./styles";

const BannerProducts = () => {
	const classes         = useStyles();
	const responsiveProps = useMemo(() => ({
		desktop : {
			breakpoint : { max : 3000, min : 960 },
			items      : 1,
		},
		tablet : {
			breakpoint : { max : 960, min : 600 },
			items      : 1,
		},
		mobile : {
			breakpoint : { max : 600, min : 0 },
			items      : 1,
		},
	}), []);

	const imagenes = [
		banner1,
		banner2,
		banner3,
		banner4,
		banner5,
		banner6,
	];


	return (
		<div className={classes.bannerContainer}>
			<Fade clear delay={10}>
				<MultipleCarousel
					settingsProps={{
						showDots : true,
						infinite : true,
					}}
					responsiveProps={responsiveProps}
				>
					{
						imagenes != [] && imagenes.map((item, id) =>
							<Parallax
								key={id}
								title=""
								subtitle=""
								height="250px"
								background={item}
								color={false}
							/>
						)
					}
				</MultipleCarousel>
			</Fade>
		</div>
	);
};

export default BannerProducts;
