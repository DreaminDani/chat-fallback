<script>
	import { onMount } from 'svelte';

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

{#if hasFinishedQuestions}
	<h1>Yay!</h1>
	{#if isChatParticipant}
		<h2>chat with us</h2>
	{:else}
		<h2>join zoom</h2>
		{#if noHeadphones}
			<p>If you have headphones, please connect them now</p>
		{/if}
	{/if}
{:else}
	<h1>Pretty header goes here</h1>
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
