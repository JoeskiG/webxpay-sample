import { verifyWithPublicKey } from '$lib/utils/crypto';
import { getConfigFromCookies } from '$lib/utils/server';
import type { Actions } from '@sveltejs/kit';

type CallbackResponse = {
	additional_fee_discount_message: string;
	custom_fields: string;
	order_id: string;
	order_refference_number: string;
	payment: string;
	requested_amount: string;
	signature: string;
	status_code: string;
	transaction_amount: string;
};

export const actions = {
	default: async ({ request, cookies }) => {
		try {
			const callbackObj = {} as CallbackResponse;

			const formData = await request.formData();
			formData.forEach((value, key) => {
				const keyTyped = key as keyof CallbackResponse;
				const valueTyped = value as CallbackResponse[typeof keyTyped];
				callbackObj[keyTyped] = valueTyped;
			});

			const config = getConfigFromCookies(cookies);
			if (!config) {
				throw new Error('Config not found');
			}

			if (!config.publicKey) {
				throw new Error('Public key not set');
			}

			/*
            Have a look at this function to see how you could verify the payment signature using browser APIs.
            Although this is a server side function, it is possible to use browser-based environments to verify the signature.
            That being said though, DO NOT expose your public key. 
            I mentioned this because runtimes like workerd (used by Cloudflare Workers) do not have full support for Node APIs, so this method could work for it.
            */
			const isVerified = await verifyWithPublicKey(
				callbackObj.payment,
				callbackObj.signature,
				config.publicKey
			);

			return { isVerified };
		} catch (err) {
			console.error(err);
			return {
				isVerified: false
			};
		}
	}
} satisfies Actions;

// Sample
const sampleResponse = {
	additional_fee_discount_message: '',
	custom_fields: 'Sample Custom Field Data',
	order_id: 'sample_order_id',
	order_refference_number: 'T503...',
	payment: 'c2FtcGxlX29yZGVyX2lkf...',
	requested_amount: '100.00',
	signature: 'UNN68jhshv3xZd9PIdn...',
	status_code: '00',
	transaction_amount: '100.00'
};
