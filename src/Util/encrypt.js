import crypto from "crypto";

const ENCRYPTION_KEY = "Q37w5dM&THL8vEkg9JGJ-4%eAE[b+9M5"; // Must be 256 bits (32 characters)
const iv = ".miYka5H(Ht}+?+P";

function encrypt(text) {
	const encipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
	return Buffer.concat([
		encipher.update(text),
		encipher.final(),
	]);
}

export default encrypt;
