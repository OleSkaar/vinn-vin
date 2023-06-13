<script lang="ts">
	import { participants } from '../stores/participants';
	import { ticketLineStore } from '../stores/ticketLines';
	import { getColorHashFromString, isValidParticipant } from '../utils';

	let ticketLines: boolean;

	ticketLineStore.subscribe(value => {
		ticketLines = value;
	})

	$: hasInvalidParticipant = !$participants.every(isValidParticipant);

	$: validParticipants = $participants.filter((participant) => isValidParticipant(participant));
	$: totalTickets = validParticipants.reduce((total, current) => (total += current.tickets), 0);

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

	const toggleTicketLines = () => {
		ticketLineStore.update(value => !value);
	}

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
					<input
						class="name"
						bind:value={participant.name}
						on:keydown={submitOnEnter}
						required
						use:focus
					/>
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
		<button on:click={addParticipant}>Legg til</button>
	</div>
	<div class="controls">
		<button class="reset" on:click={resetParticipants}>🗑️ Fjern alle</button>
		<div class="show-tickets-container">
			<input class="ticketLines" type="checkbox" name="Ticket lines" on:click={toggleTicketLines} />
			<label for="Ticket lines">Vis hvert lodd</label>
		</div>
		<p>🎟️ Antall lodd: {totalTickets}</p>
	</div>
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

	.ticketLines {
		width: 20px;
		height: 20px;
		cursor: pointer;
	}

	.reset {
		max-width: max-content;
	}

	.participants {
		display: grid;
		gap: 10px 30px;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: min-content;
		max-height: 80vh;
		height: 100%;
		overflow-y: auto;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 10px;
	}

	.participant {
		display: flex;
		font-size: 1.5rem;
		gap: 10px;
		max-height: 50px;
	}

	.name {
		grid-column-start: name;
		min-width: 100px;
	}

	.tickets {
		grid-column-start: tickets;
		min-width: 3rem;
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

	.validate > input:invalid {
		outline: 1px solid darkred;
	}

	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.show-tickets-container {
		display: flex;
		gap: 5px;
		align-items: center;
	}
</style>
