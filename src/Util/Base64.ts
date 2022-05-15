/**
 * A set of functions to work with base64 encoding
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 */
class Base64 {
	/** Encodes a string to base64 */
	static encode(str: string): string {
		return Buffer.from(str, "binary").toString("base64");
	}

	/** Decodes a string from base64 */
	static decode(str: string): string {
		return Buffer.from(str, "base64").toString();
	}

	/**
	 * Converts a Blob file into a base64 string, after the FileReader resolvers
	 * it's going to fire the callback with the resulting string
	 * 
	 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
	 * @param file - Blob file to be converted
	 * @param callback - A callback function that will execute with te result as its param
	 */
	static imageToBase64(file: Blob, callback: (imageInBase64: string | ArrayBuffer) => any): void {
		const reader: FileReader = new FileReader();

		reader.onloadend = () => {
			callback(reader.result);
		};

		reader.readAsDataURL(file);
	}
}

export default Base64;
