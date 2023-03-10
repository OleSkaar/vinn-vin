import type { Participant } from "../types";

export const isValidParticipant = (participant: Participant) => {
    return participant.name.length > 0 && participant.tickets > 0;
}