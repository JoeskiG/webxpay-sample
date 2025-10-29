<script lang="ts">
	import CheckoutForm from '$lib/components/checkout-form.svelte';
	import Container from '$lib/components/layout/container.svelte';
	import { DEFAULT_CHECKOUT_ACTION_URL } from '$lib/constants/payment';
	import { configStore } from '$lib/stores/configStore.svelte';
</script>

<Container>
	<CheckoutForm
		formActionUrl={configStore.state.checkoutUrl || DEFAULT_CHECKOUT_ACTION_URL}
		secret_key={configStore.state.secret_key}
	/>
</Container>
