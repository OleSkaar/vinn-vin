<script lang="ts">
	import type { SectorData } from '../types';
	import Sector from '../components/Sector.svelte';
	import { findWinningTicket, participants } from '../stores/participants';
	import { isValidParticipant } from '../utils';
	import { drawTicket } from '../utils/drawTicket';
	import { ticketLineStore } from '../stores/ticketLines';

	export let diameter: number;

	let ticketLines = false;

	ticketLineStore.subscribe((value) => {
		ticketLines = value;
	});

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
		const audio = new Audio('drumroll.wav');
		audio.play();
		const ticketIndex = drawTicket(totalTickets);
		const winningTicket = findWinningTicket($participants, ticketIndex);

		console.log({ticketIndex})
		console.log({winningTicket});

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

	const resetWheel = () => {
		if (confirm("Vil du tilbakestille hjulet?") === true) {
			rotation = startRotation;
		}
	};
</script>

<div class="container">
	<div class="wheelContainer">
		<svg width={diameter} height={diameter} shape-rendering="geometricPrecision">
			<g transform={`translate(${radius}, ${radius})`}>
				<circle class="wheel" r={radius} cx={0} cy={0} stroke-width="5" />
				<g id="sectors" class="sectors-animate" style={`transform: rotate(${rotation}deg)`}>
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
		<button class="spinTheWheel" on:click={spinTheWheel}>Snurr</button>
	</div>
	<div class="controls">
		<!-- {#if winner.length > 0}
			<p>{winner}</p>
		{/if} -->
		<input id="wheelsize" type="range" bind:value={diameter} min=400 max=1000>
		<label for="wheelsize">Diameter</label>
		<button disabled={rotation === startRotation} on:click={resetWheel}>🔄 Tilbakestill hjul</button>
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

	circle {
		stroke: black;
	}

	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.wheel {
		fill: transparent;
	}

	.center-circle {
		fill: gainsboro;
	}

	.sectors-animate {
		transition: transform 6s cubic-bezier(0.25, 1, 0.5, 1);
	}

	.controls {
		display: flex;
		justify-content: flex-end;
		gap: 20px;
		align-items: center;
		font-size: 1.2em;
		width: 100%;
	}

	.wheelContainer {
		position: relative;
	}

	.spinTheWheel {
		font-size: 2rem;
		border-radius: 50%;
		height: 140px;
		width: 140px;
		border: 1px solid black;
		position: absolute;
		text-transform: uppercase;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
