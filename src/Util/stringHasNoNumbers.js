const stringHasNoNumbers = str => str && typeof str === "string" && Boolean(str.match(/[^0-9]/gi));

export default stringHasNoNumbers;
