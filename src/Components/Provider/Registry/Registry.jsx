import {
	Container,
	FormControl,
} from "@material-ui/core";
import { useRouter } from "next/router";
import PropTypes     from "prop-types";

// Import Own Components
import ProviderLayout from "~/Components/Provider/ProviderLayout";
import Forms          from "~/Components/Forms";
import useStyles      from "./styles";


const Registry = ({ data : clientSecret }) => {
	const classes = useStyles();
	const router  = useRouter();

	return (
		<ProviderLayout>
			<Container fixed className={classes.container}>
				<FormControl className={classes.formControl}>
					<Forms
						steps={[
							"Crear cuenta",
							"Información General",
							"Subscripciones",
							"Confirmar",
						]}
						type="provider"
						formData={router.query}
						clientSecret ={clientSecret}
					/>
				</FormControl>
			</Container>
		</ProviderLayout>
	);
};

Registry.propTypes = {
	data : PropTypes.object.isRequired,
};

export default Registry;
