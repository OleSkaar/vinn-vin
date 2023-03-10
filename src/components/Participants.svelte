<script lang="ts">
	import { participants } from '../stores/participants';
	import { getColorHashFromString, isValidParticipant } from '../utils';

	$: participantCount = $participants.length;
	$: hasInvalidParticipant = !$participants.every(isValidParticipant);

	let validate = false;

	const addParticipant = () => {
		validate = hasInvalidParticipant;

		if (hasInvalidParticipant) {
			return;
		}

		$participants = [
			...$participants,
			{
				id: participantCount,
				name: '',
				tickets: 0
			}
		];
	};

	const focus = (el: HTMLElement) => {
		el.focus();
	};

	const submitOnEnter = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			addParticipant();
		}
	};

	const resetParticipants = () => {
		$participants = [{ id: 0, name: '', tickets: 0 }];
	};
</script>

<div class="participants">
	{#each $participants as participant (participant.id)}
		<form class:validate on:submit|preventDefault={addParticipant}>
			<div class="circle" style={`background-color: ${getColorHashFromString(participant.name)}`} />
			<input class="participant" bind:value={participant.name} required use:focus />
			<input
				class="tickets"
				type="number"
				min="1"
				required
				bind:value={participant.tickets}
				on:keydown={submitOnEnter}
			/>
		</form>
	{/each}
	<button on:click={addParticipant}>Add</button>
	<hr />
	<button class="reset" on:click={resetParticipants}>Reset</button>
</div>

<style>
	.participants {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.participant {
		width: 85%;
	}

	.tickets {
		width: 10%;
	}

	.circle {
		width: 25px;
		height: 25px;
	}

	.reset {
		margin-top: auto;
	}

	hr {
		width: 100%;
	}

	form {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		color: #e7e7e7;
	}

	input {
		padding: 10px;
		font-size: 1.2em;
		font-family: system-ui;
	}

	input[type='number']:not(:focus) {
		appearance: textfield;
		-moz-appearance: textfield;
		text-align: center;
	}

	.validate > input:invalid {
		outline: 1px solid darkred;
	}

	button {
		font-size: 1.2em;
		padding: 10px;
		cursor: pointer;
	}
</style>
