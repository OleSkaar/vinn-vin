<script lang="ts">
	import type { Coordinates, SectorData } from '../types';
	import { getColorHashFromString, getCoordinatesOnCircle } from '../utils'

    export let sector: SectorData;
	export let index: number;
	export let radius: number;

    const { participant, startAngle, endAngle } = sector;

    const getCoords = (angle: number) => getCoordinatesOnCircle(radius, angle);
    const line = (coords: Coordinates) => `M 0 0 L ${coords.x} ${coords.y}`;

	const startCoords = getCoords(startAngle);
	const endCoords = getCoords(endAngle);
	const arcLength = endAngle - startAngle;
	const largeArcFlag = arcLength >= 180 ? 1 : 0;

	const sectorPath = `${line(startCoords)} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${endCoords.x} ${endCoords.y} z`;
	const fill = getColorHashFromString(participant.name);
	const id = `participant-${index.toString()}`;
	const href = `#${id}`;

    const centerAngle = (startAngle + endAngle) / 2;
    const centerCoords = getCoords(centerAngle);
    const centerPath = line(centerCoords);
</script>

<path d={sectorPath} {fill} />
<path d={centerPath} {id}/>
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
</style>
