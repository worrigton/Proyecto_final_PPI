/**
 * Selects all the text when an input is focused only in its value is "0"
 * 
 * @author Montserrat Delgado Alvarez <mdanatg@gmail.com>
 * @param event
 */
const selectAllIfTextIsZero = (event: React.FocusEvent<HTMLInputElement>): void => {
	if (event.target.value === "0") {
		event.target.select();
	}
};

export default selectAllIfTextIsZero;
