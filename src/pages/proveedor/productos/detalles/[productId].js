export const getServerSideProps = ({
	query : {
		productId,
	},
	req,
	res,
}) => {
	const hasInvalidChars = Boolean(productId.match(/[^0-9]/gi));
	if (!productId || hasInvalidChars) {
		productId = "1";

		const newUrl = req?.url?.slice(0, req?.url?.lastIndexOf("/"));

		res.writeHead(302, { Location : `${newUrl}/${productId}` });
		res.end();
	}

	return {
		props : {
			productId : Number(productId),
		},
	};
};

export { default } from "~/Components/Provider/ProductDetails";
