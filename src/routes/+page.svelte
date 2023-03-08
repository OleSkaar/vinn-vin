<script lang="ts">
	interface Participant {
		name: string;
		tickets: number;
		angle: number;
	}

	const participants: Participant[] = [
		{
			name: 'Alice',
			tickets: 5,
			angle: 0
		},
		{
			name: 'Bob',
			tickets: 15,
			angle: 0
		},
		{
			name: 'Carlos',
			tickets: 4,
			angle: 0
		},
		{
			name: 'Danielle',
			tickets: 10,
			angle: 0
		},
		{
			name: 'Eric',
			tickets: 5,
			angle: 0
		},
		{
			name: 'Fiodor',
			tickets: 5,
			angle: 0
		}
	];

	const totalTickets = participants.reduce((total, current) => total + current.tickets, 0);
	const diameter = 500;
	const radius = diameter / 2;

	participants.forEach((p, index) => {
		p.angle = Math.round((p.tickets / totalTickets) * 360);

		if (index > 0) {
			p.angle += participants[index - 1].angle;
		}

		if (p.angle > 360) {
			p.angle = 360;
		}
	});

	function getBackgroundColor(stringInput: string) {
		// Thanks to Aslam: https://stackoverflow.com/a/66494926
		let stringUniqueHash = [...stringInput].reduce((acc, char) => {
			return char.charCodeAt(0) + ((acc << 5) - acc);
		}, 0);
		return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
	}

	const getCoordinates = (angle: number) => {
		const result = {
			x: radius * Math.sin((Math.PI * 2 * angle) / 360),
			y: radius * Math.cos((Math.PI * 2 * angle) / 360)
		};

		return result;
	};
</script>

<svelte:head>
	<title>Vinn vin!</title>
</svelte:head>

<main>
	<h1>🍷 Vinn vin!</h1>
	<table>
		{#each participants as participant}
			<tr>
				<td>{participant.name}</td>
				<td>{participant.tickets}</td>
			</tr>
		{/each}
	</table>
	<svg width={diameter} height={diameter}>
		<g transform={`translate(${radius}, ${radius})`}>
			<circle r={radius} cx={0} cy={0} stroke-width="5"/>
			{#each participants as participant, i}
				{@const startCoords = getCoordinates(participants[i - 1]?.angle ?? 0)}
				{@const endCoords = getCoordinates(participant.angle)}
				{@const sliceSize = participant.angle - participants[i - 1]?.angle ?? 0}
				{@const id = `participant-${i.toString()}`}
				<path
					{id}
					d={`M 0 0 L ${startCoords.x} ${startCoords.y} A ${radius} ${radius} 0 ${
						sliceSize >= 180 ? 1 : 0
					} 0 ${endCoords.x} ${endCoords.y} z`}
					data-participant={participant.name}
					fill={getBackgroundColor(participant.name)}
					color="white"
				/>
				<text>
					<textPath href={`#${id}`} startOffset="50%" text-anchor="middle"
						>{participant.name}</textPath
					>
				</text>
			{/each}
		</g>
	</svg>
</main>

<style>
	main {
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

	textPath {
		fill: white;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-size: 24px;
	}
</style>
