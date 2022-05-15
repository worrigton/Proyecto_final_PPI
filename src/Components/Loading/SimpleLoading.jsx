import { memo }             from "react";
import { CircularProgress } from "@material-ui/core";

// Import Own Components
import useStyles from "./styles";

const SimpleLoading = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress />
		</div>
	);
};

export default memo(SimpleLoading);
