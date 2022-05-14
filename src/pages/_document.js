import React                 from "react";
import { ServerStyleSheets } from "@material-ui/core/styles";
import reactRevealconfig     from "react-reveal/globals";
import Document, {
	Html,
	Head,
	Main,
	NextScript,
} from "next/document";

// Import Own Components
import theme from "~/ToolKit/theme";

// To prevent flickering with React Reveal library
reactRevealconfig({
	ssrFadeout : true,
});

class CustomDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					{ /* App primary color */ }
					<meta name="theme-color" content={theme.palette.primary.main} />
					{ /* Comment on production */ }
					{/* <script src="/assets/fonts/all.min.js" /> */}

					{/* Montserrat and Open Sans fonts */}
					{/* <link href="https://fonts.googleapis.com/css?family=Montserrat|Open+Sans&display=swap" rel="stylesheet" /> */}
					<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
					<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
					<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
					<link rel="manifest" href="/favicon/site.webmanifest" />
					<link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
					<meta name="theme-color" content="#ffffff" />
				</Head>

				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

CustomDocument.getInitialProps = async ctx => {
	const sheets             = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () => originalRenderPage({
		enhanceApp : App => props => sheets.collect(<App {...props} />),
	});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles : [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
	};
};

export default CustomDocument;
