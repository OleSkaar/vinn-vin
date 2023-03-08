<script lang="ts">
	import Sector from '../components/Sector.svelte';
	import type { SectorData, Participant } from '../types';
	import { getColorHashFromString } from '../utils';

	const participants: Participant[] = [
		{
			name: 'Alice',
			tickets: 5
		},
		{
			name: 'Bob',
			tickets: 15
		},
		{
			name: 'Carlos',
			tickets: 4
		},
		{
			name: 'Danielle',
			tickets: 10
		},
		{
			name: 'Eric',
			tickets: 5
		},
		{
			name: 'Fiodor',
			tickets: 5
		},
		{
			name: 'Gordon',
			tickets: 5
		},
		{
			name: 'Haley',
			tickets: 4
		},
		{
			name: 'Inagaki',
			tickets: 5
		},
		{
			name: 'Jolene',
			tickets: 3
		},
		{
			name: 'Katie',
			tickets: 5
		},
		{
			name: 'Llewyn',
			tickets: 8
		},
		{
			name: 'Minney',
			tickets: 5
		},
		{
			name: 'Nils',
			tickets: 4
		},
		{
			name: 'Oleg',
			tickets: 5
		}
	];

	const totalTickets = participants.reduce((total, current) => total + current.tickets, 0);
	const diameter = 750;
	const radius = diameter / 2;
	const angle = (tickets: number) => (tickets / totalTickets) * 360;
	const roundDegrees = (angle: number) => Math.min(angle, 360);

	const sectors = participants.reduce((sectors: SectorData[], participant, index) => {
		if (index === 0) {
			sectors.push({
				participant,
				startAngle: 0,
				endAngle: roundDegrees(angle(participant.tickets))
			});

			return sectors;
		}

		const startAngle = sectors[index - 1].endAngle;

		sectors.push({
			participant,
			startAngle,
			endAngle: roundDegrees(startAngle + angle(participant.tickets))
		});

		return sectors;
	}, []);
</script>

<svelte:head>
	<title>Vinn vin!</title>
</svelte:head>

<main>
	<h1>🍷 Vinn vin!</h1>
	<section class="container">
	<table>
		{#each participants as participant, i}
			<tr>
				<td style={`background-color: ${getColorHashFromString(participant.name)}; color: white;`}></td>
				<td>{participant.name}</td>
				<td>{participant.tickets}</td>
			</tr>
		{/each}
		<tr>
			<td><strong>Total</strong></td>
			<td>{participants.length}</td>
		</tr>
	</table>
	<svg width={diameter} height={diameter}>	
		<g transform={`translate(${radius}, ${radius})`}>
			<circle r={radius} cx={0} cy={0} stroke-width="5" />
			{#each sectors as sector, index}
				<Sector {sector} {index} {radius} />
			{/each}
		</g>
	</svg>
	</section>
</main>

<style>
	main {
		font-family: system-ui;
		margin: 0 auto;
		max-width: 1000px;
	}

	svg {
		width: 500px;
		overflow: initial;
	}

	circle {
		stroke: black;
		fill: transparent;
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
