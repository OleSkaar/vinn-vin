<script lang="ts">
	import { participants } from '../stores/participants';
	import { getColorHashFromString } from '../utils';

	$: participantCount = $participants.length;

	const names = [
		'Emma',
		'Liam',
		'Olivia',
		'Noah',
		'Ava',
		'Elijah',
		'Isabella',
		'Lucas',
		'Sophia',
		'Mason',
		'Mia',
		'Logan',
		'Charlotte',
		'Ethan',
		'Amelia',
		'Oliver',
		'Harper',
		'Jackson',
		'Evelyn',
		'Aiden',
		'Abigail',
		'Sebastian',
		'Emily',
		'Caleb',
		'Elizabeth',
		'Benjamin',
		'Mila',
		'Leo',
		'Ella',
		'Michael',
		'Avery',
		'Alexander',
		'Sofia',
		'Ezra',
		'Camila',
		'Grayson',
		'Aria',
		'James',
		'Scarlett',
		'Jacob',
		'Victoria',
		'William',
		'Madison',
		'Isaiah',
		'Luna',
		'Daniel',
		'Grace',
		'Hudson',
		'Chloe',
		'Henry',
		'Penelope',
		'Owen',
		'Riley',
		'Wyatt',
		'Layla',
		'Matthew',
		'Lily',
		'Luke',
		'Ellie',
		'Levi',
		'Aurora',
		'Nicholas',
		'Nora',
		'David',
		'Hannah',
		'Jaxon',
		'Aaliyah',
		'John',
		'Addison',
		'Cameron',
		'Stella',
		'Nathan',
		'Savannah',
		'Dylan',
		'Brooklyn',
		'Eva',
		'Violet',
		'Caroline',
		'Maya',
		'Gabriel',
		'Nova',
		'Anthony',
		'Eleanor',
		'Maddox',
		'Hazel',
		'Daisy',
		'Jasmine',
		'Adam',
		'Audrey',
		'Aaron',
		'Bella',
		'Isabelle',
		'Claire',
		'Connor',
		'Lucy',
		'Evelyn',
		'Alice',
		'Jordan',
		'Lillian',
		'Adrian',
		'Zoe',
		'Eleanor',
		'Ellie',
		'Samantha',
		'Leah',
		'Alexa',
		'Natalie',
		'Nicholas',
		'Maria',
		'Cole',
		'Naomi'
	];

	const addParticipant = () => {
		$participants = [
			...$participants,
			{
				id: participantCount.toString(),
				name: names[Math.floor(Math.random() * 100 - 1)],
				tickets: Math.max(Math.floor(Math.random() * 10), 1)
			}
		];

		participantCount++;
	};
</script>

<div class="participants">
	{#each $participants as participant}
		<form style={`background-color: ${getColorHashFromString(participant.name)}; color: white;`}>
			<input bind:value={participant.name} placeholder="Name" required />
			<input type="number" bind:value={participant.tickets} min="0" required />
		</form>
	{/each}
	<button on:click={addParticipant}>Add</button>
</div>

<style>
	.participants {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	form {
		padding: 10px;
		display: flex;
        gap: 10px;
        color: #e7e7e7;
	}

	input {
		padding: 10px;
        font-size: 1.2em;
        font-family: system-ui;
	}

    button {
        font-size: 1.2em;
        padding: 10px;
        cursor: pointer;
    }

	div {
		display: flex;
	}
</style>
