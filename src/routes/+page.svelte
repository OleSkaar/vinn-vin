<script lang="ts">
	import WheelOfFortune from '../components/WheelOfFortune.svelte';
	import Participants from '../components/Participants.svelte';

	const diameter = 500;
</script>

<svelte:head>
	<title>Vinn vin!</title>
</svelte:head>

<main>
	<h1>🍷 Vinn vin!</h1>
	<section class="container">
		<Participants />
		<WheelOfFortune {diameter} />
	</section>
</main>

<style>
	:global(*),
	:global(*):before,
	:global(*):after {
		box-sizing: border-box;
	}

	main {
		font-family: system-ui;
		margin: 0 auto;
	}

	h1 {
		text-align: center;
		font-size: 3em;
		margin-bottom: 1.5em;
	}

	.container {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 50px;
	}
</style>
