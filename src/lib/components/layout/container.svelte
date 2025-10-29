<script lang="ts">
	import { page } from '$app/state';
	import { twMerge } from 'tailwind-merge';
	import DarkModeToggle from '../theme/dark-mode-toggle.svelte';

	type Props = {
		children: any;
		class?: string;
		navItemsShouldReload?: boolean;
	};

	let { class: className, navItemsShouldReload, children }: Props = $props();
</script>

<div class={twMerge('mx-auto container p-2 size-full', className)}>
	<DarkModeToggle class="lg:top-3 lg:right-3 top-2 right-2 fixed" />

	<header class="mb-6">
		<nav class="flex items-center justify-start">
			<ul
				class="vflex-s lg:!items-center lg:!flex-row lg:mt-3 mt-1 !gap-x-6 [&_li]:text-primary"
			>
				<li class={twMerge('link', page.url.pathname === '/' && 'font-bold')}>
					<a href="/" data-sveltekit-reload={navItemsShouldReload}>About</a>
				</li>
				<li
					class={twMerge(
						'link',
						page.url.pathname.startsWith('/checkout') && 'font-bold'
					)}
				>
					<a href="/checkout" data-sveltekit-reload={navItemsShouldReload}>Checkout</a>
				</li>
				<li class={twMerge('link', page.url.pathname.startsWith('/config') && 'font-bold')}>
					<a href="/config" data-sveltekit-reload={navItemsShouldReload}>Configuration</a>
				</li>
			</ul>
		</nav>
	</header>

	{@render children?.()}
</div>
