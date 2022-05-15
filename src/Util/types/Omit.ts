/**
 * Help us remove an element of an interface by extending it
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @example
 * interface UserData {
 *   name  : string;
 *   id    : number;
 *   token : string;
 * }
 * 
 * // Credentials will have all that UserData has but the name
 * interface Credentials extends Omit<Original, "name"> {}
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export default Omit;
