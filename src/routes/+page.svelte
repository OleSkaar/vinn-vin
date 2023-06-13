<script lang="ts">
	import WheelOfFortune from '../components/WheelOfFortune.svelte';
	import Participants from '../components/Participants.svelte';

	$: diameter = 600;
</script>

<svelte:head>
	<title>Vinn vin!</title>
</svelte:head>

<main>
	<header>
		<h1>🍷 Vinn vin!</h1>
		<span><strong>BETA</strong></span>
	</header>
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

	:global(html) {
		height: 100%;
	}

	:global(body) {
		margin: 0;
		min-height: 100%;
	}

	:global(main) {
		height: 100vh;
		display: grid;
		grid-template-rows: min-content auto;
	}

	main {
		font-family: system-ui;
		margin: 0 auto;
		padding: 20px;
	}

	h1 {
		display: inline-block;
		font-size: 2.5em;
		margin: 0 0 20px 0;
	}

	span {
		margin-left: 10px;
	}

	.container {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 20px;
	}
</style>
