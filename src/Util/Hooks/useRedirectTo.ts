/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useRouter }   from "next/router";

type RedirectFnWithoutParams = (...args: any[]) => any;

/**
 * Creates a memoized function that takes a string and redirects with router (router.push)
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @example
 * 
 * const UsageExample: React.FC = () => {
 * 	const redirectTo = useRedirectTo();
 * 
 * 	return (
 * 		<button onClick={redirectTo("/home")}>
 * 			Go to Home
 * 		</button>
 * 	);
 * };
 */
const useRedirectTo = () => {
	const router = useRouter();

	const redirectTo = useCallback<(url: string) => RedirectFnWithoutParams>(url => () => router.push(url), []);

	return redirectTo;
};

export default useRedirectTo;
