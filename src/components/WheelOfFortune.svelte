<script lang="ts">
	import type { SectorData } from '../types';
	import Sector from '../components/Sector.svelte';
	import { participants } from '../stores/participants';
	import { getCoordinatesOnCircle, isValidParticipant, line } from '../utils';
	import { drawTicket } from '../utils/drawTicket';

	export let diameter: number;

	$: radius = diameter / 2;

	// Use negative angles to move in clockwise direction
	const angle = (fraction: number) => fraction * 360 * -1;
	//* Setting the upper limit of degrees to exactly 360 causes a rendering bug in Chrome
	const maxDegrees = (angle: number) => Math.max(angle, -359.9999);

	$: validParticipants = $participants.filter((participant) => isValidParticipant(participant));
	$: totalTickets = validParticipants.reduce((total, current) => (total += current.tickets), 0);

	$: sectors = validParticipants.reduce((sectors: SectorData[], participant, index) => {
		const startAngle = index === 0 ? 0 : sectors[index - 1].endAngle;
		const endAngle = maxDegrees((startAngle + angle(participant.tickets / totalTickets)));

		const ticketAngle = (endAngle - startAngle) / participant.tickets;
		const ticketAngles = [...Array<number>(participant.tickets)].map((_, i) => {
			return maxDegrees(startAngle + ticketAngle * i);
		});

		sectors.push({
			participant,
			startAngle,
			endAngle,
			ticketAngles
		});

		return sectors;
	}, []);

	let winner = '';
	let winningAngle = 0;
	let rotation = 180;

	const spinTheWheel = () => {
		const ticket = 0;
		const winningSector = sectors.find((sector) => {
			const { participant } = sector;

			return (
				ticket >= participant.firstTicketIndex &&
				ticket <= participant.firstTicketIndex + participant.tickets - 1
			);
		});

		const ticketAngle = angle(ticket / totalTickets);
		const prevAngle = angle ((ticket - 1) / totalTickets);
		console.log(ticketAngle, prevAngle)
		winningAngle = (prevAngle + ticketAngle) / 2;
		console.log(winningAngle)

		winner = `${winningSector?.participant.name}, ticket: ${ticket}. Angle: ${winningAngle}`;
	};
</script>

<div>
	<svg width={diameter} height={diameter} shape-rendering="geometricPrecision">
		<g transform={`translate(${radius}, ${radius})`}>
			<circle r={radius} cx={0} cy={0} stroke-width="5" />
			<g class="sectors" style={`transform: rotate(${rotation}deg)`}>
				{#each sectors as sector (sector.participant.id)}
					<Sector {sector} {radius} isOnlySector={sectors.length === 1} />
				{/each}
				{#if winner.length > 0}
					<path
						d={line(getCoordinatesOnCircle(radius, winningAngle))}
						stroke-width="5"
						stroke="blue"
					/>
				{/if}
			</g>
		</g>
		<polygon
			transform={`translate(35, 0)`}
			points={`${diameter - 50},${radius} ${diameter},${radius + 25} ${diameter},${radius - 25}`}
			fill="black"
		/>
	</svg>

	<button on:click={spinTheWheel}>Trekk lodd!</button>
	{#if winner.length > 0}
		<p>{winner}</p>
	{/if}
</div>

<style>
	svg {
		overflow: initial;
	}

	circle {
		stroke: black;
		fill: transparent;
	}

	button {
		font-size: 1.2em;
		padding: 10px;
		cursor: pointer;
	}

	.sectors {
		transition: transform 1s ease;
	}
</style>
