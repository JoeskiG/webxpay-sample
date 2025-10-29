import { CONFIG_COOKIE_NAME } from '$lib/constants/cookies';
import type { ConfigState } from '$lib/stores/configStore.svelte';
import type { Cookies } from '@sveltejs/kit';

export function getConfigFromCookies(cookies: Cookies) {
	const config = cookies.get(CONFIG_COOKIE_NAME);

	if (!config) return null;

	try {
		const parsed = JSON.parse(atob(config)) as ConfigState;
		return parsed;
	} catch (err) {
		console.error('Failed to parse config JSON:', err);
		return null;
	}
}
