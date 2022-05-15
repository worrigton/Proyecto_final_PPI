/* eslint-disable camelcase */
import PropTypes       from "prop-types";
import { useCallback } from "react";
import {
	Grid,
	FormControl,
	Divider,
	Container,
} from "@material-ui/core";

// Import own Components
import { bindAll }            from "~/Util";
import { Typography, Button } from "~/ToolKit";
import withStateLoaded        from "~/Store/withStateLoaded";
import AlertActions           from "~/Components/Alert/store/actions";
import PrivateProviderRoute   from "~/Components/Provider/PrivateProviderRoute";
import ProviderLayout         from "~/Components/Provider/ProviderLayout";
import TitlePage              from "~/Components/TitlePage";
import ContentLayout          from "~/Components/ContentLayout";
import { FaLemon }            from "~/Resources/icons/far";
import CardDialog             from "./CardDialog";
import useStyles              from "./styles";

const SubscriptionContainer = ({ providerId, membership, token, alertActions }) => {
	const classes = useStyles();

	const registryData = useCallback((param) => {
		const date = new Date(param);
		const options = {
			year  : "numeric",
			month : "long",
			day   : "numeric",
		};
		return date.toLocaleDateString("es-ES", options);
	}, []);

	return (
		<PrivateProviderRoute>
			<ProviderLayout>
				<Container fixed className={classes.container}>
					<TitlePage
						title="Subscripción"
						url="/proveedor/cuenta"
						nameUrl="Configuración"
					/>
					<ContentLayout
						title="Detalles de la subscripción"
						// eslint-disable-next-line max-len
						description="Lee nuestros términos y condiciones y política de privacidad. Compara planes con diferentes características y tarifas"
					>
						<FormControl className={classes.formControl}>
							<Grid
								container
								direction="row"
								alignItems="flex-start"
							>
								<Grid item xs={12} md={4}>
									<Typography type="body2" fontWeight="700">
										Miembro desde
									</Typography>
									<Typography type="caption" color="grey">
										{registryData(membership.created_at)}
									</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography type="body2" fontWeight="700">
										Plan actual
									</Typography>
									<Typography type="caption" color="grey">
										{membership.membership}
									</Typography>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography type="body2" fontWeight="700">
										Estatus de la membresia
									</Typography>
									<Typography type="caption" color="grey">
										{membership.status === "ACTIVE" ? "Activa" : "Desactiva"}
									</Typography>
								</Grid>
								<Grid item xs={12}>
									<Divider className={classes.hr} />
								</Grid>
								<Grid item xs={12}>
									{membership.subscription_id != 4 ? ( <>
										<Typography type="body2" color="grey">
											Adquiere un plan superior y haz crecer tu negocio
										</Typography>
										<div className={classes.gridPadding} />
									</>) : (
										<Typography type="body2" color="grey">
											Cuentas con el plan más alto.
										</Typography>
									)}
									<Typography color="grey">
										<FaLemon />
										{ membership.subscription_id == 1 && " Hasta 10 productos" }
										{ membership.subscription_id == 2 && " Hasta 20 productos" }
										{ membership.subscription_id == 3 && " Hasta 40 productos" }
										{ membership.subscription_id == 4 && " Más de 100 productos" }
									</Typography>
									<div className={classes.gridPadding} />
									<CardDialog
										providerId={providerId}
										membership={membership}
										token={token}
										delegations={{
											alertActions,
										}}
									/>
								</Grid>
							</Grid>
						</FormControl>
					</ContentLayout>
					<div className={classes.hr} />
					<ContentLayout
						title="Cancelar subscripción"
						description="Cierra tu espacio de venta online"
					>
						<FormControl className={classes.formControl}>
							<Typography type="body2" color="grey">
								Cancela tu servicio antes de tu próximo pago
							</Typography>
							<div className={classes.gridPadding} />
							<Grid>
								<Button color="white">
									Cancelar
								</Button>
							</Grid>
						</FormControl>
					</ContentLayout>
				</Container>
			</ProviderLayout>
		</PrivateProviderRoute>
	);
};

SubscriptionContainer.propTypes = {
	providerId   : PropTypes.any,
	membership   : PropTypes.any,
	token        : PropTypes.any,
	alertActions : PropTypes.object,
};

const mapStateToProps = ({ userReducer : { provider } }) => ({
	providerId : provider?.data?.provider.id,
	token      : provider?.token,
	membership : provider?.data?.provider.membership,
});

const mapDispatchToProps = bindAll({
	AlertActions,
});

export default withStateLoaded(mapStateToProps, mapDispatchToProps)(SubscriptionContainer);
