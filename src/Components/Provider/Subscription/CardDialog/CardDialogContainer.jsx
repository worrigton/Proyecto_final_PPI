/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	useCallback,
	useEffect,
	useState,
	forwardRef,
} from "react";
import Slide     from "@material-ui/core/Slide";
import PropTypes from "prop-types";

// Import Own Components
import Service    from "~/Service";
import CardDialog from "./CardDialog";

const CardDialogContainer = ({
	membership,
	token,
	delegations : {
		alertActions,
	},
}) => {
	const [subscriptions, setSubscriptions] = useState([]);
	const [open, setOpen]                   = useState(false);
	const [submit, setSubmit]               = useState(false);
	const [selectSubs, setSelectSubs]       = useState("");

	const Transition = useCallback(forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	  }), []);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
		setSubmit(true);
	}, []);

	const handleSubmit = useCallback((event) => {
		( async () => {
			setSubmit(false);
			setOpen(false);
			const qs = {
				provider_id         : membership.provider_id,
				new_subscription_id : selectSubs,
			};
			const response = await Service.api.provider.changeSubscription(qs, token);
			if (response.status) {
				alertActions.openAlert({
					message : `Cambiaste la subscripción con éxito, la subscripción 
					 se actualizara hasta tu siguiente factura`,
					type     : "success",
					duration : 4000,
				});
			} else {
				alertActions.openAlert({
					message  : "Ups! hubo un error al registrar la información, inténtalo más tarde",
					type     : "warning",
					duration : 3000,
				});
			}
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectSubs]);

	const selectSubscription = useCallback(id => () => {
		setSubmit(true),
		setSelectSubs(id);
	}, []);

	useEffect(() => {
		(async () => {
			const { collection : subs } = await Service.api.getSubscriptions();
			setSubscriptions({ subs });
		})();
	}, []);

	return (
		<CardDialog delegations={{
			data : subscriptions,
			Transition,
			open,
			membership,
			selectSubs,
			submit,
			selectSubscription,
			handleSubmit,
			handleClickOpen,
			handleClose,
		}} />
	);
};

CardDialogContainer.propTypes = {
	membership  : PropTypes.any,
	token       : PropTypes.any,
	delegations : PropTypes.object,
};

export default CardDialogContainer;
