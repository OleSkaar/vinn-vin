<script lang="ts">
	import type { SectorData } from '../types';
	import { getColorHashFromString } from '../utils';
	import { getSectorSvgData } from '../utils/getSectorSvgData';

	export let sector: SectorData;
	export let radius: number;

	$: svgData = getSectorSvgData(sector, radius);
	$: fill = getColorHashFromString(sector.participant.name);
</script>

<path d={svgData.sectorPath} {fill} class="sector" />
<path d={svgData.centerPath} id={`participant-${sector.participant.id}`} />
<text>
	<textPath href={`#participant-${sector.participant.id}`} startOffset="50%">{sector.participant.name}</textPath>
</text>

<style>
	textPath {
		fill: white;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: 24px;
	}

	.sector:hover {
		transition: transform 0.125s ease;
		transform: translate3d(50px, 50px, 0);
		cursor: pointer;
	}
</style>
