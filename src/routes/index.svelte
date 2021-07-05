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
			<h1>Yay!</h1>
			{#if isChatParticipant}
				<h2>chat with us</h2>
			{:else}
				<h2>join zoom</h2>
				<a href={variables.zoom_url}>{variables.zoom_url}</a>
				{#if noHeadphones}
					<p>If you have headphones, please connect them now</p>
				{/if}
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

	button:hover {
		color: #fff;
		background-color: #a19cdc;
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
