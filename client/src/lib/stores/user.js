import { writable } from "svelte/store";

export const id = writable();
export const username = writable('');
export const isAuth = writable('');
export const actionclass = writable('');
export const isActive = writable('');
export const nextClockTick = writable();
export const currres = writable();
export const currtype = writable();
