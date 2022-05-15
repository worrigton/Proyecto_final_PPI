/**
 * Execute a bunch of functions in order
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param fns
 * @example
 * const log      = a => () => console.log(a);
 * const executer = sequence(log(1), log(2), log(3));
 * 
 * // Prints in sequence on the console: "1", "2", "3"
 * executer();
 */
const sequence = (...fns) => () => {
	for (const fn of fns) {
		if (typeof fn === "function") {
			fn();
		}
	}
};

export default sequence;
