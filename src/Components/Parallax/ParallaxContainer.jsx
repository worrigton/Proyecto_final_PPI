import { useCallback } from "react";
import PropTypes       from "prop-types";
import { useRouter }   from "next/router";

// Import Own Components
import Parallax from "./Parallax";

const ParallaxBannerContainer = ({ url, ...rest }) => {
	const router = useRouter();

	const handle = useCallback(() => {
		router.push(url);
	}, [router, url]);

	return (
		<Parallax
			delegations={{
				handle,
			}}
			{...rest}
		/>
	);
};

ParallaxBannerContainer.propTypes = {
	url : PropTypes.string,
};

ParallaxBannerContainer.defaultProps = {
	url : "/",
};

export default ParallaxBannerContainer;
