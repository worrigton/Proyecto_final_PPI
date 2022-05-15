import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
	primary : {
		backgroundColor : "#70cb75",
	},
	secondary : {
		width  : "100%",
		height : "100%",

		clipPath : "polygon(0 0, 10% 0, 70% 100%, 0% 100%)",

		backgroundColor : "#e5e54b",
	},
});

export default useStyles;
