import { useCallback } from "react";
import { useRouter }   from "next/router";

import logo from "~/Resources/img/logo_colorful.png";
import {
	Grid,
	Box,
}   from "@material-ui/core";
import {
	Button,
	ButtonWithoutStyles as Clicker,
	Typography,
} from "~/ToolKit";
import { FaChevronLeft } from "~/Resources/icons/fal";

function Error() {
	const router = useRouter();

	const toHome = useCallback(() => router.push("/"), [router]);
	const toBack = useCallback(() => router.back(), [router]);

	return (
		<Grid container id="error-container">
			<Grid
				item
				xs={12}
				container
				direction="column"
				justify="center"
				alignItems="center"
			>
				<Clicker onClick={toHome}>
					<img src={logo} alt="logo" />
				</Clicker>
				<Box m={2}>
					<Typography type="title" fontWeight="bold">404</Typography>
				</Box>
				<Box m={2}>
					<Typography type="header1">Pagina no encontrada</Typography>
				</Box>
				<Box m={2}>
					<Button
						className="button-404"
						color="primary"
						size="md"
						grow
						textColor
						onClick={toBack}
					>
						<FaChevronLeft className />
						{ " Regresar" }
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}

Error.getInitialProps = ({ asPath, res }: any): any => {
	if (asPath.endsWith("/")) {
		res.writeHead(301, { Location : asPath.substring(0, asPath.length - 1) });
		return res.end();
	}
	return asPath;
};

export default Error;
