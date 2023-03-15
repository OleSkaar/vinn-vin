<script lang="ts">
	import type { SectorData } from '../types';
	import { getColorHashFromString } from '../utils';
	import { getSectorSvgData } from '../utils/getSectorSvgData';

	export let sector: SectorData;
	export let radius: number;
	export let isOnlySector: boolean;

	$: svgData = getSectorSvgData(sector, radius);
	$: fill = getColorHashFromString(sector.participant.name);
</script>

<path d={svgData.sectorPath} {fill} class="sector" class:stroke="{!isOnlySector}" />
<path d={svgData.centerPath} id={`participant-${sector.participant.id}`} />
{#each svgData.ticketPaths as ticketPath}
	<path d={ticketPath} class="stroke" />
{/each}
<text>
	<textPath href={`#participant-${sector.participant.id}`} startOffset="50%">{sector.participant.name}</textPath>
</text>

<style>
	text {
		pointer-events: none;
	}

	textPath {
		fill: white;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: 24px;
	}

	.sector {
		cursor: pointer;
	}

	.stroke {
		stroke: black;
		stroke-width: 1;
	}

	.stroke:hover {
		stroke-width: 5;
	}
</style>
