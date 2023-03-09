import { writable } from 'svelte/store';
import type { Participant } from '../types';

export const participants = writable<Participant[]>([
    {
        id: '0',
        name: '',
        tickets: 0,
    }
]);