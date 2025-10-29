import { CONFIG_COOKIE_NAME } from '$lib/constants/cookies';
import type { ConfigState } from '$lib/stores/configStore.svelte';
import type { Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		try {
			const formData = await request.formData();
			const configValue = formData.get('config');

			if (!configValue || typeof configValue !== 'string') {
				// No config provided
				return { config: null };
			}

			let parsedConfig: ConfigState;
			try {
				parsedConfig = JSON.parse(configValue) as ConfigState;
			} catch (err) {
				console.error('Failed to parse config JSON:', err);
				return { config: null };
			}

			if (!parsedConfig) {
				return { config: null };
			}

			// Save to cookie
			cookies.set(CONFIG_COOKIE_NAME, btoa(JSON.stringify(parsedConfig)), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 1 * 24 * 60 * 60, // 1 day
				secure: process.env.NODE_ENV === 'development' ? false : true
			});

			return { config: parsedConfig };
		} catch (err) {
			console.error('Unexpected error handling config:', err);
			return { config: null };
		}
	}
} satisfies Actions;
