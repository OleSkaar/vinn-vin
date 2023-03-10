<script lang="ts">
	import type { SectorData } from '../types';
	import Sector from '../components/Sector.svelte';
	import { participants } from '../stores/participants';
	import { isValidParticipant } from '../utils';

	export let diameter: number;

	$: radius = diameter / 2;

	const angle = (fraction: number) => fraction * 360;
	/* Setting the upper limit of degrees to exactly 360 causes a rendering bug in Chrome */
	const maxDegrees = (angle: number) => Math.min(angle, 359.9999);

	$: validParticipants = $participants.filter((participant) => isValidParticipant(participant));
	$: totalTickets = validParticipants.reduce((total, current) => (total += current.tickets), 0);

	$: sectors = validParticipants.reduce((sectors: SectorData[], participant, index) => {
		const startAngle = index === 0 ? 0 : sectors[index - 1].endAngle;

		sectors.push({
			participant,
			startAngle,
			endAngle: maxDegrees(startAngle + angle(participant.tickets / totalTickets))
		});

		return sectors;
	}, []);
</script>

<svg width={diameter} height={diameter} shape-rendering="geometricPrecision">
	<g transform={`translate(${radius}, ${radius})`}>
		<circle r={radius} cx={0} cy={0} stroke-width="5" />
		{#each sectors as sector (sector.participant.id)}
			<Sector {sector} {radius} isOnlySector={sectors.length === 1} />
		{/each}
	</g>
</svg>

<style>
	svg {
		overflow: initial;
	}

	circle {
		stroke: black;
		fill: transparent;
	}
</style>
