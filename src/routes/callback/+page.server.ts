import type { Actions } from '@sveltejs/kit';

type CallbackResponse = {
	additional_fee_discount_message: string;
	custom_fields: string; // E.g. 'Sample Custom Field Data'
	order_id: string; // E.g. 'sample_order_id'
	order_refference_number: string; // E.g. 'T503...'
	payment: string; // E.g. 'c2FtcGxlX29yZGVyX2lkf...'
	requested_amount: string; // E.g. '100.00'
	signature: string; // E.g. 'UNN68jhshv3xZd9PIdn...'
	status_code: string; // E.g. '00'
	transaction_amount: string; // E.g. '100.00'
};

export const actions = {
	default: async ({ request }) => {
		try {
			const callbackObj = {} as CallbackResponse;

			const formData = await request.formData();
			formData.forEach((value, key) => {
				const keyTyped = key as keyof CallbackResponse;
				const valueTyped = value as CallbackResponse[typeof keyTyped];
				callbackObj[keyTyped] = valueTyped;
			});

			/*
			In your own server side code, you'd want to handle verifying the signature here.
			In this sample, that is done at POST /verify
			This is because in this sample, your configuration including the public key is stored in cookies (do not do this in production).
			The POST request origin is from the payment gateway, so your cookies are not available, therefore your configs cannot be accessed here for the payment gateway request.
			This is due to browser security.
			*/

			return { callbackObj };
		} catch (err) {
			console.error(err);
			return {
				callbackObj: null
			};
		}
	}
} satisfies Actions;
