/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import PropTypes                  from "prop-types";
import { useRouter }              from "next/router";

// Import Own Components
import withStateLoaded from "~/Store/withStateLoaded";
import Service         from "~/Service";
import CardDialog      from "./CardDialog";

const CardDialogContainer = ({
	setActions,
	done,
	data,
	disable,
}) => {
	const router  = useRouter();

	const handleSubmit = useCallback(() => {
		( async () => {
			disable(true);
			const response = data.type == "add" ?
				await Service.api.employee.addProvider(data.employee, data.id) :
				await Service.api.employee.deleteProvider(data.employee, data.id);
			if (response.status) {
				router.reload();
			}
			done();
		})();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [done]);

	const registryData = useCallback((param) => {
		const date = new Date(param);
		const options = {
			year  : "numeric",
			month : "long",
			day   : "numeric",
		};
		return date.toLocaleDateString("es-ES", options);
	}, []);

	useEffect(() => {
		setActions({
			okClick : handleSubmit,
		});
	}, [handleSubmit]);

	return (
		<CardDialog delegations={{
			handleSubmit,
			registryData,
			data,
		}} />
	);
};

CardDialogContainer.propTypes = {
	setActions : PropTypes.func,
	done       : PropTypes.func,
	data       : PropTypes.any,
	disable    : PropTypes.func,
};

const mapStateToProps = ({ dialogReducer : { data } }) => ({ data });

export default withStateLoaded(mapStateToProps, null)(CardDialogContainer);
