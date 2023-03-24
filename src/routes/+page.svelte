<script lang="ts">
	import WheelOfFortune from '../components/WheelOfFortune.svelte';
	import Participants from '../components/Participants.svelte';

	$: diameter = 700;
</script>

<svelte:head>
	<title>Vinn vin!</title>
</svelte:head>

<main>
	<h1>🍷 Vinn vin!</h1>
	<span><strong>BETA</strong></span>
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
		padding: 0 50px;
	}

	h1 {
		display: inline-block;
		font-size: 2.5em;
	}

	span {
		margin-left: 10px;
	}

	.container {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 150px;
	}
</style>
