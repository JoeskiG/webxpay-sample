<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/components/layout/container.svelte';

	const socials: Record<
		string,
		{
			type: 'LINK' | 'TO';
			iconClassName: string;
			url?: string;
			text?: string;
			href?: string;
		}
	> = {
		linkedin: {
			type: 'LINK',
			iconClassName: 'fa-brands fa-linkedin',
			url: 'https://www.linkedin.com/in/suminda-gunawardana'
		},
		github: {
			type: 'LINK',
			iconClassName: 'fa-brands fa-github',
			url: 'https://github.com/JoeskiG'
		},
		email: {
			type: 'TO',
			iconClassName: 'fa-solid fa-envelope !text-text',
			text: 'info@suminda.dev',
			href: `mailto:info@suminda.dev`
		}
	};
</script>

<Container>
	<div class="vflex-s">
		<h1 class="text-3xl">WEBXPAY Sample</h1>
		<h2 class="text-xl">By Sam Gunawardana</h2>

		<div class="hflex">
			{#each Object.values(socials) as social}
				<a
					class="p-2 pb-0 text-3xl relative"
					{...social.type === 'LINK' && {
						target: '_blank',
						rel: 'noopener noreferrer'
					}}
					href={social.url || social.href}
				>
					<i class={social.iconClassName}></i>
				</a>
			{/each}
		</div>

		<p class="mt-3">
			Note: I am not affiliated with <a
				class="link"
				target="_blank"
				rel="noopener noreferrer"
				href="https://webxpay.com/"
			>
				WEBXPAY
			</a>. I built this sample to test implementations.
		</p>

		<div class="vflex-s !gap-2 mt-2 card card-padding">
			<h3 class="h3">Security</h3>

			<ul class="list-disc ml-6">
				<li class="text-destructive font-bold">
					Keep your public key secure and follow proper security practices.
					<ul class="list-disc ml-6">
						<li class="font-normal">
							It should only be accessible on your server, never in client-side code.
						</li>
					</ul>
				</li>

				<li>
					This sample stores the public key in browser cookies. Do <b>NOT</b> do this in production.
					This is purely for sample and testing purposes.
				</li>

				<!-- Privacy note. -->
				<li>
					This sample application may process user inputs temporarily to demonstrate
					functionality, but it does not store, retain, or log any user data. While
					deployed on Vercel and subject to their logging policies, I do not collect or
					persist any inputs. Note that any payment information may be handled or recorded
					by the payment gateway or related services, but this application itself does not
					retain that data.
				</li>
			</ul>
		</div>

		<div class="vflex-s !gap-2 mt-3 card card-padding">
			<h3 class="h3">About This Sample</h3>

			<ul class="list-disc ml-6">
				<li>Frontend: Svelte 5, Tailwind, Font Awesome 6 Icons</li>
				<li>Backend: SvelteKit server side functions</li>
				<li>
					<b>Signature checks and encryption can be done with browser APIs!</b>
					<ul class="list-disc ml-6">
						<li>You may be able to run this on edge runtimes.</li>
						<li class="text-destructive font-bold">Do NOT expose your public key.</li>
					</ul>
				</li>
			</ul>
		</div>

		<hr class="bg-border mt-6 mb-3 h-[1px] w-full" />

		<div class="vflex-s !gap-2 mt-3 card card-padding">
			<h3 class="h3 font-bold">Get Started</h3>

			<p>Before you get started, please read the above.</p>
			<p>
				If you've already read that, ensure you have done the following for this sample to
				work correctly:
			</p>

			<ol class="list-decimal ml-6">
				<li>
					Set the Return URL in your WEBXPAY account settings.
					<ul class="list-disc ml-6">
						<li>
							Set it to: <span class="font-mono font-semibold"
								>{page.url.origin}/callback</span
							>
						</li>
					</ul>
				</li>
			</ol>

			<div class="vflex-s mt-3">
				<a class="btn bg-primary !text-primary-foreground" href="/checkout">
					Start Testing
				</a>
			</div>
		</div>
	</div>
</Container>

<style lang="postcss">
	a:after {
		background: none repeat scroll 0 0 transparent;
		bottom: -3px;
		content: '';
		display: block;
		height: 1px;
		left: 0;
		position: absolute;
		transition:
			width 0.3s ease 0s,
			left 0.3s ease 0s;
		width: 0;
		@apply bg-primary;
	}

	a:hover:after {
		width: 100%;
		left: 0;
	}

	a:hover {
		@apply text-primary transition-all;
	}
</style>
