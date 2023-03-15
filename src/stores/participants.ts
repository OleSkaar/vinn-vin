import { writable } from 'svelte/store';
import type { Participant } from '../types';

export const participants = writable<Participant[]>([
    {
        id: 0,
        name: 'Jens',
        tickets: 5,
        firstTicketIndex: 0,
    },
    {
        id: 1,
        name: 'Abelina',
        tickets: 6,
        firstTicketIndex: 5,
    },
    {
        id: 2,
        name: 'Jebediah',
        tickets: 3,
        firstTicketIndex: 11,
    },
    {
        id: 3,
        name: 'Cinderella',
        tickets: 5,
        firstTicketIndex: 14,
    },
    {
        id: 4,
        name: 'Sybil',
        tickets: 4,
        firstTicketIndex: 19,
    }
]);