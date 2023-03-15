<script lang="ts">
	import { participants } from '../stores/participants';
	import { getColorHashFromString, isValidParticipant } from '../utils';

	$: hasInvalidParticipant = !$participants.every(isValidParticipant);

	let validate = false;

	const addParticipant = () => {
		validate = hasInvalidParticipant;

		if (hasInvalidParticipant) {
			return;
		}

		const previousParticipant = $participants[$participants.length - 1];

		$participants = [
			...$participants,
			{
				id: previousParticipant.id + 1,
				name: '',
				tickets: 0,
				firstTicketIndex: previousParticipant.firstTicketIndex + previousParticipant.tickets,
			}
		];
	};

	const removeParticipant = (id: number) => {
		$participants = $participants.filter((participant) => participant.id !== id);
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
		$participants = [{ id: 0, name: '', tickets: 0, firstTicketIndex: 0 }];
	};
</script>

<div class="wrapper">
	{#each $participants as participant (participant.id)}
		<div class="participant">
			<button
				class="remove-button"
				aria-label="Fjern spiller"
				disabled={$participants.length === 1}
				on:click={() => removeParticipant(participant.id)}>🗑️</button
			>
			<form class:validate on:submit|preventDefault={addParticipant}>
				<div
					class="color-label"
					style={`background-color: ${getColorHashFromString(participant.name)}`}
				/>
				<input class="name" bind:value={participant.name} required use:focus />
				<input
					class="tickets"
					type="number"
					min="1"
					required
					bind:value={participant.tickets}
					on:keydown={submitOnEnter}
				/>
			</form>
		</div>
	{/each}
	<button on:click={addParticipant}>Legg til</button>
	<button class="reset" on:click={resetParticipants}>Fjern alle</button>
</div>

<style>
	form {
		display: grid;
		grid-template-columns: [color-label] 0.25fr [name] 3fr [tickets] 0.5fr [end];
		gap: 10px;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.participant {
		display: flex;
		gap: 10px;
	}

	.color-label {
		grid-column-start: color-label;
		align-self: center;
		width: 25px;
		height: 25px;
		justify-self: center;
	}

	.name {
		grid-column-start: name;
	}

	.tickets {
		grid-column-start: tickets;
	}

	input {
		width: 100%;
		padding: 10px;
		font-size: 1.2em;
		font-family: system-ui;
	}

	input[type='number']:not(:focus):not(:hover) {
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
