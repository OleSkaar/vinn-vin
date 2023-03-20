import { writable } from 'svelte/store';
import type { Participant } from '../types';

export const participants = writable<Participant[]>([
    {
        id: 0,
        name: 'Jens',
        tickets: 5,
    },
    {
        id: 1,
        name: 'Abelina',
        tickets: 6,
    },
    {
        id: 2,
        name: 'Jebediah',
        tickets: 3,
    },
    {
        id: 3,
        name: 'Cinderella',
        tickets: 5,
    },
    {
        id: 4,
        name: 'Sybil',
        tickets: 4,
    }
]);

export const findWinningTicket = (participants: Participant[], ticket: number) => {
    let ticketTotal = 0;

    return participants.filter((participant) => participant.tickets !== 0).find((participant) => {
        ticketTotal += participant.tickets;

        return ticket >= ticketTotal - participant.tickets && ticket < ticketTotal;
    })
}