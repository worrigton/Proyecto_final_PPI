const formatToCurrency = (value) => (`${value.toLocaleString("en-US", { style : "currency", currency : "USD" })} MXN`);

export default formatToCurrency;
