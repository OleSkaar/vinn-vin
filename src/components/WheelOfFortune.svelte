<script lang="ts">
	import type { SectorData } from '../types';
	import Sector from '../components/Sector.svelte';
    import { participants } from '../stores/participants';

	export let diameter: number;

	$: radius = diameter / 2;

	const angle = (fraction: number) => fraction * 360;
	const roundDegrees = (angle: number) => Math.min(angle, 360);

	$: totalTickets = $participants.reduce((total, current) => (total += current.tickets), 0);
	$: sectors = $participants.reduce((sectors: SectorData[], participant, index) => {
		if (index === 0) {
			sectors.push({
				participant,
				startAngle: 0,
				endAngle: roundDegrees(angle(participant.tickets / totalTickets))
			});

			return sectors;
		}

		const startAngle = sectors[index - 1].endAngle;

		sectors.push({
			participant,
			startAngle,
			endAngle: roundDegrees(startAngle + angle(participant.tickets / totalTickets))
		});
		return sectors;
	}, []);
</script>

<svg width={diameter} height={diameter}>
	<g transform={`translate(${radius}, ${radius})`}>
		<circle r={radius} cx={0} cy={0} stroke-width="5" />
		{#each sectors as sector (sector.participant.id)}
				<Sector {sector} {radius} />
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
