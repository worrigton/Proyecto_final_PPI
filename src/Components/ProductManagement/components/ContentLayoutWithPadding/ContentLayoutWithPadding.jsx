import { memo }  from "react";
import PropTypes from "prop-types";

// Import Own Components
import ContentLayout from "~/Components/ContentLayout/ContentLayout";
import useStyles     from "./styles";

const ContentLayoutWithPadding = ({ children, ...rest }) => {
	const classes = useStyles();

	return (
		<ContentLayout {...rest}>
			<div className={classes.pad}>
				{children}
			</div>
		</ContentLayout>
	);
};

ContentLayoutWithPadding.propTypes = {
	children : PropTypes.any.isRequired,
};

export default memo(ContentLayoutWithPadding);
