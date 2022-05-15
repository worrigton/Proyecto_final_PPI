export const longFormatDate = dateInstance => {
	const date = new Date(dateInstance);

	const options = {
		year  : "numeric",
		month : "long",
		day   : "numeric",
	};

	return date.toLocaleDateString("es-ES", options);
};

const addZeroIfNeeded = num => String(num).length === 1 ? `0${num}` : num;

const formatDate = (dateInstance, separator = "-") =>
	`${dateInstance.getFullYear()}${separator}` +
	`${addZeroIfNeeded(dateInstance.getMonth() + 1)}${separator}` +
	`${addZeroIfNeeded(dateInstance.getDate())}`;

export default formatDate;
