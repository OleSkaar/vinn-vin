import { writable } from 'svelte/store';
import type { Participant } from '../types';

export const participants = writable<Participant[]>([]);