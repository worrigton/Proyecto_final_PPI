/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";
import { Zoom }    from "react-reveal";
import {
	Card,
	Avatar,
	Container,
	Grid,
	Hidden,
} from "@material-ui/core";
import { useRouter } from "next/router";

// Import Own Components
import StarRating             from "~/Components/StarRating";
import TitlePage              from "~/Components/TitlePage";
import GeneralAvatar          from "~/Components/UserImage/General";
import AddVariant             from "~/Components/MobileLayout/AddVariant"
import { longFormatDate }     from "~/Util/formatDate";
import { useRedirectTo }      from "~/Util/Hooks";

import TableProductsProviderContainer from "~/Components/MobileLayout/TableProductsProvider";
import VariantsCell                   from "./VariantsCell";

import {
	Typography,
	Table,
	Button,
} from "~/ToolKit";
import useStyles from "./styles";

export interface Props {
	delegations : {
		handleLike   : (...args: any[]) => any;
		handlePause  : (...args: any[]) => any;
		handleDelete : (...args: any[]) => any;
		providerData : any;
		providerId   : any;
		token        : string;
	};
	showProviderData ?: boolean;
	token            ?: string;
};

const ProductsOfProvider: React.FC<Props> = ({
	delegations : {
		handleLike,
		handlePause,
		handleDelete,
		providerData,
		providerId,
		token,
	},
	showProviderData = false,
}) => {
	const router     = useRouter();
	const classes    = useStyles();
	const redirectTo = useRedirectTo();

	const columns = useMemo(() => [
		{
			id    : "image",
			style : {
				width : "5%",
			},
			format : (image, id, products) => (
				<div className={classes.center}>
					<Zoom>
						{ image ? (
							<Avatar
								src={image}
								alt="Product image"
								className={classes.avatar}
							/>
						) : (
							<GeneralAvatar />
						) }
					</Zoom>
				</div>
			),
		},
		{
			orderBy : "Nombre",
			id      : "name",
			label   : "Nombre del Producto",
			align   : "left",
			style   : {
				width      : "15%",
				fontWeight : "bold",
				fontSize   : "1.1em",
				color      : "#5c5c5c",
			},
		},
		{
			id    : "products",
			label : "Variedades",
			align : "center",
			style : {
				width : "60%",
			},
			format : products => (
				<VariantsCell
					products={products}
					providerId={providerId}
					token={token}
				/>

			),
		},
		{
			id    : "products",
			label : "Agregar",
			align : "right",
			style : {
				width : "10%",
			},
			format : products => (
				<div>
					{ products?.length < 9 &&
						<AddVariant productId={products[0].product_details_id} />}
				</div>
			),
		},
	], []);

	const tabs = useMemo(() => [
		{
			label : "Todos",
		},
		{
			label  : "Destacados",
			filter : {
				user_liked_product : providerData?.user?.id,
			},
		},
		{
			label  : "Pausadas",
			filter : {
				product_provider_status : "INACTIVE",
			},
		},
	], [providerData]);

	// const filters = { provider_id : providerId };
	return (
		<>
			<Container className={classes.root}>
				<Grid>
					{ showProviderData && (
						<TitlePage
							url="/employee"
							nameUrl="Proveedores"
							divider={false}
						/>
					) }

					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
						className="title"
					>
						<Grid item>
							<Typography type="header2">
								Productos
							</Typography>
						</Grid>
						<Grid item>
							{ showProviderData && (
								// @ts-ignore
								<Button
									color="primary"
									onClick={redirectTo(`/employee/products/${router?.query?.providerId}/add`)}
								>
									Nuevo Producto
								</Button>
							) }
						</Grid>
					</Grid>

					{ showProviderData && (
						<Card className={classes.providerInfo}>
							<Grid container>
								<Grid item className="imageContainer">
									{ providerData?.images?.sm ? (
										<Avatar
											className="avatar"
											src={providerData?.images?.sm}
											alt="Provider image"
										/>
									) : (
										<GeneralAvatar className="avatar" />
									) }
								</Grid>
								<Grid item className="info">
									<Typography type="header4">
										{ providerData?.trade_name || "" }
									</Typography>

									{ providerData?.user?.created_at && (
										<Typography>
											{`Miembro desde ${longFormatDate(providerData?.user?.created_at)}`}
										</Typography>
									) }

									<StarRating
										className="rating"
										rank={providerData?.rating || 0}
									/>
								</Grid>
							</Grid>
						</Card>
					) }
					<Hidden smDown>
						<Table
							url={"/api/products/page"}
							tabs={tabs}
							columns={columns}
							filters={{ provider_id : providerId }}
							searchbarPlaceHolder="Buscar productos"
							selections={{
								identifyBy : "id",
								actions    : [
									{
										name    : "Pausar",
										handler : handlePause,
									},
									{
										name    : "Destacar",
										handler : handleLike,
									},
									{
										name    : "Eliminar",
										handler : handleDelete,
									},
								],
							}}
						/>
					</Hidden>
					<Hidden mdUp>
						<Grid container>
							<TableProductsProviderContainer />
						</Grid>
					</Hidden>
				</Grid>
			</Container>
		</>
	);
};

export default ProductsOfProvider;
