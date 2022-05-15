/**
 * Opens a modal to select an image file, when an image is selected its blob is passed
 * to the callback function
 * 
 * @author Yael Mártin A. Alcalá León <yael.alcalla@gmail.com>
 * @param callback
 * @example
 * const uploader = uploadFile(file => console.log(file));
 * 
 * // Logs the file info
 * uploader();
 */
const uploadFile = (callback: (result: File | false) => void) => () => {
	const uploader: HTMLInputElement = document.createElement("input");

	uploader.setAttribute("type", "file");
	uploader.setAttribute("accept", "image/*");

	uploader.addEventListener("change", async () => {
		const selectedFile: File = uploader.files[0];

		callback(selectedFile.type.includes("image") ? selectedFile : false);
	});

	uploader.click();
};

export default uploadFile;
