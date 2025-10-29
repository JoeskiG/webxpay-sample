// Credits: QingpingMeng - https://gist.github.com/QingpingMeng/f51902e2629fc061c6b9fc9bb0f3f57b
// I have adapted it for this sample.

function base64ToArrayBuffer(base64: string) {
	return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
	return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

export async function verifyWithPublicKey(
	messageBase64: string,
	signatureBase64: string,
	publicKey: string
) {
	const binaryDer = base64ToArrayBuffer(publicKey);

	const cryptoKey = await crypto.subtle.importKey(
		'spki',
		binaryDer.buffer,
		{
			name: 'RSA-PSS',
			hash: 'SHA-1' // WEBXPAY uses SHA-1 (as of 30/10/2025)
		},
		false,
		['verify']
	);

	const message = Uint8Array.from(atob(messageBase64), (c) => c.charCodeAt(0));
	const signature = Uint8Array.from(atob(signatureBase64), (c) => c.charCodeAt(0));

	const verified = await crypto.subtle.verify(
		{
			name: 'RSA-PSS',
			saltLength: 20
		},
		cryptoKey,
		signature,
		message
	);

	return verified;
}

export async function encryptWithPublicKey(message: string, publicKey: string) {
	const binaryDer = base64ToArrayBuffer(publicKey);
	const cryptoKey = await window.crypto.subtle.importKey(
		'spki',
		binaryDer.buffer,
		{
			name: 'RSA-OAEP',
			hash: 'SHA-1' // WEBXPAY uses SHA-1 (as of 30/10/2025)
		},
		false,
		['encrypt']
	);

	const enc = new TextEncoder();
	const encodedMessage = enc.encode(message);
	const encryptedData = await window.crypto.subtle.encrypt(
		{
			name: 'RSA-OAEP'
		},
		cryptoKey,
		encodedMessage
	);
	const encodedData = arrayBufferToBase64(encryptedData);
	return encodedData;
}
