<script lang="ts">
	import { DEFAULT_CHECKOUT_ACTION_URL } from '$lib/constants/payment';
	import { configStore } from '$lib/stores/configStore.svelte';
	import { encryptWithPublicKey } from '$lib/utils/crypto';
	import { untrack } from 'svelte';
	import ConfigEditor from './config/config-editor.svelte';

	type CheckoutFormData = {
		first_name: string;
		last_name: string;
		email: string;
		contact_number: string;
		address_line_one: string;
		address_line_two: string;
		city: string;
		state: string;
		postal_code: string;
		country: string;
		process_currency: string; // should be "LKR" or "USD"
		cms: string;
		custom_fields: string;
		secret_key: string;
		payment: string; // encrypted payment data
	};

	type Props = {
		formActionUrl?: string;
		secret_key: string;
	};

	let {
		formActionUrl = DEFAULT_CHECKOUT_ACTION_URL,
		secret_key = configStore.state.secret_key
	}: Props = $props();

	const getInitialFormData = ({ secret_key }: { secret_key: string }) => ({
		first_name: 'John',
		last_name: 'Doe',
		email: 'johndoe@example.com',
		contact_number: '9999999999',
		address_line_one: '40/20, Sample Street',
		address_line_two: '',
		city: 'Sample Suburb',
		state: 'Sample State',
		postal_code: '10000',
		country: 'Sample Country',
		process_currency: 'LKR',
		cms: '',
		custom_fields: 'Sample Custom Field Data',
		secret_key: secret_key,
		payment: ''
	});

	let viewFieldNames = $state<boolean>(false);

	let price = $state<number>(100);
	let order_id = $state<string>('sample_order_id');

	let formData = $state<CheckoutFormData>(getInitialFormData({ secret_key }));

	let stringToEncrypt = $derived(order_id + '|' + String(price));

	function encryptPayment() {
		if (configStore.state.publicKey) {
			// Have a look at this function
			return encryptWithPublicKey(stringToEncrypt, configStore.state.publicKey).then(
				(encryptedData) => (formData.payment = encryptedData)
			);
		}
	}

	$effect(() => {
		// Effect dependencies
		price;
		order_id;
		configStore.state.publicKey;

		untrack(() => encryptPayment());
	});
</script>

<div class="vflex !items-stretch pb-3">
	<ConfigEditor />

	<div class="card card-padding vflex !items-stretch">
		<div class="vflex-s !gap-1 mb-2">
			<h3 class="h3">Payment Settings</h3>

			<p class="text-muted-foreground">
				This is used to generate the value for the 'payment' field.
			</p>
			<p>
				The following string is encrypted using your public key: <span
					class="font-mono font-semibold"
				>
					{stringToEncrypt}
				</span>
			</p>
		</div>

		<div class="two-col-grid">
			<label for="price">Price</label>
			<input type="number" step={0.1} min={100} name="price" bind:value={price} />

			<label for="order_id">Order ID</label>
			<input type="text" name="order_id" bind:value={order_id} />
		</div>

		<p class="text-nowrap mt-2 text-left">
			Sample Testing Cards:
			<a
				class="link break-all text-wrap"
				target="_blank"
				rel="noopener noreferrer"
				href="https://developers.webxpay.com/Guides/Tokenize-Integration/tokenize.html#:~:text=13.-,Test%20Cards,-4111%201111%201111"
				>https://developers.webxpay.com/Guides/Tokenize-Integration/tokenize.html#:~:text=13.-,Test%20Cards,-4111%201111%201111</a
			>
		</p>
	</div>

	<div class="card card-padding vflex !items-stretch">
		<div class="hflex !justify-between">
			<h3 class="h3">Checkout</h3>

			<div class="hflex">
				<label for="viewFieldNames"
					>{viewFieldNames ? 'Show' : 'Hide'} Form Field Names</label
				>
				<input
					type="checkbox"
					name="viewFieldNames"
					id="viewFieldNames"
					class="size-6"
					bind:checked={viewFieldNames}
				/>
			</div>
		</div>

		<form class="w-full two-col-grid" action={formActionUrl} method="POST">
			<label for="first_name">{viewFieldNames ? 'first_name' : 'First Name'}</label>
			<input type="text" name="first_name" bind:value={formData.first_name} />

			<label for="last_name">{viewFieldNames ? 'last_name' : 'Last Name'}</label>
			<input type="text" name="last_name" bind:value={formData.last_name} />

			<label for="email">{viewFieldNames ? 'email' : 'Email'}</label>
			<input type="text" name="email" bind:value={formData.email} />

			<label for="contact_number"
				>{viewFieldNames ? 'contact_number' : 'Contact Number'}</label
			>
			<input type="text" name="contact_number" bind:value={formData.contact_number} />

			<label for="address_line_one"
				>{viewFieldNames ? 'address_line_one' : 'Address Line 1'}</label
			>
			<input type="text" name="address_line_one" bind:value={formData.address_line_one} />

			<label for="address_line_two"
				>{viewFieldNames ? 'address_line_two' : 'Address Line 2'}</label
			>
			<input type="text" name="address_line_two" bind:value={formData.address_line_two} />

			<label for="city">{viewFieldNames ? 'city' : 'City'}</label>
			<input type="text" name="city" bind:value={formData.city} />

			<label for="state">{viewFieldNames ? 'state' : 'State'}</label>
			<input type="text" name="state" bind:value={formData.state} />

			<label for="postal_code">{viewFieldNames ? 'postal_code' : 'Zip/Postal Code'}</label>
			<input type="text" name="postal_code" bind:value={formData.postal_code} />

			<label for="country">{viewFieldNames ? 'country' : 'Country'}</label>
			<input type="text" name="country" bind:value={formData.country} />

			<label for="process_currency">{viewFieldNames ? 'process_currency' : 'Currency'}</label>
			<input type="text" name="process_currency" bind:value={formData.process_currency} />

			<label for="cms">{viewFieldNames ? 'cms' : 'CMS'}</label>
			<input type="text" name="cms" bind:value={formData.cms} />

			<label for="custom_fields">{viewFieldNames ? 'custom_fields' : 'Custom'}</label>
			<input type="text" name="custom_fields" bind:value={formData.custom_fields} />

			<label for="secret_key"
				>{viewFieldNames ? 'secret_key' : 'Secret Key / Merchant ID'}</label
			>
			<input type="text" name="secret_key" bind:value={formData.secret_key} />

			<label for="payment">{viewFieldNames ? 'payment' : 'Payment Data'}</label>
			<input
				class={!formData.payment ? 'text-destructive' : undefined}
				type="text"
				name="payment"
				bind:value={
					() => formData.payment || 'Invalid public key',
					(newValue) => (formData.payment = newValue)
				}
			/>

			<div class="hflex">
				<button type="submit" class="btn bg-primary text-primary-foreground">Submit</button>

				<button type="reset" class="btn bg-warn text-warn-foreground">Clear</button>

				<button
					type="button"
					class="btn bg-muted text-foreground"
					onclick={() => {
						formData = getInitialFormData({ secret_key });
						encryptPayment();
					}}
				>
					Set to Defaults
				</button>
			</div>
		</form>
	</div>
</div>
