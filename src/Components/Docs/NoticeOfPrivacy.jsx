/* eslint-disable camelcase */
import PropTypes from "prop-types";
import {
	useState,
	useCallback,
}  from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Divider,
} from "@material-ui/core";

import { useTheme }        from "@material-ui/core/styles";
import useMediaQuery       from "@material-ui/core/useMediaQuery";
import AvisoDePrivacidad   from "./HtmlNoticeOfPrivacy";
// Import Own Components
// eslint-disable-next-line no-unused-vars
import {
	Button,
	Typography,
	ButtonWithoutStyles as Clicker,
} from "~/ToolKit";

const NoticeOfPrivacy = ({ type, color }) => {
	const theme      = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const [open, setOpen] = useState(false);

	const handleClickOpen = useCallback(() => {
		setOpen(true);
	}, []);

	const handleClickClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Clicker
				onClick={handleClickOpen}
			>
				<Typography
					color = {color}
					type  = {type}
				>
					Aviso de privacidad
				</Typography>
			</Clicker>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClickClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">
					Aviso de Privacidad
				</DialogTitle>
				<Divider />
				<DialogContent>
					<DialogContentText>
						<div
							dangerouslySetInnerHTML={{ __html : AvisoDePrivacidad }}
						/>
					</DialogContentText>
				</DialogContent>
				<Divider />
				<DialogActions>
					<Button
						onClick={handleClickClose}
						variant="outlined"
						color="white"
						grow=""
						className=""
						textColor=""
					>
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

NoticeOfPrivacy.propTypes = {
	color : PropTypes.string,
	type  : PropTypes.string,
};

NoticeOfPrivacy.defaultProps = {
	color : "#303030",
	type  : "caption",
};

export default NoticeOfPrivacy;
