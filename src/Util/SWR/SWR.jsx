import { useEffect, useMemo } from "react";
import PropTypes              from "prop-types";
import useSWR                 from "swr";
import fetch                  from "isomorphic-unfetch";

// Import Own Components
import { authHeader }    from "~/Util";
import { SimpleLoading } from "~/Components/Loading";

const SWR = ({
	url,
	initialData,
	withToken,
	onError,
	onSuccess,
	renderOnError,
	renderOnLoading,
	children,
}) => {
	const fetcher = useMemo(
		() => url => fetch(
			url,
			withToken
				? { headers : authHeader() }
				: { method : "GET" }
		).then(_ => _.json()),
		[withToken]
	);

	const { data, error } = useSWR(url, fetcher);

	useEffect(() => {
		if (error) {
			if (onError) {
				onError(error);
			}
			console.error("An exception has occurred. ", error);
		}
	}, [error, onError]);

	useEffect(() => {
		if (data && onSuccess && !error) {
			onSuccess(data);
		}
	}, [data, error, onSuccess]);

	return (
		<>
			{ initialData ? (
				// Render the children with the initial data, when a new data arrives, it will be re-rendered
				children(data ? data : initialData)
			) : ((!error && data) && (
				// If there's no initial data, render the children just when succeeded
				children(data)
			)) }

			{ error ? (
				// Show error if any
				renderOnError ? renderOnError : <></>
			) : (!data && (
				// Show loading if loading
				renderOnLoading ? renderOnLoading : <SimpleLoading />
			)) }
		</>
	);
};

SWR.propTypes = {
	url             : PropTypes.string.isRequired,
	initialData     : PropTypes.any,
	withToken       : PropTypes.bool,
	onError         : PropTypes.func,
	onSuccess       : PropTypes.func,
	renderOnError   : PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.element]),
	renderOnLoading : PropTypes.oneOfType([PropTypes.element, PropTypes.array, PropTypes.element]),
	children        : PropTypes.func.isRequired,
};

SWR.defaultProps = {
	initialData     : null,
	withToken       : false,
	onError         : null,
	onSuccess       : null,
	renderOnError   : null,
	renderOnLoading : null,
};

export default SWR;
