import { useEffect }      from "react";
import PropTypes          from "prop-types";
import { Provider }       from "react-redux";
import Head               from "next/head";
import { ThemeProvider  } from "@material-ui/styles";
import { CssBaseline }    from "@material-ui/core";
import Router             from "next/router";
import NProgress          from "nprogress";
import smoothscroll       from "smoothscroll-polyfill";
import { RouterScrollProvider } from "@moxy/next-router-scroll";

import "nprogress/nprogress.css";

// Import Own Components
import Alert            from "~/Components/Alert";
import Dialog           from "~/Components/Dialog";
import Loading          from "~/Components/Loader";
import theme            from "~/ToolKit/theme";
import Store            from "~/Store";
import { STATE_LOADED } from "~/Store/actionTypes";
import "../global_styles.css";

const CustomApp = ({ Component, pageProps }) => {

	useEffect(() => {
		smoothscroll.polyfill();
		NProgress.configure({ showSpinner : true });

		Router.events.on("routeChangeStart", () => {
			console.log("inicio cambio ")
			NProgress.start();
		});

		Router.events.on("routeChangeComplete", () => {
			window.scrollTo(0, 0);
			NProgress.done();
		});

		Router.events.on("routeChangeError", NProgress.done);
	}, []);

	useEffect(() => {
		// Load state from localStorage
		import("~/Store/persistor").then(({ loadState }) => {
			const state = loadState() || {};

			state["dialogReducer"] = {
				open : false,
			};

			Store.dispatch({
				type    : STATE_LOADED,
				payload : {
					...state,
					stateLoaded : true,
				},
			});
		});
	}, []);

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");

		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	});

	return (
		<>
			<Head>
				<title>ZoKo - Justo lo que buscabas.</title>
			</Head>

			<ThemeProvider theme={theme}>
				<CssBaseline />

				<Provider store={Store}>
					<RouterScrollProvider>
						<Component {...pageProps} />
					</RouterScrollProvider>
					<Alert />
					<Dialog />
					<Loading />
				</Provider>
			</ThemeProvider>
		</>
	);
};

CustomApp.propTypes = {
	Component : PropTypes.any,
	pageProps : PropTypes.any,
};

export default CustomApp;
