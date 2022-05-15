import {
	useState,
	useEffect,
	useCallback,
	forwardRef,
} from "react";
import {
	Dialog,
	ListItemText,
	ListItem,
	List,
	AppBar,
	Toolbar,
	Slide,
	Hidden,
	Menu,
	ListItemAvatar,
} from "@material-ui/core";
import { connect }   from "react-redux";
import { useRouter } from "next/router";
import PropTypes     from "prop-types";
import _             from "lodash";

// Import Own Components
import {
	Typography,
	Badge,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";

import { FaBell }  from "~/Resources/icons/fal";
import { FaTimes } from "~/Resources/icons/far";
import Service     from "~/Service";
import useStyles   from "./styles";

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});useCallback;


const Notifications = ( { customer } ) => {
	const classes = useStyles();
	const router  = useRouter();

	const [open, setOpen]                         = useState(false);
	const [anchorEl, setAnchorEl]                 = useState(null);
	const [numNotification, setNumNotification]   = useState(0);
	const [notificationList, setNotificationList] = useState(null);

	useEffect(() => {
		(async () => {
			const { body : { collection } } = await Service.api.customer.getOrder(
				1,
				`customer_id=${customer.customer.id}&notification=${true}&page_size=50`,
				customer.token
			);
			if (collection) {
				setNotificationList(collection);
				setNumNotification(collection.length);
			}
		})();
	}, [customer, numNotification, router]);

	const handleClickOpen = useCallback((event) => {
		setOpen(true);
		setAnchorEl(event.currentTarget);
	}, []);

	const handleClose = useCallback(() => {
		setOpen(false);
		setAnchorEl(null);
	}, []);

	const typeNotification = useCallback((param) => {
		let title   = "";
		let message = "";

		switch (param?.status) {
			case "REQUESTED":
				if (param.shipping_status === "NOT_READY" &&
						!_.includes(param.flags), "PAID" &&
						!param.voucher_id
				) {
					title   = "Haz hecho un nuevo pedido";
					message = "Tu pago aun esta pendiente";
				}
				else if ((param.shipping_status === "NOT_READY") &&
					!_.includes(param.flags), "PAID" &&
					param.voucher_id
				) {
					title   = "Aprobando el pago";
					message = "El proveedor tendrá que aprobar el pago de tu pedido";
				}
				else if (param.shipping_status === "READY" &&
					!_.includes(param.flags), "PAID" &&
					param.voucher_id
				) {
					title   = "Pedido preparado";
					message = "El proveedor marco tu pedido como listo para su entrega";
				}
				else if (_.includes(param.flags, "PAID")) {
					title   = "Pago aprobado";
					message = "El pedido que realizaste ha sido aprobado";
				}
				break;
			case "RETUNNING":
				title   = "Pago no aprobado";
				message = "Tu pedido no fue aprobado por el proveedor";
				break;
			case "RUNNING":
				title   = "Pedido enviado";
				message = "Tu pedido esta en camino";
				break;
			case "FINISHED":
				title   = "Pedido finalizado";
				message = "Tu pedido ha sido finalizado";
				break;
			case "CANCELED":
				title   = "Pedido Cancelado";
				message = "Tu pedido ha sido cancelado por el proveedor";
				break;
			case "DECLINED":
				title   = "Pedido Cancelado";
				message = "Haz cancelado tu pedido";
				break;
			default:
				break;
		}
		return <>
			<Typography
				type="body2"
				fontWeight="600"
			>
				{title}
			</Typography>
			<Typography type="caption" style={{ lineHeight : 1 }}>
				{ message }
			</Typography>
		</>;
	}, []);

	return (
		<div>
			<Clicker onClick={handleClickOpen} className={classes.clicker}>
				<Badge
					numNotification={numNotification}
					max={99}
					icon={
						<FaBell className={!open ? classes.Icon : classes.Icon2} />
					}
				/>
			</Clicker>
			<Hidden mdUp>
				<Dialog
					disableScrollLock={true}
					fullScreen open={open}
					onClose={handleClose}
					TransitionComponent={Transition}
				>
					<AppBar position="fixed" className={classes.appBar}>
						<Toolbar className={classes.toolbar}>
							<Clicker onClick={handleClose} aria-label="close">
								<FaTimes className={classes.Icon} />
							</Clicker>
							<Typography type="header3" color="white" className={classes.title}>
								Notificaciones <FaBell className={classes.Icon} />
							</Typography>
						</Toolbar>
					</AppBar>
					<List className={classes.menu2}>
						{ numNotification > 0 ? (
							notificationList.map((item) => (
								<ListItem
									button
									key={item.id}
									onClick={
										// eslint-disable-next-line max-len
										() => router.push(`/customer/orders/details/${item.code}?provider_id=${item.products[0].provider_id}`)
									}
								>
									<ListItemAvatar style={{ width : "5rem", margin : "0.5rem" }}>
										<img
											src={item.products[0].image}
											style={{ objectFit : "cover", width : "100%" }}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={typeNotification(item)}
										secondary={
											<Typography
												type="caption"
												color="grey2"
											>
												{`Pedido #${item.code}`}
											</Typography>
										}
									/>
								</ListItem>
							))
						) : (
							<h4 className={classes.alert}>No tienes notificaciones</h4>
						)}
					</List>
				</Dialog>
			</Hidden>
			<Hidden smDown>
				<Menu
					disableScrollLock={true}
					id="location"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
					className={classes.marginPaper}
					transformOrigin={{
						vertical   : "top",
						horizontal : "center",
					}}
				>
					<List className={classes.menu}>
						{ numNotification > 0 ? (
							notificationList.map(item => (
								<ListItem
									button
									key={item.id}
									onClick={
										// eslint-disable-next-line max-len
										() => router.push(`/customer/orders/details/${item.code}?provider_id=${item.products[0].provider_id}`)
									}
								>
									<ListItemAvatar style={{ width : "5rem", margin : "0.5rem" }}>
										<img
											src={item.products[0].image}
											style={{ objectFit : "cover", width : "100%" }}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={typeNotification(item)}
										secondary={
											<Typography
												type="caption"
												color="grey2"
											>
												{`Pedido #${item.code}`}
											</Typography>
										}
									/>
								</ListItem>
							))
						) : (
							<h4 className={classes.alert}>No tienes notificaciones</h4>
						)}
					</List>
				</Menu>
			</Hidden>
		</div>
	);
};

Notifications.propTypes = {
	customer : PropTypes.any,
};

const mapStateToProps = (
	{ userReducer : { customer } }) => (
	{ customer : customer?.data }
);

export default connect(mapStateToProps, null)(Notifications);
