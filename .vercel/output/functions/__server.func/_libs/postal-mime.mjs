new TextEncoder();
var base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64Lookup = new Uint8Array(256);
for (let i = 0; i < 64; i++) base64Lookup[base64Chars.charCodeAt(i)] = i;
function getDecoder(charset) {
	charset = charset || "utf8";
	let decoder;
	try {
		decoder = new TextDecoder(charset);
	} catch (err) {
		decoder = new TextDecoder("windows-1252");
	}
	return decoder;
}
getDecoder();
//#endregion
export {};
