async function processFetchError(response) {
	if (response.status < 200 || response.status > 299) {
		const contentType = response.headers.get("Content-Type");
		if (contentType.match(/application\/json/i)) {
			throw await response.json();
		}
		throw await response.text();
	}
}

export default processFetchError;
