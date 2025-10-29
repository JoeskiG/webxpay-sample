<script lang="ts">
	import { deserialize } from '$app/forms';
	import Container from '$lib/components/layout/container.svelte';
	import { jsonToFormData } from '$lib/utils/formData';
	import { onMount } from 'svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	const callbackObj = form?.callbackObj;

	let isVerified = $state<boolean | null>(null);

	onMount(() => {
		if (callbackObj) {
			fetch('/verify', {
				method: 'POST',
				credentials: 'include',
				body: jsonToFormData(callbackObj)
			})
				.then((res) => res.text())
				.then((res) => deserialize(res))
				.then((res) => {
					const resTyped = res as { data?: { isVerified?: boolean } };
					if (resTyped?.data?.isVerified != null) {
						isVerified = resTyped.data.isVerified;
					} else {
						isVerified = false;
					}
				});
		}
	});
</script>

<!-- navItemsShouldReload so that when you navigate to another page via the nav, your cookies will be available as usual -->
<!-- You get to this page via a POST request that originates from the payment gateway, so your cookies that have your public key etc. are not available until you reload the page -->
<Container navItemsShouldReload={true}>
	<div class="vflex !items-stretch">
		<div class="card card-padding vflex !items-stretch">
			<h3 class="h3">Verification Status</h3>

			{#if callbackObj}
				{#if isVerified == null}
					<p class="text-info">Loading status...</p>
				{:else}
					<p class={isVerified ? 'text-success' : 'text-destructive'}>
						{isVerified ? 'Verified' : "Signature doesn't match"}
					</p>
				{/if}
			{:else}
				<p class="text-destructive">Callback data not received.</p>
			{/if}
		</div>

		<div class="card card-padding vflex !items-stretch">
			<h3 class="h3">Callback Data</h3>

			{#if callbackObj}
				<div class="two-col-grid !gap-x-9">
					{#each Object.entries(callbackObj) as [key, value] (key)}
						<p>{key}</p>
						<p class="text-wrap break-all">{JSON.stringify(value)}</p>
					{/each}
				</div>
			{:else}
				<p class="text-destructive">No data received</p>
			{/if}
		</div>
	</div>
</Container>
