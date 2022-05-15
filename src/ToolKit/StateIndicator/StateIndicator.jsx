/* eslint-disable react/prop-types */
import {
	useMemo,
	memo,
} from "react";
import PropTypes from "prop-types";
import { Chip }  from "@material-ui/core";

// Import Own Components
import {
	FaCheck,
	FaCircle,
} from "~/Resources/icons/far";
import useStyles from "./styles";

const composeChip = (label, type, icon) => memo(({ classes, className, ...rest }) => (
	<Chip
		className={`${classes[type]} ${className} ${classes.flag}`}
		size="small"
		icon={icon}
		label={label}
		{...rest}
	/>
));

const Finalized       = composeChip("Pago realizado", "finalized", <FaCircle />);
const NewProduct      = composeChip("Nuevo Producto", "newProduct", <FaCircle />);
const Delivered       = composeChip("Entregado", "delivered", <FaCheck />);
const Pending         = composeChip("Pago pendiente", "pending", <FaCircle />);
const NotReady        = composeChip("No preparado", "notReady", <FaCircle />);
const SuggestedChange = composeChip("Cambio sugerido", "suggestedChange", <FaCircle />);
const RevisionPending = composeChip("Revisión pendiente", "revisionPending", <FaCircle />);

const StateIndicator = ({ type, ...rest }) => {
	const classes = useStyles();

	const ComponentToRender = useMemo(() => {
		switch (type?.toLowerCase()) {
			case "finalized":
				return Finalized;
			case "new_product":
				return NewProduct;
			case "delivered":
				return Delivered;
			case "pending":
				return Pending;
			case "not_ready":
				return NotReady;
			case "suggested_change":
				return SuggestedChange;
			case "revision_pending":
				return RevisionPending;
			default:
				return composeChip("", "", <FaCircle />);
		}
	}, [type]);

	return (
		<ComponentToRender
			classes={classes}
			{...rest}
		/>
	);
};

StateIndicator.propTypes = {
	type : PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default StateIndicator;
