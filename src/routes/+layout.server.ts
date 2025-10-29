import { CONFIG_COOKIE_NAME } from '$lib/constants/cookies.js';
import type { ConfigState } from '$lib/stores/configStore.svelte';

export async function load({ cookies }) {
	try {
		const existingConfig = cookies.get(CONFIG_COOKIE_NAME);
		if (existingConfig) {
			const parsedExistingConfig = JSON.parse(atob(existingConfig as string)) as ConfigState;
			return {
				config: parsedExistingConfig
			};
		}
		return {
			config: null
		};
	} catch (err) {
		console.error(err);
		return {
			config: null
		};
	}
}
