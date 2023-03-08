<script lang="ts">
	import { getColorHashFromString } from '../utils';
	import WheelOfFortune from '../components/WheelOfFortune.svelte';
	import { participants } from '../stores/participants';

	let participantCount = 0;

	const addParticipant = () => {
		$participants = [...$participants, {
			id: participantCount.toString(),
			name: 'Name' + Math.random(),
			tickets: Math.max(Math.floor(Math.random() * 10), 1),
		}];

		participantCount++;
	};

	const diameter = 750;
</script>

<svelte:head>
	<title>Vinn vin!</title>
</svelte:head>

<main>
	<h1>🍷 Vinn vin!</h1>
	<section class="container">
		<table>
			{#each $participants as participant (participant.id)}
				<tr>
					<td
						style={`background-color: ${getColorHashFromString(participant.name)}; color: white;`}
					/>
					<td>{participant.name}</td>
					<td>{participant.tickets}</td>
				</tr>
			{/each}
			<tr>
				<td><strong>Total</strong></td>
				<td>{$participants.length}</td>
			</tr>
		</table>

		<button on:click={addParticipant}>Add</button>

		<WheelOfFortune {diameter} />
	</section>
</main>

<style>
	main {
		font-family: system-ui;
		margin: 0 auto;
		max-width: 1000px;
	}

	h1 {
		text-align: center;
		font-size: 4em;
	}

	.container {
		display: flex;
		justify-content: space-evenly;
	}
</style>
