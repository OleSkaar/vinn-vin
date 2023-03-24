<script lang="ts">
	import type { SectorData } from '../types';
	import Sector from '../components/Sector.svelte';
	import { findWinningTicket, participants } from '../stores/participants';
	import { isValidParticipant } from '../utils';
	import { drawTicket } from '../utils/drawTicket';

	export let diameter: number;

	let ticketLines = false;

	$: radius = diameter / 2;

	// Use negative angles to move in clockwise direction
	const angle = (fraction: number) => fraction * 360 * -1;
	// Setting the upper limit of degrees to exactly 360 causes a rendering bug in Chrome
	const maxDegrees = (angle: number) => Math.max(angle, -359.9999);

	$: validParticipants = $participants.filter((participant) => isValidParticipant(participant));
	$: totalTickets = validParticipants.reduce((total, current) => (total += current.tickets), 0);

	$: sectors = validParticipants.reduce((sectors: SectorData[], participant, index) => {
		const startAngle = index === 0 ? 0 : sectors[index - 1].endAngle;
		const endAngle = maxDegrees(startAngle + angle(participant.tickets / totalTickets));

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

	const startRotation = 180;
	let winner = '';
	let winningAngle = 0;
	let prevWinningAngle = 0;
	let rotation = startRotation;

	
	const spinTheWheel = () => {
		var audio = new Audio('drumroll.wav');
		audio.play();
		const ticketIndex = drawTicket(totalTickets);
		const winningTicket = findWinningTicket($participants, ticketIndex);

		prevWinningAngle = winningAngle;

		const ticket = ticketIndex + 1;
		const ticketAngle = angle(ticket / totalTickets);
		const prevAngle = angle((ticket - 1) / totalTickets);
		winningAngle = (prevAngle + ticketAngle) / 2;
		rotation === startRotation
			? (rotation = winningAngle + startRotation + 1080)
			: (rotation = rotation - prevWinningAngle + winningAngle + 1080);

		winner = `${winningTicket?.name}, vinnerlodd: ${ticket}`;
	};
</script>

<div>
	<svg width={diameter} height={diameter} shape-rendering="geometricPrecision">
		<g transform={`translate(${radius}, ${radius})`}>
			<circle class="wheel" r={radius} cx={0} cy={0} stroke-width="5" />
			<g class="sectors" style={`transform: rotate(${rotation}deg)`}>
				{#each sectors as sector (sector.participant.id)}
					<Sector {sector} {radius} {ticketLines} isOnlySector={sectors.length === 1} />
				{/each}
			</g>
			<circle class="center-circle" r={radius * 0.05} cx={0} cy={0} />
		</g>
		<polygon
			transform={`translate(0, -35)`}
			points={`${radius - 25},${0} ${radius + 25},${0} ${radius},${50}`}
			fill="black"
		/>
	</svg>
	<div class="controls">
		<!-- {#if winner.length > 0}
			<p>{winner}</p>
		{/if} -->
		<p>🎟️ Antall lodd: {totalTickets}</p>
		<button on:click={spinTheWheel}>Trekk lodd!</button>
		<div class="show-tickets-container">
			<input type="checkbox" name="Ticket lines" bind:checked={ticketLines} />
			<label for="Ticket lines">Vis hvert lodd</label>
		</div>
	</div>
</div>

<style>
	svg {
		overflow: initial;
	}

	
	button {
		font-size: 1.2em;
		padding: 10px;
		cursor: pointer;
	}
	
	input {
		width: 20px;
		height: 20px;
	}

	input[type='checkbox'] {
		cursor: pointer;
	}

	circle {
		stroke: black;
	}
	
	.wheel {
		fill: transparent;
	}

	.center-circle {
		fill: gainsboro;
	}

	.sectors {
		transition: transform 6s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 100px;
		font-size: 1.2em;
	}

	.show-tickets-container {
		display: flex;
		gap: 5px;
		align-items: center;
	}
</style>
