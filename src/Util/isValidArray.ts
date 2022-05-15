/**
 * Verifies if the introduced array is of type array and has at least one element
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param arr
 */
const isValidArray = (arr: any[]): boolean => arr && Array.isArray(arr) && arr.length > 0;

export default isValidArray;
