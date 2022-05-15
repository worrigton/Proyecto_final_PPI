/**
 * Loops through an iterator in a circular way
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param iter
 * @example
 * const looping = loopIter([1, 2, 3]);
 * 
 * // Returns { value : 1, done : false }
 * looping.next();
 * 
 * // Returns { value : 2, done : false }
 * looping.next();
 * 
 * // Returns { value : 3, done : false }
 * looping.next();
 * 
 * // Returns { value : 2, done : false }
 * looping.next();
 * 
 * // Returns { value : 1, done : false }
 * looping.next();
 */
const loopIter = function* (iter: IterableIterator<any>) {
	const arr: any[] = [...iter];

	if (arr.length < 3) {
		while (true) {
			yield* arr;
		}
	}

	const reversedArr = arr.slice(1, arr.length - 1).reverse();

	while (true) {
		yield* arr;
		yield* reversedArr;
	}
};

export default loopIter;
