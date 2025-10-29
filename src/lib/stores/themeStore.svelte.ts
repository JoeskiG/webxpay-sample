import { untrack } from 'svelte';

type ThemeColors = 'dark' | 'light';

type ThemeStore = {
	colorMode: ThemeColors;
};

const initialState: ThemeStore = {
	colorMode: 'dark'
};

export const themeStore = $state<ThemeStore>(initialState);

export function initThemeStore() {
	$effect(() => {
		themeStore.colorMode;
		untrack(() => {
			if (typeof document !== 'undefined') {
				const darkExists = document.body.classList.contains('dark');
				if (!darkExists && themeStore.colorMode === 'dark') {
					document.body.classList.add('dark');
				} else if (themeStore.colorMode !== 'dark' && darkExists) {
					document.body.classList.remove('dark');
				}
			}
		});
	});
}
