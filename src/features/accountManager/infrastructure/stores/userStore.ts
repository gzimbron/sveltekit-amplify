import type User from '$features/accountManager/domain/entities/User';
import { writable } from 'svelte/store';

export const userStore = writable<User | null>(null);
