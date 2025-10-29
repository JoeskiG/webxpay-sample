<script lang="ts">
	import '../app.css';
	//
	import { initConfigStore } from '$lib/stores/configStore.svelte';
	import { initThemeStore } from '$lib/stores/themeStore.svelte';
	import { onMount } from 'svelte';
	import type { LayoutServerData } from './$types.js';

	type Props = {
		data: LayoutServerData;
		children: any;
	};

	let { data, children }: Props = $props();

	let ready = $state<boolean>(false);

	onMount(() => {
		initConfigStore(data?.config || undefined);
		initThemeStore();
		ready = true;
	});
</script>

<svelte:head>
	<title>WEBXPAY Sample</title>
	<meta
		name="description"
		content="Sample implementation of WEBXPAY payment gateway for testing and development purposes. Learn how to integrate payments securely."
	/>
	<meta
		name="keywords"
		content="WEBXPAY, payment gateway, online payment, secure checkout, sample integration"
	/>
	<meta name="author" content="Sam Gunawardana" />
	<meta name="robots" content="index, follow" />

	<!-- Open Graph / Social Sharing -->
	<meta property="og:title" content="WEBXPAY Sample - Payment Gateway Integration" />
	<meta
		property="og:description"
		content="Sample implementation of WEBXPAY payment gateway for testing and development purposes. Learn how to integrate payments securely."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://webxpay-sample.suminda.dev" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="WEBXPAY Sample - Payment Gateway Integration" />
	<meta
		name="twitter:description"
		content="Sample implementation of WEBXPAY payment gateway for testing and development purposes. Learn how to integrate payments securely."
	/>
</svelte:head>

{#if ready}
	{@render children?.()}
{/if}
