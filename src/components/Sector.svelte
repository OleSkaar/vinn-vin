<script lang="ts">
	import type { Coordinates, SectorData } from '../types';
	import { getColorHashFromString, getCoordinatesOnCircle } from '../utils';

	export let sector: SectorData;
	export let radius: number;

    $: participant = sector.participant;
    $: startAngle = sector.startAngle;
    $: endAngle = sector.endAngle;
    $: radius = radius;

	const getCoords = (angle: number) => getCoordinatesOnCircle(radius, angle);
	const line = (coords: Coordinates) => `M 0 0 L ${coords.x} ${coords.y}`;

	$: startCoords = getCoords(startAngle);
	$: endCoords = getCoords(endAngle);
	$: arcLength = endAngle - startAngle;
	$: largeArcFlag = arcLength >= 180 ? 1 : 0;

	$: sectorPath = `${line(startCoords)} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${
		endCoords.x
	} ${endCoords.y} z`;
	$: fill = getColorHashFromString(participant.name);
	$: id = `participant-${participant.id}`;
	$: href = `#${id}`;

	$: centerAngle = (startAngle + endAngle) / 2;
	$: centerCoords = getCoords(centerAngle);
	$: centerPath = line(centerCoords);
</script>

<path d={sectorPath} {fill} class="sector" />
<path d={centerPath} {id} />
<text>
	<textPath {href} startOffset="50%">{participant.name}</textPath>
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
