<script lang="ts">
	import { themeStore } from '$lib/stores/themeStore.svelte';
	import { twMerge } from 'tailwind-merge';

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();
</script>

<!-- This is the most important feature -->
<button
	type="button"
	class={twMerge(
		'p-3 group shrink-0 h-9 transition-all flex items-center justify-center rounded-full border shadow-sm',
		themeStore.colorMode === 'dark'
			? 'bg-gray-500 text-foreground'
			: themeStore.colorMode === 'light' && 'bg-white text-foreground',
		className
	)}
	onclick={() =>
		themeStore.colorMode === 'dark'
			? (themeStore.colorMode = 'light')
			: (themeStore.colorMode = 'dark')}
>
	{#if themeStore.colorMode === 'dark'}
		<i class="fa-solid fa-moon"></i>

		<p
			class="overflow-hidden transition-all duration-300 ease-in-out max-w-0 opacity-0 group-hover:ml-2 group-hover:max-w-[60px] group-hover:opacity-100"
		>
			Dark
		</p>
	{:else}
		<i class="fa-solid fa-sun"></i>
		<p
			class="overflow-hidden transition-all duration-300 ease-in-out max-w-0 opacity-0 group-hover:ml-2 group-hover:max-w-[60px] group-hover:opacity-100"
		>
			Light
		</p>
	{/if}
</button>
