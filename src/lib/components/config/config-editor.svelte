<script lang="ts">
	import { DEFAULT_CHECKOUT_ACTION_URL } from '$lib/constants/payment';
	import { clearConfig, configStore, setConfig } from '$lib/stores/configStore.svelte';

	function stringHasSpaces(str: string | null | undefined) {
		if (str) {
			const hasSpaces = /\s/.test(str);
			return hasSpaces;
		}

		return false;
	}

	let checkoutUrl = $state<string>(configStore.state.checkoutUrl || '');
	let secret_key = $state<string>(configStore.state.secret_key);
	let publicKey = $state<string | null>(configStore.state.publicKey);
	let publicKeySpacesExist = $derived.by(() => stringHasSpaces(publicKey));
	let secret_keySpacesExist = $derived.by(() => stringHasSpaces(secret_key));
</script>

<div class="card card-padding vflex !items-stretch">
	<div class="vflex-s !gap-1 mb-3">
		<h3 class="h3">Configuration</h3>
		<p class="text-muted-foreground">These values are stored as HttpOnly cookies.</p>
	</div>

	<form
		class="two-col-grid w-full"
		onsubmit={(e) => {
			e.preventDefault();

			setConfig({
				...configStore.state,
				secret_key: secret_key.trim(),
				publicKey: publicKey ? publicKey.trim() : null
			});

			alert('Saved new configuration');
		}}
	>
		<label for="secret_key">Secret Key</label>
		<div class="vflex !items-stretch !gap-0">
			<input type="text" name="secret_key" id="secret_key" bind:value={secret_key} />
			{#if secret_keySpacesExist}
				<p class="text-destructive">
					Spaces detected in secret key. <button
						type="button"
						class="link"
						onclick={() => (secret_key = secret_key.replace(/\s+/g, ''))}
					>
						Remove spaces
					</button>
				</p>
			{/if}
		</div>

		<label for="publicKey">Public Key Content</label>
		<div class="vflex !items-stretch !gap-0">
			<textarea
				rows={4}
				name="publicKey"
				id="publicKey"
				bind:value={publicKey}
				placeholder={"Don't include the header and footer. Only include the content.\nExample: MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApdVf6+z7N9fJ9m..."}
			></textarea>
			{#if publicKeySpacesExist}
				<p class="text-destructive">
					Spaces detected in public key. <button
						type="button"
						class="link"
						onclick={() => (publicKey = publicKey?.replace(/\s+/g, '') || null)}
					>
						Remove spaces
					</button>
				</p>
			{/if}
		</div>

		<label for="checkoutUrl">Checkout URL</label>
		<div class="hflex !gap-0">
			<input
				type="text"
				name="checkoutUrl"
				id="checkoutUrl"
				class="flex-1 !rounded-r-none"
				bind:value={checkoutUrl}
			/>
			<button
				type="button"
				class="btn bg-primary !text-primary-foreground !rounded-l-none"
				onclick={() => {
					const updatedConfig = setConfig({
						...configStore.state,
						checkoutUrl: DEFAULT_CHECKOUT_ACTION_URL
					});
					checkoutUrl = updatedConfig.checkoutUrl || DEFAULT_CHECKOUT_ACTION_URL;
				}}
			>
				Use Default
			</button>
		</div>

		<div class="hflex">
			<button type="submit" class="btn bg-primary !text-primary-foreground"> Save </button>
			<button
				type="button"
				class="btn bg-warn !text-warn-foreground"
				onclick={() => {
					clearConfig();

					secret_key = '';
					publicKey = '';

					alert('Cleared configuration');
				}}
			>
				Clear
			</button>
		</div>
	</form>
</div>
