import { useMemo, memo }               from "react";
import { Typography as MuiTypography } from "@material-ui/core";

// Import Own Components
import useStyles from "./styles";

const Title = memo(props => (
	<MuiTypography
		component="h1"
		{...props}
	/>
));

const Header1 = memo(props => (
	<MuiTypography
		variant="h4"
		component="h2"
		{...props}
	/>
));

const Header2 = memo(props => (
	<MuiTypography
		variant="h5"
		component="h3"
		{...props}
	/>
));

const Header3 = memo(props => (
	<MuiTypography
		component="h3"
		{...props}
	/>
));

const Header4 = memo(props => (
	<MuiTypography
		variant="subtitle1"
		component="h4"
		{...props}
	/>
));
const Body2 = memo(props => (
	<MuiTypography
		variant="body2"
		{...props}
	/>
));

const Caption = memo(props => (
	<MuiTypography
		variant="caption"
		{...props}
	/>
));

const Paragraph = memo(props => (
	<MuiTypography
		paragraph
		{...props}
	/>
));

interface Props {
	type       ?: string;
	fontWeight ?: string;
	className  ?: string;
	color      ?: string;
};

const Typography: React.FC<Props> = ({
	type       = "",
	fontWeight = "",
	className  = "",
	color      = "default",
	...rest
}) => {
	const classes = useStyles({ fontWeight, color });

	const ComponentToRender = useMemo(() => {
		switch (type.toLowerCase()) {
			case "title":
				return Title;
			case "header1":
				return Header1;
			case "header2":
				return Header2;
			case "header3":
				return Header3;
			case "header4":
				return Header4;
			case "caption":
				return Caption;
			case "body2":
				return Body2;
			case "paragraph":
				return Paragraph;
			default:
				return MuiTypography;
		}
	}, [type]);

	return (
		<ComponentToRender
			className={`${classes[type] || ""} ${classes.textColor} ${className}`}
			{...rest}
		/>
	);
};

export default Typography;
