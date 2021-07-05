<script>
	import { onMount } from 'svelte';
	import { variables } from '$lib/variables';

	let triggerChat;
	onMount(async () => {
		const module = await import('$lib/ChatCode');
		triggerChat = module.triggerChat;
	});
	let hasFinishedQuestions = false;
	let isChatParticipant = false;
	let noHeadphones = false;

	let answers = new Array(4);
	function updateAnswers(index, answer, options) {
		answers[index] = answer;
		if (options && options.forceChat) {
			hasFinishedQuestions = true;
			isChatParticipant = true;
			triggerChat();
		}
		if (options && options.skipTo) {
			for (let i = index + 1; i < options.skipTo; i++) {
				answers[i] = 'Skipped';
			}
		}
		if (options && options.noHeadphones) {
			noHeadphones = true;
		}
		if (index === answers.length - 1) {
			hasFinishedQuestions = true;
		}
	}
</script>

<svelte:head>
	<title>Join a session</title>
</svelte:head>

<header>
	<img height="100px" src="/favicon.png" alt="Company Logo" />
	<h1>Join a session</h1>
</header>
<main>
	<div class="content">
		{#if hasFinishedQuestions}
			<h1>Thank you for your answers</h1>
			{#if isChatParticipant}
				<h2>Type in the chat window to begin the conversation</h2>
			{:else}
				<h2>Tap the button below to join the conversation</h2>
				<a id="zoom-url" href={variables.zoom_url}>Join Zoom</a>
				{#if noHeadphones}
					<p>If you have headphones, please connect them now</p>
				{/if}
				<div class="download-zoom">
					<h4>Don't have Zoom? Download it below:</h4>
					<a
						href="https://play.google.com/store/apps/details?id=us.zoom.videomeetings&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
						><img
							alt="Get it on Google Play"
							src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
						/></a
					>
					<a
						id="apple"
						href="https://apps.apple.com/us/app/zoom-cloud-meetings/id546505307?itsct=apps_box_badge&amp;itscg=30200"
						style="display: inline-block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px;"
						><img
							src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1344988800&h=d0f9a63b10ac7b51417f4ee15800b22c"
							alt="Download on the App Store"
							style="border-radius: 13px; width: 250px; height: 83px;"
						/></a
					>
				</div>
			{/if}
		{:else}
			<h2>Before we get started, please answer the following questions:</h2>
			{#if answers[0] === undefined}
				<h3>Are you in a quiet place or somewhere without much background noise?</h3>
				<button on:click={() => updateAnswers(0, 'Yes', { skipTo: 3 })}> Yes </button>
				<button on:click={() => updateAnswers(0, 'No')}> No </button>
			{:else if answers[1] === undefined}
				<h3>Can you move to somewhere quieter?</h3>
				<button on:click={() => updateAnswers(1, 'Yes')}> Yes </button>
				<button on:click={() => updateAnswers(1, 'No', { forceChat: 2 })}> No </button>
			{:else if answers[2] === undefined}
				<h3>Great! Please move to somewhere quiter before continuing...</h3>
				<button on:click={() => updateAnswers(2, 'Done')}> Done </button>
			{:else if answers[3] === undefined}
				<h3>Do you have headphones connected?</h3>
				<p>This will make it easier to hear you and for you to hear us</p>
				<button on:click={() => updateAnswers(3, 'Yes')}> Yes </button>
				<button on:click={() => updateAnswers(3, 'No', { noHeadphones: true })}> No </button>
			{/if}
		{/if}
	</div>
</main>

<style>
	:global(body) {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
		min-height: 100vh;
		margin: 0;
		background: #222654;
		color: rgba(255, 255, 255, 0.8);
	}

	:global(#svelte) {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		margin-bottom: 4vh;
	}

	header img {
		padding: 8px 16px;
	}

	header h1 {
		padding: 8px 16px;
	}

	h2 {
		color: rgba(255, 255, 255, 0.5);
	}

	h3 {
		margin-top: 0;
		margin-bottom: 0;
		font-size: 3rem;
	}

	main {
		padding: 0 1rem;
	}

	.content {
		max-width: 1024px;
		margin: 0 auto;
		height: 100%;
	}

	#zoom-url,
	button {
		color: #e8eafc;
		border: 2px solid #a19cdc;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 0.6rem;
		padding-bottom: 0.6rem;
		background: transparent;
		border-radius: 8px;
		transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
		font-weight: 800;
		line-height: 1.5;
		font-size: 1.5rem;
		margin-top: 1.5rem;
		margin-right: 0.5rem;
	}

	#zoom-url:hover,
	button:hover {
		color: #fff;
		background-color: #a19cdc;
	}

	#zoom-url {
		display: inline-block;
		margin-top: 0.5rem;
		font-size: 2rem;
		text-align: center;
	}

	.download-zoom {
		margin-top: 4rem;
	}

	.download-zoom h4 {
		margin: 0;
	}

	.download-zoom img {
		width: 200px;
	}

	.download-zoom #apple {
		width: 180px !important;
	}

	.download-zoom #apple img {
		padding-top: 17px;
		height: 54px !important;
		width: auto !important;
	}

	@media (max-width: 800px) {
		:global(html) {
			font-size: 0.7em;
		}

		main {
			display: flex;
			flex-direction: column;
			flex-grow: 2;
		}

		.content {
			display: flex;
			flex-direction: column;
			flex-grow: 2;
			margin: 0;
		}

		button {
			display: block;
			width: 100%;
			margin-bottom: 1rem;
			margin-top: 0;
		}

		button:first-of-type {
			margin-top: auto;
		}
	}
</style>
