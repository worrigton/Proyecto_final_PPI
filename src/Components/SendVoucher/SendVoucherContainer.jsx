/* eslint-disable camelcase */
import {
	useState,
	useCallback,
	useEffect,
} from "react";
import { PropTypes } from "prop-types";
import { useRouter } from "next/router";

import saleOrderMethods from "~/Service/saleOrders";
import withStateLoaded  from "~/Store/withStateLoaded";
import { bindAll }      from "~/Util";
import AlertActions     from "~/Components/Alert/store/actions";
import SendVoucher      from "./SendVoucher";

const SendVoucherContainer = ({ data, alertActions, setActions }) => {
	const router                          = useRouter();
	const [preview, setPreview]           = useState();
	const [selectedFile, setSelectedFile] = useState();
	useEffect(() => {
		setActions({
			okClick : sendVoucher,
		});
	}, [sendVoucher, setActions, preview, selectedFile]);

	const sendVoucher = useCallback(async () => {
		const fileData = {
			file_type : data.type,
			file      : selectedFile,
			id        : data.id,
		};
		try {
			const response = await saleOrderMethods.updloadFileToSaleOrder(fileData);
			if (response.ok) {
				alertActions.openAlert({
					message  : "Registro exitoso",
					type     : "success",
					duration : 3000,
				});
				router.reload();
			}
		} catch (error) {
			alertActions.openAlert({
				message  : "Error al cargar el comprobante",
				type     : "warning",
				duration : 3000,
			});
		}
	}, [alertActions, data.id, data.type, router, selectedFile]);

	const changeFile = useCallback((event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			if (file.type === "image/jpeg" || file.type === "image/png") {
				setPreview(event.target.result);
			} else {
				setPreview("https://cdn3.iconfinder.com/data/icons/line-icons-set/128/1-02-512.png");
			}
			setSelectedFile(event.target.result);
		};
		reader.readAsDataURL(event.target.files[0]);
	}, [setSelectedFile, setPreview]);

	return (
		<SendVoucher {...{ data, changeFile, preview, selectedFile }} />
	);
};

SendVoucherContainer.propTypes = {
	setActions   : PropTypes.func.isRequired,
	data         : PropTypes.object.isRequired,
	alertActions : PropTypes.object.isRequired,
};

const mapStateToProps = ({ dialogReducer : { data } }) => ({ data });
const mapDispatchToProps = bindAll({ AlertActions });

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(SendVoucherContainer);
