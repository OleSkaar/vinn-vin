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
				id: previousParticipant ? previousParticipant.id + 1 : 0,
				name: '',
				tickets: 1
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
		$participants = [{ id: 0, name: '', tickets: 1 }];
	};
</script>

<div class="wrapper">
	<div class="participants">
		{#each $participants as participant (participant.id)}
			<div class="participant">
				<button
					class="remove-button"
					aria-label="Fjern spiller"
					disabled={$participants.length === 1}
					on:click={() => removeParticipant(participant.id)}
					style={`background-color: ${getColorHashFromString(participant.name)}`}
				>
					<!-- <svg
						width="10"
						height="10"
						viewBox="0 0 50 50"
						stroke-width="5"
						stroke-linecap="round"
					>
						<line x2="50" y2="50" />
						<line x1="50" y2="50" />
					</svg> -->
					🗑️
				</button>
				<form class:validate on:submit|preventDefault={addParticipant}>
					<!-- <div
						class="color-label"
						style={`background-color: ${getColorHashFromString(participant.name)}`}
					/> -->
					<input class="name" bind:value={participant.name} required use:focus />
					<input
						class="tickets"
						type="number"
						min="0"
						required
						bind:value={participant.tickets}
						on:keydown={submitOnEnter}
					/>
				</form>
			</div>
		{/each}
	</div>
	<button class="add-participant" on:click={addParticipant}>Legg til</button>
	<button class="reset" on:click={resetParticipants}>Fjern alle</button>
</div>

<style>
	form {
		display: grid;
		grid-template-columns: [name] 3fr [tickets] 1fr [end];
		gap: 10px;
	}

	input {
		width: 100%;
		font-size: 1em;
		font-family: system-ui;
		border: 1px solid gray;
		padding: 5px;
	}

	input[type='number']:not(:focus):not(:hover) {
		appearance: textfield;
		-moz-appearance: textfield;
		text-align: center;
	}

	button {
		font-size: 1.2em;
		cursor: pointer;
		padding: 10px;
	}

	.participants {
		display: grid;
		gap: 10px 20px;
		grid-template-rows: repeat(15, 1fr);
		grid-auto-flow: column;
		grid-auto-columns: 1fr;
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

	.name {
		grid-column-start: name;
	}

	.tickets {
		grid-column-start: tickets;
	}

	.remove-button {
		padding: 0 8px;
		background-color: transparent;
		stroke: white;
		border: 1px solid gray;
		border-radius: 1px;
		display: flex;
		align-items: center;
		font-size: 0.8rem;
	}

	.remove-button:hover {
		background-color: white !important;
		stroke: black;
	}

	.add-participant {
		margin-top: auto;
	}

	.validate > input:invalid {
		outline: 1px solid darkred;
	}
</style>
