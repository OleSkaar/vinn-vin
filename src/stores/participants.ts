import { writable } from 'svelte/store';
import type { Participant } from '../types';

/*
[
    {
        id: 0,
        name: "Ella",
        tickets: 10
    },
    {
        id: 1,
        name: "Sofia",
        tickets: 7
    },
    {
        id: 2,
        name: "Harper",
        tickets: 6
    },
    {
        id: 3,
        name: "Michael",
        tickets: 3
    },
    {
        id: 4,
        name: "Noah",
        tickets: 1
    },
    {
        id: 5,
        name: "Aiden",
        tickets: 9
    },
    {
        id: 6,
        name: "James",
        tickets: 6
    },
    {
        id: 7,
        name: "Benjamin",
        tickets: 3
    },
    {
        id: 8,
        name: "Evelyn",
        tickets: 10
    },
    {
        id: 9,
        name: "William",
        tickets: 10
    },
    {
        id: 10,
        name: "Evelyn",
        tickets: 8
    },
    {
        id: 11,
        name: "Sophia",
        tickets: 4
    },
    {
        id: 12,
        name: "Isabella",
        tickets: 3
    },
    {
        id: 13,
        name: "Elizabeth",
        tickets: 6
    },
    {
        id: 14,
        name: "Harper",
        tickets: 7
    },
    {
        id: 15,
        name: "Ethan",
        tickets: 5
    },
    {
        id: 16,
        name: "William",
        tickets: 1
    },
    {
        id: 17,
        name: "William",
        tickets: 10
    },
    {
        id: 18,
        name: "Emma",
        tickets: 2
    },
    {
        id: 19,
        name: "Michael",
        tickets: 8
    },
    {
        id: 20,
        name: "Harper",
        tickets: 3
    },
    {
        id: 21,
        name: "Sofia",
        tickets: 10
    },
    {
        id: 22,
        name: "Lucas",
        tickets: 9
    },
    {
        id: 23,
        name: "Isabella",
        tickets: 7
    },
    {
        id: 24,
        name: "Abigail",
        tickets: 8
    },
    {
        id: 25,
        name: "Abigail",
        tickets: 7
    },
    {
        id: 26,
        name: "Noah",
        tickets: 7
    },
    {
        id: 27,
        name: "Emma",
        tickets: 6
    },
    {
        id: 28,
        name: "Ava",
        tickets: 8
    },
    {
        id: 29,
        name: "Elijah",
        tickets: 6
    }
]

*/

export const participants = writable<Participant[]>([{
    id: 0,
    name: '',
    tickets: 1,
}]);

export const findWinningTicket = (participants: Participant[], ticket: number) => {
    let ticketTotal = 0;

    return participants.filter((participant) => participant.tickets !== 0).find((participant) => {
        ticketTotal += participant.tickets;

        return ticket >= ticketTotal - participant.tickets && ticket < ticketTotal;
    })
}