/**
 * Scrolls to the top of a page, in a smoth way
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 */
const scrollToTop = () => {
	const distanceToTop: number = document.documentElement.scrollTop || document.body.scrollTop;

	if (distanceToTop > 0) {
		window.requestAnimationFrame(scrollToTop);
		window.scrollTo(0, distanceToTop - distanceToTop / 8);
	}
};

export default scrollToTop;
